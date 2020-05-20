import React, { Component } from "react";
import actions from "../services/index";

class quiz extends Component {
  state = {
    questions: [],
    answer: "",
  };

  async componentDidMount() {
    let res = await actions.getQuestions();
    console.log(res);
    this.setState({
      questions: res.data,
    });
  }
//   handleSubmit(e) {

//   }
//   handleChange(e) {
//     this.setState({
//       answer: e.target.value,
//     });
//   }
  showQuestions = () => {
    return this.state.questions.map((eachQuestion) => {
      return (
        <li key={eachQuestion._id}>
          {eachQuestion.question}
          <button onClick={this.answerQuestions}>
            {eachQuestion.choices[0]}
          </button>
          <button onClick={this.answerQuestions}>
            {eachQuestion.choices[1]}
          </button>
          <button onClick={this.answerQuestions}>
            {eachQuestion.choices[2]}
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="question">
        {/* <form onSubmit={(e) => this.handleSubmit(e)}>
          <input name="radio" onChange={(e) => this.handleChange(e)} />
        </form> */}
        {this.showQuestions()}
        {/* {this.answerQuestions()} */}
      </div>
    );
  }
}

export default quiz;
