import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { cardListActions } from './store/cards';
import FetchCards from './api/api';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const CardList = React.lazy(() => import('./pages/CardList/CardList'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));
const Auth = React.lazy(() => import('./pages/Auth/Auth'));
const CardDetail = React.lazy(() => import('./pages/CardDetail/CardDetail'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));

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
      <Suspense
        fallback={
          <div className="pagebody">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <CardList />
          </Route>
          <Route path="/notfound" exact>
            <NotFound />
          </Route>
          <Route path="/auth" exact>
            <Auth />
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
