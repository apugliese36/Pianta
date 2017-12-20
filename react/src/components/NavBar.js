import React, { Component } from 'react';
import { Link } from 'react-router';

class NavBar extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu">
              <li className="menu-text">REACT ROUTER</li>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/greeting'>Greeting</Link></li>
              <li><Link to='/goodbye'>Goodbye</Link></li>
              <li><Link to='/customgreeting'>Custom Greeting</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li><a href="#">Sign up</a></li>
              <li><a href="#">Sign In</a></li>
            </ul>
          </div>
        </div>
        <div className="stuff">{this.props.children}</div>
      </div>
    )
  }
}

export default NavBar;
