import React, { useEffect, useState, useContext } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

import { Input } from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceForm.css";

export const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState(); // initially loadedPlace is undefined!
  // const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  // const history = useHistory();
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          // `http://localhost:5000/api/places/${placeId}`
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(responseData.Place);
        setFormData(
          {
            title: {
              value: responseData.Place.title,
              isValid: true,
            },
            description: {
              value: responseData.Place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  // const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  // useEffect(() => {
  //   if (identifiedPlace) {
  //   }
  //   setIsLoading(false);
  // }, [identifiedPlace, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(formState.inputs);
    try {
      await sendRequest(
        // `http://localhost:5000/api/places/${placeId}`,
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      // history.push("/" + auth.userId + "/places");
      navigate("/" + auth.userId + "/places");
    } catch (err) {}
  };

  //   if (!formState.inputs.title.value) {
  if (isLoading) {
    return (
      <div className="center">
        {/* <h2>Loading...</h2> */}
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title!"
            onInput={inputHandler}
            // InitialValue={formState.inputs.title.value}
            InitialValue={loadedPlace.title}
            // InitialValid={formState.inputs.title.isValid}
            InitialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            // type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters!)"
            onInput={inputHandler}
            // InitialValue={formState.inputs.description.value}
            InitialValue={loadedPlace.description}
            InitialValid={true}
            // InitialValid={formState.inputs.description.isValid}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};
