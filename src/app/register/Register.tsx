'use client'

import { FC, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { useForm, SubmitHandler } from "react-hook-form";

import { UsersService } from "@/services/user.service";
import { CreateUserUtils } from "@/utils/create.user.utils";
import { Loader } from "@/ui/loader";

import s from './Register.module.scss'

export interface IFormInput {
    login: string,
    password: string,
    reapetPassword: string
}

interface IProps { numbers: string[] }

export const Register: FC<IProps> = ({ numbers }) => {
    const [errorLogin, setErrorLogin] = useState<string>('')
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
    const route = useRouter()

    const {
        register,
        formState: { errors },
        getValues,
        handleSubmit
    } = useForm<IFormInput>({
        mode: 'onBlur'
    })

    const [notify] = useAlert()

    const handleRegister = useMutation('handleRegister',
        (data: IFormInput) => UsersService.addNewUser(CreateUserUtils.createUser(data, numbers)),
        {
            onSuccess: () => {
                notify('Account created successfully', 'success', 3000, false)
                route.push('/login')
                setBtnDisabled(false)
            },
            onError: () => {
                notify('Failed to create an account', 'error', 3000, false)
            }
        }
    )

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await UsersService.handleUserLogin(data.login).then(res => {
            if (!res) {
                setBtnDisabled(true)
                handleRegister.mutateAsync(data)
            } else setErrorLogin('This name is already taken')
        })
    }

    const [shovePassword, setShovePassword] = useState<boolean>(false)

    const validateReapetPassword = (value: string) => {
        const { password } = getValues()
        return password === value || 'Password mismatch'
    }

    return <div className={s.wrapper}>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <input
                    {...register('login', {
                        required: true,
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Login entered incorrectly'
                        }
                    })}
                    className={`${errors.login || errorLogin && s.error}`}
                    placeholder="Login" />
                <span className={`${errors.login || errorLogin && s.error}`}>{errors?.login?.message || errorLogin}</span>
            </label>
            <label>
                <input
                    {...register('password', {
                        required: true,
                        minLength: {
                            value: 8,
                            message: 'Password must contain at least 8 characters'
                        },
                        pattern: {
                            value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])/g,
                            message: 'The password must contain at least one special character and one number'
                        }
                    })}
                    className={`${errors.password && s.error}`}
                    placeholder="Password"
                    type={shovePassword ? 'text' : 'password'} />
                <span className={`${errors.password && s.error}`}>{errors?.password?.message}</span>
            </label>
            <label>
                <input
                    {...register('reapetPassword', {
                        required: true,
                        validate: validateReapetPassword
                    })}
                    className={`${errors.reapetPassword && s.error}`}
                    placeholder="Reapet password"
                    type={shovePassword ? 'text' : 'password'} />
                <span className={`${errors.reapetPassword && s.error}`}>{errors?.reapetPassword?.message}</span>
            </label>
            <label>
                <input type="checkbox" onChange={() => setShovePassword(!shovePassword)} />
                <p>Show password</p>
            </label>
            {!handleRegister.isLoading ? (
                <input type="submit" value={'Create account'} disabled={btnDisabled} />
            ) : (
                <Loader width='30px' hieght='30px' />
            )}
        </form>
    </div>
}