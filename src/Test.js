import React from 'react'
import PlusButton from './PlusButton'
import MinusButton from './MinusButton'
import ResetButton from './ResetButton'

export default class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            num: 0
        }
        this.increaseNumber = this.increaseNumber.bind(this)
        this.decreaseNumber = this.decreaseNumber.bind(this)
        this.resetNumber = this.resetNumber.bind(this)
    }

    increaseNumber() {
        this.setState({
            num: this.state.num + 1
        })
    }

    decreaseNumber() {
        this.setState({
            num: this.state.num - 1
        })
    }

    resetNumber() {
        this.setState({
            num: 0
        })
    }

    render(){
        return(
            <div>
                {this.state.num}
                <hr/>
                <PlusButton onClick={this.increaseNumber}/>
                <MinusButton onClick={this.decreaseNumber}/>
                <ResetButton onClick={this.resetNumber}/>
            </div>
        )
    }
}
