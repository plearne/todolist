import React, {Component} from 'react';

export default class SignInForm extends Component {
  render(){
    return (
			<div className="forgotPassword">
				<h3>
					重置密码
				</h3>
				<div className="panes">
					<form className="forgotPassword" onSubmit={this.props.onResetPassword.bind(null)}>
						<div className="row">
							<label>邮箱</label>
							<input type="text" value={this.props.formData.email}
								placeholder="Email"
								onChange={this.props.onChange.bind(null, 'email')} />
						</div>
						<div className="row actions">
							<button type="submit">发送重置邮件</button>
						</div>
						<div className="row actions">
							<a href="#" onClick={this.props.onReturnToSignIn.bind(null)}>返回登录</a>
						</div>
					</form>
				</div>
			</div>
    )
  }
}
