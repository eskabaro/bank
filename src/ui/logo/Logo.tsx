import { FC } from "react";
import Image from "next/image";
import s from './Logo.module.scss'


export const Logo: FC = () => {
    return <div className={s.logo}>
        <Image src={'/Logo.svg'} width={45} height={45} alt="Logo"/>
        <h1>bank</h1>
    </div>
}