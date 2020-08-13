import React, { Component } from 'react'

class Gamefnc extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            divIndex : [0,1,2,3,4,5,6,7,8],
            istriggered : [false,false,false,false,false,false,false,false,false],
            playCycleStarts : true,
            winningCombination : [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ],
            gameEntries : [],
            result : '',
            modalDisplay : {}
        }
    }
    checkForWinner =(currentPlayer) =>{
        return this.state.winningCombination.some((individual) => {
            return individual.every((index) => {
                return this.state.gameEntries[index] === currentPlayer ;
            })
        });
    }

    checkForDraw =()=>{
        return this.state.istriggered.every(entry => entry === true )
    }

    checkForResult = (currentPlayer)=>{
        const modalDisplay ={
            display : 'block'
        }

        if(this.checkForWinner(currentPlayer)){
            this.setState({
                result : `${currentPlayer} Won`,
                modalDisplay : modalDisplay
            })
        } else if(this.checkForDraw()){
            this.setState({
                result : 'Match Draw' ,
                modalDisplay : modalDisplay
            })
        }
    }

    changingTheState =(clickedDivId, currentPlayer)=>{
        let cpyOfIsTriggeredArr = [...this.state.istriggered];
        let cpyOfGameEntriesArr =[...this.state.gameEntries];
        cpyOfIsTriggeredArr[clickedDivId] = true;
        cpyOfGameEntriesArr[clickedDivId] = currentPlayer;

        this.setState({
            istriggered : cpyOfIsTriggeredArr,
            gameEntries : cpyOfGameEntriesArr,
            playCycleStarts : !this.state.playCycleStarts
        }, ()=> {this.checkForResult(currentPlayer)})
    }

    handleInput = (e) => {
        let currentPlayer;
        currentPlayer = this.state.playCycleStarts? 'X' : 'O'
        const clickedDivId = +e.target.id;
        if(!this.state.istriggered[clickedDivId]){
            this.changingTheState(clickedDivId, currentPlayer);

        }        
    }

    handleRestart =()=>{
        this.setState({
            istriggered : [false,false,false,false,false,false,false,false,false],
            playCycleStarts : true,
            gameEntries : [],
            result : '',
            modalDisplay : {}
        })

    }
    render() {
        return (
            <div className='container'>
                <div className='board'>
                    {
                        this.state.divIndex.map((div) => <div className="cell" key={div} id={div} onClick={this.handleInput}>{this.state.gameEntries[div]}</div>)
                    }
                </div>
                <div className="message-box" style={this.state.modalDisplay}>
                    <div className="message">
                        <h1><span className="result">{this.state.result}</span></h1>
                        <button className="restart-btn" onClick={this.handleRestart}>Restart</button>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Gamefnc
