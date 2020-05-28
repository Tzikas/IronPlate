import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const CardExample = (props) => {
  return (
    <MDBCol className="drinkCard">
      <MDBCard>
        <MDBCardImage className="img-fluid" src={props.strDrinkThumb}
          waves />
        <MDBCardBody>
          <MDBCardTitle>{props.strDrink}</MDBCardTitle>
          <MDBCardText>{props.strIngredient1}-{props.strMeasure1}</MDBCardText>
          <MDBCardText>{props.strIngredient2}-{props.strMeasure2}</MDBCardText>
          <MDBCardText>{props.strIngredient3}-{props.strMeasure3}</MDBCardText>
          <MDBCardText>{props.strInstructions}</MDBCardText>
          {/* <MDBCardText>{props.strMeasure1}</MDBCardText>
          <MDBCardText>{props.strMeasure2}</MDBCardText>
          <MDBCardText>{props.strMeasure3}</MDBCardText>
          <MDBCardText>{props.strMeasure4}</MDBCardText> */}
          <MDBBtn onClick={() =>props.favCocktail(props)}>Save</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardExample;



  /* {eachDrink.strDrink}!
                    {eachDrink.strCategory}!
                    <img src={eachDrink.strDrinkThumb} />
                    {eachDrink.strIngredient1}
                    {eachDrink.strIngredient2}
                    {eachDrink.strIngredient3}
                    {eachDrink.strInstructions}
                    {eachDrink.strMeasure1}
                    {eachDrink.strMeasure2}
                    {eachDrink.strMeasure3}
                    {eachDrink.strMeasure4}
          <button onClick = { () =>this.favCocktail(eachDrink)}>Save</button>
           */