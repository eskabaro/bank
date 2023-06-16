import type { IStatisticBlock, IFriend, User } from "@/interfaces/data"

export const GenerationUtils = {
    generationInfoBlock(type: string, amount: number): IStatisticBlock {
        const block: IStatisticBlock = {
            name: type,
            date: String(new Date),
            amount
        }
        return block
    },
    generationFriend(data: User) {
        const friend: IFriend = {
            id: data.id,
            name: data.login,
            avatar: data.avatar,
            cardNumber: data.card.number
        }
        return friend
    }
}