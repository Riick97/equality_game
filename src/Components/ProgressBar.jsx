import React, { Component } from 'react'
import "../Styles/ProgressBar.css";

export default class ProgressBar extends Component {

    render() {
        return (
          <div className="container centered">
            {this.props.answerResults.map((result, index) => {
              if (result === true) {
                return <div key={index} className="circle_correct"></div>;
              } else if (result === false) {
                return <div key={index} className="circle_wrong"></div>;
              } else {
                return <div key={index} className="circle"></div>;
              }
            })}
          </div>
        );
    }
}
