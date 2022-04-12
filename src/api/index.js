const baseUrl = 'https://api.coingecko.com/api/v3/coins'

export const getHistPrices = async (CoinId) => {

    const prices = []
    const timeStamps = []
    const fourteen_days_ago =  Math.round(new Date(Date.now() - (864e5*14)).getTime()/1000);
    const today = Date.now()
    
    return fetch(`${baseUrl}/${CoinId}/market_chart/range?vs_currency=usd&from=${fourteen_days_ago}&to=${today}`)
      .then(response => {
        if(!response.ok)
        {
          throw new Error('Error while fetching history prices')
          
        }
        return response.json()
      })
      .then(data => {
        data.prices.map(item => {
          prices.push(item[1])
          timeStamps.push(new Date(item[0]).toLocaleDateString('en-in', {year: 'numeric', month: 'numeric', day: 'numeric'}))
        })
         
        return {prices, timeStamps}
        })
       
      }

export const getExchangeRates = async (coinId) => {

    const date = new Date()
    const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

    return fetch(`${baseUrl}/${coinId}/history?date=${formattedDate}`)
    .then(response => {
      if(!response.ok)
      {
        throw new Error('Error while fetching rates') 
      }
      
      return response.json()
    })
    .then(
      data => {
        const rates = data.market_data.current_price
        Object.keys(rates).map((key) => rates[key] = rates[key].toFixed(3))
        return rates
      }
    )
    
}

export const fetchPricesandRates = async (coinId) => {
  return await Promise.all([getHistPrices(coinId), getExchangeRates(coinId)])
}

export const getCoins = async () => {

  return fetch(`${baseUrl}/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=14d`)
        .then(response => {
          if(!response.ok)
          {
            throw new Error('Error while fetching coins') 
          }
          return response.json()
        })
        .then(data => {
         return data.sort((a,b)=> b.price_change_percentage_14d_in_currency - a.price_change_percentage_14d_in_currency)
         }
        )
        .then((sortedData) => {
          return [sortedData[0], sortedData[49]] 
        })
        .then( async (coins) => {
          return await Promise.all( coins.map( async (coin) =>  (
                  await fetchPricesandRates(coin.id).then(
                    data => {
                      return {...coin, prices: data[0].prices, timeStamps: data[0].timeStamps, rates: data[1]}
                    }
                  )  
                )
              ) 
            )
         }
        )
        .catch(err => Promise.reject(err.message))
        }

 


