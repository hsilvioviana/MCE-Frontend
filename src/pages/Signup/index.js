import React from "react"
import useUnprotectPage from "../../hooks/useUnprotectPage"


export const Signup = () => {

    useUnprotectPage()

    return (
        <div>
            <h1>Signup</h1>
        </div>
    )
}
