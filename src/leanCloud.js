import AV from 'leancloud-storage'

var APP_ID = 'virPGES2U55XPaxq34P4lClm-gzGzoHsz';
var APP_KEY = 'vBD4vnwzobFq2JMF9g2Nd61q';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(email,username,password,successFn,errorFn){
	let user = new AV.User()
	user.setEmail(email)
	user.setUsername(username)
	user.setPassword(password)
	let currentUser = null
	user.signUp().then(function(loginedUser){
		currentUser = loginedUser
		//用户注册成功之后，在云端再创建一个TodoList的实例
		return createTodoList.call(null)
	}, function(error){
			switch(error.code){
				case 201:
					alert('密码不能为空')
					break
				case 202:
				  alert('用户名已被占用')
				  break
				case 217:
					alert('用户名不能为空格')
					break
				case 218:
					alert('密码不能为空')
					break
				default:
					alert(error)
					break
			}
	}).then(function(todo){
		//把创建的实例的id绑定到用户对象中
		currentUser.set('todoListId',todo.id)
		currentUser.save().then(function(loginedUser){
		  //最后把用户对象交给回调函数
			successFn.call(null,loginedUser)
		}, function(error){
			console.log(error)
		})
	})
	return undefined
}

export function createTodoList(){
	let TodoList = AV.Object.extend('TodoList')
	let todoList = new TodoList()
	todoList.set('todoList',[])
	return todoList.save()
}


export function getCurrentUser(){
	let user = AV.User.current()
	if(user){
		return user.get('username')
	}else{
		return null
	}
}

export function signIn(username,password,successFn,errorFn){
	AV.User.logIn(username,password).then(function(loginedUser){
		successFn.call(null,loginedUser) 
	}, function(error) {
		errorFn.call(null,error)
	})
}

export function signOut(){
	AV.User.logOut()
	return undefined
}
export function sendPasswordResetEmail(email, successFn, errorFn){
	AV.User.requestPasswordReset(email).then(function(success){
		successFn.call()
	}, function(error){
		console.dir(error)
	})
}
export function jsonDeepCopy(){
	return JSON.parse(JSON.stringify(this.state))
}


