let app = new Vue({
    el: '#app',
    data: {
        loginVisible:false,
        signUpVisible:false,
        shareVisible:false,
        previewVisible:false,
        previewResume:{},
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
        previewUser:{
            objectId:undefined
        },
        currentUser:{
            objectId:undefined,
            email:''
        },
        signUp:{
            email:'',
            password:''
        },
        shareLink:'',
        mode:'edit'
    },
    computed:{
        displayResume(){
            return this.mode === 'edit' ? this.resume : this.previewResume
        }
    },
    watch:{
        'currentUser.objectId':function (newValue) {
            if(newValue){
                this.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
                this.getResume(this.currentUser).then((resume)=>{
                    Object.assign(this.resume,resume)
                })
            }
        }
    },
    methods: {
        print(){
            window.print()
        },
        share(){

        },
        hasLogin(){
            return !!this.currentUser.objectId
        },
        getResume(user){
            let query = new AV.Query('User')
            return query.get(user.objectId).then((user) => {
                return resume = user.toJSON().resume
            }, (error) => {})
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId)
            user.set('resume', this.resume)
            user.save().then(()=>{
                alert('保存成功')
            },()=>{
                alert('保存失败')
            })
        },
        onLogout(){
            AV.User.logOut()
            alert('注销成功')
            window.location.reload()
        },
        onLogin(user){
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            this.loginVisible = false
        },
        goToLogin(){
            this.signUpVisible = false
            this.loginVisible = true
        },
        goToSignUp(){
            this.loginVisible = false
            this.signUpVisible = true
        },
        onSignUp(User){
            this.currentUser.objectId = User.objectId
            this.currentUser.email = User.email
            this.signUpVisible = false
        },
        onClickSave(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                this.loginVisible = true
            } else {
                this.saveResume()
            }
        },
    }
})


//获取当前用户
let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
}

// //获取预览用户userId
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
    userId = matches[1]
    app.mode = 'preview'
    app.previewVisible = 'true'
    app.getResume({objectId:userId}).then((resume)=>{
        app.previewResume = resume
    })
}