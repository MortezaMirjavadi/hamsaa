import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import { GlobalContext } from "@Store/globalContext";
import ShopItem from "@Screens/shop/ShopItem";

const useStyles = createUseStyles({
  grid: {
    padding: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: 20,
    alignItems: "stretch",
  },
});

const Favorites = () => {
  const localStyle = useStyles();
  const { favorites } = useContext(GlobalContext);

  return (
    <div className={localStyle.grid}>
      {favorites.length > 0 &&
        favorites.map((shop) => <ShopItem key={shop.id} data={shop} />)}
    </div>
  );
};

export default Favorites;
