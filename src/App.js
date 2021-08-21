import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CardList from './pages/CardList/CardList';
import Header from './components/Header/Header';
import NotFound from './pages/NotFound/NotFound';
import { AuthWithDelay } from './pages/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { cardListActions } from './store/cards';
import CardDetail from './pages/CardDetail/CardDetail';
import FetchCards from './api/api';
import Settings from './pages/Settings/Settings';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    FetchCards().then((cards) => dispatch(cardListActions.setCards(cards)));
    //fetching card only once
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <CardList />
        </Route>
        <Route path="/notfound" exact>
          <NotFound />
        </Route>
        <Route path="/auth" exact>
          <AuthWithDelay />
        </Route>
        <Route path="/card/:id" exact>
          <CardDetail />
        </Route>
        {user && user.isAdmin && (
          <Route path="/settings" exact>
            <Settings />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/notfound" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
