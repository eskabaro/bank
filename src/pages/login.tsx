import { FC } from "react";
import { GetServerSideProps } from "next";
import { Layout } from "@/components/layout";
import { Login } from "@/screens/login";
import { UsersService } from "@/services/user.service";
import type { Users } from "@/interfaces/data";

const LoginPage: FC<Users> = ({ users }) => {
    return <Layout>
        <Login users={users} />
    </Layout>
}

export const getServerSideProps: GetServerSideProps<Users> = async ({
    req
}) => {
    const users = await UsersService.getUsers()
    const cookie = req.headers.cookie?.split('=')[1]
    const user = cookie ? JSON.parse(cookie) : null

    if (user) {
        return {
            redirect: {
                destination: `/cabinet/${user.id}`,
                permanent: false
            }
        }
    }

    return {
        props: { users }
    }
}

export default LoginPage
