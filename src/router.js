import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from './components/Home';
import List from './components/List';

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Home},
    {path: '/todos', component: List}
]

export default new VueRouter({
    mode: 'history',
    routes
})