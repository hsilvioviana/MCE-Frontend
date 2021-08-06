import { useEffect } from "react"
import { useHistory } from "react-router"
import { goToLogout } from "../routes/coordinator"


const useProtectPage = () => {

    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem("token")
        const id = localStorage.getItem("id")
        const nickname = localStorage.getItem("nickname")
        const email = localStorage.getItem("email")

        if (!token || !id || !nickname || !email) {

            goToLogout(history)
        }
    }, [history])
}

export default useProtectPage
