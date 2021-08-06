import React from "react"
import useUnprotectPage from "../../hooks/useUnprotectPage"


export const ResetPassword = () => {

    useUnprotectPage()

    return (
        <div>
            <h1>ResetPassword</h1>
        </div>
    )
}
