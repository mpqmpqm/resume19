import React from 'react';
import './App.css';

class App extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      apiReponse: ''
    }
  }

  callAPI() {
    fetch('http://localhost:9000/testAPI')
    .then (response => response.text())
    .then (response => {
      this.setState({apiReponse: response})
    })
  }

  postAPI() {
    fetch('http://localhost:9000/testAPI', 
      {method: 'POST', 
      type: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({user:'MPQ', enby: 'true'})
  }
  )
    .then (response => response.text())
    .then (response => {
      this.setState({apiReponse: JSON.parse(response)})
    })
  }

  componentDidMount () {
    this.postAPI();
  }

  render () {
    return (
    <div>
      <h1>{this.state.apiReponse.user}</h1>
      <h1>{this.state.apiReponse.enby}</h1>
    </div>
    )
  }
}

export default App;
