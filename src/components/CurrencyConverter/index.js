import React, {useEffect, useState} from 'react'
import styles from './CurrencyConverter.module.css'

const CurrencyConverter = ({coinId, rates}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('usd')
  const [currency1, setCurrency1] = useState(1)
  const [currency2, setCurrency2] = useState(1)

  useEffect(() => {
    setCurrency2(rates[selectedCurrency])
    setCurrency1(1)
  },[rates])

  const onCurrency1AmountChange = (e) => {
    if(e.target.value != '' )
    {
      setCurrency2((e.target.value * rates[selectedCurrency]).toFixed(3))
      setCurrency1(e.target.value)
    }
    else {
      setCurrency1('')
    }
  }
  
  const onCurrency2AmountChange = (e) => {
    if(e.target.value !=  '' )
    {
      setCurrency1((e.target.value / rates[selectedCurrency]).toFixed(3))
      setCurrency2(e.target.value)
    }
    else {
      setCurrency2('')
    }
  }

  const onCurrencyChange = (e) => {
    setCurrency2(currency1 * rates[e.target.value])  
    setSelectedCurrency(e.target.value)
  }

  if(!Object.keys(rates).length) {
    return (
      <div className='card error'>
        <p>'API Error :- Some error occured while fetching conversion rates, please try again later!'</p> 
      </div> 
    ) 
  }

  return (
    <section aria-label='currency-converter' className={`${styles.currencyConverter} card`}>
      <div className={`${styles.currency}`}>
        <input type='number' value = {currency1} min = {0} onChange = {onCurrency1AmountChange} /> 
        <p className={`${styles.selectedCoin}`}>{coinId}</p>
      </div>
      <div className={`${styles.currency}`}>  
        <input type='number' value={currency2} min = {0} onChange = {onCurrency2AmountChange} />
        <select value={selectedCurrency} className = {`${styles.selectedCoin}`} onChange={onCurrencyChange}>
        {
          Object.keys(rates).map(Country_rate =><option value={Country_rate} key={Country_rate}>{Country_rate}</option>)
        }
        </select>
      </div>
    </section>
  )
}

export default CurrencyConverter