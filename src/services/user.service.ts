import axios from "axios";
import type { IFriend, User } from "@/interfaces/data";

axios.defaults.baseURL = 'http://localhost:4200/'

export const UsersService = {
    async getUsers() {
        const { data } = await axios.get<User[]>('/users')
        return data
    },
    async getUserById(id: string) {
        const { data } = await axios.get<User[]>(`/users?id=${id}`)
        return data[0]
    },
    async addNewFriend(id: string, myId: string, myFriends: IFriend[]) {
        const { data } = await axios.get<User>(`/users/${id}`)
        const friend: IFriend = {
            id: data.id,
            name: data.login,
            avatar: data.avatar,
            cardNumber: data.card.number
        }
        if (data) await axios.patch(`users/${myId}`, {
            friends: [...myFriends, friend]
        })
        return friend
    },
    async addNewUser(user: User) {
        try {
            await axios<User>({
                method: 'post',
                url: '/users',
                data: user
            })
        } catch (error) {
            console.error(error)
        }
    },
    async getUsersByName() {
        try {
            const { data } = await axios.get<User[]>('/users')
            const sortData = data.map(e => {
                return { id: e.id, login: e.login, avatar: e.avatar }
            })
            return sortData
        } catch (error) {
            console.error(error)
        }
    },
    async handleUserLogin(login: string) {
        try {
            const data = await axios.get(`/users?login=${login}`)
            return data
        } catch (error) {
            console.error(error)
        }
    }
}