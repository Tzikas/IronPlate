import React, { Component, Fragment } from 'react';
import actions from '../../services/index'

class SignUp extends Component {
    state = {

    } 
    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = async e => {
        e.preventDefault()
        try{
            let user = await actions.signUp(this.state);
            this.props.setUser({...user.data})  
        } catch(err){
            console.log('*****',err.message)
        }
    }
    render() {
        return (
            <Fragment>
                <h2>SignUP</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="email" type="email" onChange={this.handleChange} />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <input type="submit" value="Sign Up"/>
                </form>
            </Fragment>
        );
    }
}

export default SignUp;