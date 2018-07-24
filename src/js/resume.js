Vue.use(Vuex)
let resume={
    props:['displayResume'],
    methods:{
        onEdit(key, value) {
            let regex = /\[(\d+)\]/g
            key = key.replace(regex,(match,number) => {
                return '.' + number
            })
            keys = key.split('.')
            let result = this.$store.state.resume
            for(let i=0;i<keys.length;i++){
                if(i===keys.length-1){
                    result[keys[i]] = value
                }else{
                    result = result[keys[i]]
                }
            }
        }
    },
    template:`
            <div class="resume">
            <section class="profile">
                <h1>
                    <editable-span  :value="displayResume.name" @edit="onEdit('name',$event)"></editable-span>
                </h1>
                <p>应聘职位：<editable-span  :value="displayResume.jobTitle" @edit="onEdit('jobTitle',$event)"></editable-span></p>
                <p>
                    <editable-span  :value="displayResume.birthday" @edit="onEdit('birthday',$event)"></editable-span>
                    |
                    <editable-span  :value="displayResume.gender" @edit="onEdit('gender',$event)"></editable-span>
                    |
                    <editable-span  :value="displayResume.email" @edit="onEdit('email',$event)"></editable-span>
                    |
                    <editable-span  :value="displayResume.phone" @edit="onEdit('phone',$event)"></editable-span>
                </p>
            </section>
            <section class="skills">
                <h2>技能</h2>
                <ul>
                    <li v-for="skill,index in displayResume.skills">
                        <editable-span  :value="skill.name" @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
                        <div class="description">
                            <editable-span  :value="skill.description" @edit="onEdit('skills['+index+'].description',$event)"></editable-span>
                        </div>
                        <span class="remove" @click="$store.commit('removeSkill',index)" v-if="index>=4&&$store.state.mode==='edit'">X</span>
                    </li>
                    <li v-if="$store.state.mode==='edit'" class="add">
                        <span class="add" @click="$store.commit('addSkill')">添加</span>
                    </li>
                </ul>
            </section>
            <section class="projects">
                <h2>项目经历</h2>
                <ol>
                    <li v-for="project,index in displayResume.projects">
                        <header>
                            <div class="start">
                                <h3 class="name">
                                    <editable-span  :value="project.name" @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
                                </h3>
                                <span class="link">
                                    <editable-span  :value="project.link" @edit="onEdit('projects['+index+'].link',$event)"></editable-span>
                                </span>
                            </div>
                            <div class="end">
                                <span class="keywords">
                                    <editable-span  :value="project.keywords" @edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>
                                </span>
                            </div>
                        </header>
                        <p class="description">
                            <editable-span  :value="project.description" @edit="onEdit('projects['+index+'].description',$event)"></editable-span>
                        </p>
                        <span class="remove" @click="$store.commit('removeProjetc',index)" v-if="index>=2&&$store.state.mode==='edit'">X</span>
                    </li>
                    <li v-if="$store.state.mode==='edit'" class="add">
                        <span @click="$store.commit('addProject')">添加</span>
                    </li>
                </ol>
            </section>
        </div>
    `
}
Vue.component('resume',resume)