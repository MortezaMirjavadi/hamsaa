import React, {useContext, useEffect, useState} from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";
import { Button } from "@Components/UI";
import { GlobalContext } from "@Store/globalContext";

const useStyles = createUseStyles({
  article: {
    border: "1px solid #ccc",
    boxShadow: "2px 2px 6px 0px  rgba(0,0,0,0.3)",
  },
  imageWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: 5,
  },
  image: {
    maxWidth: "100%",
  },
  text: {
    padding: "0 20px 20px",
  },
  btn: {
    marginTop: 5,
    background: "gray",
    border: 0,
    color: "white",
    height: 40,
    width: "100%",
  },
});

const ShopItem = (props) => {
  const { id, name, image, url } = props.data;
  const localStyle = useStyles();
  const { toggleFavoriteItem, favorites } = useContext(GlobalContext);
  const [info, setInfo] = useState({color: "primary", label: "favourite"});

  function handleToggleFavorite() {
    toggleFavoriteItem(props.data);
  }

  function checkFavorite() {
    const _temp = favorites.find(x => x.id === id);
    if (_temp) {
      setInfo({label: "unfavourite", color: "secondary"});
    } else {
      setInfo({label: "Add To Favorites", color: "primary"});
    }
  }

  useEffect(() => {
    checkFavorite();
  }, [favorites]);

  return (
    <div className={localStyle.article}>
      <div className={localStyle.imageWrapper}>
        <img
          className={localStyle.image}
          src={image}
          width={200}
          height={300}
          alt=""
        />
      </div>
      <div className={localStyle.text}>
        <h3>{name}</h3>
        <a href={url}> {url} </a>
        <div className={localStyle.btn}>
          <Button color={info.color} onClick={handleToggleFavorite}>
            {info.label}
          </Button>
        </div>
      </div>
    </div>
  );
};

ShopItem.displayName = "ShopItem";
ShopItem.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
};

export default ShopItem;
