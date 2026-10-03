
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card";

const base = import.meta.env.BASE_URL;

const levelCards = {
  1: [
    { id: 1, image: `${base}cards/cat.jpg` },
    { id: 2, image: `${base}cards/dog.jpg` },
    { id: 3, image: `${base}cards/elephant.jpg` },
    { id: 4, image: `${base}cards/horse.jpg` },
    { id: 5, image: `${base}cards/kangaroo.jpg` },
    { id: 6, image: `${base}cards/panda.jpg` },

    { id: 7, image: `${base}cards/cat.jpg` },
    { id: 8, image: `${base}cards/dog.jpg` },
    { id: 9, image: `${base}cards/elephant.jpg` },
    { id: 10, image: `${base}cards/horse.jpg` },
    { id: 11, image: `${base}cards/kangaroo.jpg` },
    { id: 12, image: `${base}cards/panda.jpg` },
  ],

  2: [
    { id: 1, image: `${base}cards/burger.jpg` },
    { id: 2, image: `${base}cards/donut.jpg` },
    { id: 3, image: `${base}cards/icecream.jpg` },
    { id: 4, image: `${base}cards/piza.jpg` },
    { id: 5, image: `${base}cards/ramen.jpg` },
    { id: 6, image: `${base}cards/sushi.jpg` },

    { id: 7, image: `${base}cards/burger.jpg` },
    { id: 8, image: `${base}cards/donut.jpg` },
    { id: 9, image: `${base}cards/icecream.jpg` },
    { id: 10, image: `${base}cards/piza.jpg` },
    { id: 11, image: `${base}cards/ramen.jpg` },
    { id: 12, image: `${base}cards/sushi.jpg` },
    ],
  
    3: [
         
        { id: 1, image: `${ base }cards/dahlia.jpg` },
    { id: 2, image: `${base}cards/lotus.jpg` },
    { id: 3, image: `${base}cards/mogra.jpg` },
    { id: 4, image: `${base}cards/rose.jpg` },
    { id: 5, image: `${base}cards/sunflower.jpg` },
    { id: 6, image: `${base}cards/tulip.jpg` },

   { id: 7, image: `${base}cards/dahlia.jpg` },
    { id: 8, image: `${base}cards/lotus.jpg` },
    { id: 9, image: `${base}cards/mogra.jpg` },
    { id: 10, image: `${base}cards/rose.jpg` },
    { id: 11, image: `${base}cards/sunflower.jpg` },
    { id: 12, image: `${base}cards/tulip.jpg` },
      
  ]
};

function shuffleCards(cards) {
  return [...cards].sort(() => Math.random() - 0.5);
}

function Game () {
    const navigate = useNavigate();

    const [ FlippedCards, setFlippedCards ] = useState( [] );
    const [ matchedCards, setMatchedCards ] = useState( [] );
const [ cards, setCards ] = useState( () => shuffleCards( levelCards[1] ) );
    const [ level, setLevel ] = useState( 1 );
    const [ score, setScore ] = useState( 0 );
    const [ time, setTime ] = useState( 40 );

    // Timer
   useEffect(() => {
    if (time === 0) {
        navigate("/result", {
            state: {
                won: false,
                score: score,
            },
        });
        return;
    }

    const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);

}, [time, navigate]);

  // Check if all cards are matched
  useEffect(() => {
    if (matchedCards.length === 12) {
      setScore((prevScore) => prevScore + 60);

      if (level === 3) {
  navigate("/result", {
    state: {
      won: true,
      score: score + 60,
    },
  });
} else {
        setLevel((prevLevel) => prevLevel + 1);
        setMatchedCards([]);
        setFlippedCards([]);
        setTime(40);
        setCards(shuffleCards(levelCards[level + 1]));      }
    }
  }, [matchedCards, level, navigate]);

  const handleCardClick = (id) => {
    if (FlippedCards.length === 2) {
      return;
    }

    if (FlippedCards.includes(id)) {
      return;
    }

    const NewFlippedCards = [...FlippedCards, id];

    setFlippedCards(NewFlippedCards);

    if (NewFlippedCards.length === 2) {
      const FirstCard = cards.find(
        (Card) => Card.id === NewFlippedCards[0]
      );

      const secondCard = cards.find(
        (card) => card.id === NewFlippedCards[1]
      );

      if (FirstCard.image === secondCard.image) {
        setMatchedCards([
          ...matchedCards,
          FirstCard.id,
          secondCard.id,
        ]);

        setFlippedCards([]);

        setScore((prevScore) => prevScore + 10);
      } else {
        setScore((prevScore) => Math.max(0, prevScore - 2));

        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="game-container">

      <h2>Level: {level}</h2>
      <h2>Score: {score}</h2>
      <h2>Time: {time}s</h2>

      <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
            isFlipped={
              FlippedCards.includes(card.id) ||
              matchedCards.includes(card.id)
            }
          />
        ))}
      </div>

    </div>
  );
}

export default Game;

