import React, { useState, useEffect } from "react";
import styles from "./Crypto.module.css";
import { getCrypto } from "../../api/external";
import Loading from "../../components/Loading";

export default function Crypto() {
  let [crypto, setCrypto] = useState([]);

  useEffect(() => {
    async function crypto() {
      let response = await getCrypto();
      setCrypto(response.data);
    }
    crypto();

    //clean up run when this component will un mount
    // setCrypto([]);
  }, []);

  if (crypto.length == 0) {
    return <Loading text="Cryptocurrencies"></Loading>;
  }

  const negative = {
    color: "#ea3943",
  };
  const positive = {
    color: "#16c784",
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        {crypto.map((coin) => {
          return (
            <tr id={coin.id} className={styles.tableRow}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <div className={styles.logo}>
                  <img src={coin.image} width="40px" height="40px"></img>
                  {coin.name}
                </div>
              </td>
              <td>
                <div className={styles.symbol}>{coin.symbol}</div>
              </td>
              <td>{coin.current_price}</td>
              <td
                style={
                  coin.price_change_percentage_24h < 0 ? negative : positive
                }
              >
                {coin.price_change_percentage_24h}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
