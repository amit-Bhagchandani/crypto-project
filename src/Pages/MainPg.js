import React, { useEffect } from 'react'
import CurrencyConverter from '../components/CurrencyConverter'
import CoinGraph from '../components/CoinGraph'
import CoinInfo from '../components/CoinInfo'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from 'react-redux'
import { getCoinsThunk, TOGGLE_COIN } from '../features/coinSlice'

const MainPg = () => {

  const { maxPosPriceChangeCoin_14d, maxNegPriceChangeCoin_14d, selectedCoin, pending, error } = useSelector(state => state)

  const dispatch = useDispatch()

  const onChangeClick = () => {
    dispatch(TOGGLE_COIN())
  }

  useEffect(() => {
    dispatch(getCoinsThunk())
  },[])
 
  return (
    <main className='page'>
        <div className='container'>
          {
            pending && <div className='loading'></div>
          }
          {
            error && <h3>Error fetching the resource</h3>
          }
          {
           !pending && !error &&
              <>
                <Carousel onChange={onChangeClick} showThumbs={false} swipeable={false} showIndicators = {false} className = 'carousel'>
                  <CoinInfo id = {maxPosPriceChangeCoin_14d.id} image = {maxPosPriceChangeCoin_14d.image} price_change = {maxPosPriceChangeCoin_14d.price_change_percentage_14d_in_currency} />
                  <CoinInfo id = {maxNegPriceChangeCoin_14d.id} image = {maxNegPriceChangeCoin_14d.image} price_change = {maxNegPriceChangeCoin_14d.price_change_percentage_14d_in_currency}/>              
                </Carousel>

                <CoinGraph coinId={selectedCoin.id} prices = {selectedCoin.prices} timeStamps = {selectedCoin.timeStamps}/> 

                <CurrencyConverter coinId={selectedCoin.id} rates = {selectedCoin.rates} />
              </>  
          }
        </div>
    </main>
  )
}

export default MainPg