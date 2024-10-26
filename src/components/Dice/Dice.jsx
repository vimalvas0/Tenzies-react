import "./Dice.css";

export default function Dice({ id, value, isFrozen, setSavedState, savedState }) {
  const handleDiceClick = (id, value) => {
    const newState = savedState.map((die) => {
      if (die.id === id) {
        return { ...die, isFrozen: !die.isFrozen };
      } else if (die.isFrozen && die.value !== value) {
        return { ...die, isFrozen: false };
      }
      return die;
    });
    setSavedState(newState);
  };

  return (
    <div
      className={`dice ${isFrozen ? "frozen" : ""}`}
      onClick={() => {
        handleDiceClick(id, value);
      }}
    >
      {value}
    </div>
  );
}
