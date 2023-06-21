import dynamic from "next/dynamic"
import { FC, PropsWithChildren } from "react"
import { ToastContainer } from "react-toastify"
import { Meta } from "../seo/Meta"
import { Header } from './header/Header'
import { Mukta } from 'next/font/google'
import type { IFriend } from "@/interfaces/data"
import s from './Layout.module.scss'

const mukta = Mukta({ weight: ['600'], subsets: ['latin'] })

const Footer = dynamic(() => import('./footer/Footer'), { ssr: false });

interface ILayoutProps extends PropsWithChildren {
    title: string,
    description?: string
    userName?: string
    userAvatar?: string
    userId?: string
    userFriends?: IFriend[]
}

export const Layout: FC<ILayoutProps> = ({ children, title, description, userName, userAvatar, userId, userFriends }) => {
    return <Meta title={title} description={description}>
        <div className={`${s.wrapper} ${mukta.className}`}>
            <div className={s.container}>
                <Header
                    userName={userName}
                    userAvatar={userAvatar}
                    userFriends={userFriends}
                    userId={userId} />
                <ToastContainer />

                {children}

                <Footer />
            </div>
        </div>
    </Meta>
}