import React ,{ Component } from 'react';
import './UserDialog.css';
import {signUp, signIn, jsonDeepCopy, sendPasswordResetEmail} from './leanCloud';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignUpOrSignInForm from './SignUpOrSignInForm';

export default class UserDialog extends Component{
	constructor(props){
		super(props)
		this.state = {
				selected: 'signUp',
				selectedTab: 'signUpOrSignIn',
				formData: {
					email: '',
					username: '',
					password: ''
				}
		}
	}
	switch(e){
		this.setState({
			selected: e.target.value
		})
	}
	signUp(e){
		e.preventDefault()
		let {email,username,password} = this.state.formData
		let success = (user)=>{	
			this.props.onSignUp.call(null,user)
		}
		let error = (error)=>{
			console.error(error)
		}
		signUp(email,username,password,success,error)
	}

	signIn(e){
		e.preventDefault()
		let {username,password} = this.state.formData
		let success = (user)=>{
			this.props.onSignIn.call(null,user)
		}
		let error = (error)=>{
			switch(error.code){
				case 210:
					alert('用户名与密码不匹配')
					break
				case 211:
					alert('未找到该用户')
					break
				default:
					alert(error)
					break
			}
		}
		signIn(username,password,success,error)
	}
	showForgotPassword(){
		let stateCopy = jsonDeepCopy.call(this);
		stateCopy.selectedTab = 'forgotPassword';
		this.setState(stateCopy);
	}
	resetPassword(e){
		e.preventDefault();
		let successFn = () => {
			alert('重置密码已发送成功，请前往邮箱验证');
		}
		let errorFn = () => {
			alert('邮件发送失败，请重新发送重置密码邮件')
		}
		sendPasswordResetEmail(this.state.formData.email,successFn,errorFn);
	}
	changeFormData(key,e){
		let stateCopy = jsonDeepCopy.call(this)
		stateCopy.formData[key] = e.target.value
		this.setState(stateCopy)
	}
	returnToSignIn(){
		let stateCopy = jsonDeepCopy.call(this);
		stateCopy.selectedTab = 'signUpOrSignIn';
		this.setState(stateCopy);
	}
	render(){
		return(
		<div className="UserDialog-Wrapper">
			<div className="UserDialog">
				{this.state.selectedTab === 'signUpOrSignIn' ? 
				<SignUpOrSignInForm formData={this.state.formData}
					onSignUp={this.signUp.bind(this)}
					onSignIn={this.signIn.bind(this)}
					onChange={this.changeFormData.bind(this)}
					onShowForgotPassword={this.showForgotPassword.bind(this)}
				/> :
				<ForgotPasswordForm formData={this.state.formData}
					onChange={this.changeFormData.bind(this)}
					onReturnToSignIn={this.returnToSignIn.bind(this)}
					onResetPassword={this.resetPassword.bind(this)} />}
			</div>
		</div>
		)

	}
}