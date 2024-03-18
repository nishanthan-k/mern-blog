import * as Yup from "yup";

export const userNameSchema = Yup.string().required("Username is required");

export const emailSchema = Yup.string().email("Invalid Email Format").required(
  "Email is required"
);

const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}$/;
export const passwordSchema = Yup.string()
  .required("Password is required")
  .min(5, "Password should have 5 characters minimum")
  .max(10, "Password should have 10 characters maximum")
  .matches(/.*\d/, "Password should have at least one digit")
  .matches(/.*[a-z]/, "Password should have at least one lowercase character")
  .matches(/.*[A-Z]/, "Password should have atleast one uppercase character");

export const confirmPasswordSchema = (passwordField) => Yup.string()
  .required("Confirm Password is required")
  .oneOf(
    [Yup.ref(passwordField), null],
    "Password must match with Confirm password"
  );