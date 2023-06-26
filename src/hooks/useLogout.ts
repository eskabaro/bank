import { useRouter } from "next/navigation"

type LogoutHook = {
    logout: () => void;
};

export const useLogout = (): LogoutHook => {
    const router = useRouter();

    const logout = (): void => {
        const cookie = document.cookie
        const d = new Date()
        d.setTime(d.getTime() - (1 * 24 * 60 * 1000))
        const expires = d.toUTCString()
        document.cookie = `${cookie}; expires=${expires}; path=/`
        router.push('/login')
    }

    return { logout };
};