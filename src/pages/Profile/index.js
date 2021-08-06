import React from "react"
import useProtectPage from "../../hooks/useProtectPage"


export const Profile = () => {

    useProtectPage()

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}
