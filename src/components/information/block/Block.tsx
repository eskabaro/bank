import { FC } from "react";
import Image from "next/image";

import { GesUtils } from "@/utils/gets.utils";

import type { IStatisticBlock } from "@/interfaces/data";

import s from '../Information.module.scss';

interface IProps extends IStatisticBlock { }

export const Block: FC<IProps> = ({ name, date, amount }) => {
   return <div className={s.block}>
      <div className={s.arrow}>
         <Image src={name === 'Income' ? '/ArrowUp.svg' : '/ArrowDown.svg'} alt="Svg" width={20} height={20} />
         <span>{name === 'Income' ? 'Income' : 'Expense'}</span>
      </div>
      <div className={s.date}>
         <Image src={'/Date.svg'} alt="Date" width={20} height={20} />
         <span>{GesUtils.getDate(date)}</span>
      </div>
      <span>{amount.toLocaleString().replace(/\s/g, ',')} ₴</span>
   </div>
}