const storageHelper = (function() {
  function setAccessToken(token) {
    localStorage.setItem("token", token);
  }

  function getAccessToken() {
    return localStorage.getItem("token");
  }

  function setUserInfo(userInfo) {
    localStorage.setItem("info", JSON.stringify(userInfo));
  }

  function getUserInfo() {
    const _info = localStorage.getItem("info");
    return JSON.parse(_info);
  }

  function clearLocalStorage() {
    localStorage.clear();
  }

  return {
    setAccessToken,
    getAccessToken,
    setUserInfo,
    getUserInfo,
    clearLocalStorage,
  };
})();

export default storageHelper;
