// import React from "react";

import { UsersList } from "../components/UsersList";

export const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image: "https://images.pexels.com/photos/825904/pexels-photo-825904.jpeg",
      places: 3,
    },
  ];
  // return <h2>Users works!</h2>;
  return <UsersList items={USERS} />;
};
