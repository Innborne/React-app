import { useContext } from "react";
import CardListContext from "../CardListContext/CardListContext";

import "./Header.css";

function Header(props) {
  const ctx = useContext(CardListContext);
  return (
    <header className="header">
      <div>{props.children}</div>
      <div className="header-text-badge">
        {"Cards"}
        <span className="header-badge">{ctx.items.length}</span>
      </div>
    </header>
  );
}

export default Header;
