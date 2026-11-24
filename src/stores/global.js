import { reactive } from 'vue';
import { defineStore } from 'pinia';

import api from '../api';

export const useGlobalStore = defineStore('global', () => {
	let user = reactive({
		token: localStorage.getItem("token"),
		email: null
	});

	async function getUserDetails(token){
		if(!token){
			user.token = null;
			user.email = null;
			user.isAdmin = null;

			return;
		}

		let { data } = await api.get('/users/details');

		user.token = token;
		user.email = data.email;
		user.isAdmin = data.isAdmin;
	}

	return {
		user,
		getUserDetails
	}
});