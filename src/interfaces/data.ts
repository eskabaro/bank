export interface User {
    id: string
    login: string   
    password: string
    card: ICard
    avatar: string
    balance: number
    infoBlocks: IStatisticBlock[]
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
