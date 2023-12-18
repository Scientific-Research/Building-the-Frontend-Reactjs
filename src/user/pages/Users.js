// import React from "react";

import { UsersList } from "../components/UsersList";

export const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://images.pexels.com/photos/19456584/pexels-photo-19456584/free-photo-of-lebensmittel-restaurant-strasse-mexikanisch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      places: 3,
    },
  ];
  // return <h2>Users works!</h2>;
  return <UsersList items={USERS} />;
};
