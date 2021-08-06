import React from "react"
import useUnprotectPage from "../../hooks/useUnprotectPage"


export const ForgotPassword = () => {

    useUnprotectPage()

    return (
        <div>
            <h1>ForgotPassword</h1>
        </div>
    )
}
