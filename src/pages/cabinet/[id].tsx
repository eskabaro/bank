import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { UsersService } from "@/services/user.service";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import { Cabinet } from "@/screens/cabinet";
import { useAppDispatch } from "@/store/hook";
import { setBalance } from "@/store/slices/transaction";
import type { UserDataSingle } from "@/interfaces/data";

const CabinetPage: NextPage<UserDataSingle> = ({ user }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!document.cookie) router.push('/login')
        dispatch(setBalance(user.balance))
    }, [])

    return <Layout title='Your cabinet' userName={user.login} userAvatar={user.avatar} userId={user.id} userFriends={user.friends}>
        <Cabinet user={user} />
    </Layout>
}

interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    try {
        const data = await UsersService.getUsers()
    
        return {
            paths: data.map(user => ({
                params: {
                    id: user.id
                }
            })),
            fallback: "blocking"
        }    
    } catch (error) {
        return {
            paths: [],
            fallback: "blocking"
        }
    }
}

export const getStaticProps: GetStaticProps<UserDataSingle> = async ({
    params
}) => {
    try {
        const user = await UsersService.getUserById(String(params?.id))

        if (!user) {
            return {
                redirect: {
                    destination: "/404",
                    permanent: false
                }
            }
        } else return {
            props: { user },
            revalidate: 60
        }
    } catch {
        return {
            redirect: {
                destination: "/404",
                permanent: false
            }
        }
    }
}

export default CabinetPage
