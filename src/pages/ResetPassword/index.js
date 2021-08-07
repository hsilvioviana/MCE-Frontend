import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseURL } from "../../parameters"
import { goToHome, goToLogin, goToForgotPassword } from "../../routes/coordinator"


export const ResetPassword = () => {

    useUnprotectPage()

    const email = localStorage.getItem("resetPasswordEmail")

    if (!email) { goToForgotPassword(history) }

    const history = useHistory()

    const loginForm = { email, code: "", newPassword: "" }

    const [form, setForm] = useState(loginForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const resetPassword = async () => {

        try {

            const response = await axios.post(`${baseURL}/users/password/reset`, form)

            window.localStorage.setItem("token", response.data.token)
            window.localStorage.setItem("id", response.data.user.id)
            window.localStorage.setItem("nickname", response.data.user.nickname)
            window.localStorage.setItem("email", response.data.user.email)

            window.localStorage.removeItem("resetPasswordEmail")

            goToHome(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>

            <h1>ResetPassword</h1>
            <h2>Digite o código enviado para {email} e sua nova senha</h2>

            <div>
                <input placeholder="Código" name="code" value={form.code} onChange={onChange}/>
                <input placeholder="Nova Senha" name="newPassword" value={form.newPassword} onChange={onChange}/>
                <button onClick={resetPassword}>Resetar Senha</button>
            </div>

            <button onClick={() => goToLogin(history)}>Voltar para Login</button>

        </div>
    )
}
