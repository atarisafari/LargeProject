import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {login} from './utils/apiCalls';
import HomeButton from './components/buttons/homeButton';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: 'False',
      username: '',
      password:'',
    }
  }
  render() {
    const {username,password} = this.state;

    const loginHandler = async() =>{
        let data = await login(username,password);
        console.log("Result" , data);
        if(data.error === ""){
            console.log("Login was successful");
            localStorage.setItem('token', data.token);
            this.props.history.push("/home");
        }
        else{
            alert(data.error);
        }      
  }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div id="username_login">
            Username:
            <input value={username} onChange= { e => this.setState({...this.state, username: e.target.value})}/>
          </div>
          <div id="password_login">
            Password: 
            <input type='password' value={password} onChange= { e => this.setState({...this.state, password: e.target.value})}/>
          </div>
          <button onClick={()=>loginHandler()}> LOGIN </button>
          <HomeButton path='/signUp' {...this.props}>SIGN UP</HomeButton>
        </header>
      </div>
    );
  }
}

export default App;
