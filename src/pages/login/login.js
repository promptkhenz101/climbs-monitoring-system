import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { login } from "../../services/auth";
import { clearJwtStorage, getJwtStorage } from "../../services/localstorage";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  let navigate = useNavigate();

  let localData = getJwtStorage();
  var userLogggedIn =
    localData.clmJwt !== null &&
    localData.clmUserId !== null &&
    localData.clmName !== null;

  if (userLogggedIn) {
    navigate(-1);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await login(
      emailRef.current.value,
      passwordRef.current.value
    );

    if ((await response).success) {
      setErrorMessage("");
      setLoading(false);
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password");
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex">
      <div
        className="w-full hidden md:block min-h-screen bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('https://i.imgur.com/zilTOFU.jpg')" }}
      ></div>
      <div className="flex w-full md:w-1/2 justify-center items-center bg-white bg-gradient-to-tr  object-cover ">
        <form className="bg-white" onSubmit={handleLogin}>
          <div className="pl-12 pb-8">
            <img
              src="https://i.imgur.com/57zCqc6.jpg"
              alt="Climbs"
              width="128"
              height="128"
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="email"
              name=""
              id=""
              placeholder="Email Address"
              ref={emailRef}
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name=""
              id=""
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>
          <p className="text-sm text-center text-red-500 font-medium mb-2">
            {errorMessage}
          </p>
          <button
            type="submit"
            className="block w-full bg-blue-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#FFFFFF" size={10} /> : "Login"}
          </button>
          <button
            type="button"
            className="block w-full bg-red-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={() => {
              clearJwtStorage();
            }}
          >
            Clear Storage
          </button>
        </form>
      </div>{" "}
    </div>
  );
};

export default Login;
