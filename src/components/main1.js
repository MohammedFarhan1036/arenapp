import React, { Component } from 'react';

import Input from'./input.js'
import Main from './main.js'
const {io}= require("socket.io-client")
//const socket= io('http://localhost:5500')
const socket= io('https://mysterious-headland-30906.herokuapp.com')


class Main1 extends Component {
    state = {  name:"",
    count:1,
    message:"",
    log:"",
    typing:"",
messages:[]} 
componentDidMount(){
    console.log("hello")
    socket.on('user-joined',data=>{
        this.settingstate(data);
    
    })
    socket.on('message',data=>{
        console.log(data)
        this.settingstate(data);
        window.scrollBy(0,2000)
    
    })
    socket.on('typing',data=>{
        console.log('typing')
        this.setState({typing:data},()=>{
            setTimeout(()=>{
                this.setState({typing:""})
            },2000)

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
    }
    onclick=(e)=>{
        
        if(this.state.name.length>0){

            this.setState({count:2})
            //fetch('http://localhost:5500/message',{
           /*fetch('https://mysterious-headland-30906.herokuapp.com/message',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:"Farhan"})
            }).then(res=>res.json()).then(messages=>{
                messages.forEach(message => {
                    let messages=[...this.state.messages]
                    let class1= message.name===this.state.name?'flex-end':'';
                    let name=message.name===this.state.name?'You':message.name;
                     messages=[...messages,{name,message:message.message,class:class1}]
                     this.setState({messages})
                    
                })
            })*/
            socket.emit('new-user',this.state.name)
        }
        else{
            this.setState({log:"Please Enter Your Name To Enter Chat!"})
            setTimeout(()=>{
                this.setState({log:""})
    
                },3000)

        }
        
       
    }
    onclicks=()=>{
        socket.emit('test',"arena")
    }
    onchange=(e)=>{
        this.setState({message:e.target.value})
        socket.emit('typing','typing')
}
onsubmit=()=>{
    
    if(this.state.message.length>0){

        socket.emit('message',this.state.message)
        let msg=[...this.state.messages]
        msg=[...msg,{name:"You",message:this.state.message,class:"flex-end"}]
        this.setState({messages:msg})
        this.setState({message:""},()=>{
        })
    }
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