const routes = [
    { path: '/', component: App },
    { path: '/login', component: login},
    { path: '/signUp', component: signUp },
    { path: '/share', component: share }
]

const router = new VueRouter({
    routes:routes
})

let store = new Vuex.Store({
    state: {
        loginVisible: false,
        signUpVisible: false,
        shareVisible: false,
        previewVisible: false,
        previewResume: {},
        resume: {
            name: '姓名',
            gender: '男',
            birthday: '1992年7月',
            jobTitle: '前端工程师',
            email: '874166712@qq.com',
            phone: '18060912511',
            skills: [
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'},
                {name: '请填写技能名称', description: '请填写技能描述'}
            ],
            projects: [
                {name: '请填写项目名称', link: '清填写项目链接', keywords: '清填写关键词', description: '清填写项目描述'},
                {name: '请填写项目名称', link: '清填写项目链接', keywords: '清填写关键词', description: '清填写项目描述'}
            ]
        },
        previewUser: {
            objectId: undefined
        },
        currentUser: {
            objectId: '',
            email: ''
        },
        signUp: {
            email: '',
            password: ''
        },
        shareLink: '',
        mode: 'edit'
    },
    mutations: {
        saveCurrentUser(state,currentUser){
            state.currentUser = currentUser
        },
        getShareLink(state){
            state.shareLink = location.origin + location.pathname + '?user_id=' + state.currentUser.objectId
        },
        saveCurrentResume(state,resume){
            Object.assign(state.resume,resume)
        },
        saveCurrentPreviewResume(state,resume){
            state.previewResume=resume
        },
        addSkill(state){
            state.resume.skills.push({name: '请填写技能名称',description:'请填写技能描述'})
        },
        removeSkill(state,index){
            state.resume.skills.splice(index,1)
        },
        addProject(state){
            state.resume.projects.push({name:'请填写项目名称',link:'清填写项目链接',keywords:'清填写关键词',description:'清填写项目描述'})
        },
        removeProject(state,index){
            state.resume.projects.splice(index,1)
        }
    },
    actions:{
        async getResume({commit},user){
            let query = new AV.Query('User')
            return query.get(user.objectId).then((user) => {
                return resume = user.toJSON().resume
            }, (error) => {})
        },
        async assignResume({commit}){
            await store.dispatch('getResume',this.state.currentUser).then((resume)=>{
                commit('saveCurrentResume',resume)
            })
        }
    }
})

let app = new Vue({
    el:'#app',
    store,
    router:router,
})

//获取当前用户
let currentUser = AV.User.current()
if(currentUser){
    store.commit('saveCurrentUser',currentUser.toJSON())
    store.dispatch('assignResume')
    store.commit('getShareLink')
}

store.watch((state)=>state.currentUser,
    (value)=>{
        store.dispatch('assignResume')
        store.commit('getShareLink')
    })

// //获取预览用户userId
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
    userId = matches[1]
    store.state.mode = 'preview'
    store.state.previewVisible = 'true'
    store.dispatch('getResume',{objectId:userId}).then((resume)=>{
        store.commit('saveCurrentPreviewResume',resume)
    })
}

