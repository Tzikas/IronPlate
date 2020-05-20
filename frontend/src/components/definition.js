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
//         {this.showDefinitions()}
//       </div>
//     );
//   }
// }
render() {
  const { collapseID } = this.state;
    return (
      <MDBContainer>
        <MDBContainer className="mt-5">
          <MDBCard className="mt-3">
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse1")}>
              Collapsible Group Item #1
              <i className={ collapseID==="collapse1" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse1" isOpen={collapseID}>
              <MDBCardBody>
                Pariatur cliche reprehenderit, enim eiusmod high life accusamus
                terry richardson ad squid. 3 wolf moon officia aute, non
                cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                bird on it squid single-origin coffee nulla assumenda shoreditch
                et. Nihil anim keffiyeh helvetica, craft beer labore wes
                anderson cred nesciunt sapiente ea proident. Ad vegan excepteur
                butcher vice lomo. Leggings occaecat craft beer farm-to-table,
                raw denim aesthetic synth nesciunt you probably haven&apos;t
                heard of them accusamus labore sustainable VHS.
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard>
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse2")}>
              Collapsible Group Item #2
              <i className={ collapseID==="collapse2" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse2" isOpen={collapseID}>
              <MDBCardBody>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven&apos;t heard of them accusamus labore sustainable VHS.
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>

          <MDBCard>
            <MDBCollapseHeader onClick={this.toggleCollapse("collapse3")}>
              Collapsible Group Item #3
              <i className={ collapseID==="collapse3" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
            </MDBCollapseHeader>
            <MDBCollapse id="collapse3" isOpen={collapseID}>
              <MDBCardBody>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua
                put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                wes anderson cred nesciunt sapiente ea proident. Ad vegan
                excepteur butcher vice lomo. Leggings occaecat craft beer
                farm-to-table, raw denim aesthetic synth nesciunt you probably
                haven&apos;t heard of them accusamus labore sustainable VHS.
              </MDBCardBody>
            </MDBCollapse>
          </MDBCard>
        </MDBContainer>
      </MDBContainer>
      );
    }
  }

export default definition;

//   render() {
//     return (
//       <div>
//         <h1>Definitions</h1>
//         {this.showDefinitions()}
//       </div>
//     );
//   }
// }
