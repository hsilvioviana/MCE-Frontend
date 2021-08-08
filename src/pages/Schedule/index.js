import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import useProtectPage from "../../hooks/useProtectPage"
import { baseURL } from "../../parameters"
import { goToHome } from "../../routes/coordinator"


export const Schedule = () => {

    useProtectPage()

    const history = useHistory()

    const token = window.localStorage.getItem("token")

    const scheduleForm = { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] }

    const [form, setForm] = useState(scheduleForm)
    const [checkBoxs, setCheckBoxs] = useState([])
    const [alreadyChecked, setAlreadyChecked] = useState([])
    const [loading, setLoading] = useState(true)

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

    return (
        <div>
            <h1>Schedule</h1>

            <button onClick={() => goToHome(history)}>Home</button>

            <button onClick={setSchedule}>Editar Cronograma</button>

            {loading && <h3>Carregando...</h3>}

            {!loading && checkBoxs.map(week => {

                return (
                    <div>
                    <h1>{week[0].split("|")[0]}</h1>
                    {week.map(hour => {

                        return (
                            <div>
                                <label for={hour}>{`${hour.split("|")[1]}:00`}</label>
                                <input type="checkbox" defaultChecked={alreadyChecked.includes(hour)} id={hour} onClick={() => alterSchedule(hour)} value="true"/>
                            </div>
                        )
                    })}
                    </div>

                )
            })}
        </div>
    )
}
