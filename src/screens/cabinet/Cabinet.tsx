import { FC } from "react";
import { Card } from "@/components/card-info";
import { Transaction } from "@/components/transaction";
import { Transfer } from "@/components/transfer";
import { Statistics } from "@/components/statistics";
import { Information } from "@/components/information";
import type { UserDataSingle } from "@/interfaces/data";
import s from './Cabinet.module.scss'

export const Cabinet: FC<UserDataSingle> = ({ user }) => {
    return <main className={s.container}>
        <section className={s.container__block1}>
            <Card card={user.card} />
            <Information />
        </section>
        <section className={s.container__block2}>
            <Statistics />
            <Transaction id={user.id} />
            <Transfer id={user.id} cardNumber={user.card.number} />
        </section>
    </main>
}
