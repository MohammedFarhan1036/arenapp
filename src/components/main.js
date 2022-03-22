import React, { Component } from 'react'
import Message from "./message.js"
import {Socket} from 'socket.io-client'
const {io}= require("socket.io-client")

const socket= io('https://young-eyrie-15600.herokuapp.com/')


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

                    <p>{this.props.typing}</p>
                    </div>
        
                    <div className='input'>
                            <input className='form-control' value={this.props.value}onChange={this.props.change}></input>
                            <button className='btn btn-dark btn-sm' onClick={this.props.click}>Send</button>
                    </div>
                </div>
                
            </React.Fragment>
        
        );
    }
}
 
export default Main;