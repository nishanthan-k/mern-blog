import * as Yup from "yup";
import { emailSchema, passwordSchema } from "./globalSchema";

export const signInFormValidation = async (values) => {
  try {
    const schema = Yup.object().shape({
      email: emailSchema,
      password: passwordSchema,
    });

    await schema.validate(values, { abortEarly: false });
    return {};
  } catch (error) {
    // console.log(error)
  }
};
