import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { GesUtils } from "@/utilities/gets.utils";
import type { IMeta } from "./interface.meta";

export const Meta: FC<PropsWithChildren<IMeta>> = ({ children, title, description }) => {
    return <>
        <Head>
            <title>{GesUtils.getTitle(title)}</title>
            {description ? (
                <>
                    <meta name='description' content={description} />
                    <meta name='og:description' content={description} />
                </>
            ) : (
                <meta name='robots' content='noindex, nofollow' />
            )}
        </Head>
        {children}
    </>
}