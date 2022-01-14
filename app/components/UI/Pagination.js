import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import createClass from "classnames";
import useMediaQuery from "@App/hooks/useMediaQuery";
import { downWithoutMedia } from "@Config/theme";
import LeftArrowIcon from "../Icons/LeftArrowIcon";

const useStyles = createUseStyles({
  mobilePaginationItem: {
    minWidth: 30,
    padding: 5,
    height: 30,
    background: "rgb(247, 247, 247)",
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  paginationItem: {
    minWidth: 41,
    padding: 5,
    height: 41,
    fontSize: 14,
    background: "#F3F5F8",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    "&:hover": { background: "rgba(190, 197, 223, 0.5)" },
  },
  paginationItemHover: {
    "&:hover": {
      background: "rgba(190, 197, 223, 0.5)",
    },
  },
  ml: {
    marginLeft: 20,
  },
  right: {
    transform: "rotate(180deg)",
  },
  mlPaginationItem: {
    marginLeft: 9,
  },
  mlMobilePaginationItem: {
    marginLeft: 2,
  },
  pageItemsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeItem: {
    background: "#314CD3",
    color: "white",
    "&:hover": { background: "#4C66EA" },
  },
  item: {
    color: "#283962",
  },
  backgroundIcon: {
    "& path": {
      fill: "#283962",
    },
  },
});

const staticThreshold = 7;

const Pagination = (props) => {
  const localStyle = useStyles(props);

  const { callback, count, currentPage } = props;
  const [pages, setPages] = useState([]);

  const isMobile = useMediaQuery([downWithoutMedia(520)], [true], false);

  const changePage = (page) => {
    callback(page);
    if (page <= staticThreshold && count <= staticThreshold) {
      const _temp = Array.apply(null, new Array(count)).map(function(el, i) {
        return ++i;
      });
      setPages(_temp.reverse());
    } else if (page >= count - 3 && count > staticThreshold) {
      const _temp = Array.apply(null, new Array(staticThreshold)).map(function(
        el,
        i
      ) {
        return ++i;
      });
      _temp[1] = -1;
      _temp[_temp.length - 5] = count - 4;
      _temp[_temp.length - 4] = count - 3;
      _temp[_temp.length - 3] = count - 2;
      _temp[_temp.length - 2] = count - 1;
      _temp[_temp.length - 1] = count;
      setPages(_temp.reverse());
    } else if (page <= 4 && count > staticThreshold) {
      const _temp = Array.apply(null, new Array(staticThreshold)).map(function(
        el,
        i
      ) {
        return ++i;
      });
      _temp[5] = -1;
      _temp[_temp.length - 1] = count;
      setPages(_temp.reverse());
    } else if (page > 4 && page < count - 2) {
      const _temp = Array.apply(null, new Array(staticThreshold)).map(function(
        el,
        i
      ) {
        return ++i;
      });
      _temp[1] = -1;
      _temp[2] = page - 1;
      _temp[3] = page;
      _temp[4] = page + 1;
      _temp[5] = -1;
      _temp[6] = count;
      setPages(_temp.reverse());
    }
  };

  useEffect(() => {
    if (count <= staticThreshold) {
      const _temp = Array.apply(null, new Array(count)).map(function(el, i) {
        return ++i;
      });
      setPages(_temp.reverse());
    } else {
      const _temp = Array.apply(null, new Array(staticThreshold)).map(function(
        el,
        i
      ) {
        return ++i;
      });
      _temp[5] = -1;
      _temp[_temp.length - 1] = count;
      setPages(_temp.reverse());
    }
  }, [count]);

  const previousPage = () => {
    if (currentPage - 1 >= 0) {
      changePage(currentPage);
    }
  };

  const nextPage = () => {
    if (currentPage + 1 < count) {
      changePage(currentPage + 2);
    }
  };

  return (
    <>
      <div
        onClick={nextPage}
        className={createClass(
          localStyle.mlPaginationItem,
          !isMobile
            ? localStyle.paginationItem
            : localStyle.mobilePaginationItem
        )}
      >
        <LeftArrowIcon color="black" />
      </div>
      <div className={localStyle.pageItemsContainer}>
        {pages.map((page, index) =>
          page !== -1 ? (
            <div
              key={index}
              onClick={() => changePage(page)}
              className={createClass(
                !isMobile
                  ? localStyle.paginationItem
                  : localStyle.mobilePaginationItem,
                !isMobile && localStyle.mlPaginationItem,
                isMobile && localStyle.mlMobilePaginationItem,
                currentPage + 1 !== page && localStyle.paginationItemHover,
                currentPage + 1 === page
                  ? localStyle.activeItem
                  : localStyle.item
              )}
            >
              {page}
            </div>
          ) : (
            <span
              className={createClass(
                localStyle.paginationItem,
                localStyle.mlPaginationItem
              )}
              key={index}
            >
              ...
            </span>
          )
        )}
      </div>
      <div
        onClick={previousPage}
        className={createClass(
          localStyle.mlPaginationItem,
          !isMobile
            ? localStyle.paginationItem
            : localStyle.mobilePaginationItem,
          localStyle.right
        )}
      >
        <LeftArrowIcon color="black" />
      </div>
    </>
  );
};

export default Pagination;
