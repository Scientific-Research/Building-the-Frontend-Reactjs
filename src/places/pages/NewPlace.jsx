import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { ImageUpload } from "../../shared/components/FormElements/ImageUpload";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceForm.css";

export const NewPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  // our custom http hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
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

  // const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    // we will replace this with our DataBank later.
    // console.log(formState.inputs); // send this to the backend later!
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      // formData.append("creator", auth.userId); // for more security, we get it directly from
      // token created in backend adn not userId from token in frontend, because it maybe manipulated
      // already in frontend by Hacker and is invalid now. when we get it directly from backend,
      // it is intact and valid.

      formData.append("image", formState.inputs.image.value);

      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token, // Auth.context=>token: null=>token: token in App.jsx
          // const auth = useContext(AuthContext) => auth.token
        }
        // JSON.stringify({
        //   title: formState.inputs.title.value,
        //   description: formState.inputs.description.value,
        //   address: formState.inputs.address.value,
        //   creator: auth.userId,
        // }),
        // { "Content-Type": "application/json" }
      );
      // Redirect the user to a different page!
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title!"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          // type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters!)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          // type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address!"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image!"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};
