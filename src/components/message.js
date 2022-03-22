import React, { Component } from 'react';
class Message extends Component {
    state = {  } 
    render() { 
        return (
           <p>

               {this.props.name}  :  {this.props.message}
              
               
       
           </p>

          

            
            );
    }
}
 
export default Message ;