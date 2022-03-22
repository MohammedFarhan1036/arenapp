import React, { Component } from 'react'
import Message from "./message.js"
import {Socket} from 'socket.io-client'
const {io}= require("socket.io-client")

const socket= io('http://localhost:8000')


class Main extends Component {
    state = {
        message:"",
        messages:[]  
    }
    




    

    render() { 
        
        return (
            <React.Fragment>

    
                <div className='main'>
                    <div className='container'>
                                <ul className="ul">{this.props.messages.map((message,index)=><li style={{alignSelf:`${message.class}`}}className={"li"}>
                                   
                                    <Message key={index} name={message.name} message={message.message}/>
                                    </li>)}</ul>

                    </div>
        
                    <div className='input'>
                            <input  value={this.props.value}onChange={this.props.change}></input>
                            <button onClick={this.props.click}>submit</button>
                    </div>
                </div>
                
            </React.Fragment>
        
        );
    }
}
 
export default Main;