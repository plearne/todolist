import React, {Component} from 'react';
import './Manager.css';
import './iconfont/iconfont.css'
import {jsonDeepCopy} from './leanCloud'
export default class Manager extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: '',
      showUserAccount: false,
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
    let todosDoing = this.props.todos.filter(item => {
      return item.deleted === false && item.status !== 'completed'
    })
    let todosDone = this.props.todos.filter(item => {
      return item.status === 'completed'
    })
    let todosDelete = this.props.todos.filter(item => {
      return item.deleted === true
    })
    return (
      <div className="manager">
        <nav className="search">
          <input type="text" value={this.state.search}
            onChange={this.onChange.bind(this)} />
          <i className="iconfont icon-sousuo-sousuo"></i>
        </nav>
        <div className="user row" onClick={null}>
          <div className="user-name">{this.props.user.substr(0,1).toUpperCase()}</div>
          <div className="user-text">{this.props.user}</div>
          <div className="user-account">
            <div className="iconfont icon-chevron-copy-copy-copy"></div>
            {this.state.showUserAccount === true ?
            userAccount :
            null }
          </div>
        </div>
        <div className="row" onClick={this.props.onShowUnderTodos.bind(null)}>
          <i className="iconfont icon-youxiang"></i>
          <span className="inbox row"> 进行中</span>
          <div className="count">{todosDoing.length}</div>
        </div>
        <div className="row" onClick={this.props.onShowTodosDone.bind(this)}>
          <i className="iconfont icon-youxiang"></i>
          <span className="inbox row"> 已完成</span>
          <div className="count">{todosDone.length}</div>
        </div>
        <div className="row" onClick={this.props.onShowTodosDelete.bind(null)}>
          <i className="iconfont icon-youxiang"></i>
          <span className="inbox row"> 归档</span>
          <div className="count">{todosDelete.length}</div>
        </div>

      </div>
    )
  }
  onChange(e){
    let stateCopy = jsonDeepCopy.call(this);
    stateCopy.search = e.target.value;
    this.setState(stateCopy)
  }
}