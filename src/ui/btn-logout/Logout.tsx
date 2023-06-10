import { FC } from "react";
import { useRouter } from "next/router";
import s from './Logout.module.scss'

export const Logout: FC = () => {
    const router = useRouter()

    const logout = () => {
        const cookie = document.cookie
        const d = new Date()
        d.setTime(d.getTime() - (1 * 24 * 60 * 1000))
        const expires = d.toUTCString()
        document.cookie  = `${cookie}; expires=${expires}; path=/`
        router.push('/login')
    }
    
    return <button className={s.btn} onClick={logout}>Logout</button>
}