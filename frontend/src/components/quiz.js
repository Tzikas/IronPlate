import React, { Component } from "react";
import actions from "../services/index";

class quiz extends Component {
  state = {
    questions: [],
    answer: "",
    correct:0,
    incorrect:0,
  };

  async componentDidMount() {
    let res = await actions.getQuestions();
    console.log(res);
    this.setState({
      questions: res.data,
    });
  }
  answerQuestion = (choice, answer) => {
    console.log(choice, answer);
    if (choice !== answer) {
       alert("incorrect");
       this.setState({
        incorrect: this.state.incorrect +1
       })
    } else {
     alert("correct");
     this.setState({
         correct: this.state.correct +1
     })
    }
  };
  showQuestions = () => {
    return this.state.questions.map((eachQuestion) => {
      let buttons = eachQuestion.choices.map((choice) => {
        return (
          <button
            onClick={() => this.answerQuestion(choice, eachQuestion.answer)}
          >
            {choice}
          </button>
        );
      });
      return (
        <li>
          {eachQuestion.question}
          {buttons}
        </li>
      );
    });
  };

  render() {
    return (
      <div className="question">
        <h2>Choose the correct answer</h2>
        <h3>Correct:{this.state.correct}</h3>
        <h3>Incorrect:{this.state.incorrect}</h3>
        {this.showQuestions()}
        
      </div>
    );
  }
}

export default quiz;
