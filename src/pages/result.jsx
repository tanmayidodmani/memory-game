import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();

  return (
    <div className="result-page">
      <h1>Congrats!</h1>
      <p>You matched all the cards!</p>

      <button onClick={() => navigate("/game")}>
        PLAY AGAIN
      </button>
    </div>
  );
}

export default Result;