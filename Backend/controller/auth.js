let Joi = require("joi");
let User = require("../Schema/users");
let bcrypt = require("bcrypt");
let DTO = require("../DTO/userDTO");
let JWT = require("../JWTServices/JWTService");
let RefreshToken = require("../Schema/token");

// let passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(a-zA-Z\d){8,25}$/;
let auth = {

  
  //...................................registration.................................................
  async register(req, res, next) {
    let registration = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirmpassword: Joi.ref("password"),
    });

    const errors = registration.validate(req.body, { abortEarly: false });
    // res.send(error);

    if (errors.error) {
      return next(errors.error.details[0]);
    }

    //object destructing
    const { username, email, name, password } = req.body;

    let userExist = await User.exists({ username });
    let emailExist = await User.exists({ email });

    //if username exists
    if (userExist) {
      let error = {
        status: 409,
        message: "Username already exists, try an otherone",
      };
      return next(error);
    }

    //if email exists
    if (userExist) {
      let error = {
        status: 409,
        message: "username already exists, try an otherone",
      };
      return next(error);
    }

    //if username esists
    if (emailExist) {
      let error = {
        status: 409,
        message: "email already exists, try an otherone",
      };
      return next(error);
    }

    let accessToken;
    let refreshToken;

    try {
      let hashedPassword = await bcrypt.hash(password, 10);
      let user = new User({ name, email, username, password: hashedPassword });
      let success = await user.save();

      // only id and name
      let dto = new DTO(success);

      //generate tokens
      accessToken = JWT.createAccessToken({ id: user._id }, "30m");
      refreshToken = JWT.createRefreshToken({ id: user._id }, "60m");

      //send to cookie
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });

      // save refreshToken
      let r = await JWT.storeRefreshToken(refreshToken, dto._id);
      console.log(r);

      console.log(accessToken);

      res.status(200).json({ user: dto, auth: true });
    } catch (error) {
      return next(error);
    }
  },



  //........................................login api...............................................
  async login(req, res, next) {
    let loginUser = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().required(),
    });

    let errors = loginUser.validate(req.body, { abortEarly: false });

    let { username, password } = req.body;

    if (errors.error) {
      return next(errors.error.details[0]);
    }

    let accessToken;
    let refreshToken;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        let error = {
          status: 401,
          message: "invalid username",
        };
        return next(error);
      }

      //comparing password with stored hashed password
      let matchedPassword = await bcrypt.compare(password, user.password);

      // if password does not match
      if (!matchedPassword) {
        let error = {
          status: 401,
          message: "incorrect Password",
        };
        return next(error);
      }

      let dto = new DTO(user);

      //generate token

      accessToken = JWT.createAccessToken({ id: dto._id }, "30m");
      refreshToken = JWT.createRefreshToken({ id: dto._id }, "60m");

      //send to cookie
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });

      //update refreshToken
      let a = await RefreshToken.updateOne(
        { userId: user._id },
        { $set: { token: refreshToken } },
        { upsert: true }
      );
      console.log(a);

      res.status(200).json({ user: dto, auth: true });
    } catch (error) {
      return next(error);
    }
  },




  //............................................logout api..........................................
  async logout(req, res, next) {
    // getting refreshToken from cookie
    let { refreshToken } = req.cookies;

    try {
      let a = await RefreshToken.deleteOne({ token: refreshToken });
      console.log(a);
    } catch (error) {
      return next(error);
    }

    //clear cookie
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ user: null, auth: false });
  },

  //.................................... for refreshing token.......................................
  async refresh(req, res, next) {
    // getting refresh token

    let { refreshToken } = req.cookies;

    // getting id by refreshing
    let id;
    try {
      id = JWT.verifyRefreshToken(refreshToken).id;
    } catch (e) {
      let error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }

    // finding token verifying
    try {
      let match = await RefreshToken.findOne({
        userId: id,
        token: refreshToken,
      });

      if (!match) {
        let error = {
          status: 401,
          message: "Unauthorized",
        };

        return next(error);
      }
    } catch (e) {
      let error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    //genrating access and refresh token
    let accesstoken;
    let refreshtoken;

    try {
      accesstoken = JWT.createAccessToken({ _id: id }, "30m");
      refreshtoken = JWT.createRefreshToken({ _id: id }, "60m");

      await RefreshToken.updateOne(
        { _id: id, token: refreshToken },
        { $set: { token: refreshtoken } }
      );

      //send to cookie
      res.cookie("accessToken", accesstoken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshtoken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    } catch (e) {
      let error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }

    //sending response

    let user = await User.findOne({ _id: id });
    let dto = new DTO(user);
    res.status(200).send(dto);
  },
};
module.exports = auth;
