import React, {Component} from 'react';
import './TodoItem.css'
import './iconfont/iconfont.css'
export default class TodoItem extends Component {
	render(){
		return (
			<div className="TodoItem">
				<input type="checkbox"  checked={this.props.todo.status === 'completed'}
				onChange={this.toggle.bind(this)} /> 
				<label >{this.props.todo.title}</label>
				<i className="iconfont icon-close" onClick={this.delete.bind(this)} ></i>
			</div>
		)
	}
	toggle(e){
		this.props.onToggle(e,this.props.todo)
	}
	delete(e){
		this.props.onDelete(e,this.props.todo)
	}
}