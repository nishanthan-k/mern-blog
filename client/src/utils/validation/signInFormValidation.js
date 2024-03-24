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
    const errors = {};
    if (error.inner) {
      error.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
    } else {
      // Handle other types of errors
      console.error(error); // Log the error for debugging
    }
    return errors;
  }
};