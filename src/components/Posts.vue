<template>
	<div class="col-12 mb-5">
		<div class="card mt-3 w-50 mx-auto">
			<div class="card-body">
				<h5 class="card-title">Title:</h5>
				<p class="card-text">{{ postData.title }}</p>

				<h6 class="card-title">Content:</h6>
				<p class="card-text">{{ postData.content }}</p>

				<h6 class="card-title">Author:</h6>
				<p class="card-text">{{ postData.author }}</p>
				
				<h6 class="card-title">Information:</h6>
				<p class="card-text">{{ postData.information }}</p>
				
				<h6 class="card-title">Date Posted:</h6>
				<p class="card-text">{{ formatDateTime(postData.dateCreated) }}</p>
			</div>

			<div class="card-footer">
				<router-link :to="{ path: `/posts/${postData._id}` }" class="btn btn-secondary w-100">View Post</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps } from 'vue';

	const props = defineProps({
		postData: Object
	});

	function formatDateTime(value) {
		const date = new Date(value);

		const pad = (n) => String(n).padStart(2, '0');

		const day = pad(date.getDate());
		const month = pad(date.getMonth() + 1);
		const year = date.getFullYear();

		const hours12 = pad(date.getHours() % 12 || 12);
		const minutes = pad(date.getMinutes());
		const seconds = pad(date.getSeconds());
		const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

		return `${month}-${day}-${year} ${hours12}:${minutes}:${seconds} ${ampm}`;
	}
</script>