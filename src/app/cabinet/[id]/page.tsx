import { Metadata } from "next";
import { Cabinet } from "./Cabinet";
import { UsersService } from "@/services/user.service";

export const metadata: Metadata = {
   title: {
      absolute: '',
      template: ''
   },
   description: ''
}

export const generateStaticParams = async () => {
   const data = await UsersService.getUsers()

   const paths = data.map(user => {
      return {
         paths: { id: user.id }
      }
   })

   return paths
}

export const revalidate = 60

const getStaticProps = async (id: string) => {
   const user = await UsersService.getUserById(id)

   return user
}


type TParams = {
   params: {
      id: string
   }
}

const CabinetPage = async ({ params }: TParams) => {
   const user = await getStaticProps(params.id)

   return <Cabinet user={user} />
}

export default CabinetPage
