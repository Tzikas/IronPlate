import React, { Component } from "react";
import actions from "../services/index";
import {
  MDBContainer,
  MDBCollapse,
  MDBCard,
  MDBCardBody,
  MDBCollapseHeader,
} from "mdbreact";

class definition extends Component {
  state = {
    definition: [],
    collapseID: "collapse3",
  };
  async componentDidMount() {
    let res = await actions.getDefinitions();
    console.log(res);
    this.setState({
      definition: res.data,
    });
  }
  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  showDefinitions = () => {
    return this.state.definition.map((eachDefinition) => {
      return (
        <li key={eachDefinition._id}>
          {eachDefinition.word}
          {eachDefinition.definition}
        </li>
      );
    });
  };

//   render() {
  //     return (
    //       <div>
    //         <h1>Definitions</h1>
    // {this.showDefinitions()}
//       </div>
//     );
//   }
// }
render() {
  const { collapseID } = this.state;
  
  return (
    <MDBContainer>
      <h2>Definitions</h2>
        <MDBContainer className="mt-5">
          <MDBCard className="mt-3">
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse1")}>
            JavaScript
              <i className={ collapseID==="collapse1" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse1" isOpen={collapseID}>
              <MDBCardBody>
              definition: an object-oriented computer programming language commonly used to create interactive effects within web browsers.
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard>
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse2")}>
            HTML
              <i className={ collapseID==="collapse2" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse2" isOpen={collapseID}>
              <MDBCardBody>
              definition: Hypertext Markup Language, a standardized system for tagging text files to achieve font, color, graphic, and hyperlink effects on World Wide Web pages.
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard>
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse3")}>
            CSS
              <i className={ collapseID==="collapse3" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse3" isOpen={collapseID}>
              <MDBCardBody>
              definition: Cascading style sheets are used to format the layout of Web pages. They can be used to define text styles, table sizes, and other aspects of Web pages that previously could only be defined in a page's HTML.
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>
        </MDBContainer>
      </MDBContainer>
      );
    }
  }

export default definition;

