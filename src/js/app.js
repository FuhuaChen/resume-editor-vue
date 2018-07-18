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
            phone: '18060912511',
            skills:[
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'},
                {name: '请填写技能名称',description:'请填写技能描述'}
            ],
            projects:[
                {name:'请填写项目名称',link:'https://github.com/FuhuaChen',keywords:'清填写关键词',description:'清填写项目描述'},
                {name:'请填写项目名称',link:'https://github.com/FuhuaChen',keywords:'清填写关键词',description:'清填写项目描述'}
            ]
        },
        currentUser:{
            objectId:'',
            email:''
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
        hasLogin(){
            return !!this.currentUser.objectId
        },
        getResume(){
            let query = new AV.Query('User')
            query.get(this.currentUser.objectId).then((user) => {
                this.resume = user.toJSON().resume
            }, (error) => {
            })
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId)
            user.set('resume', this.resume)
            user.save()
            alert('保存成功')
        },
        onLogout(){
            AV.User.logOut()
            alert('注销成功')
            window.location.reload()
        },
        onSignUp(){
            let user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then((user) => {
                alert('注册成功')
                let User = user.toJSON()
                this.currentUser.objectId = User.objectId
                this.currentUser.email = User.email
                this.signUpVisible = false
            },(error) => {
                console.log(error.code)
                if(error.code === 125){
                    alert('邮箱错误')
                }else if(error.code === 203){
                    alert('邮箱已被占用')
                }
            })
        },
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then((user) => {
                let User = user.toJSON()
                this.currentUser.objectId = User.objectId
                this.currentUser.email = User.email
                this.loginVisible = false
                window.location.reload()
            },(error) => {
                console.log(error.code)
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210) {
                    alert('邮箱和密码不匹配')
                }
            })
        },
        onEdit(key, value) {
            let regex = /\[(\d+)\]/g
            key = key.replace(regex,(match,number) => {
                return '.' + number
            })
            keys = key.split('.')
            let result = this.resume
            for(let i=0;i<keys.length;i++){
                if(i===keys.length-1){
                    result[keys[i]] = value
                }else{
                    result = result[keys[i]]
                }
            }
        },
        onClickSave(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                this.loginVisible = true
            }
            else {
                this.saveResume()
            }
        },
        addSkill(){
            this.resume.skills.push({name: '请填写技能名称',description:'请填写技能描述'})
        },
        removeSkill(index){
            this.resume.skills.splice(index,1)
        },
        addProject(){
            this.resume.projects.push({name:'请填写项目名称',link:'https://github.com/FuhuaChen',keywords:'清填写关键词',description:'清填写项目描述'})
        },
        removeProject(index){
            this.resume.projects.splice(index,1)
        }
    }
})

let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.getResume()
}
