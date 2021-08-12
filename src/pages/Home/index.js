import { format, subDays } from "date-fns"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { goToHome, goToLogout, goToProfile, goToSchedule } from "../../routes/coordinator"
import { pt } from "date-fns/locale"
import axios from "axios"
import { baseURL } from "../../parameters"
import { Appointments, Body, Container, SwitchDayContainer, User, Controls, Notifications } from "./styles"
import leftArrow from "../../assets/images/leftArrow.png"
import rightArrow from "../../assets/images/rightArrow.png"
import noPhoto from "../../assets/images/noPhoto.png"


export const Home = () => {

    useProtectPage()

    const history = useHistory()

    const token = window.localStorage.getItem("token")
    const nickname = window.localStorage.getItem("nickname")

    const [day, setDay] = useState(new Date())
    const [appointments, setAppointments] = useState([])
    const [avatar, setAvatar] = useState(window.localStorage.getItem("avatar"))
    const [notifications, setNotifications] = useState([])
    const [showNotification, setShowNotification] = useState(false)

    useEffect( async () => {

        await getAppointments()
        await getNotifications()
    }, [day])

    const getAppointments = async () => {

        try {

            if (token) {

                const headers = { headers: { Authorization: token } }

                const dayFormated = `${day.toISOString().substring(0, 11)}00:00:00-03:00`

                const response = await axios.get(`${baseURL}/appointments/${dayFormated}`, headers)

                const newAppointments = []

                for (let i = 0; i < 24; i++) { 

                    const item = {

                        hour:  i < 10? "0" + i + "h" : i + "h",
                        content: undefined
                    }

                    newAppointments.push(item)
                }

                for (let item of response.data.appointments) {

                    const index = (new Date(item.date)).getHours()

                    newAppointments[index].content = item
                }

                setAppointments(newAppointments)
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    const cancelAppointment = async (id) => {

        try {

            if (window.confirm("Você tem certeza que quer cancelar essa aula?")) {

                const headers = { headers: { Authorization: token } }

                const response = await axios.delete(`${baseURL}/appointments/cancel/${id}`, headers)
    
                window.alert(response.data.message)

                await getAppointments()
            }
        }
        catch (error) {

            window.alert(error.response.data.error)
        }
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

    const setNoPhoto = () => {

        setAvatar(noPhoto)
    }

    return (
        <Container>

            <Controls>
                <h2 onClick={() => setShowNotification(!showNotification)}>{notifications.length}</h2>
                <img src={avatar} onError={setNoPhoto}/>
                <h3><strong>{nickname}</strong></h3>
                <p onClick={() => goToHome(history)}>Agendamentos</p>
                <p onClick={() => goToProfile(history)}>Meu Perfil</p>
                <p onClick={() => goToSchedule(history)}>Horários</p>
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

                <SwitchDayContainer>
                    <img onClick={() => setDay(subDays(day, 1))} src={leftArrow}/>
                    <h3><strong>{format(day, "dd 'de' MMMM", {locale: pt})}</strong></h3>
                    <img onClick={() => setDay(subDays(day, -1))} src={rightArrow}/>
                </SwitchDayContainer>

                <Appointments>
                    {appointments.map(appointment => {

                        if (!appointment.content) {

                            return (

                                <div>
                                    <section>
                                    <p>{appointment.hour}</p>
                                    </section>
                                    <h3>O</h3>
                                </div>
                            )
                        }
                        else {

                            return (
                            
                                <div>
                                    <section>
                                    <p>{appointment.hour}</p>
                                    </section>
                                    <h3>O</h3>
                                    <User>
                                        <img src={appointment.content.user.avatar}/>
                                        <div>
                                            <h3><strong>{appointment.content.user.nickname}</strong></h3>
                                            <h4>{appointment.content.user.phone}</h4>
                                        </div>
                                        {appointment.content.cancelable && <h5 onClick={() => cancelAppointment(appointment.content.id)}><strong>X</strong></h5>}
                                    </User>
                                </div>
                            )
                        }
                    })}
                </Appointments>

            </Body>
        </Container>
    )
}
