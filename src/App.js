import './App.css'
import Main1 from './components/main1.js'

const {io}= require("socket.io-client")

function App() {

  return (
    <div className="App">
     <Main1/>     
    </div>
  );
}

export default App;
