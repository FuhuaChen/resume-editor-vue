let editableSpan = {
    props: ['value','disabled'],
    data() {
        return {
            editing: false
        }
    },
    methods: {
        triggerEdit(e) {
            this.$emit('edit', e.target.value)
        }
    },
    template: `
        <span class="editableSpan">
            <span v-show="!editing">{{value}}</span>
            <input v-show="editing" type="text" :value="value" @input="triggerEdit">
            <button v-if ="!disabled" @click="editing=!editing">edit</button>
        </span>
`
}
Vue.component('editable-span',editableSpan)