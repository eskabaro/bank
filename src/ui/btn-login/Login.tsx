import { FC } from "react";
import Link from "next/link";
import s from './Login.module.scss'

export const Login: FC = () => {
    return <Link href={'/login'} className={s.btn}>
        <button>Login</button>
    </Link>
}