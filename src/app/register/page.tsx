import { Metadata } from "next";
import { UsersService } from "@/services/user.service";
import { Register } from "./Register";

export const metadata: Metadata = {
   title: {
      absolute: '',
      template: ''
   },
   description: ''
}

const getNumbers = async () => {
   const numbers = await UsersService.getUsers().then(data => data.map(e => e.card.number));
   return numbers
}

const RegisterPage = async () => {
   const numbers = await getNumbers()

   return <Register numbers={numbers} />
}

export default RegisterPage