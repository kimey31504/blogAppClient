<template>
	<div class="container">
		<h1 class="text-center my-5">Welcome to our Blog Application!</h1>
		<div class="row justify-content-center">
			<div class="col text-center">
				<router-link :to="{ path: '/posts' }" class="btn btn-secondary">View Blog</router-link>
			</div>
		</div>
	</div>
</template>