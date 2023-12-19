import React from "react";

import { Input } from "../../shared/components/FormElements/Input";
import "./NewPlace.css";
export const NewPlace = () => {
  // return <h2>NewPlace Works!</h2>;
  return (
    <form className="place-form">
      <Input element="input" type="text" label="Title" />
    </form>
  );
};
