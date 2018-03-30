import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const Results = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const Actions = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
`;

const initialState = { round: 1, plays: [] };

class App extends Component {
  state = initialState;

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = evt => {
    switch (evt.code) {
      case "Digit1":
        this.handleClickNumber();
        break;
      case "Digit2":
        this.handleClickFizz();
        break;
      case "Digit3":
        this.handleClickBuzz();
        break;
      case "Digit4":
        this.handleClickFizzBuzz();
        break;
      default:
        break;
    }
  };

  endGame = () => {
    alert("Wrong!");
    this.setState(initialState);
  };

  advanceRound = play => {
    this.setState(state => ({
      ...state,
      round: state.round + 1,
      plays: state.plays.concat(play)
    }));
  };

  handleClickNumber = () => {
    const { round } = this.state;

    if (round % 3 === 0 || round % 5 === 0) {
      this.endGame();
    } else {
      this.advanceRound(round + "");
    }
  };

  handleClickFizz = () => {
    const { round } = this.state;

    if (round % 3 !== 0 || round % 5 === 0) {
      this.endGame();
    } else {
      this.advanceRound("Fizz");
    }
  };

  handleClickBuzz = () => {
    const { round } = this.state;

    if (round % 5 !== 0 || round % 3 === 0) {
      this.endGame();
    } else {
      this.advanceRound("Buzz");
    }
  };

  handleClickFizzBuzz = () => {
    const { round } = this.state;

    if (round % 3 !== 0 || round % 5 !== 0) {
      this.endGame();
    } else {
      this.advanceRound("FizzBuzz");
    }
  };

  render() {
    const { round, plays } = this.state;
    return (
      <Container>
        <Results>
          {plays.map((play, index) => <div key={index}>{play}</div>)}
        </Results>
        <Actions>
          <button onClick={this.handleClickNumber}>{round}</button>
          <button onClick={this.handleClickFizz}>Fizz</button>
          <button onClick={this.handleClickBuzz}>Buzz</button>
          <button onClick={this.handleClickFizzBuzz}>FizzBuzz</button>
        </Actions>
      </Container>
    );
  }
}

export default App;
