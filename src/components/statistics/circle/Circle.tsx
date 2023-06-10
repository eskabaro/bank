import { FC } from "react";
import {
   Chart as ChartJS,
   ArcElement
} from 'chart.js'
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from 'chart.js'
import s from './Circle.module.scss'

ChartJS.register(ArcElement)

interface IProps {
   income: number
   expense: number
}

export const Circle: FC<IProps> = ({ income, expense }) => {
   const data = {
      datasets: [{
         data: [income, expense],
         backgroundColor: ['#12E4BA', '#836EFC'],
         borderColor: ['#12E4BA', '#836EFC'],
         hoverBackgroundColor: ['#12E4BA', '#836EFC'],
         hoverBorderColor: ['#12E4BA', '#836EFC']
      }]
   }

   const options: ChartOptions<'doughnut'> = {
      cutout: '55%',
      hover: {
         mode: 'dataset'
      },
      plugins: {
         tooltip: {
            enabled: false
         }
      }
   }

   return <div className={s.wrapper}>
      <Doughnut data={data} options={options} />
   </div>
}