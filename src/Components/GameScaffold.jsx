import React, { Component } from "react";
import DifferenceCard from "./DifferenceCard";
import ProgressBar from "./ProgressBar";
import "../Styles/GameScaffold.css";

export default class GameScaffold extends Component {
  state = {
    correctIndex: this.getOneOrZero(),
    groceries: [
      "apple",
      "carrot",
      "mango",
      "cherry",
      "kiwifruit",
      "watermelon",
    ],
    currentSelections: ["apple", "carrot", "mango", "cherry"],
    cards: [
      { id: 0, show: true, indexes: [0, 1] },
      { id: 1, show: true, indexes: [2, 3] },
    ],
    result: "empty",
    answerResults: [null, null, null, null, null],
    correctAnswers: 0,
    answerCount: 0,
    gameFinished: false,
  };

  constructor() {
    super();
    this.state.currentSelections = this.getSelections();
  }

  getOneOrZero() {
    return Math.random() >= 0.5 ? 1 : 0;
  }

  getSelections = () => {
    let array = [];
    let i = 0;
    while (i < 4) {
      let random = Math.floor(Math.random() * this.state.groceries.length);
      if (!array.includes(this.state.groceries[random])) {
        array.push(this.state.groceries[random]);
        i++;
      }
    }
    return array;
  };

  handleChoice = (id) => {
    let updatedAnswers = this.state.answerResults;
    if (this.state.correctIndex === id) {
      updatedAnswers[this.state.answerCount] = true;
      let updatedCorrectAnswers = this.state.correctAnswers + 1;
      this.setState({
        result: "correct",
        answerResults: updatedAnswers,
        correctAnswers: updatedCorrectAnswers,
      });
    } else {
      updatedAnswers[this.state.answerCount] = false;
      this.setState({ result: "incorrect", answerResults: updatedAnswers });
    }
    let cards = this.state.cards.map((card) => {
      card.show = card.id === id;
      return card;
    });

    let updatedCount = this.state.answerCount + 1;
    this.setState({ cards: cards, answerCount: updatedCount });
  };

  handleNext = () => {
    if (this.state.answerCount >= this.state.answerResults.length) {
      this.setState({ gameFinished: true });
    }
    let cards = this.state.cards.map((card) => {
      card.show = true;
      return card;
    });
    this.setState({
      result: "empty",
      correctIndex: this.getOneOrZero(),
      cards: cards,
      currentSelections: this.getSelections(),
    });
  };

  handleRestart = () => {
    this.setState({
      answerResults: [null, null, null, null, null],
      correctAnswers: 0,
      answerCount: 0,
      gameFinished: false,
    });
  };

  render() {
    if (!this.state.gameFinished) {
      return (
        <div className="game">
          <div className="question">
            {this.state.result !== "empty" ? (
              this.state.result === "correct" ? (
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
            {this.state.cards.map((card) => {
              return (
                <DifferenceCard
                  correct={this.state.correctIndex === card.id}
                  groceries={[
                    this.state.currentSelections[card.indexes[0]],
                    this.state.currentSelections[card.indexes[1]],
                  ]}
                  id={card.id}
                  key={card.id}
                  show={card.show}
                  onChosen={this.handleChoice}
                  onNext={this.handleNext}
                  result={this.state.result}
                />
              );
            })}
          </div>
          <div className="container_progress">
            <ProgressBar answerResults={this.state.answerResults} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="game">
          <div className="results_title">
            {this.state.correctAnswers >= 3 ? (
              this.state.correctAnswers >= 5 ? <h2>Wow... Excelent!</h2> : <h2>Nice Job!</h2>
            ) : (
              <h2>You'll do better next time</h2>
            )}
          </div>
          <div className="container_results centered">
            <div className="ratio">
              <h3>
                <span className="title_green">{this.state.correctAnswers}</span>
                /5
              </h3>
            </div>
            <button onClick={this.handleRestart} className="green_button_big">
              Go Again
            </button>
          </div>
          <div className="container_progress">
            <ProgressBar answerResults={this.state.answerResults} />
          </div>
        </div>
      );
    }
  }
}
