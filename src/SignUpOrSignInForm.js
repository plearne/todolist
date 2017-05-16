import React, {Component} from 'react';
import SignUpForm from './signupForm';
import SignInForm from './signinForm';

export default class SignUpOrSignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'signIn'
    }
  }
  switch(key){
    this.setState({
      selected: key
    })
  }
  render(){
    return (
      <div className="signInOrSignUp">
        <nav>
          <label>
            <input type="radio" checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this, 'signUp')} />
              注册
          </label>
          <label>
            <input type="radio" checked={this.state.selected === 'signIn'}
              onChange={this.switch.bind(this, 'signIn')} />
              登录
          </label>
        </nav>
        <div className="panes">
          {this.state.selected === 'signUp' ?
					 <SignUpForm formData={this.props.formData}
					 	onSubmit={this.props.onSignUp.bind(null)}
						onChange={this.props.onChange.bind(null)} /> 
						 : null}
          {this.state.selected === 'signIn' ?
						<SignInForm formData={this.props.formData}
							onSubmit={this.props.onSignIn.bind(null)}
							onChange={this.props.onChange.bind(this)}
							showForgotPassword={this.props.onShowForgotPassword.bind(null)} />
						 : null }
        </div>
      </div>
    )
  }
}		
