import React from 'react'
import { Line } from 'react-chartjs-2'
import styles from './CoinGraph.module.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 

const CoinGraph = ({prices, timeStamps}) => {

  const data = {
    labels: timeStamps,
    datasets: [
      {
        label: 'Price In USD',
        data: prices,
        fill: false,
        backgroundColor: 'blueViolet',
        borderColor: 'white',
      },
    ],
  };

  const options = {
    scales: {
      xAxes: {
        ticks: {
          color: '#2c2c2e'
        }
      },
      yAxes: 
        {
          ticks: {
            beginAtZero: false,
            color: '#2c2c2e',
          },
        },
    },
  };

  return (
    <section aria-label='coin-graph' className='card'>
        <div className={`${styles.graphContainer}`}>
          <Line data={data} options = {options} className ={`${styles.cryptoChart}`}/>
        </div>
    </section>
  )
}

export default CoinGraph