import axios from "axios";
import type { IFriend, User } from "@/interfaces/data";
import { GenerationUtils } from "@/utilities/generation.utils";

axios.defaults.baseURL = 'http://localhost:4200/';

export const UsersService = {
    async getUsers(): Promise<User[]> {
        const { data } = await axios.get<User[]>('/users', { headers: { 'Content-Type': 'application/json' } })
        return data
    },
    async getUserById(id: string): Promise<User> {
        const { data } = await axios.get<User[]>(`/users?id=${id}`, { headers: { 'Content-Type': 'application/json' } })
        return data[0]
    },
    async addNewFriend(id: string, myId: string, myFriends: IFriend[]) {
        const { data } = await axios.get<User>(`/users/${id}`, { headers: { 'Content-Type': 'application/json' } })
        const friend = GenerationUtils.generationFriend(data)

        if (data) await axios.patch<User>(`users/${myId}`, {
            friends: [...myFriends, friend]
        }, { headers: { 'Content-Type': 'application/json' } })

        return friend
    },
    async deleteFriend(myId: string, newMyFriends: IFriend[]) {
        try {
            await axios.patch<User>(`/users/${myId}`, {
                friends: newMyFriends
            }, { headers: { 'Content-Type': 'application/json' } })
            return true
        } catch (error) {
            console.error(error)
        }
    },
    async addNewUser(user: User) {
        await axios.post<User>('/users', user, {
            headers: { 'Content-Type': 'application/json' }
        })
        return true
    },
    async getUsersByName() {
        const { data } = await axios.get<User[]>('/users', { headers: { 'Content-Type': 'application/json' } })
        const sortData = data.map(e => {
            return { id: e.id, login: e.login, avatar: e.avatar }
        })
        return sortData
    },
    async handleUserLogin(login: string) {
        const { data } = await axios.get<User[]>(`/users?login=${login}`, { headers: { 'Content-Type': 'application/json' } })
        return data[0]
    }
}