Vue.component('app-aside',{
    props:['logoutVisible','previewVisible'],
    template:`
        <aside>
            <div class="upper">
                <ul>
                    <li>
                        <button @click="$emit('click-save')">保存</button>
                    </li>
                    <li>
                        <button @click="$emit('print')">打印</button>
                    </li>
                    <li>
                        <button @click="$emit('share')">分享</button>
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
})