import { FC, useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { UsersService } from "@/services/user.service";
import { CreateUserUtils } from "@/utilities/create.user.utils";
import { ToastContainer, toast } from "react-toastify";
import s from './Register.module.scss'
import 'react-toastify/dist/ReactToastify.css';

export interface IFormInput {
    login: string,
    password: string,
    reapetPassword: string
}

interface IProps {
    numbers: string[]
}

export const Register: FC<IProps> = ({ numbers }) => {
    const [errorLogin, setErrorLogin] = useState('')
    const route = useRouter()

    const {
        register,
        formState: { errors },
        getValues,
        handleSubmit
    } = useForm<IFormInput>({
        mode: 'onBlur'
    })

    const notifyError = () => toast.error('Failed to create an account.', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await UsersService.handleUserLogin(data.login).then(res => {
            if (!res) {
                UsersService.addNewUser(CreateUserUtils.createUser(data, numbers))
                    .then(res => res && route.push('/login'))
                    .catch(() => notifyError())
            } else setErrorLogin('This name is already taken')
        })
    }

    const [shovePassword, setShovePassword] = useState<boolean>(false)

    const validateReapetPassword = (value: string) => {
        const { password } = getValues()
        return password === value || 'Password mismatch'
    }

    return <div className={s.wrapper}>
        <ToastContainer />
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
            <input type="submit" value={'Create account'} />
        </form>
    </div>
}