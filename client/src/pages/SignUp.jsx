import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                name="username"
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                name="email"
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
            </div>
            <Button gradientDuoTone="purpleToPink">
              Sign Up
            </Button>
          </form>
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
