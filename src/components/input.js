import React, { Component } from 'react';
class Input extends Component {
    state = {  } 
    render() { 
        return (
            <div className="displayinput">
                <p className='pare'>ARENAPP</p>
                <div className='img'>

                </div>
                <div className='inputd'>
                    <p>Enter Your Name To Join The Chat : </p>
                <input  type="text" onChange={this.props.name}></input>
                <button onClick={this.props.click}>Submit</button>

                </div>
                <p className='pa'>{this.props.log}</p>

            </div>
        );
    }
}
 
export default Input;