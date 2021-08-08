import React from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { ForgotPassword } from "./pages/ForgotPassword"
import { ResetPassword } from "./pages/ResetPassword"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { Schedule } from "./pages/Schedule"


function App() {
  
  return (
    <BrowserRouter>
    
      <Switch>

        <Route exact path="/login">
          <Login/>
        </Route>

        <Route exact path="/signup">
          <Signup/>
        </Route>

        <Route exact path="/forgot/password">
          <ForgotPassword/>
        </Route>

        <Route exact path="/reset/password">
          <ResetPassword/>
        </Route>

        <Route exact path="/">
          <Home/>
        </Route>

        <Route exact path="/profile">
          <Profile/>
        </Route>

        <Route exact path="/schedule">
          <Schedule/>
        </Route>

        <Route>
          <h1>Error 404 - Página não encontrada </h1>
        </Route>

      </Switch>

    </BrowserRouter>
  )
}

export default App
