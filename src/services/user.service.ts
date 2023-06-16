import axios from "axios";
import type { IFriend, User, ISortUser } from "@/interfaces/data";
import { GenerationUtils } from "@/utilities/generation.utils";

axios.defaults.baseURL = 'http://localhost:4200/';

export const UsersService = {
    async getUsers(): Promise<User[] | undefined> {
        try {
            const { data } = await axios.get<User[]>('/users')
            return data
        } catch (error) {
            console.error(error)
        }
    },
    async getUserById(id: string): Promise<User | undefined> {
        try {
            const { data } = await axios.get<User[]>(`/users?id=${id}`)
            return data[0]
        } catch (error) {
            console.error(error)
        }
    },
    async addNewFriend(id: string, myId: string, myFriends: IFriend[]): Promise<IFriend | undefined> {
        try {
            const { data } = await axios.get<User>(`/users/${id}`)
            const friend = GenerationUtils.generationFriend(data)

            if (data) await axios.patch(`users/${myId}`, {
                friends: [...myFriends, friend]
            })

            return friend
        } catch (error) {
            console.error(error)
        }
    },
    async deleteFriend(myId: string, newMyFriends: IFriend[]): Promise<boolean | undefined> {
        try {
            await axios.patch<User>(`/users/${myId}`, {
                friends: newMyFriends
            })
            return true
        } catch (error) {
            console.error(error)
        }
    },
    async addNewUser(user: User): Promise<boolean | undefined> {
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
    async getUsersByName(): Promise<ISortUser[] | undefined> {
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
    async handleUserLogin(login: string): Promise<User[] | undefined> {
        try {
            const { data } = await axios.get<User[]>(`/users?login=${login}`)
            return data
        } catch (error) {
            console.error(error)
        }
    }
}