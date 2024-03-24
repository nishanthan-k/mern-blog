import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../utils/form/CustomInput";
import Toast from "../utils/toast/Toast";
import { signInFormValidation } from "../utils/validation/signInFormValidation";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import {useDispatch, useSelector} from "react-redux"

const SignIn = () => {
  const navigate = useNavigate();
  const dispath = useDispatch()
  const {loading, error: errorMessage} = useSelector(state => state.user);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    await signInFormValidation(values);
    dispath(signInSuccess())
    try {
      const res = await axios.post("/api/auth/signin", values, {
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.data.success) {
        dispath(signInFailure(res.data.message))
      } 

      // separate if to avoid potential issues
      if (res.data.success) {
        dispath(signInSuccess(res.data));
        <Toast message="Signin successful" type="success" />;
        navigate("/");
      }

    } catch (error) {
      dispath(signInFailure(error.response.data.message))
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
              email: "",
              password: "",
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
