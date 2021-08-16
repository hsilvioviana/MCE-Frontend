import * as yup from "yup"


export const passwordResetSchema = yup.object({

    email: yup.string()
    .email("O email deve estar em um formato válido")
    .min(3, "O email deve ter no mínimo 3 caracteres")
    .max(64, "O email deve ter no máximo 64 caracteres")
    .required("O email é obrigatório"),
    code: yup.string()
    .length(8, "O código deve ter 8 caracteres")
    .required("O código é obrigatório"),
    newPassword: yup.string()
    .min(6, "A nova senha deve ter no mínimo 6 caracteres")
    .max(64, "A nova senha deve ter no máximo 64 caracteres")
    .required("A nova senha é obrigatória")
})
