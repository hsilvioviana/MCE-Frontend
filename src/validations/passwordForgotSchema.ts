import * as yup from "yup"


export const passwordForgotSchema = yup.object({

    email: yup.string()
    .email("O email deve estar em um formato válido")
    .min(3, "O email deve ter no mínimo 3 caracteres")
    .max(64, "O email deve ter no máximo 64 caracteres")
    .required("O email é obrigatório")
})
