import { GetServerSideProps, NextPage } from "next";
import { UsersService } from "@/services/user.service";

export const getServerSideProps: GetServerSideProps = async () => {
   const users = await UsersService.getUsers()

   return {
      redirect: {
         destination: users.length ? '/login' : '/register',
         permanent: false
      }
   }
}

const HomePage: NextPage = () => {
   return null
}

export default HomePage