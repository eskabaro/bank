import { FC, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

import { useAppSelector } from "@/store/hook";

import type { ICard } from "@/interfaces/data";

import s from './Card.module.scss';

interface IProps {
    card: ICard
}

const CountUp = dynamic(() => import('react-countup'), { ssr: false });

export const Card: FC<IProps> = ({ card }) => {
    const [typeCvv, setTypeCvv] = useState(false)
    const [copyNumber, setCopyNumber] = useState(false)
    const balance = useAppSelector(state => state.transaction.balance)

    const copyCardNumber = (number: string) => {
        navigator.clipboard.writeText(number)
        setCopyNumber(true)
        setTimeout(() => {
            setCopyNumber(false)
        }, 1500)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setNewBalance(balance);
        }, 500);

        return () => clearTimeout(timer);
    }, [balance]);

    const [newBalance, setNewBalance] = useState<number>(balance);

    return <div className={s.wrapper}>
        <div>
            <h4>CARD NUMBER</h4>
            <span onClick={() => copyCardNumber(card.number)}>
                {card.number.replace(/(.{4})/g, "$1 ")}
                {copyNumber ? (
                    <Image priority src='/Check.svg' alt="svg" width={15} height={15} />
                ) : (
                    <Image priority src='/Copy.svg' alt="svg" width={15} height={15} />
                )}
            </span>
        </div>
        <div>
            <h4>EXPIRY DATE</h4>
            <span>{card.date}</span>
        </div>
        <div>
            <h4>CVV</h4>
            <span onClick={() => setTypeCvv(!typeCvv)}>{typeCvv ? card.cvv : '***'}</span>
        </div>
        <div>
            <h4>BALANCE</h4>
            <span>
                <CountUp
                    start={balance}
                    end={newBalance}
                    duration={1}
                    separator=","
                    suffix=" ₴" />
            </span>
        </div>
    </div>
}
