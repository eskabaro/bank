export interface User {
    id: string
    login: string   
    password: string
    card: ICard
    avatar: string
    balance: number
    income: number
    expense: number
    infoBlocks: IStatisticBlock[]
    friends: IFriend[]
}

export interface IFriend {
    id: string,
    name: string,
    avatar: string,
    cardNumber: string
}

export interface IStatisticBlock {
    name: string
    date: string
    amount: number
}

export interface ICard {
    number: string
    date: string
    cvv: number
}

export interface Users {
    users: User[]
}

export interface UserDataSingle {
    user: User
}

export interface ISortUser {
    id: string,
    login: string
    avatar: string
}
