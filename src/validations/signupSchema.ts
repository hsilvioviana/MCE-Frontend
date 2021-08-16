import * as yup from "yup"


export const signupSchema = yup.object({

    nickname: yup.string()
    .min(3, "O apelido deve ter no mínimo 3 caracteres")
    .max(64, "O apelido deve ter no máximo 64 caracteres")
    .required("O apelido é obrigatório"),
    email: yup.string()
    .email("O email deve estar em um formato válido")
    .min(3, "O email deve ter no mínimo 3 caracteres")
    .max(64, "O email deve ter no máximo 64 caracteres")
    .required("O email é obrigatório"),
    phone: yup.string()
    .min(8, "O telefone deve ter no mínimo 8 caracteres")
    .max(16, "O telefone deve ter no máximo 16 caracteres")
    .required("O telefone é obrigatório"),
    password: yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(64, "A senha deve ter no máximo 64 caracteres")
    .required("A senha é obrigatória")
})
