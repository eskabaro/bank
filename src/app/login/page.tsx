import { Metadata } from "next";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

import { Login } from "./Login";
import { UsersService } from "@/services/user.service";

export const metadata: Metadata = {
   title: {
      absolute: '',
      template: ''
   },
   description: ''
}

const getUsers = async () => {
   const users = await UsersService.getUsers()
   const cookie = cookies().get('user')
   const user = cookie ? JSON.parse(cookie.value) : null

   if (user) {
      redirect(`/cabinet/${user.id}`)
   }

   return users
}

const LoginPage = async () => {
   const users = await getUsers()

   return <Login users={users} />
}

export default LoginPage