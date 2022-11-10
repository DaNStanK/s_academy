import { Component } from "react"

export class LifecycleClassComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            counter : 0,
        }
    }

    increment = () => {
        this.setState((state) => ({counter: (state.counter + this.props.incrementor)}))
    }

    render(){
        console.log('LifecycleClassComponent -> render')
        return (<>
            <h2>Class Component</h2>
            <p>Counter value : {this.state.counter}</p>
            <button
                onClick={this.increment}
            >Increment</button>
        </>)
    }
}