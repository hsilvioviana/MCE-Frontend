import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { goToLogin, goToResetPassword } from "../../routes/coordinator"
import { baseURL } from "../../parameters"


export const ForgotPassword = () => {

    useUnprotectPage()

    const history = useHistory()

    const forgotForm = { email: "" }

    const [form, setForm] = useState(forgotForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const forgotPassword = async () => {

        try {

            await axios.post(`${baseURL}/users/password/forgot`, form)

            goToResetPassword(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>ForgotPassword</h1>

            <div>
                <input placeholder="Email" name="email" value={form.email} onChange={onChange}/>
                <button onClick={forgotPassword}>Enviar Código</button>
            </div>

            <button onClick={() => goToLogin(history)}>Voltar para Login</button>
        </div>
    )
}
