import { FC, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBlocks } from "@/store/slices/informations";
import { GetDate } from "@/utilities/getDate.utils";
import type { IStatisticBlock } from "@/interfaces/data";
import s from './Information.module.scss'

interface IProps {
   infoBlocks: IStatisticBlock[]
}

export const Information: FC<IProps> = ({ infoBlocks }) => {
   const dispatch = useAppDispatch()
   const blocks = useAppSelector(state => state.informations.blocks)

   useEffect(() => {
      dispatch(setBlocks(infoBlocks))
   }, [])

   return <div className={s.wrapper}>
      {blocks.length ? (
         blocks.map(e => <div key={e.date} className={s.block}>
            <div className={s.arrow}>
               <Image src={e.name === 'Income' ? '/ArrowUp.svg' : '/ArrowDown.svg'} alt="Svg" width={20} height={20} />
               <span>{e.name === 'Income' ? 'Income' : 'Expense'}</span>
            </div>
            <div className={s.date}>
               <Image src={'/Date.svg'} alt="Date" width={20} height={20} />
               <span>{GetDate.getDate(e.date)}</span>
            </div>
            <span>{e.amount.toLocaleString().replace(/\s/g, ',')} ₴</span>
         </div>).reverse()
      ) : (
         <p>Here is your transaction history</p>
      )}
   </div>
}