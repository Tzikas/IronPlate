import React, { Component } from 'react';
import actions from '../services/index'

class quiz extends Component {
    state={
        questions:[]
    }

    async componentDidMount(){
        let res= await actions.getQuestions()
        console.log(res)
        this.setState({
            questions: res.data
        })
    }
    showQuestions=()=>{
        return this.state.questions.map((eachQuestion)=>{
            return (
                <li key={eachQuestion._id}>
            {eachQuestion.question}
            {eachQuestion.choices}
                </li>
                
            )
        })
    }
     backendCall= async()=>{
        let res= await actions.getQuizzes()
        console.log(res)
    }
    render() {
        return (
            <div>
                quiz
               <button onClick={this.backendCall}>Click</button>
               {this.showQuestions()}
            </div>
        );
    }
}

export default quiz;