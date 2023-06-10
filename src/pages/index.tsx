import { GetServerSideProps, NextPage } from "next";
import { UsersService } from "@/services/user.service";
import type { Users } from "@/interfaces/data";

const HomePage: NextPage = () => {
  return null
}

export const getServerSideProps: GetServerSideProps<Users> = async () => {
  const users = await UsersService.getUsers()

  if (!users.length) {
    return {
      redirect: {
        destination: '/register',
        permanent: false
      }
    }
  } else if (users.length) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { users }
}
}

export default HomePage
