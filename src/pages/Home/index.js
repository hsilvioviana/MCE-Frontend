import React from "react"
import useProtectPage from "../../hooks/useProtectPage"


export const Home = () => {

    useProtectPage()

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
