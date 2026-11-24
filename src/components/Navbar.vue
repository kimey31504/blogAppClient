<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
		<div class="container">
			<router-link :to="{ path: '/' }" class="navbar-brand d-flex align-items-center fw-bold text-dark fs-4">Blog Application</router-link>
			<button 
			class="navbar-toggler border-0 shadow-none" 
			type="button" 
			data-bs-toggle="collapse" 
			data-bs-target="#navbarNav" 
			aria-controls="navbarNav" 
			aria-expanded="false" 
			aria-label="Toggle navigation"
			>
			<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
					<li class="nav-item">
						<router-link :to="{ path: '/' }" class="nav-link active fw-medium text-primary px-3" aria-current="page">Home</router-link>
					</li>
					<li class="nav-item">
						<router-link :to="{ path: '/posts' }" class="nav-link fw-medium text-secondary px-3" v-if="user.token">All Posts</router-link>
					</li>
					<li class="nav-item">
						<router-link :to="{ path: '/addPost' }" class="nav-link fw-medium text-secondary px-3" v-if="user.token">Add Post</router-link>
					</li>
					<li class="nav-item ms-lg-3 mt-2 mt-lg-0">
						<router-link :to="{ path: '/register' }" class="btn btn-outline-secondary btn-sm px-3 fw-medium" v-if="!user.token">Register</router-link>
					</li>
					<li class="nav-item ms-lg-3 mt-2 mt-lg-0">
						<router-link :to="{ path: '/login' }" class="btn btn-outline-secondary btn-sm px-3 fw-medium" v-if="!user.token">Login</router-link>
					</li>
					<li class="nav-item ms-lg-3 mt-2 mt-lg-0">
						<router-link :to="{ path: '/logout' }" class="btn btn-outline-secondary btn-sm px-3 fw-medium" v-if="user.token">Logout</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import { useGlobalStore } from '../stores/global';

	const { user } = useGlobalStore();
</script>