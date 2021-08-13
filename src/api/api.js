import { v4 } from 'uuid';
import axios from 'axios';

function FetchCards() {
  return axios(
    'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json'
  ).then((response) =>
    response.data.slice(0, 15).map((cardData) => {
      return {
        id: v4(),
        title: cardData['Name'],
        text: cardData['About'],
        check: false,
      };
    })
  );
}

export default FetchCards;
