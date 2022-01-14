import React from "react";
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
import storageHelper from "@Utils/storageHelper";

const handleStates = {
  [ACTION_LOADING.LOADING]: (state) => {
    return { ...state, loading: true };
  },
  [ACTION_LOADING.STOP]: (state) => {
    return { ...state, loading: false };
  },
  [ACTION_ADD_ITEM]: (state, action) => {
    return { ...state, shops: [action.payload, ...state.shops] };
  },
  [ACTION_REMOVE_ITEM]: (state, action) => {
    return {
      ...state,
      shops: state.shops.filter((item) => item !== action.payload),
    };
  },
  [ACTION_LOGIN.ACTION_LOGIN_SUCCESS]: (state, payload) => {
    const { token } = payload.data.data;
    storageHelper.setAccessToken(token);
    storageHelper.setUserInfo(payload.data.email);
    return { ...state, loading: false, token: token, authenticated: true };
  },
  [ACTION_SHOW_SNACKBAR]: (state, action) => {
    const { message, messageType } = action;
    return { ...state, isShowSnackbar: true, snackbarMessage: message, messageType };
  },
  [ACTION_CLOSE_SNACKBAR]: (state) => {
    return { ...state, isShowSnackbar: false };
  },
  [ACTION_GET_SHOPS.ACTION_GET_SHOPS_SUCCESS]: (state, payload) => {
    const { last_page, total, current_page, data } = payload.data;
    return {
      ...state,
      shops: data,
      total,
      lastPage: last_page,
      currentPage: current_page,
      loading: false,
      // favorites: data,
    };
  },
  [ACTION_TOGGLE_FAVORITE]: (state, { item }) => {
    const _favorites = [...state.favorites];
    const _temp = _favorites.findIndex((x) => x.id === item.id);
    if (_temp !== -1) {
      _favorites.splice(_temp, 1);
    } else {
      _favorites.push(item);
    }
    return { ...state, favorites: _favorites };
  },
};

export default function appReducer(state, action) {
  if (typeof handleStates[action.type] === "function") {
    return handleStates[action.type](state, action);
  }
  return state;
}
