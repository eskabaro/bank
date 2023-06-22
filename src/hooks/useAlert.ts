import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

type TAlert = "success" | "error"

export const useAlert = (): [(message: string, type: TAlert, time: number, hideProgres?: boolean) => void] => {
    const notify = (message: string, type: "success" | "error", time: number, hideProgres?: boolean) => {
        toast[type](message, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: hideProgres ? false : true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    return [notify]
}