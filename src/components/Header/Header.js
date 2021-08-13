import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Header.css';

function Header() {
  const cards = useSelector((state) => state.items);
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
        <span className="header-badge">{cards.length}</span>
      </div>
    </header>
  );
}

export default Header;
