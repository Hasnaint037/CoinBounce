import axios from 'axios';

export let news=async ()=>{
    let response;
    try{
        response=await axios.get('https://newsapi.org/v2/everything?q=business AND blockchain&sortBy=publishedAt&language=en&apiKey=607afe6fe95343d9be98d608b783cb20');
        response=response.data.articles.slice(0,30);
    }catch(error){
        return error;
    }
    return response;
}

export let getCrypto=async ()=>{
    let response;
    try{
        response=await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&locale=en');
    }
    catch(error){
        return error;
        console.log(error)
    }
    return response;
}