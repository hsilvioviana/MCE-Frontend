import { format, subDays } from "date-fns"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { goToLogout, goToProfile } from "../../routes/coordinator"
import { pt } from "date-fns/locale"
import axios from "axios"
import { baseURL } from "../../parameters"


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

            setLoading(true)

            const headers = { headers: { Authorization: token } }

            const dayFormated = `${day.toISOString().substring(0, 11)}00:00:00-03:00`

            const response = await axios.get(`${baseURL}/appointments/${dayFormated}`, headers)

            const newAppointments = []

            for (let i = 0; i < 24; i++) { 

                const item = {

                    hour:  i < 10? "0" + i + ":00" : i + ":00",
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
        catch (error) {

            window.alert(error.response.data.error)
        }
    }

    return (
        <div>

            <h1>Home</h1>

            <button onClick={() => goToLogout(history)}>Logout</button>
            <button onClick={() => goToProfile(history)}>Perfil</button>

            <br/>

            <button onClick={() => setDay(subDays(day, 1))}>{"<=="}</button>
            <h1 style={{ display: "inline" }}><strong> {format(day, "dd 'de' MMMM", {locale: pt})} </strong></h1>
            <button onClick={() => setDay(subDays(day, -1))}>{"==>"}</button>

            {loading && <h3>Carregando...</h3>}

            {!loading && appointments.map(appointment => {

                if (!appointment.content) {

                    return (

                        <div>
                            <p style={{ display: "inline" }}>{appointment.hour} </p>
                            <p style={{ display: "inline" }}>=========</p>
                        </div>
                    )
                }
                else {

                    return (
                    
                        <div>
                            <p style={{ display: "inline" }}>{appointment.hour} </p>
                            <p style={{ display: "inline" }}>{appointment.content.user.nickname}</p>
                        </div>
                    )
                }
            })}
            
        </div>
    )
}
