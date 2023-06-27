import { User } from "@/interfaces/data";
import { UsersService } from "@/services/user.service";
import { redirect } from 'next/navigation'

const getData = async (): Promise<User[]> => {
   const users = await UsersService.getUsers()
   return users
}

const HomePage = async (): Promise<never> => {
   const data = await getData()

   if (!data.length) {
      redirect('/register')
   } else {
      redirect('/login')
   }
}

export default HomePage
