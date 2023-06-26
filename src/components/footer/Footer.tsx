import { FC } from "react";
import s from './Footer.module.scss'

const Footer: FC = () => {
    return <footer className={s.footer}>
        <br />
        <p className={s.footer__first}>This is a minimalist, fake banking app. It is built on Next.js using TypeScript, and the json.server dependency is taken as the basis of the server.</p>
        <p className={s.footer__second}>Trust SecureBank to manage your finances securely and innovatively. Download the app now and discover a new level of convenience in banking!</p>
    </footer>
}

export default Footer