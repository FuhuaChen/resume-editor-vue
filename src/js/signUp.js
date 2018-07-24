Vue.use(Vuex)
let signUp={
    data(){
        return{
            signUp:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        onSignUp(){
            let user = new AV.User()
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email)
            user.signUp().then((user) => {
                alert('注册成功')
                let User = user.toJSON()
                this.$store.commit('saveCurrentUser',User)
                this.$router.push('/')
            },(error) => {
                console.log(error.code)
                if(error.code === 125){
                    alert('邮箱错误')
                }else if(error.code === 203){
                    alert('邮箱已被占用')
                }
            })
        }
    },
    template:`
        <div class="signUp" v-cloak>
            <form class="form" @submit.prevent="onSignUp">
                <h2>
                    注册
                </h2>
                <router-link to="/">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-remove"></use>
                    </svg>
                </router-link>
                <div class="wrapper">
                    <div class="row">
                        <input type="text" v-model="signUp.email" placeholder="邮箱">
                    </div>
                    <div class="row">
                        <input type="password" v-model="signUp.password" placeholder="密码">
                    </div>
                    <div class="actions">
                        <button type="submit">注册</button>
                    </div>
                    <router-link class="loginButton" to="/login">登录</router-link>
                </div>
            </form>
        </div>

    `
}
Vue.component('sign-up',signUp)