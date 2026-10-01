import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card";

const base = import.meta.env.BASE_URL;

const cardValues = [
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
];




function shuffleCards ( cards ) {
    return [ ...cards ].sort( () => Math.random() - 0.5 );
}

function Game () {

    const navigate = useNavigate();
    const [ FlippedCards, setFlippedCards ] = useState( [] );
    const [ matchedCards, setMatchedCards ] = useState( [] );

    useEffect( () => {
        if ( matchedCards.length === 12 ) {
            navigate( "/result" );
        }
    }, [ matchedCards, navigate ] );


    const [ cards, setCards ] = useState( () => shuffleCards( cardValues ) );

    const handleCardClick = ( id ) => {
        if ( FlippedCards.length === 2 ) {
            return;
        }
        if ( FlippedCards.includes( id ) ) {
            return;
        }

        const NewFlippedCards = [ ...FlippedCards, id ];
        setFlippedCards( NewFlippedCards );



        if ( NewFlippedCards.length === 2 ) {
            const FirstCard = cardValues.find(
                ( Card ) => Card.id === NewFlippedCards[ 0 ]
            );

            const secondCard = cardValues.find(
                ( card ) => card.id === NewFlippedCards[ 1 ]
            );

            if ( FirstCard.image === secondCard.image ) {
                setMatchedCards( [
                    ...matchedCards, FirstCard.id, secondCard.id
                ] );
                setFlippedCards( [] );
            }
            else {
                setTimeout( () => {
                    setFlippedCards( [] );
                }, 1000 );
            }

        }

    };

    return (

        <div className="game-container">
            <div className="game-board">

                { cards.map( ( card ) => (
                    <Card
                        key={ card.id }
                        card={ card }
                        onClick={ () => handleCardClick( card.id ) }
                        isFlipped={ FlippedCards.includes( card.id ) ||
                            matchedCards.includes( card.id ) } />

                ) ) }
            </div>
        </div>
    );
}

export default Game