import { GetServerSideProps, NextPage } from "next";
import { Layout } from "@/components/layout";
import { Login } from "@/screens/login";
import { UsersService } from "@/services/user.service";
import type { Users } from "@/interfaces/data";

const LoginPage: NextPage<Users> = ({ users }) => {
    return <Layout title='Login'>
        <Login users={users} />
    </Layout>
}

export const getServerSideProps: GetServerSideProps<Users> = async ({
    req
}) => {
    try {
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
    } catch (error) {

        return {
            redirect: {
                destination: `404`,
                permanent: false
            }
        }
    }
}

export default LoginPage
