"use client";

import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { getUserData, login, registration } from "@/app/services/supabase/user";
import Spinner from "../spinner/Spinner";
import useApp from "@/app/hooks/useApp";

const Authentication = () => {
  const { appContext } = useApp();

  const formData = useRef({
    userName: " ",
    password: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const checkValidation = () => {
    if (formData.current.userName.length < 3) {
      setWarningMessage("Username should be at least 3 characters");
      return false;
    }
    if (formData.current.password.length < 6) {
      setWarningMessage("Password should be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleRegistration = () => {
    if (checkValidation() === false) return;
    setDisabled(true);

    registration(formData.current.userName, formData.current.password).then(
      (res: any) => {
        if (res.status === 400) {
          setWarningMessage(
            "User already exists, please choose another username"
          );
          setDisabled(false);
          return;
        }

        if (res.databaseResponse.status === 201) {
          console.log("everything is ok");
          appContext.setIsLogin(true);
          appContext.setUserData(res.databaseResponse.data[0]);
        } else {
          setWarningMessage("something went wrong");
        }

        setDisabled(false);
      },
      (err) => {
        console.error("Registration failed: ", err);
      }
    );
  };

  const handleLogin = () => {
    if (checkValidation() === false) return;
    setDisabled(true);

    login(formData.current.userName, formData.current.password).then(
      (res: any) => {
        if (res.error?.status === 400) {
          setWarningMessage("Wrong username or password");
          setDisabled(false);
          return;
        }

        if (res.error === null) {
          getUserData(res.data.session.user.email).then((res: any) => {
            if (res.status !== 401) {
              appContext.setIsLogin(true);
              appContext.setUserData(res.data[0]);
            }
          });
        }

        setDisabled(false);
      },
      (err) => {
        console.error("Login failed: ", err);
      }
    );
  };

  return (
    <form className={style.form}>
      {/* Spinner */}
      {disabled && (
        <>
          <div className=" w-full h-full bg-black opacity-60 absolute z-50 left-0 top-0"></div>
          <Spinner />
        </>
      )}

      {/* Warninr Message */}
      <h3 className="text-xl text-red-500 font-bold absolute -bottom-20">
        {warningMessage}
      </h3>

      {/* Left Conrer for form Designe */}
      <div className={style.leftCorner}>
        <div></div>
        <div></div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-2 text-gray-300">
        Sign up or sign in to play
      </h2>

      {/* Input Fields */}
      <div className="mb-4">
        <label
          className="block text-gray-500 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          disabled={disabled}
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          readOnly
          onFocus={(e) => (e.currentTarget.readOnly = false)}
          maxLength={20}
          onChange={(e) => (formData.current.userName = e.target.value)}
          placeholder="Enter your Username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-500 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          disabled={disabled}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          maxLength={20}
          onChange={(e) => (formData.current.password = e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      {/* Form Buttons */}
      <div className="flex items-center gap-6">
        <button
          disabled={disabled}
          className=" bg-gray-900 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleRegistration}
        >
          Sign Up
        </button>
        <button
          disabled={disabled}
          className=" bg-gray-900 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>

      {/* Right Conrer for form Designe */}
      <div className={style.rightCorner}>
        <div></div>
        <div></div>
      </div>
    </form>
  );
};

export default Authentication;
