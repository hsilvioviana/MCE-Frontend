export const goToLogin = (history) => {

    history.push("/login")
}

export const goToSignup = (history) => {

    history.push("/signup")
}

export const goToForgotPassword = (history) => {

    history.push("/forgot/password")
}

export const goToResetPassword = (history) => {

    history.push("/reset/password")
}

export const goToHome = (history) => {

    history.push("/")
}

export const goToProfile = (history) => {

    history.push("/profile")
}

export const goToSchedule = (history) => {

    history.push("/schedule")
}

export const goToLogout = (history) => {

    localStorage.clear()
    history.push("/login")
}

export const goBack = (history) => {

    history.goBack()
}
