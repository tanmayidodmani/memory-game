function Card ( { card, onClick, isFlipped } ) {
  return (
    <div className="card" onClick={ onClick }>
      { isFlipped ? (
        <img src={ card.image } alt="memory card" />
      ) : (
          <div className="card-back">?</div>
     
      ) }
      
    </div>
  );
}

export default Card;