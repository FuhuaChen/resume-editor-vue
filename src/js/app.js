let app = new Vue({
    el: '#app',
    data: {
        loginVisible:false,
        signUpVisible:false,
        resume: {
            name: '姓名',
            gender: '男',
            birthday: '1992年7月',
            jobTitle: '前端工程师',
            email: '874166712@qq.com',
            phone: '18060912511'
        },
        signUp:{
            email:'',
            password:''
        },
        login:{
            email:'',
            password:''
        }
    },
    methods: {
        saveResume(){
            let {id} = AV.User.current()
            let user = AV.Object.createWithoutData('User', id)
            user.set('resume', this.resume)
            user.save()
        },
        onLogout(){
            AV.User.logOut()
            alert('注销成功')
            let currentUser = AV.User.current()
        },
        onSignUp(){
            let user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then(function (user) {
                alert('注册成功')
            }, function (error) {
                console.log(error.code)
                if(error.code === 125){
                    alert('邮箱错误')
                }else if(error.code === 203){
                    alert('邮箱已被注册')
                }
            })
        },
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then(function (user) {

            }, function (error) {
                console.log(error.code)
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210) {
                    alert('邮箱和密码不匹配')
                }
            })
        },
        onEdit(key, value) {
            this.resume[key] = value
        },
        onClickSave(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                this.loginVisible = true
            }
            else {
                this.saveResume()
            }
        }
    }
})