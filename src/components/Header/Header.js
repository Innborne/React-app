import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import CardListContext from '../CardListContext/CardListContext';

import './Header.css';

function Header() {
  const ctx = useContext(CardListContext);
  const cardBadgeText = 'Cards',
    homePageText = 'Home',
    signInPageText = 'Sign in';

  return (
    <header className="header">
      <div className="nav-container">
        <NavLink to="/" activeClassName="active" exact>
          {homePageText}
        </NavLink>
        <NavLink to="/auth" activeClassName="active">
          {signInPageText}
        </NavLink>
      </div>
      <div className="header-text-badge">
        {cardBadgeText}
        <span className="header-badge">{ctx.items.length}</span>
      </div>
    </header>
  );
}

export default Header;
