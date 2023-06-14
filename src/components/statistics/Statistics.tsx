import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setWithUseEffect } from "@/store/slices/statistics";
import { Circle } from "./circle";
import dynamic from 'next/dynamic';
import s from './Statistics.module.scss'

const CountUp = dynamic(() => import('react-countup'), { ssr: false });

interface IProps {
   income: number,
   expense: number
}

export const Statistics: FC<IProps> = ({ income, expense }) => {
   const statistics = useAppSelector(state => state.statistics)
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(setWithUseEffect({ type: 'SET_INCOME', value: income }))
      dispatch(setWithUseEffect({ type: 'SET_EXPENSE', value: expense }))
   }, [])

   useEffect(() => {
      const timer = setTimeout(() => {
         setCountIncome(statistics.income)
         setCountExpense(statistics.expense)
      }, 500)

      return () => clearTimeout(timer)
   }, [statistics])

   const [countIncome, setCountIncome] = useState<number>(statistics.income)
   const [countExpense, setCountExpense] = useState<number>(statistics.expense)

   return <div className={s.wrapper}>
      <h3>Statistics</h3>
      {statistics.expense !== 0 || statistics.income !== 0 ? (
         <Circle income={statistics.income} expense={statistics.expense} />
      ) : null}
      <div className={s.income}>
         <span>Income: <CountUp start={statistics.income} end={countIncome} /> ₴</span>
      </div>
      <div className={s.expense}>
         <span>Expense: <CountUp start={statistics.expense} end={countExpense} />₴</span>
      </div>
   </div>
}