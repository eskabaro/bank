'use client'

import { FC, useEffect } from "react";

import { Card } from "@/components/card-info";
import { Transaction } from "@/components/transaction";
import { Transfer } from "@/components/transfer";
import { Statistics } from "@/components/statistics";
import { Information } from "@/components/information";

import { useAppDispatch } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";

import type { UserDataSingle } from "@/interfaces/data";

import s from './Cabinet.module.scss'

export const Cabinet: FC<UserDataSingle> = ({ user }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setBalance(user.balance))
    }, [])

    return <main className={s.container}>
        <section className={s.container__block1}>
            <Card card={user.card} />
            <Information infoBlocks={user.infoBlocks} />
        </section>
        <section className={s.container__block2}>
            <Statistics income={user.income} expense={user.expense} />
            <Transaction id={user.id} />
            <Transfer id={user.id} cardNumber={user.card.number} myFriends={user.friends} />
        </section>
    </main>
}
