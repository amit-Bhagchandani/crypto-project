import React from 'react'
import styles from './CoinInfo.module.css'

const CoinInfo = ({id, image, price_change}) => {
  return (
    <section aria-label='coin-info' className={`${styles.coinInfo} card`}>
      <div className={`${styles.coin}`}>
        <img src = {image} width = '100px' height= '100px' />
        <p>{id}</p>
      </div>
      <p>Price change :  {price_change.toFixed(2)}%</p>
    </section>
  )
}

export default CoinInfo