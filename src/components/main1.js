import React, { Component } from 'react';
import { Socket } from 'socket.io-client';

import Input from'./input.js'
import Main from './main.js'
const {io}= require("socket.io-client")
const socket= io('http://localhost:8000')


class Main1 extends Component {
    state = {  name:"",
    count:1 ,
    message:"",
    log:"",
    typing:"",
messages:[]} 
componentDidMount(){
    socket.on('user-joined',data=>{
        console.log(data)
        this.settingstate(data);
    
    })
    socket.on('message',data=>{
        console.log(data.name)
        this.settingstate(data);
    
    })
    socket.on('typing',data=>{
        this.setState({typing:data},()=>{
            setTimeout(()=>{
                this.setState({typing:""})
            },1000)

            })
    })

    }

    settingstate=(data)=>{
        let msg=[...this.state.messages]
    msg=[...msg,{name:data.name,message:data.data}]
    this.setState({messages:msg})
    }
    onnamechange=(e)=>{
        this.setState({name:e.target.value})
        console.log(this.state.name)
    }
    onclick=(e)=>{
        console.log(this.state.name)
        if(this.state.name.length>0){

            this.setState({count:2})
        }
        else{
            this.setState({log:"Please Enter Your Name To Enter Chat!"})
            setTimeout(()=>{
                this.setState({log:""})
    
                },3000)

        }
        
        socket.emit('new-user',this.state.name)
       
    }
    onclicks=()=>{
        console.log("eee")
        socket.emit('test',"arena")
    }
    onchange=(e)=>{
        this.setState({message:e.target.value},()=>console.log(this.state))
        socket.emit('typing','typing')
}
onsubmit=()=>{
    socket.emit('message',this.state.message)
    let msg=[...this.state.messages]
    msg=[...msg,{name:"You",message:this.state.message,class:"flex-end"}]
    this.setState({messages:msg})
    this.setState({message:""},()=>{
        console.log(this.state)
    })
}
    renderthis=()=>{
        switch(this.state.count){
          case 1:return <Input log={this.state.log} click={this.onclick}  name={this.onnamechange}/>
          case 2:return <Main typing={this.state.typing} click={this.onsubmit} value={this.state.message} change={this.onchange} clicks={this.onclicks} messages={this.state.messages}/>
    
        }
      }
    render() { 
        return (
            <div className="App">
             {this.renderthis()}      
            </div>
          );
    }
}
 
export default Main1;