import axios from "axios";
import type { IFriend, User } from "@/interfaces/data";
import { GenerationUtils } from "@/utilities/generation.utils";

axios.defaults.baseURL = 'http://localhost:4200/';

export const UsersService = {
    async getUsers(): Promise<User[]> {
        const { data } = await axios.get<User[]>('/users')
        return data
    },
    async getUserById(id: string): Promise<User> {
        const { data } = await axios.get<User[]>(`/users?id=${id}`)
        return data[0]
    },
    async addNewFriend(id: string, myId: string, myFriends: IFriend[]) {
        const { data } = await axios.get<User>(`/users/${id}`)
        const friend = GenerationUtils.generationFriend(data)

        if (data) await axios.patch(`users/${myId}`, {
            friends: [...myFriends, friend]
        })

        return friend
    },
    async deleteFriend(myId: string, newMyFriends: IFriend[]) {
        try {
            await axios.patch<User>(`/users/${myId}`, {
                friends: newMyFriends
            })
            return true
        } catch (error) {
            console.error(error)
        }
    },
    async addNewUser(user: User) {
        try {
            await axios<User>({
                method: 'post',
                url: '/users',
                data: user
            })
            return true
        } catch (error) {
            console.error(error)
        }
    },
    async getUsersByName() {
        const { data } = await axios.get<User[]>('/users')
        const sortData = data.map(e => {
            return { id: e.id, login: e.login, avatar: e.avatar }
        })
        return sortData
    },
    async handleUserLogin(login: string) {
        try {
            const { data } = await axios.get<User[]>(`/users?login=${login}`)
            return data
        } catch (error) {
            console.error(error)
        }
    }
}