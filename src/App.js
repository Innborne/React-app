import React from "react";
import CardList from "./components/CardList/CardList";
import { CardListContextProvider } from "./components/CardListContext/CardListContext";
import Header from "./components/Header/Header";

function App() {
  const header = "Header";

  return (
    <CardListContextProvider>
      <Header>{header}</Header>
      <CardList />
    </CardListContextProvider>
  );
}

export default App;
