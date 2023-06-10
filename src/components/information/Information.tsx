import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setBlocks } from "@/store/slices/informations";
import { GetDate } from "@/utilities/getDate.utils";
import Image from "next/image";
import s from './Information.module.scss'

export const Information: FC = () => {
   const blocks = useAppSelector(state => state.informations.blocks)
   const dispatch = useAppDispatch()

   useEffect(() => {
      const blocksStorage = localStorage.getItem('informations')
      if (blocksStorage) dispatch(setBlocks(JSON.parse(blocksStorage)))
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