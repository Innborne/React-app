import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { cardListActions } from '../../store/cards';
import { logout } from '../../store/user';

import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.items);
  const user = useSelector((state) => state.user.user);
  const cardBadgeText = 'Cards',
    homePageText = 'Home',
    signInPageText = 'Sign in',
    logoutButton = 'Logout';

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(cardListActions.setReadOnlyMode(true));
  };

  return (
    <header className="header">
      <div className="container">
        <NavLink to="/" activeClassName="active" exact>
          {homePageText}
        </NavLink>
        {user && user.isAdmin && <NavLink to="/settings">Settings</NavLink>}
        {!user ? (
          <NavLink to="/auth" activeClassName="active">
            {signInPageText}
          </NavLink>
        ) : (
          <NavLink
            to="/"
            className="container-logout-click"
            onClick={logoutHandler}
          >
            {logoutButton}
          </NavLink>
        )}
      </div>
      <div className="container">
        {user && <span>{`Welcome, ${user.email}`}</span>}
        <div className="header-text-badge">
          {cardBadgeText}
          <span className="header-badge">{cards.length}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
