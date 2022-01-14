import React, { useEffect, useState } from "react";
import storageHelper from "@Utils/storageHelper";
import env from "@Root/env";
import axios from "axios";
import { GlobalContext } from "@Store/globalContext";
import { useHistory } from "react-router-dom";

export default function useFetchData({
  url,
  method,
  params,
  disableToken,
  fireOnLoad,
  middleware,
  successCallback,
  failedCallback,
}) {
  const [pending, setPending] = useState(false);
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const { showSnackbar } = React.useContext(GlobalContext);

  async function wrapper(url_param, parameters) {
    middleware();
    await fetchUrl(url_param, parameters);
  }

  async function fetchUrl(url_param, parameters) {
    setHasError(false);
    setPending(true);
    try {
      const _token = storageHelper.getAccessToken();
      let _url =
        env._BACKEND_BASE_URL +
        (url_param && method === "get" ? url_param : url);
      const _result = await axios({
        method,
        url: _url,
        data: parameters ? parameters : params,
        headers: {
          "Content-Type": "application/json",
          Authorization: !disableToken ? `Bearer ${_token}` : undefined,
        },
      }).catch((err) => {
        if (err.response.status === 401) {
          storageHelper.clearLocalStorage();
          showSnackbar({ message: "the token is expire!!" });
          setTimeout(() => {
            const history = useHistory();
            history.push("/login");
          }, 3000);
        }
        failedCallback && failedCallback(err);
      });
      if (_result && (_result.status === 200 || _result.status === 201)) {
        successCallback && successCallback(_result.data);
        setData(_result);
      }
    } catch (error) {
      console.log(error);
      failedCallback && failedCallback();
      setHasError(true);
    }
    setPending(false);
  }

  useEffect(() => {
    if (fireOnLoad) {
      wrapper();
    }
  }, []);

  return { pending, request: wrapper, hasError, data };
}
