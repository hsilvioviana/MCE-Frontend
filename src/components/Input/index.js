import React from "react"
import { InputContainer } from "./styles"


const Input = ({ children, ...rest }) => {

    return (
        <InputContainer {...rest}>
            {children}
        </InputContainer>
    )
}

export default Input
