<template>
	<div class="container">
		<h1 class="text-center my-5">Login</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-6">
				<form @submit.prevent="handleSubmit">
					<div class="mb-3">
						<label for="emailInput" class="form-label">Email Address</label>
						<input type="email" class="form-control" id="emailInput" v-model="email" required />
					</div>
					<div class="mb-3">
						<label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" required />
					</div>
					<div class="d-grid mt-5">
	                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                	</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onBeforeMount } from 'vue';
	import { useRouter } from 'vue-router';
	import { Notyf } from 'notyf';
	import { useGlobalStore } from '../stores/global';

	import api from '../api';

	const notyf = new Notyf();
	const router = useRouter();
	const { user } = useGlobalStore();

	const email = ref("");
	const password = ref("");

	async function handleSubmit(){
		try {
			let response = await api.post('/users/login', {
				email: email.value,
				password: password.value
			});

			if(response.data && response.data.access){
				notyf.success("Logged in successfully");

				localStorage.setItem("token", response.data.access);

				email.value = "";
				password.value = "";

				router.push({ path: '/' });
			} else {
				notyf.error("Login failed. Please try again.");
			}
		} catch(error){
			console.error(error);
			notyf.error("Something went wrong. Please try again.");
		}
	}

	onBeforeMount(() => {
		if(user.token){
			router.push({ path: '/' });
		}
	});
</script>