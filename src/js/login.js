Vue.use(Vuex)
let login={
    data(){
        return{
            login:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then((user) => {
                let User = user.toJSON()
                this.$store.commit('saveCurrentUser',User)
                this.$router.push('/')
            },(error) => {
                console.log(error.code)
                if(error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210) {
                    alert('邮箱和密码不匹配')
                }
            })
        }
    },
    template:`
        <div class="login" v-cloak>
            <form class="form" @submit.prevent="onLogin">
                <h2>
                    登陆
                </h2>
                <router-link to="/">关闭</router-link>
                <div class="row">
                    <label>
                        邮箱
                    </label>
                    <input type="text" v-model="login.email">
                </div>
                <div class="row">
                    <label>
                        密码
                    </label>
                    <input type="password" v-model="login.password">
                </div>
                <div class="actions">
                    <button type="submit">提交</button>
                </div>
                <router-link to="/signUp">注册</router-link>
            </form>
        </div>
    `
}
Vue.component('login',login)