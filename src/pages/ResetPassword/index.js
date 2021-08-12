import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { baseURL } from "../../parameters"
import { goToHome, goToLogin, goToForgotPassword } from "../../routes/coordinator"
import { Body, Container, Coordinator } from "./styles"
import Button from "../../components/Button"
import Input from "../../components/Input"
import jwt_decode from "jwt-decode"


export const ResetPassword = () => {

    useUnprotectPage()

    const email = localStorage.getItem("resetPasswordEmail")

    const history = useHistory()

    const resetForm = { email, code: "", newPassword: "" }

    const [form, setForm] = useState(resetForm)

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    const resetPassword = async () => {

        try {

            const response = await axios.post(`${baseURL}/users/password/reset`, form)

            const role = jwt_decode(response.data.token).role

            if (role === "PERSONAL") {

                window.localStorage.setItem("token", response.data.token)
                window.localStorage.setItem("id", response.data.user.id)
                window.localStorage.setItem("nickname", response.data.user.nickname)
                window.localStorage.setItem("email", response.data.user.email)
                window.localStorage.setItem("avatar", response.data.user.avatar)

                window.localStorage.removeItem("resetPasswordEmail")

                goToHome(history)
            }
            else {

                window.alert("Apenas personais podem acessar o site")

                goToLogin(history)
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>

                <h2><strong>Criar nova senha</strong></h2>

                <p>Digite o código enviado à {email} e sua nova senha</p>

                <Input><input placeholder="Código" name="code" value={form.code} onChange={onChange}/></Input>
                <Input><input placeholder="Nova Senha" name="newPassword" value={form.newPassword} onChange={onChange} type="password"/></Input>

                <Button onClick={resetPassword}>Redefinir Senha</Button>

                <strong onClick={() => goToLogin(history)}><Coordinator>Voltar para Login</Coordinator></strong>

                {!email && goToForgotPassword(history)}
            </Body>
        </Container>
    )
}
