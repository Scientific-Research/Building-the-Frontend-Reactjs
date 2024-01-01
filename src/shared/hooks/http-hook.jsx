import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    // with callback, this function will never recreate when the components which use this hook,
    // will be rendered!(to avoid infinite loop)
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      // httpAbortController: functionality built in modern Browsers!
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method, // method:method
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        // first of all, extract the data
        const responseData = await response.json();
        // throw an erorr if we have 400 or 500 response code
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // cleanup function when we cancel the login process
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
