import axios from "axios";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import CustomInput from "../utils/form/CustomInput";
import { signUpFormValidation } from "../utils/validation/signUpFormValidation";
import Toast from "../utils/toast/Toast";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values) => {
    await signUpFormValidation(values);

    try {
      const res = await axios.post("/api/auth/signup", values, {
        headers: {
          "content-type": "application/json",
        },
      });
    } catch (error) {
      console.log("Error:", error);

      // setErrorMessage("Username already exists");

      if (error.response) {
        let errorMessage = error.response.data.message;
        if (errorMessage === "Duplicate Key Error") {
          let key = Object.keys(error.response.data.key).toString();
          key = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();

          errorMessage = `${key} already exists`;
          console.log(errorMessage);
        }
        setErrorMessage(errorMessage);
      }
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* Left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              Master
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 px-2">Write, Wrote, Written!</p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <Formik
            initialValues={{
              username: "test11",
              email: "test11@gmail.com",
              password: "NNNNn1",
              confirmPassword: "NNNNn1",
            }}
            validateOnChange={false} // Update: Disable validation on change
            validateOnBlur={true} // Update: Enable validation on blur
            validate={signUpFormValidation}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form className="">
                <CustomInput
                  type="text"
                  label="Username"
                  name="username"
                  placeholder="Enter your username"
                />

                <CustomInput
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                />

                <CustomInput
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                />

                <CustomInput
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                />

                <Button
                  type="submit"
                  gradientDuoTone="purpleToPink"
                  className="mt-5 w-full"
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>

          {errorMessage && <Toast message={errorMessage} type="failure" />}

          <div className="flex gap=2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
