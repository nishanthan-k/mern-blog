import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  signInFailure,
  signInSuccess
} from "../redux/user/userSlice";
import axios from 'axios'

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const headers = {
        "content-type": "application/json",
      };
      const values = {
        email: result.user.email,
        name: result.user.displayName,
        googlePhotoUrl: result.user.photoURL,
      };
      const res = await axios.post("api/auth/google", values, headers);
      if (!res.data.success) {
        dispatch(signInFailure(res.data));
      }
      console.log(res.data);
      if (res.data.success) {
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <>
      <Button
        type="button"
        outline
        className=" w-full mt-2"
        gradientDuoTone="pinkToOrange"
        onClick={handleGoogleAuth}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
    </>
  );
}
