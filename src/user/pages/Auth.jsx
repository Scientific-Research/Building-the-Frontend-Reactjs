import React, { useState, useContext } from "react";

import "./Auth.css";

import Card from "../../shared/components/UIElements/Card";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { ImageUpload } from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

export const Auth = () => {
  const auth = useContext(AuthContext);
  // Using our hook here: useForm()
  const [isLoginMode, setIsLoginMode] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchModeHandler = () => {
    // setIsLoginMode((prevMode) => !prevMode);
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode(!isLoginMode);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(formState.inputs);
    // setIsLoading(true);

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
          // method: "POST",
          // headers: {
          // },
        );
        auth.login(responseData.user.id);
      } catch (err) {}
      // try {
      // we make some changes here according to our custom hook => http-hook.js
      // const response = await fetch("http://localhost:5000/api/users/login", {
      // const responseData = await sendRequest(
      // const responseData = await response.json();
      // if (!response.ok) {
      //   // when the response is not 200 or 400
      //   throw new Error(responseData.message); // it goes from here directly to the catch()
      // }
      // console.log(responseData);
      // setIsLoading(false);
      // } catch (err) {
      //   console.log(err);
      //   // setIsLoading(false);
      //   setError(
      //     err.message || "Something went wrong, please try again later!"
      //   );
      // }
    } else {
      try {
        const formData = new FormData();
        // in formData we can attach text data like name, email, password and also binary Data
        // for images => it means fortunately different types of Data!
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        // const response = await fetch("http://localhost:5000/api/users/signup", {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
          // fetch data under the hood of sendRequest will detect the right headers
          // therefore, with formData , we don't need to use headers anymore!

          // JSON.stringify({
          //   name: formState.inputs.name.value,
          //   email: formState.inputs.email.value,
          //   password: formState.inputs.password.value,
          // }),
          // method: "POST",
          // headers: {
          // {
          //   "Content-Type": "application/json",
          // }
          // },
          // body: ,
        );
        // const responseData = await response.json();
        // if (!response.ok) {
        //   throw new Error(responseData.message);
        // }
        // console.log(responseData);
        // setIsLoading(false);
        auth.login(responseData.user.id);
      } catch (err) {
        // console.log(err);
        // setIsLoading(false);
        // setError(
        //   err.message || "Something went wrong, please try again later!"
        // );
      }
    }
  };

  const errorHandler = () => {
    // setError(null);
    clearError();
  };
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay={true} />}
        {/* <h2>Login Required!</h2> */}
        {/* <h2>{isLoginMode ? "Login" : "Signup"} Required!</h2> */}
        <h2>
          {isLoginMode
            ? "Please log in to your account"
            : "Please create a new account"}
        </h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name!"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload center id="image" onInput={inputHandler} />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address!"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters!"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};
