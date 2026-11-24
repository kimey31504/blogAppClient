import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'notyf/notyf.min.css';
import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

import Home from './pages/Home.vue';
import Register from './pages/Register.vue';
import Login from './pages/Login.vue';
import Logout from './pages/Logout.vue';
import Posts from './pages/Posts.vue';
import AddPost from './pages/AddPost.vue';
import PostDetails from './pages/PostDetails.vue';
import UpdatePost from './pages/UpdatePost.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/logout',
			component: Logout
		},
		{
			path: '/posts',
			component: Posts
		},
		{
			path: '/posts/:id',
			component: PostDetails
		},
		{
			path: '/addPost',
			component: AddPost
		},
		{
			path: '/posts/:id/update',
			component: UpdatePost
		}
	]
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');