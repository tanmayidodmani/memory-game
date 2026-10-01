import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1 id="head">Memory Game</h1>

      <button onClick={() => navigate("/game")}>
        Play
      </button>
    </div>
  );
}

export default Home;