import React from 'react';
import './App.css';

class App extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      apiReponse: '',
      formValue: ''
    }
  }

  handleChange = (event) => {
    this.setState({formValue: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()  
    this.postAPI (this.state.formValue);
    this.setState({formValue: ''})
    event.target.focus()
  }

  callAPI = () => {
    fetch('http://localhost:9000/testAPI')
    .then (response => response.text())
    .then (response => {
      this.setState({apiReponse: response})
    })
  }

  postAPI = (userInput) => {
    fetch('http://localhost:9000/testAPI', 
      {
        method: 'POST', 
        type: 'application/json',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input:userInput, timestamp: new Date()})
      } 
    )
    .then (response => response.text())
    .then (response => {
      this.setState({apiReponse: JSON.parse(response)})
    })
  }

  componentDidMount () {
    // this.postAPI();
  }

  render () {
    return (
    <div>

      <form onSubmit= {this.handleSubmit}>
        <input type= 'text' value = {this.state.formValue} onChange={this.handleChange}/>
        <button>Submit</button>
      </form>

      <h1>{this.state.apiReponse.input}</h1>
      <h1>{this.state.apiReponse.timestamp}</h1>
    </div>
    )
  }
}

export default App;
