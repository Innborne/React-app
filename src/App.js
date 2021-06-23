import CardsMain from "./components/Cards/CardsMain";
import CardsHeader from "./components/Cards/CardsHeader";

function App() {
  const header = 'Header';
  const cards = [
    {
      id: "e1",
      title: "Caption",
      text: "New text...",
      check: true
    },
    {
      id: "e2",
      title: "Caption2",
      text: "New text2...",
      check: false
    },
  ];

  return (
    <div>
      <CardsHeader>{header}</CardsHeader>
      <CardsMain items={cards}></CardsMain>
    </div>
  );
}

export default App;
