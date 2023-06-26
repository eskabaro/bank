'use client'

import Link from "next/link";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";


import type { Users } from "@/interfaces/data";

import s from './Login.module.scss'
import { setUser } from "@/store/slices/auth.user";
import { useAppDispatch } from "@/store/hook";
import { useAlert } from "@/hooks/useAlert";

interface IFormInput {
    login: string,
    password: string
}

export const Login: FC<Users> = ({ users }) => {
    const route = useRouter()
    const [showPassword, serShowPassword] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const dispatch = useAppDispatch()

    const {
        handleSubmit,
        register
    } = useForm<IFormInput>()

    const [notify] = useAlert()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const user = users.find(e => e.login === data.login)
        if (user) {
            if (user.password === data.password) {
                notify(`You are logged in as ${user.login}`, 'success', 3000)
                route.push(`/cabinet/${user.id}`)
                dispatch(setUser(user))
                setErrorPassword('')
            } else setErrorPassword('Wrong password')
            setErrorName('')
        } else setErrorName('User is not found')
    }


    return <div className={s.wrapper}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <input
                    placeholder="Login"
                    className={`${errorName && s.error}`}
                    {...register('login', {
                        required: true
                    })} />
                <span className={`${errorName && s.error}`}>{errorName}</span>
            </label>
            <label>
                <input
                    placeholder="Password"
                    className={`${errorPassword && s.error}`}
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                        required: true
                    })} />
                <span className={`${errorPassword && s.error}`}>{errorPassword}</span>
            </label>
            <label>
                <input
                    type="checkbox"
                    className={s.checkbox}
                    onChange={() => serShowPassword(!showPassword)} />
                <p>Show password</p>
            </label>
            <input type="submit" value="Login" />
        </form>
        <div className={s.link__box}>
            <p>You don't have an account ?</p>
            <Link href={'/register'}>Create account</Link>
        </div>
    </div>
}
