import { FC, PropsWithChildren } from "react"
import { Header } from './header'
import { Footer } from "./footer"
import { Mukta } from 'next/font/google'
import type { IFriend } from "@/interfaces/data"
import s from './Layout.module.scss'

const mukta = Mukta({ weight: ['600'], subsets: ['latin'] })

interface ILayoutProps extends PropsWithChildren {
    userName?: string
    userAvatar?: string
    userId?: string
    userFriends?: IFriend[]
}

export const Layout: FC<ILayoutProps> = ({ children, userName, userAvatar, userId, userFriends }) => {
    return <div className={`${s.wrapper} ${mukta.className}`}>
        <div className={s.container}>
            <Header userName={userName} userAvatar={userAvatar} userId={userId} userFriends={userFriends} />
            {children}
            <Footer />
        </div>
    </div>
}