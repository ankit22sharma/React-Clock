import React, { Component } from "react";
import "./style.css";

export default class ReactClock extends Component {
  state = {
    day: "",
    time: "",
    format24: false,
    date: "",
    dateVisible: false,
    btn24hr: "toggle-inactive",
    btnDate: "toggle-inactive"
  };

  componentDidMount() {
    this.id = setInterval(() => this.time(), 100);
  }
  componentWillUnmount() {
    clearInterval(this.id);
  }
  time = () => {
    let today = new Date();
    let time = today.toLocaleTimeString();
    this.setState({
      time: time
    });
  };
  dateSet = async () => {
    await this.setState({ dateVisible: !this.state.dateVisible });
    this.toggle("date");
    if (this.state.dateVisible) {
      this.id2 = setInterval(() => {
        let today = new Date();
        let date = today.toDateString();
        this.setState({
          date: date
        });
      }, 100);
    } else {
      clearInterval(this.id2);
      await this.setState({
        date: ""
      });
    }
  };
  set24hr = async () => {
    await this.setState({ format24: !this.state.format24 });
    this.toggle("24hr");
    if (this.state.format24) {
      clearInterval(this.id);
      this.set1 = () => {
        let today = new Date();
        let hh = today.getHours();
        let mm = today.getMinutes();
        let ss = today.getSeconds();
        if (mm < 10) {
          mm = `0${mm}`;
        }
        if (ss < 10) {
          ss = `0${ss}`;
        }

        let time = `${hh}:${mm}:${ss}`;
        this.setState({
          time: time
        });
      };

      this.id = setInterval(() => this.set1(), 100);
    } else {
      clearInterval(this.id);
      this.componentDidMount();
    }
  };
  toggle = id => {
    if (id === "24hr") {
      switch (this.state.btn24hr) {
        case "toggle-inactive":
          this.setState({ btn24hr: "toggle-active" });
          break;
        case "toggle-active":
          this.setState({ btn24hr: "toggle-inactive" });
          break;
        default:
      }
    } else {
      switch (this.state.btnDate) {
        case "toggle-inactive":
          this.setState({ btnDate: "toggle-active" });
          break;
        case "toggle-active":
          this.setState({ btnDate: "toggle-inactive" });
          break;
        default:
      }
    }
  };
  render() {
    return (
      <div className="container">
        <div className="title">
          <i className="far fa-clock" style={{ marginRight: 15 }} /> React Clock
        </div>
        <div className="Options">
          <div className={this.state.btnDate} onClick={() => this.dateSet()}>
            <div className="inner-circle" />
          </div>
          <i className="far fa-calendar-alt" style={{ marginRight: 100 }} />

          <div className={this.state.btn24hr} onClick={() => this.set24hr()}>
            <div className="inner-circle" />
          </div>
          <i className="fas fa-hourglass-start" />
        </div>
        <div className="view">
          <div className="timeView">{this.state.time}</div>
          <div className="dateView">{this.state.date}</div>
        </div>
      </div>
    );
  }
}
