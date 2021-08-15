import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { Body, Container,  Controls, Notifications, DayOffContainer } from "./styles"
import { goToDayOff, goToHome, goToLogout, goToProfile, goToSchedule } from "../../routes/coordinator"
import Button from "../../components/Button"
import { pt } from "date-fns/locale"
import { format } from "date-fns"
import axios from "axios"
import { baseURL } from "../../parameters"
import noPhoto from "../../assets/images/noPhoto.png"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
registerLocale("pt", pt)


export const DayOff = () => {

    useProtectPage()

    const history = useHistory()

    const token = window.localStorage.getItem("token")
    const nickname = window.localStorage.getItem("nickname")

    const [avatar, setAvatar] = useState(window.localStorage.getItem("avatar"))
    const [notifications, setNotifications] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [daysOff, setDaysOffList] = useState([])

    useEffect( async () => {

        await getNotifications()
        await daysOffList()
    }, [])

    const onChange = (dates) => {

        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
      };

    const setNoPhoto = () => {

        setAvatar(noPhoto)
    }

    const getNotifications = async () => {

        try {

            const headers = { headers: { Authorization: token } }

            const response = await axios.get(`${baseURL}/notifications`, headers)

            setNotifications(response.data.notifications)
        }
        catch (error) {
            
            window.alert(error.response.data.error)
        }
    }

    const readNotification = async (id) => {

        try {

            const headers = { headers: { Authorization: token } }

            await axios.post(`${baseURL}/notifications/read/${id}`, "", headers)

            await getNotifications()
        }
        catch (error) {
            
            window.alert(error.response.data.error)
        }
    }

    const daysOffList = async () => {

        try {

            const headers = { headers: { Authorization: token } }

            const response = await axios.get(`${baseURL}/appointments/off`, headers)

            setDaysOffList(response.data.daysOff)
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    const setDaysOff = async () => {

        try {

            if (endDate) {

                const headers = { headers: { Authorization: token } }

                const body = {
    
                    firstDayOff: `${startDate.toISOString().substring(0, 11)}00:00:00-03:00`,
                    lastDayOff: `${endDate.toISOString().substring(0, 11)}00:00:00-03:00`
                }
    
                const response = await axios.post(`${baseURL}/appointments/off`, body, headers)

                window.alert(response.data.message)

                await daysOffList()
            }
            else {

                window.alert("Você deve escolher o último dia de folga")
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    const cancelDayOff = async (id) => {

        try {

            if (window.confirm("Você tem certeza que quer cancelar essa folga?")) {

                const headers = { headers: { Authorization: token } }

                await axios.delete(`${baseURL}/appointments/off/${id}`, headers)
    
                await daysOffList()
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <Container>

            <Controls>
                <img src={avatar} onError={setNoPhoto}/>
                <h2 onClick={() => setShowNotification(!showNotification)}>{notifications.length}</h2>
                <h3><strong>{nickname}</strong></h3>
                <p onClick={() => goToHome(history)}>Agendamentos</p>
                <p onClick={() => goToProfile(history)}>Meu Perfil</p>
                <p onClick={() => goToSchedule(history)}>Horários</p>
                <p onClick={() => goToDayOff(history)}>Folgas</p>
                <p onClick={() => goToLogout(history)}>Logout</p>
            </Controls>

            {showNotification && notifications.length > 0 && <Notifications>
                {notifications.map((notification, index)=> {

                    if (index < 5) {
                        return (
                            <div>

                                <p onClick={() => readNotification(notification.id)}>{notification.content}</p>
                            </div>
                        )
                    }
                })}
            </Notifications>}

            <Body>

            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                locale="pt"
            />

            <h3>{format(startDate, "dd/MM/yyyy")} - {endDate && format(endDate, "dd/MM/yyyy")}</h3>

            <Button onClick={setDaysOff}>Adicionar Folga</Button>

            <h2>Folgas Atuais</h2>

            <div>

                {daysOff.map(dayOff => {

                    return (
                        <DayOffContainer>
                            <p>{format(new Date(dayOff.start), "dd/MM/yyyy")} - {format(new Date(dayOff.end), "dd/MM/yyyy")}</p>
                            <h5 onClick={() => cancelDayOff(dayOff.id)}><strong>X</strong></h5>
                        </DayOffContainer>
                    )
                })}
            </div>

            </Body>
        </Container>
    )
}
