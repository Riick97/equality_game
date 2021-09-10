import Icon from "./Icon";
import checkmark from "../Assets/checkmark.png";
import cross from "../Assets/cross.png";
import "../Styles/DifferenceCard.css";
import { useTransition, animated } from "react-spring";

export default function DifferenceCard(props) {
  const transition = useTransition(props.show, {
      from: {x: -100, y: 800, opacity: 0},
      enter: {x: 0, y: 0, opacity: 1},
      leave: {x: 100, y: 800, opacity: 0},
  });

  return transition((style, item) =>
    item ? (
      <animated.div style={style} className="container">
        <div className="column">
          <div className="row">
            <Icon name={props.groceries[0]} />
            {props.correct ? (
              <Icon name={props.groceries[0]} />
            ) : (
              <Icon name={props.groceries[1]} />
            )}
            {props.result !== "empty" ? (
              props.result === "correct" ? (
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
            {props.result === "empty" ? (
              <button
                onClick={() => props.onChosen(props.id)}
                className="green_button"
              >
                {props.correct ? "Choose" : "Choose"}
              </button>
            ) : (
              <button
                onClick={() => props.onNext(props.id)}
                className="green_button_big"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </animated.div>
    ) : null
  );
}
