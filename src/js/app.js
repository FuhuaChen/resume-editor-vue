Vue.use(Vuex)
App={
    computed:{
        displayResume(){
            return this.$store.state.mode === 'edit' ? this.$store.state.resume : this.$store.state.previewResume
        }
    },
    methods: {
        print(){
            window.print()
        },
        hasLogin(){
            return !!this.$store.state.currentUser.objectId
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId)
            user.set('resume', this.$store.state.resume)
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
        onClickSave(){
            let currentUser = AV.User.current()
            if (!currentUser) {
                this.$router.push('/login')
            } else {
                this.saveResume()
            }
        },
    },
    template:`
    <div class="page">
        <app-aside v-if="$store.state.mode==='edit'" @save="onClickSave" @print="print" @preview="$store.state.mode='preview'" @logout="onLogout" :logout-visible="hasLogin()" :preview-visible="$store.state.previewVisible"></app-aside>
        <main>
            <resume :display-resume="displayResume" :resume="$store.state.resume"></resume>
        </main>
        <button class="exitPreview" @click="$store.state.mode='edit'" v-if="$store.state.mode==='preview'" v-cloak>退出预览</button>
    </div>
    `
}
Vue.component('app-main',App)
