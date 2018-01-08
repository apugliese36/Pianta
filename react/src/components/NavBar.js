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
              <li className="menu-text verdant">
                  <img src='/assets/Pianta_White.png' width='68.4' height='27' alt='pianta'/>
              </li>
              <li className="verdant"><Link to='/'>Home</Link></li>
              <li className="verdant"><Link to='#'>Settings</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li className="verdant logout"><a href="/logout">Sign Out</a></li>
            </ul>
          </div>
        </div>
        <div className="stuff">{this.props.children}</div>
      </div>
    )
  }
}

export default NavBar;
