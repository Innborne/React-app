import { useContext } from "react";
import CardListContext from "../CardListContext/CardListContext";

import "./Header.css";

function Header(props) {
  const ctx = useContext(CardListContext);
  const cardBadgeText = "Cards";
  return (
    <header className="header">
      <div>{props.children}</div>
      <div className="header-text-badge">
        {cardBadgeText}
        <span className="header-badge">{ctx.items.length}</span>
      </div>
    </header>
  );
}

export default Header;
