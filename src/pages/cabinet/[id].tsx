import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { UsersService } from "@/services/user.service";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { Cabinet } from "@/screens/cabinet";
import type { UserDataSingle } from "@/interfaces/data";
import { useAppDispatch } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";

const CabinetPage: NextPage<UserDataSingle> = ({ user }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!document.cookie) router.push('/login')
        dispatch(setBalance(user.balance))
    }, [])

    return <Layout userName={user.login} userAvatar={user.avatar}>
        <Cabinet user={user} />
    </Layout>
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const data = await UsersService.getUsers()

    return {
        paths: data.map(user => ({
            params: {
                id: user.id
            }
        })),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<UserDataSingle> = async ({
    params
}) => {
    const user = await UsersService.getUserById(String(params?.id))

    return {
        props: { user },
        revalidate: 60
    }
}

export default CabinetPage
