import React from "react"
import { useHistory } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { goToLogout, goToProfile } from "../../routes/coordinator"


export const Home = () => {

    useProtectPage()

    const history = useHistory()

    return (
        <div>

            <h1>Home</h1>

            <button onClick={() => goToLogout(history)}>Logout</button>
            <button onClick={() => goToProfile(history)}>Perfil</button>
            
        </div>
    )
}
