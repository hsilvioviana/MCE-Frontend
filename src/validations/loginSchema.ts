import * as yup from "yup"


export const loginSchema = yup.object({

    email: yup.string()
    .email("O email deve estar em um formato válido")
    .min(3, "O email deve ter no mínimo 3 caracteres")
    .max(64, "O email deve ter no máximo 64 caracteres")
    .required("O email é obrigatório"),
    password: yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(64, "A senha deve ter no máximo 64 caracteres")
    .required("A senha é obrigatória")
})
