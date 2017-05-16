import React, {Component} from 'react';
import './Manager.css';

export default class Manager extends Component {
  constructor(props){
    super(props)
    this.state = {
      showUserAccount: false,
      username: 'Plearner'
    }
  }
  render(){
    let userAccount = (
      <div className="user-account">
        <div className="row logout">
          登出
        </div>
      </div>
    )
    return (
      <div className="manager">
        <nav className="search">
          <input type="text"/>
        </nav>
        <div className="user row">
          <span className="user-icon">{this.state.username}</span>
          <div className="user-account">{null}
            <span className="menu">&#62;</span>
            {this.state.showUserAccount === true ?
            userAccount :
            null }
          </div>
        </div>
        <div className="inbox row">收件箱</div>
      </div>
    )
  }
}