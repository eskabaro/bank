import { FC, PropsWithChildren } from "react"
import { Header } from './header'
import { Footer } from "./footer"
import { Mukta } from 'next/font/google'
import s from './Layout.module.scss'

const mukta = Mukta({ weight: ['600'], subsets: ['latin'] })

interface ILayoutProps extends PropsWithChildren {
    userName?: string
    userAvatar?: string
}

export const Layout: FC<ILayoutProps> = ({ children, userName, userAvatar }) => {
    return <div className={`${s.wrapper} ${mukta.className}`}>
        <div className={s.container}>
            <Header userName={userName} userAvatar={userAvatar} />
            {children}
            <Footer />
        </div>
    </div>
}