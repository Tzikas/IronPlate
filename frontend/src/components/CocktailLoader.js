import React, { Component } from 'react';

class CocktailLoader extends Component  {
    state = {
        percent: 0
    }

    componentDidMount() {
        

        this.loadCocktail()
    }

    loadCocktail = () => {
        let int = setInterval(()=>{
            let percent = this.state.percent;
            console.log(percent)

            percent+=1
            this.setState({percent})

            if(percent >= 100){
                clearInterval(int)
                this.props.setLoadingToFalse()
            }
        },10)
    }

    render(){
        let style = {
            top: (100-this.state.percent*.9)+'%'
        }
        return (
            <div>
                <div id="loader">
                <div id="lemon"></div>
                <div id="straw"></div>
                <div id="glass">
                    <div id="cubes">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div id="drink" style={style}></div>
                    <span id="counter">{this.state.percent}%</span>
                </div>
                <div id="coaster"></div>
            </div>

            <footer>Please wait while we fill up your glass...</footer>
            </div>
        );
    }

    }


export default CocktailLoader;