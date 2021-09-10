import React, { Component } from "react";
import Icon from "./Icon";
import checkmark from "../Assets/checkmark.png";
import cross from "../Assets/cross.png";
import "../Styles/DifferenceCard.css";

export default class DifferenceCard extends Component {
  render() {
    if (this.props.show) {
      return (
        <div className="container">
          <div className="column">
            <div className="row">
              <Icon name={this.props.groceries[0]} />
              {this.props.correct ? (
                <Icon name={this.props.groceries[0]} />
              ) : (
                <Icon name={this.props.groceries[1]} />
              )}
              {this.props.result !== "empty" ? (
                this.props.result === "correct" ? (
                  <div className="background centered">
                    <div className="green_shade"></div>
                    <img className="checkmark" src={checkmark} alt="" />
                  </div>
                ) : (
                  <div className="background centered">
                    <div className="red_shade"></div>
                    <img className="cross" src={cross} alt="" />
                  </div>
                )
              ) : null}
            </div>

            <div className="bottom centered">
              {this.props.result === "empty" ? (
                <button
                  onClick={() => this.props.onChosen(this.props.id)}
                  className="green_button"
                >
                  {this.props.correct ? "Choose" : "Choose"}
                </button>
              ) : (
                <button
                  onClick={() => this.props.onNext(this.props.id)}
                  className="green_button_big"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
