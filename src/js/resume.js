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
                <div>
                    <ul>
                        <li>
                            <editable-span  :value="displayResume.birthday" @edit="onEdit('birthday',$event)"></editable-span>
                        </li>
                        |
                        <li>
                            <editable-span  :value="displayResume.gender" @edit="onEdit('gender',$event)"></editable-span>
                        </li>
                        |
                        <li>
                            <editable-span  :value="displayResume.email" @edit="onEdit('email',$event)"></editable-span>
                        </li>
                        |
                        <li>
                            <editable-span  :value="displayResume.phone" @edit="onEdit('phone',$event)"></editable-span>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="skills">
                <h2>技能</h2>
                <ul>
                    <li v-for="skill,index in displayResume.skills">
                        <h3 class="skillName">
                            <editable-span  :value="skill.name" @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
                        </h3>
                        <div class="description">
                            <editable-span  :value="skill.description" @edit="onEdit('skills['+index+'].description',$event)"></editable-span>
                        </div>
                        <span class="remove" @click="$store.commit('removeSkill',index)" v-if="index>=4&&$store.state.mode==='edit'">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-remove"></use>
                            </svg>
                        </span>
                    </li>
                    <li v-if="$store.state.mode==='edit'" class="add">
                        <button class="add" @click="$store.commit('addSkill')">添加技能</button>
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
                                    <a :href="project.link" v-if="$store.state.mode==='preview'">
                                        <editable-span :value="project.name"></editable-span>
                                    </a>
                                    <editable-span  :value="project.name" @edit="onEdit('projects['+index+'].name',$event)" v-if="$store.state.mode==='edit'"></editable-span>
                                </h3>
                                <span class="keywords">
                                    <editable-span  :value="project.keywords" @edit="onEdit('projects['+index+'].keywords',$event)"></editable-span>
                                </span>
                            </div>
                            <div class="end" v-if="$store.state.mode==='edit'">
                                <span class="link">
                                    <editable-span :value="project.link" @edit="onEdit('projects['+index+'].link',$event)"></editable-span>
                                </span>
                            </div>
                        </header>
                        <div class="description">
                            <editable-span  :value="project.description" @edit="onEdit('projects['+index+'].description',$event)"></editable-span>
                        </div>
                        <span class="remove" @click="$store.commit('removeProjetc',index)" v-if="index>=2&&$store.state.mode==='edit'">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-remove"></use>
                            </svg>
                        </span>
                    </li>
                    <li v-if="$store.state.mode==='edit'" class="add">
                        <button @click="$store.commit('addProject')">添加项目</button>
                    </li>
                </ol>
            </section>
        </div>
    `
}
Vue.component('resume',resume)