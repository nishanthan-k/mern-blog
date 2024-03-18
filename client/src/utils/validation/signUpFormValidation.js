import * as Yup from "yup";
import { confirmPasswordSchema, emailSchema, passwordSchema, userNameSchema } from "./globalSchema";

export const signUpFormValidation = async (values) => {
  try {
    const schema = Yup.object().shape({
      username: userNameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema('password'),
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
