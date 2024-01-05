import React, { useEffect, useState } from "react";

import { UsersList } from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

export const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      // setIsLoading(true);
      try {
        // const response = await fetch("http://localhost:5000/api/users");
        const responseData = await sendRequest(
          // "http://localhost:5000/api/users"
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        // const responseData = await response.json();
        // console.log(responseData);
        // if (!response.ok) {
        //   throw new Error(responseData.message);
        // }

        setLoadedUsers(responseData.users);
      } catch (err) {
        // setError(err.message);
      }
      // setIsLoading(false);
    };
    fetchUsers();
  }, [sendRequest]);

  const errorHandler = () => {
    // setError(null);
    clearError();
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};
