import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { goToLogin, goToResetPassword } from "../../routes/coordinator"
import { baseURL } from "../../parameters"
import { Body, Container, Coordinator } from "./styles"
import Button from "../../components/Button"
import Input from "../../components/Input"


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

            window.localStorage.setItem("resetPasswordEmail", form.email)

            goToResetPassword(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Body>

            <h2><strong>Esqueceu a senha?</strong></h2>

            <p>Insira o e-mail no qual está registrado em sua conta que nós enviaremos um e-mail com o código para a recuperação</p>

            <Input><input placeholder="Email" name="email" value={form.email} onChange={onChange}/></Input>
            <Button onClick={forgotPassword}>Enviar Código</Button>

            <strong onClick={() => goToLogin(history)}><Coordinator>Voltar para Login</Coordinator></strong>

            </Body>
        </Container>
    )
}
