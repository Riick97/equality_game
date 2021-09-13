import React, {useState } from "react";
import DifferenceCard from "./DifferenceCard";
import ProgressBar from "./ProgressBar";
import "../Styles/GameScaffold.css";
import { useTransition, animated } from "react-spring";


export default function GameScaffold(props) {
  const [correctIndex, setCorrectIndex] = useState(getOneOrZero());
  const [groceries] = useState([
    "apple",
    "carrot",
    "mango",
    "cherry",
    "kiwifruit",
    "watermelon",
  ]);
  const [currentSelections, setCurrentSelections] = useState(getSelections());
  const [cards, setCards] = useState([
    { id: 0, show: true, indexes: [0, 1] },
    { id: 1, show: true, indexes: [2, 3] },
  ]);
  const [result, setResult] = useState("empty");
  const [answerResults, setAnswerResults] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  function getOneOrZero() {
    return Math.random() >= 0.5 ? 1 : 0;
  };

  function getSelections() {
    let array = [];
    let i = 0;
    while (i < 4) {
      let random = Math.floor(Math.random() * groceries.length);
      if (!array.includes(groceries[random])) {
        array.push(groceries[random]);
        i++;
      }
    }
    return array;
  };

  const handleChoice = (id) => {
    let updatedAnswers = answerResults;
    if (correctIndex === id) {
      updatedAnswers[answerCount] = true;
      let updatedCorrectAnswers = correctAnswers + 1;
      setResult('correct');
      setAnswerResults(updatedAnswers);
      setCorrectAnswers(updatedCorrectAnswers)
     
    } else {
      updatedAnswers[answerCount] = false;
      setResult('incorrect');
      setAnswerResults(updatedAnswers);
    }
    let updatedCards = cards.map((card) => {
      card.show = card.id === id;
      return card;
    });

    let updatedCount = answerCount + 1;
    setCards(updatedCards);
    setAnswerCount(updatedCount);
  };

  const handleNext = () => {
    if (answerCount >= answerResults.length) {
      setGameFinished(true);
    }
    let updatedCards = cards.map((card) => {
      card.show = true;
      return card;
    });
    setResult('empty');
    setCorrectIndex(getOneOrZero());
    setCards(updatedCards);
    setCurrentSelections(getSelections());
  };

  const handleRestart = () => {
    setAnswerResults([null, null, null, null, null]);
    setCorrectAnswers(0);
    setAnswerCount(0);
    setGameFinished(false);
  };

  if (!gameFinished) {
    return (
      <div className="game">
        <div className="question">
          {result !== "empty" ? (
            result === "correct" ? (
              <div className="title_green">
                <h2>You've got the right answer!</h2>
              </div>
            ) : (
              <div className="title_red">
                <h2>They are not the same</h2>
              </div>
            )
          ) : (
            <h2>Which of these items are a matching pair?</h2>
          )}
        </div>
        <div className="container">
          {cards.map((card) => {
            return (
              <DifferenceCard
                correct={correctIndex === card.id}
                groceries={[
                  currentSelections[card.indexes[0]],
                  currentSelections[card.indexes[1]],
                ]}
                id={card.id}
                key={card.id}
                show={card.show}
                onChosen={handleChoice}
                onNext={handleNext}
                result={result}
              />
            );
          })}
        </div>
        <div className="container_progress">
          <ProgressBar answerResults={answerResults} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="game">
        <div className="results_title">
          {correctAnswers >= 3 ? (
            correctAnswers >= 5 ? (
              <h2>Wow... Excelent!</h2>
            ) : (
              <h2>Nice Job!</h2>
            )
          ) : (
            <h2>You'll do better next time</h2>
          )}
        </div>
        <div className="container_results centered">
          <div className="ratio">
            <h3>
              <span className="title_green">{correctAnswers}</span>
              /5
            </h3>
          </div>
          <button onClick={handleRestart} className="green_button_big">
            Go Again
          </button>
        </div>
        <div className="container_progress">
          <ProgressBar answerResults={answerResults} />
        </div>
      </div>
    );
  }
}
