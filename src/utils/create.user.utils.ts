import type { IFormInput } from "@/app/register/Register"
import type { User } from "@/interfaces/data"
import { AvatarUutils } from "./avatar.utils"
import { CardUtils } from "./card.utils"

export const CreateUserUtils = {
    createUser(data: IFormInput, numbers: string[]): User {
        const user = {
            id: String(Date.now()),
            login: data.login,
            password: data.password,
            avatar: AvatarUutils.setAvatar(),
            balance: 0,
            income: 0,
            expense: 0,
            card: {
                number: CardUtils.createCardNumber(numbers),
                date: CardUtils.createCardDate(),
                cvv: CardUtils.createCardCvv()
            },
            infoBlocks: [],
            friends: []
        }
        return user
    }
}