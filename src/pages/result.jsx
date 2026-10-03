
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const won = location.state?.won;
  const score = location.state?.score || 0;

  return (
    <div className="result-page">

      {won ? (
        <>
          <h1> Congrats!</h1>
          <p>You completed all 3 levels!</p>
        </>
      ) : (
        <>
          <h1> Better Luck Next Time!</h1>
          <p>Time's up!</p>
        </>
      )}

      <h2>Final Score: {score}</h2>

      <button onClick={() => navigate("/game")}>
        PLAY AGAIN
      </button>

    </div>
  );
}

export default Result;

