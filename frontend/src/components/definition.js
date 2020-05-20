import React, { Component } from 'react';
import actions from "../services/index";

class definition extends Component {
  state={
    definition:[],
  }
    async componentDidMount() {
        let res = await actions.getDefinitions();
        console.log(res);
        this.setState({
          definition: res.data,
        });
      }
     showDefinitions=()=>{
        return this.state.definition.map((eachDefinition) => {
            return (
              <li key={eachDefinition._id}>
                {eachDefinition.word}
                {eachDefinition.definition}
                  
              </li>
            )
        })
     }

    render() {
        return (
            <div>
            <h1>Definitions</h1>
                {this.showDefinitions()}
            </div>
        );
    }
}

export default definition;