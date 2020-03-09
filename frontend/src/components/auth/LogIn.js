import React, { Component, Fragment } from 'react';
import actions from '../../services/index'

class LogIn extends Component {

    state = {

    } 
    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = async e => {
        e.preventDefault()
        try{
            let user = await actions.logIn(this.state);
            this.props.setUser({...user.data})  
            this.props.doFlashMessage('Logged In Successfully', true)


        }catch(err){
            console.log('=-=-=-=-=-',err.response.data)

            if(err.response.data ==="Unauthorized"){
                // this function is fake because we're not actually passing it in
                // look at the full-stack-library-app to see how to pass in this function for flash messages
                this.props.doFlashMessage('Email/Password Combination Incorrect, please check credentials and try again', false)
            } else if(err.response.data ==="Bad Request"){
                this.props.doFlashMessage('Please make sure to enter an Email AND Password', false)
            }
        }
    }
    render() {
        return (
            <Fragment>
                <h2>LogIn</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="email" type="email" onChange={this.handleChange} />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <input type="submit" value="Log In"/>
                </form>
            </Fragment>
        );
    }
}

export default LogIn;