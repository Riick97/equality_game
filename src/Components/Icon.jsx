import React, { Component } from "react";
import mango from "../Assets/mango.png";
import carrot from "../Assets/carrot.png";
import apple from "../Assets/apple.png";
import cherry from "../Assets/cherry.png";
import kiwifruit from "../Assets/kiwifruit.jpeg";
import watermelon from "../Assets/watermelon.png";

export default class Icon extends Component {
  getImageSource(param) {
    switch (param) {
      case "mango":
        return mango;
      case "carrot":
        return carrot;
      case "apple":
        return apple;
      case "cherry":
        return cherry;
      case "kiwifruit":
        return kiwifruit;
      case "watermelon":
        return watermelon;
      default:
        return mango;
    }
  }

  render() {
    return (
      <div style={{ zIndex: -3 }}>
        <img style={{height: 'auto', width: '85px'}} src={this.getImageSource(this.props.name)} alt="" />
      </div>
    );
  }
}
