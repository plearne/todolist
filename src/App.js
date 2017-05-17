import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import AV, {getCurrentUser, signOut, jsonDeepCopy} from './leanCloud'
import Manager from './Manager';
import BgPanel from './BgPanel';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || '',
      newTodo: "",
      todoList:[],
      show: 'todosDoing',
      showBgPanel: false,
      bgImg: 'http://i4.buimg.com/588926/3c86187c147e715f.jpg'
    }
  }
  componentWillMount(){
    this.fetchData.call(this)
  }
  render() {
     let todosDoing = this.state.todoList
         .filter((item)=>{return !item.deleted && item.status !== 'completed'})
         .map((item,index)=>{
      return (
        <li key={index} >
          <TodoItem todo={item} onToggle={this.toggle.bind(this)}
          onDelete={this.delete.bind(this)} />
        </li>
      )
    })
    let todosDelete = this.state.todoList
        .filter((item) => item.deleted)
        .map((item,index) => {
          return (
            <li key={index}>
              <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
            </li>
          )
        })
    let todosDone = this.state.todoList
        .filter((item) => {return item.status === 'completed'})
        .map((item,index) => {
          return (
            <li key={index}>
              <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
            </li>
          )
        })
    return (
      <div className="App">
        <div className="left">
          <Manager user={this.state.user}
            showBgPanel={this.showBgPanel.bind(this)} 
            onLogout={this.signOut.bind(this)}
            onShowTodosDone={this.onShowTodosDone.bind(this)}
            onShowTodosDelete={this.onShowTodosDelete.bind(this)}
            onShowUnderTodos={this.onShowUnderTodos.bind(this)}
            todos={this.state.todoList} />
        </div>
        <div className="right" style={{backgroundImage: 'url(' + this.state.bgImg + ')'}}>
          <h1>{this.state.user}的待办</h1>
          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo}
              
              onChange={this.changeTitle.bind(this)}
              onSubmit={this.addTodo.bind(this)} />
          </div>
          <ol className="todoList">
            {(() => {
              switch(this.state.show){
                case 'todosDone': return todosDone;             
                case 'todosDelete': return todosDelete;                      
                default: return todosDoing;               
            }
            })()}
          </ol>
          {this.state.user ? 
            null : 
            <UserDialog onSignUp={this.onSignUpOrSignIn.bind(this,'signUp')}
            onSignIn={this.onSignUpOrSignIn.bind(this,'signIn')}
            />}
        </div>
        {this.state.showBgPanel ? 
          <BgPanel onClick={this.hideBgPanel.bind(this)}
              changeBg={this.changeBg.bind(this)} /> :
          null}
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
  onShowTodosDelete(){
    let stateCopy = jsonDeepCopy.call(this);
    stateCopy.show = 'todosDelete';
    this.setState(stateCopy)
  }
  onShowUnderTodos(){
    let stateCopy = jsonDeepCopy.call(this);
    stateCopy.show = 'todosDoing';
    this.setState(stateCopy)
  }
  onShowTodosDone(){
    let stateCopy = jsonDeepCopy.call(this);
    stateCopy.show = 'todosDone';
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
  showBgPanel(){
    let stateCopy = jsonDeepCopy.call(this);
    stateCopy.showBgPanel = true;
    this.setState(stateCopy)
  }
  hideBgPanel(){
    let stateCopy = jsonDeepCopy.call(this);
    stateCopy.showBgPanel = false;
    this.setState(stateCopy)
  }
  changeBg(url){
    let stateCopy = jsonDeepCopy.call(this);
    stateCopy.bgImg = url;
    this.setState(stateCopy);
  }

}

  export default App;

  let id = 0

  function idMaker(){
    id += 1
    return id
  }
