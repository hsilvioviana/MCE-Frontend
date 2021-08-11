import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../../parameters"
import { goToForgotPassword, goToHome, goToSignup } from "../../routes/coordinator"
import useUnprotectPage from "../../hooks/useUnprotectPage"
import jwt_decode from "jwt-decode"
import { Body, Container, Coordinator, ForgotPassword } from "./styles"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { Image } from "../../components/Image/styles"
import logo from "../../assets/images/logo.png"


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
                window.localStorage.setItem("avatar", response.data.user.avatar)
    
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
        <Container>
            <Body>

                <Image src={logo}/>

                <Input><input placeholder="Email" name="email" value={form.email} onChange={onChange}/></Input>
                <Input><input placeholder="Senha" name="password" value={form.password} onChange={onChange} type="password"/></Input>
                
                <ForgotPassword><p onClick={() => goToForgotPassword(history)}>Esqueci minha Senha</p></ForgotPassword>
                
                <Button onClick={login}>Login</Button>

                <p>Não tem conta? <strong onClick={() => goToSignup(history)}><Coordinator>Registrar</Coordinator></strong></p>

            </Body>
        </Container>
    )
}
