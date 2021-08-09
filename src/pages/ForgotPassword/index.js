import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import { goToLogin, goToResetPassword } from "../../routes/coordinator"
import { baseURL } from "../../parameters"
import { Body, Container, Coordinator } from "./styles"
import { Image } from "../../components/Image/styles"
import logo from "../../assets/images/logo.png"
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

            <Image src={logo}/>

            <h2>Por favor, digite seu email para que possamos enviar um código para redefinir sua senha.</h2>

            <Input><input placeholder="Email" name="email" value={form.email} onChange={onChange}/></Input>
            <Button onClick={forgotPassword}>Enviar Código</Button>

            <strong onClick={() => goToLogin(history)}><Coordinator>Voltar para Login</Coordinator></strong>

            </Body>
        </Container>
    )
}
