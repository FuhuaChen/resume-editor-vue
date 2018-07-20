Vue.component('share',{
    props:['shareLink'],
    template:`
        <div class="share" v-cloak>
        <div class="warpper">
            <h2>分享链接</h2>
            <textarea readonly>{{shareLink}}</textarea>
            <button @click="$emit('close')">关闭</button>
        </div>
    </div>
    `
})