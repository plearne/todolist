import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import AV, {getCurrentUser, signOut, jsonDeepCopy} from './leanCloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || '',
      newTodo: "",
      todoList:[]
    }
  }
  componentWillMount(){
    this.fetchData.call(this)
  }
  render() {
     let todos = this.state.todoList
         .filter((item)=>!item.deleted)
         .map((item,index)=>{
      return (
        <li key={index} >
          <TodoItem todo={item} onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)} />
        </li>
      )
    })

    return (
      <div className="App">
        <h1>{this.state.user||'我'}的待办
          {this.state.user ? <button onClick={this.signOut.bind(this)}>登出</button> : null }</h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user ? 
          null : 
          <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this,'signUp')}
          onSignIn={this.onSignUpOrSignIn.bind(this,'signIn')}
          />}
      </div>
    );
  }
  onSignUpOrSignIn(key,user){
    let stateCopy = jsonDeepCopy.call(this)
    //得到该用户对象的username属性
    stateCopy.user = user.get('username')
    if(key === 'signUp'){
      this.setState(stateCopy)
    }else if(key === 'signIn'){
      this.fetchData.call(this)
    }
  }
  fetchData(){
    let stateCopy = jsonDeepCopy.call(this)
    let user = AV.User.current()
    if(user){
      stateCopy['user'] = user.get('username')
      let id = user.get('todoListId')
      let TodoList = AV.Object.extend('TodoList')
      let todoList = new TodoList()
      todoList.id = id
      todoList.fetch().then((todo)=>{
        stateCopy.todoList = todo.get('todoList')
        this.setState(stateCopy)
      })      
    }else {
      return
    }

  }
  signOut(){
    signOut()
    let stateCopy = jsonDeepCopy.call(this)
    stateCopy.user = ''
    stateCopy.todoList = []
    this.setState(stateCopy)
  }

  delete(event,todo){
    let index = this.state.todoList.indexOf(todo)
    let stateCopy = jsonDeepCopy.call(this)
    stateCopy.todoList[index].deleted = true
    this.saveDataToCloud.call(this,stateCopy)
  }
  toggle(e,todo){
    let index = this.state.todoList.indexOf(todo)
    let stateCopy = jsonDeepCopy.call(this)
    let item = stateCopy.todoList[index]
    item.status = item.status === 'completed' ? '' : 'completed'
    this.saveDataToCloud.call(this,stateCopy)
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    let newItem = {
      id: idMaker(),
      status:'',
      title: event.target.value,
      deleted: false
    }
    let stateCopy = jsonDeepCopy.call(this)
    stateCopy.newTodo = ''
    stateCopy.todoList.push(newItem)
    //将数据首先保存至leanCloud
    this.saveDataToCloud.call(this,stateCopy)
  }
  saveDataToCloud(stateCopy){
    let _this = this
    let id = AV.User.current().get('todoListId')
    let todo = AV.Object.createWithoutData('TodoList',id)
    todo.set('todoList',stateCopy.todoList)
    todo.save().then(function(todo){
      //成功保存至leanCloud之后本地再更新state
      _this.setState(stateCopy)
    }, function(error){
      console.log(error)
    })
  }

}

  export default App;

  let id = 0

  function idMaker(){
    id += 1
    return id
  }
