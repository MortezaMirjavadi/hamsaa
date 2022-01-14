import React, { createContext, useContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import {
  ACTION_ADD_ITEM,
  ACTION_CLOSE_SNACKBAR,
  ACTION_GET_SHOPS,
  ACTION_LOADING,
  ACTION_LOGIN,
  ACTION_REMOVE_ITEM,
  ACTION_SHOW_SNACKBAR,
  ACTION_TOGGLE_FAVORITE,
} from "@Store/actionTypes";
import { MESSAGE_TYPE } from "@Config/constants";

const initialState = {
  shops: [],
  authenticated: false,
  token: "",
  loading: false,
  isShowSnackbar: false,
  snackbarMessage: [],
  messageType: MESSAGE_TYPE.SUCCESS,
  currentPage: 1,
  lastPage: null,
  total: null,
  favorites: [],
};

export const GlobalContext = createContext(initialState);
export const DispatchContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addItemToList(item) {
    dispatch({
      type: ACTION_ADD_ITEM,
      payload: item,
    });
  }
  function removeItemFromList(item) {
    dispatch({
      type: ACTION_REMOVE_ITEM,
      payload: item,
    });
  }
  function startLoading() {
    dispatch({ type: ACTION_LOADING.LOADING });
  }
  function stopLoading() {
    dispatch({ type: ACTION_LOADING.STOP });
  }
  function loginSuccess(data) {
    showSnackbar({
      message: data.data.message,
      messageType: MESSAGE_TYPE.SUCCESS,
    });
    dispatch({
      type: ACTION_LOGIN.ACTION_LOGIN_SUCCESS,
      data,
    });
  }
  function showSnackbar({ message, messageType }) {
    dispatch({ type: ACTION_SHOW_SNACKBAR, message, messageType });
  }
  function closeSnackbar() {
    dispatch({ type: ACTION_CLOSE_SNACKBAR });
  }
  function getShopsSuccess(data) {
    dispatch({ type: ACTION_GET_SHOPS.ACTION_GET_SHOPS_SUCCESS, data });
  }
  function toggleFavoriteItem(item) {
    dispatch({ type: ACTION_TOGGLE_FAVORITE, item });
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        startLoading,
        stopLoading,
        addItemToList,
        removeItemFromList,
        loginSuccess,
        showSnackbar,
        closeSnackbar,
        getShopsSuccess,
        toggleFavoriteItem,
      }}
    >
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </GlobalContext.Provider>
  );
};
