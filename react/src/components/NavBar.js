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
            <ul className="menu verdant">
              <li className="menu-text verdant">Pianta</li>
              <li className="verdant"><Link to='/'>Home</Link></li>
              <li className="verdant"><Link to='/greeting'>Setting</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li className="verdant"><a href="#">Sign Out</a></li>
            </ul>
          </div>
        </div>
        <div className="stuff">{this.props.children}</div>
      </div>
    )
  }
}

export default NavBar;
