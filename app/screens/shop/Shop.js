import React, { useContext, useState } from "react";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router-dom";
import useFetchData from "@App/hooks/useFetchData";
import { HTTP_METHOD_TYPE } from "@Config/constants";
import { GlobalContext } from "@Store/globalContext";
import ShopItem from "@Screens/shop/ShopItem";
import Pagination from "@Components/UI/Pagination";
import useQuery from "@App/hooks/useQuery";
import AppBar from "@Components/UI/AppBar";
import createClass from "classnames";
import Skeleton from "@Components/UI/Skeleton";

const useStyles = createUseStyles({
  root: { marginTop: 60 },
  grid: {
    padding: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: 20,
    alignItems: "stretch",
  },
  paginationContainer: {
    color: "gray",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mt_30: {
    marginTop: 75,
  },
  mb_30: {
    marginBottom: 30,
  },
  skeletonContainer: {
    // width: 300,
    height: 300,
  },
  full: {
    width: "100%",
    height: "100%",
  },
});

const Shop = () => {
  const localStyle = useStyles();
  const history = useHistory();
  const query = useQuery();
  const {
    currentPage,
    lastPage,
    shops,
    startLoading,
    stopLoading,
    getShopsSuccess,
    loading,
  } = useContext(GlobalContext);

  const { request } = useFetchData({
    url: `shop?page=${
      query.get("page") !== null ? Math.abs(parseInt(query.get("page"))) : 1
    }`,
    method: HTTP_METHOD_TYPE.GET,
    fireOnLoad: true,
    disableToken: false,
    middleware: () => {
      startLoading();
    },
    successCallback: (data) => {
      getShopsSuccess(data);
    },
    failedCallback: (data) => {
      stopLoading();
    },
  });
  function handleChangePage(current) {
    request(`shop?page=${current}`);
    history.push(`/shop?page=${current}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  }

  return (
    <div className={localStyle.root}>
      {loading && (
        <div className={localStyle.grid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div key={item} className={localStyle.skeletonContainer}>
              <Skeleton />
            </div>
          ))}
        </div>
      )}
      <AppBar />
      {!loading && (
        <div className={localStyle.full}>
          <div
            className={createClass(
              localStyle.paginationContainer,
              localStyle.mt_30
            )}
          >
            <Pagination
              count={lastPage}
              currentPage={currentPage - 1}
              callback={handleChangePage}
            />
          </div>
          <div className={localStyle.grid}>
            {shops.length > 0 &&
              shops.map((shop) => <ShopItem key={shop.id} data={shop} />)}
          </div>
          <div
            className={createClass(
              localStyle.paginationContainer,
              localStyle.mb_30
            )}
          >
            <Pagination
              count={lastPage}
              currentPage={currentPage - 1}
              callback={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
