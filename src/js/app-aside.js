let aside={
    props:['logoutVisible','previewVisible'],
    template:`
        <aside>
            <div class="upper">
                <router-link to="/">
                    <div class="logo-wrapper">
                        <span class="logo">
                            Resume-editor
                        </span>
                    </div>
                </router-link>
                <ul>
                    <li>
                        <button @click="$emit('save')">保存</button>
                    </li>
                    <li>
                        <button @click="$emit('print')">打印</button>
                    </li>
                    <li>
                        <router-link to="/share">分享</router-link>
                    </li>
                    <li v-show="previewVisible">
                        <button @click="$emit('preview')" v-cloak>返回预览</button>
                    </li>
                </ul>
            </div>
            <div class="down">
                <button @click="$emit('logout')" v-show="logoutVisible">登出</button>
            </div>
        </aside>
    `
}
Vue.component('app-aside',aside)