import { format, subDays } from "date-fns"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { goToLogin, goToLogout, goToProfile, goToSchedule } from "../../routes/coordinator"
import { pt } from "date-fns/locale"
import axios from "axios"
import { baseURL } from "../../parameters"
import { Appointments, Body, Container, SwitchDayContainer, User } from "./styles"
import Button from "../../components/Button"
import leftArrow from "../../assets/images/leftArrow.png"
import rightArrow from "../../assets/images/rightArrow.png"
import loadingGif from "../../assets/images/loading.gif"


export const Home = () => {

    useProtectPage()

    const history = useHistory()

    const token = window.localStorage.getItem("token")

    const [day, setDay] = useState(new Date())
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( async () => {

        await getAppointments()
    }, [day])

    const getAppointments = async () => {

        try {

            if (token) {

                setLoading(true)

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

                setLoading(false)
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

    return (
        <Container>

            <button onClick={() => goToLogout(history)}>Logout</button>
            <button onClick={() => goToProfile(history)}>Perfil</button>
            <button onClick={() => goToSchedule(history)}>Cronograma</button>

            <Body>

                <SwitchDayContainer>
                    <img onClick={() => setDay(subDays(day, 1))} src={leftArrow}/>
                    <h3><strong>{format(day, "dd 'de' MMMM", {locale: pt})}</strong></h3>
                    <img onClick={() => setDay(subDays(day, -1))} src={rightArrow}/>
                </SwitchDayContainer>

                {loading && <img src={loadingGif}/>}

                <Appointments>
                    {!loading && appointments.map(appointment => {

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
                                    <User>{appointment.content.user.nickname} </User>
                                    {appointment.content.cancelable && <h5 onClick={() => cancelAppointment(appointment.content.id)}><strong>X</strong></h5>}
                                </div>
                            )
                        }
                    })}
                </Appointments>

            </Body>
        </Container>
    )
}
