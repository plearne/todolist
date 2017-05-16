import React, {Component} from 'react';

export default class SignInForm extends Component {
  render(){
    return (
      <form className="signIn" onSubmit={this.props.onSubmit.bind(null)}>
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.props.formData.username}
            placeholder="Username"
            onChange={this.props.onChange.bind(null,"username")}  />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.props.formData.password}
            placeholder="Password"
            onChange={this.props.onChange.bind(null,"password")}  />
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
        </div>
        <div className="row actions">
         <a href="#" onClick={this.props.showForgotPassword.bind(null)}>忘记密码？</a>
        </div>
      </form>
    )
  }
}
