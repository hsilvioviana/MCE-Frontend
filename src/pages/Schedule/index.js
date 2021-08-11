import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { baseURL } from "../../parameters"
import { goToHome, goToLogout, goToProfile, goToSchedule } from "../../routes/coordinator"
import { Body, Container, Week, Controls } from "./styles"
import Button from "../../components/Button"
import loadingGif from "../../assets/images/loading.gif"
import noPhoto from "../../assets/images/noPhoto.png"


export const Schedule = () => {

    useProtectPage()

    const history = useHistory()

    const token = window.localStorage.getItem("token")
    const nickname = window.localStorage.getItem("nickname")

    const scheduleForm = { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] }

    const [form, setForm] = useState(scheduleForm)
    const [checkBoxs, setCheckBoxs] = useState([])
    const [alreadyChecked, setAlreadyChecked] = useState([])
    const [loading, setLoading] = useState(true)
    const [avatar, setAvatar] = useState(window.localStorage.getItem("avatar"))

    const weeks = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    useEffect( async () => {

        configureCheckBoxs()
        await getActualSchedule()
    }, [])

    const configureCheckBoxs = () => {

        const boxs = []

        for (let week of weeks) {

        const day = []

        for (let i = 0; i < 24; i++) {

            const number = i < 10 ? "0" + String(i) : i

            day.push(week + "|" + number)
        }

        boxs.push(day)
        }

        setCheckBoxs(boxs)
    }

    const alterSchedule = (hour) => {

        const week = hour.split("|")[0]

        const time = Number(hour.split("|")[1])

        const newForm = {...form}

        let key = ""
  
        if (week === "Domingo") { key = "sunday" }
        else if (week === "Segunda") { key = "monday" }
        else if (week === "Terça") { key = "tuesday" }
        else if (week === "Quarta") { key = "wednesday" }
        else if (week === "Quinta") { key = "thursday" }
        else if (week === "Sexta") { key = "friday" }
        else if (week === "Sábado") { key = "saturday" }

        const index = newForm[key].indexOf(time)

        if (index > -1) {
            
            newForm[key].splice(index, 1);
        }  
        else {

            newForm[key].push(time)
        }

        setForm(newForm)
    }

    const setSchedule = async () => {

        try {

            const headers = { headers: { Authorization: token } }

            await axios.put(`${baseURL}/appointments/schedule/change`, form, headers)

            window.alert("Cronograma editado com sucesso")

            goToHome(history)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    const getActualSchedule = async () => {

        try {

            const providerId = localStorage.getItem("id")

            const response = await axios.get(`${baseURL}/appointments/schedule/${providerId}`)

            const schedule = response.data.schedule

            const checked = []

            for (let week of weeks) {

                let key

                if (week === "Domingo") { key = "sunday" }
                else if (week === "Segunda") { key = "monday" }
                else if (week === "Terça") { key = "tuesday" }
                else if (week === "Quarta") { key = "wednesday" }
                else if (week === "Quinta") { key = "thursday" }
                else if (week === "Sexta") { key = "friday" }
                else if (week === "Sábado") { key = "saturday" }

                if (schedule[key].length === 0) {

                    continue
                }

                for (let item of schedule[key].split(" ")) {

                    const hour = week + "|" + (item < 10 ? "0" + item : item)

                    alterSchedule(hour)

                    checked.push(hour)
                }
            }

            setAlreadyChecked(checked)

            setLoading(false)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
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

            {loading && <img src={loadingGif}/>}

                {!loading && checkBoxs.map(week => {

                    return (
                        <Week>
                        <h1><strong>{week[0].split("|")[0]}</strong></h1>
                        {week.map(hour => {

                            return (
                                <div>
                                    <input type="checkbox" defaultChecked={alreadyChecked.includes(hour)} id={hour} onClick={() => alterSchedule(hour)} value="true"/>
                                    <label for={hour}>{`${hour.split("|")[1]}h`}</label>
                                </div>
                            )
                        })}
                        </Week>

                    )
                })}

                <Button onClick={setSchedule}>Editar Cronograma</Button>

            </Body>
        </Container>
    )
}
