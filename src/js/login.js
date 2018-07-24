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
                    登录
                </h2>
                <router-link to="/">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-remove"></use>
                    </svg>
                </router-link>
                <div class="wrapper">
                    <div class="row">
                        <input type="text" v-model="login.email"  placeholder="邮箱">
                    </div>
                    <div class="row">
                        <input type="password" v-model="login.password" placeholder="密码">
                    </div>
                    <div class="actions">
                        <button type="submit">登录</button>
                    </div>
                    <router-link class="signUpButton" to="/signUp">注册</router-link>
                </div>
            </form>
        </div>
    `
}
Vue.component('login',login)