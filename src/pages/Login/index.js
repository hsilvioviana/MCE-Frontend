import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../../parameters"
import { goToForgotPassword, goToHome, goToSignup } from "../../routes/coordinator"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import jwt_decode from "jwt-decode"


export const Login = () => {

    useUnprotectPage()

    const history = useHistory()

    const loginForm = { email: "", password: "" }

    const [form, setForm] = useState(loginForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const login = async () => {

        try {

            const response = await axios.post(`${baseURL}/users/login`, form)

            const role = jwt_decode(response.data.token).role

            if (role === "PERSONAL") {

                window.localStorage.setItem("token", response.data.token)
                window.localStorage.setItem("id", response.data.user.id)
                window.localStorage.setItem("nickname", response.data.user.nickname)
                window.localStorage.setItem("email", response.data.user.email)
    
                goToHome(history)
            }
            else {

                window.alert("Apenas personais podem acessar o site")
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <div>
                <input placeholder="Email" name="email" value={form.email} onChange={onChange}/>
                <input placeholder="Senha" name="password" value={form.password} onChange={onChange} type="password"/>
                <button onClick={login}>Entrar</button>
            </div>

            <button onClick={() => goToSignup(history)}>Cadastro</button>
            <button onClick={() => goToForgotPassword(history)}>Esqueci a Senha</button>
        </div>
    )
}
