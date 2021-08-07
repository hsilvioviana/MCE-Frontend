import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../../parameters"
import { goToHome, goToLogin } from "../../routes/coordinator"
import useUnprotectPage from "../../hooks/useUnprotectPage"


export const Signup = () => {

    useUnprotectPage()

    const history = useHistory()

    const signupForm = { nickname: "", email: "", phone: "", password: "", confirmPassword: "", role: "PERSONAL"}

    const [form, setForm] = useState(signupForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const signup = async () => {

        try {

            if (form.password === form.confirmPassword) {

                const response = await axios.post(`${baseURL}/users/signup`, form)

                window.localStorage.setItem("token", response.data.token)
                window.localStorage.setItem("id", response.data.user.id)
                window.localStorage.setItem("nickname", response.data.user.nickname)
                window.localStorage.setItem("email", response.data.user.email)
    
                goToHome(history)
            }
            else {

                window.alert("As senhas devem ser iguais")
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>
            <h1>Signup</h1>

            <div>
                <input placeholder="Apelido" name="nickname" value={form.nickname} onChange={onChange}/>
                <input placeholder="Email" name="email" value={form.email} onChange={onChange} type="email"/>
                <input placeholder="Telefone" name="phone" value={form.phone} onChange={onChange} type="phone"/>
                <input placeholder="Senha" name="password" value={form.password} onChange={onChange} type="password"/>
                <input placeholder="Confirmar Senha" name="confirmPassword" value={form.confirmPassword} onChange={onChange} type="password"/>
                <button onClick={signup}>Cadastrar</button>
            </div>

            <button onClick={() => goToLogin(history)}>Voltar para Login</button>
        </div>
    )
}
