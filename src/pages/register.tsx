import { FC } from "react";
import { Layout } from "@/components/layout";
import { Register } from "@/screens/register";
import { GetStaticProps } from "next";
import { UsersService } from "@/services/user.service";

interface IProps {
    numbers: string[]
}

const RegisterPage: FC<IProps> = ({ numbers }) => {
    return <Layout>
        <Register numbers={numbers} />
    </Layout>
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
    const numbers = await UsersService.getUsers().then(data => data.map(e => e.card.number))

    return {
        props: { numbers }
    }
}

export default RegisterPage
