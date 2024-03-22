import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../utils/form/CustomInput";
import Toast from "../utils/toast/Toast";
import { signInFormValidation } from "../utils/validation/signInFormValidation";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log('submit called');
    await signInFormValidation(values);
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signin", values, {
        headers: {
          "content-type": "application/json",
        },
      });

      <Toast message="Signin successful" type="success" />;
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
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
              email: "n@gmail.com",
              password: "NNNNn1",
            }}
            validateOnChange={false} // Update: Disable validation on change
            validateOnBlur={true} // Update: Enable validation on blur
            validate={signInFormValidation}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form className="">
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

                <Button
                  type="submit"
                  gradientDuoTone="purpleToPink"
                  className="mt-5 w-full"
                  disabled={loading}
                  // onClick={() => handleSubmit(props.initialValues)}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" />
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          {errorMessage && <Toast message={errorMessage} type="failure" />}

          <div className="flex gap-2 text-sm mt-5">
            <span>Not have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
