import { FC, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { Block } from "./block";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBlocks } from "@/store/slices/informations";

import type { IStatisticBlock } from "@/interfaces/data";

import s from './Information.module.scss';

interface IProps { infoBlocks: IStatisticBlock[] }

export const Information: FC<IProps> = ({ infoBlocks }) => {
   const dispatch = useAppDispatch()
   const blocks = useAppSelector(state => state.informations.blocks)

   useEffect(() => {
      dispatch(setBlocks(infoBlocks))
   }, [])

   return <div className={s.wrapper}>
      {blocks.length ? (
         <TransitionGroup>
            {blocks.map(e => <CSSTransition key={e.date} classNames={s.block && {
               enter: s.itemEnter,
               enterActive: s.itemEnterActive,
               exit: s.itemExit,
               exitActive: s.itemExitActive,
            }} timeout={500}>
               <Block {...e} />
            </CSSTransition>).reverse()}
         </TransitionGroup>
      ) : (
         <p>Here is your transaction history</p>
      )}
   </div>
}