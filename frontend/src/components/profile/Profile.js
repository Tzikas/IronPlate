import React, { Component } from 'react';

class Profile extends Component  {
    state = {}

    componentDidMount() {
        if(!this.props.user.email){ 
            this.props.history.push('/log-in') 
        }   
    }
    displayCocktails = () => {
        let favCocktails = this.props.user.favCocktails
    
       return favCocktails.map(cocktail => {
            return <li>{cocktail.drinkName}</li>

        }) 
    }

    render(){
        return (
            <div>
                Profile
                Welcome {this.props.user.email} !!! 
                {this.props.user.favCocktails ? <ul>{this.displayCocktails()}</ul> : ''}
            </div>
        );
    }

    }


export default Profile;