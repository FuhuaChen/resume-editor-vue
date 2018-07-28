Vue.use(Vuex)
let editableSpan = {
    props: ['value'],
    data() {
        return {
            editing: false,
        }
    },
    methods: {
        triggerEdit(e) {
            this.$emit('edit', e.target.value)
        },
        edit(){
            if(this.$store.state.mode==='edit'){
                this.editing = true
                document.body.addEventListener('click',()=>{
                    if(this.editing){
                        this.editing = false
                    }
                })
            }
        }
    },
    template: `
        <span class="editableSpan" @click.stop="edit">
            <span v-show="!editing">{{value}}</span>
            <input v-show="editing" type="text" :value="value" @input="triggerEdit">
        </span>
`
}
Vue.component('editable-span',editableSpan)