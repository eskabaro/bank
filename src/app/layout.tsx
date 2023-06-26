import { Mukta } from 'next/font/google'

import Providers from "@/providers/Provider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

import s from './Layout.module.scss';
import '../styles/globals.scss';

const mukta = Mukta({ weight: ['600'], subsets: ['latin'] })

const RootLayout = async ({
   children,
}: {
   children: React.ReactNode
}) => {
   return (
      <html lang="en">
         <body>
            <div className={`${mukta.className} ${s.wrapper}`}>
               <div className={s.container}>
                  <Providers>
                     <Header />
                     {children}
                     <Footer />
                  </Providers>
               </div>
            </div>
         </body>
      </html>
   )
}

export default RootLayout