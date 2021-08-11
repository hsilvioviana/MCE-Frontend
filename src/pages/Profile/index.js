import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../../parameters"
import { goToHome, goToLogout, goToProfile, goToSchedule } from "../../routes/coordinator"
import useProtectPage from "../../hooks/useProtectPage"
import editPhoto from "../../assets/images/editPhoto.png"
import { Body, Container, UserPhoto, EditPhoto, Controls } from "./styles"
import Button from "../../components/Button"
import Input from "../../components/Input"
import noPhoto from "../../assets/images/noPhoto.png"


export const Profile = () => {

    useProtectPage()

    const history = useHistory()

    const token = window.localStorage.getItem("token")
    const nickname = window.localStorage.getItem("nickname")

    const profileForm = { nickname: "", email: "", phone: "", password: "", newPassword: ""}

    const [form, setForm] = useState(profileForm)
    const [avatar, setAvatar] = useState(window.localStorage.getItem("avatar"))
    let [fileInput] = useState()

    const onChange = (event) => {

        const {name, value} = event.target
        setForm({...form, [name]: value})
    }

    useEffect( async () => {

        await getProfileDetails()
    }, [])

    const profile = async () => {

        try {

            const body = form

            const headers = { headers: { Authorization: token } }

            if (!form.password) {

                delete body.password
                delete body.newPassword
            }

            const response = await axios.put(`${baseURL}/users/profile/edit`, body, headers)

            window.localStorage.setItem("token", response.data.token)
            window.localStorage.setItem("id", response.data.user.id)
            window.localStorage.setItem("nickname", response.data.user.nickname)
            window.localStorage.setItem("email", response.data.user.email)
            window.localStorage.setItem("avatar", response.data.user.avatar)

            window.alert("Perfil editado com sucesso")
        }
        catch (error) {

            window.alert(error.response.data.error)
        }

        setForm({...form,
            password: "",
            newPassword: ""
        })
    }

    const getProfileDetails = async () => {

        try {

            const headers = { headers: { Authorization: token } }

            const response = await axios.get(`${baseURL}/users/profile`, headers)

            setForm({...form,
                nickname: response.data.profile.nickname,
                email: response.data.profile.email,
                phone: response.data.profile.phone
            })

            setAvatar(response.data.profile.avatar)
            window.localStorage.setItem("avatar", response.data.profile.avatar)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    const fileUpload = async (event) => {

        try {

            const file = new FormData()

            file.append("image", event.target.files[0])

            const headers = { headers: { Authorization: token } }

            await axios.put(`${baseURL}/files/photo/upload`, file, headers)

            await getProfileDetails()
        }
        catch (error) {

            window.alert(error.response.data.error)
        }

        await getProfileDetails()
    }

    const setNoPhoto = () => {

        setAvatar(noPhoto)
    }
    
    return (
        <Container>

            <Controls>
                <img src={avatar} onError={setNoPhoto}/>
                <h3><strong>{nickname}</strong></h3>
                <p onClick={() => goToHome(history)}>Agendamentos</p>
                <p onClick={() => goToProfile(history)}>Meu Perfil</p>
                <p onClick={() => goToSchedule(history)}>Horários</p>
                <p onClick={() => goToLogout(history)}>Logout</p>
            </Controls>

            <Body>

            <div>
                <UserPhoto src={avatar} onError={setNoPhoto}/>
                <input id='imgupload' style={{display: "none"}} onChange={fileUpload} type="file" ref={x => fileInput = x}/>
                <EditPhoto style={{width: "30px"}} src={editPhoto} onClick={() => fileInput.click()}/>
            </div>
            
                <Input><input placeholder="Apelido" name="nickname" value={form.nickname} onChange={onChange}/></Input>
                <Input><input placeholder="Email" name="email" value={form.email} onChange={onChange} type="email"/></Input>
                <Input><input placeholder="Telefone" name="phone" value={form.phone} onChange={onChange} type="phone"/></Input>
                <Input><input placeholder="Senha Antiga" name="password" value={form.password} onChange={onChange} type="password"/></Input>
                <Input><input placeholder="Nova Senha" name="newPassword" value={form.newPassword} onChange={onChange} type="password"/></Input>
                <Button onClick={profile}>Salvar Alterações</Button>

            </Body>
        </Container>
    )
}
