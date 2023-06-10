import Link from "next/link";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import type { Users, User } from "@/interfaces/data";
import s from './Login.module.scss'

interface IFormInput {
    login: string,
    password: string
}

export const Login: FC<Users> = ({ users }) => {
    const route = useRouter()
    const [showPassword, serShowPassword] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const {
        handleSubmit,
        register
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const user = users.find(e => e.login === data.login)
        if (user) {
            if (user.password === data.password) {
                route.push(`/cabinet/${user.id}`)
                setCookie(user)
                setErrorPassword('')
            } else setErrorPassword('Wrong password')
            setErrorName('')
        } else setErrorName('User is not found')
    }

    const setCookie = (user: User) => {
        const d = new Date()
        d.setTime(d.getTime() + (1 * 24 * 60 * 1000))
        const expires = d.toUTCString()
        document.cookie = `user=${JSON.stringify(user)}; expires=${expires}; path=/`
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
