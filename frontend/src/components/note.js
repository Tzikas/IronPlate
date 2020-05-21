import React, { Component } from "react";
import actions from "../services/index";

class note extends Component {
  state = {
    notes: [],
  };
  componentDidMount(){
    this.createNotes()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.title]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let res = actions.inputNotes(this.state).then((res) => {
      console.log("is it working");
      this.props.history.push("./note");
    });
  };
  createNotes= async()=>{
    let res= await actions.showNotes();
    console.log(res)
    this.setState({
      notes: res.data
    })
  }
  printNotes = () => {
    return this.state.notes.map((eachNote) => {
      return <h3>{eachNote.question}</h3>;
    });
  };

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h4>Make your own notes</h4>
        <div className="md-form md-outline">
          <textarea
            onChange={(e) => this.handleChange(e)}
            id="form75"
            className="md-textarea form-control"
            rows="3"
          ></textarea>
          <label htmlFor="form75">Notes</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {this.printNotes()}
      </form>
    );
  }
}

export default note;
