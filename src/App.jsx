import "./App.css";
import Dice from "./components/Dice/Dice";
import { useEffect, useState } from "react";

function App() {
  let [gameIsFinished, finishGame] = useState(false);
  let currentSavedState = localStorage.getItem("tenzies_dices");
  if (!currentSavedState) {
    currentSavedState = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, value: Math.floor(Math.random() * 6) + 1, isFrozen: false }));
  } else {
    currentSavedState = JSON.parse(currentSavedState);
  }

  const [savedState, setSavedState] = useState(currentSavedState);

  useEffect(() => {
    let frozedDiceCount = savedState.reduce((prev, curr) => prev + (curr.isFrozen ? 1 : 0), 0);
    if (frozedDiceCount === 10) {
      finishGame(true);
      console.log("Game is finished");
    }
    localStorage.setItem("tenzies_dices", JSON.stringify(savedState));
  }, [savedState]);

  function rollDice() {
    const newState = savedState.map((die) => {
      if (!die.isFrozen) {
        return { ...die, value: Math.floor(Math.random() * 6) + 1 };
      }
      return die;
    });
    setSavedState(newState);
  }

  function restartGame() {
    const newState = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, value: Math.floor(Math.random() * 6) + 1, isFrozen: false }));
    setSavedState(newState);
    finishGame(false);
    localStorage.setItem("tenzies_dices", JSON.stringify(newState));
  }

  return (
    <>
      <div id="app" className={gameIsFinished ? "blur" : ""}>
        <div className="intro-container">
          <h2 className="heading">Tenzies</h2>
          <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="container dice-container">
          {savedState.map((die) => (
            <Dice key={die.id} id={die.id} value={die.value} isFrozen={die.isFrozen} setSavedState={setSavedState} savedState={savedState} />
          ))}
        </div>
        <div className="btn-container">
          <button className="btn" onClick={rollDice}>
            Roll
          </button>
        </div>
      </div>

      {gameIsFinished && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Congratulations!</h2>
            <p>You finished the game. Do you want to restart?</p>
            <button className="btn" onClick={restartGame}>
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
