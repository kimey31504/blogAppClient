<template>
	<div class="container">
		<h1 class="text-center my-5">Register</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-6">
				<form @submit.prevent="handleSubmit">
					<div class="mb-3">
						<label for="emailInput" class="form-label">Email Address</label>
						<input type="email" class="form-control" id="emailInput" v-model="email" required />
					</div>
					<div class="mb-3">
						<label for="usernameInput" class="form-label">Username</label>
						<input type="text" class="form-control" id="usernameInput" v-model="username" required />
					</div>
					<div class="mb-3">
						<label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" required />
					</div>
					<div class="mb-3">
						<label for="confirmPasswordInput" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPasswordInput" v-model="confirmPassword" required />
					</div>
					<div class="d-grid mt-5">
	                    <button type="submit" class="btn btn-primary btn-block">Register</button>
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
	const username = ref("");
	const password = ref("");
	const confirmPassword = ref("");

	async function handleSubmit(){
		if(password.value !== confirmPassword.value){
			notyf.error("Passwords do not match");
			return;
		}

		if(password.value.length < 8) {
			notyf.error("Password must be at least 8 characters");
			return;
		}

		try {
			let response = await api.post('/users/register', {
				email: email.value,
				username: username.value,
				password: password.value
			});

			if(response.status === 201){
				notyf.success("Registered successfully");

				email.value = "";
				username.value = "";
				password.value = "";
				confirmPassword.value = "";

				router.push({ path: '/login' });
			} else {
				notyf.error("Registration failed. Please try again.");
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