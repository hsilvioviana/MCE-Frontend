import { useEffect } from "react"
import { useHistory } from "react-router"
import { goToHome } from "../routes/coordinator"


const useUnprotectPage = () => {

    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem("token")
        const id = localStorage.getItem("id")
        const nickname = localStorage.getItem("nickname")
        const email = localStorage.getItem("email")

        if (token && id && nickname && email) {

            goToHome(history)
        }
    }, [history])
}

export default useUnprotectPage
