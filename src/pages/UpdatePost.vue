<template>
	<div class="container">
		<h1 class="text-center my-5">Update Post</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-6">
				<form @submit.prevent="handleSubmit">
					<div class="mb-3">
						<label for="titleInput" class="form-label">Title</label>
						<input type="text" class="form-control" id="titleInput" v-model="title" required />
					</div>
					<div class="mb-3">
						<label for="contentInput" class="form-label">Content</label>
                        <input type="text" class="form-control" id="contentInput" v-model="content" required />
					</div>
					<div class="mb-3">
						<label for="authorInput" class="form-label">Author</label>
                        <input type="text" class="form-control" id="authorInput" v-model="author" required />
					</div>
					<div class="mb-3">
						<label for="informationInput" class="form-label">Information</label>
                        <input type="text" class="form-control" id="informationInput" v-model="information" required />
					</div>
					<div class="d-grid mt-5">
	                    <button type="submit" class="btn btn-primary btn-block">Update Post</button>
                	</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onBeforeMount } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { Notyf } from 'notyf';
	import { useGlobalStore } from '../stores/global';

	import api from '../api';

	const notyf = new Notyf();
	const route = useRoute();
	const router = useRouter();
	const { user } = useGlobalStore();

	const title = ref("");
	const content = ref("");
	const author = ref("");
	const information = ref("");

	async function handleSubmit(postId){
		postId = route.params.id;

		try {
			let response = await api.patch(`/posts/updatePost/${postId}`, {
				title: title.value,
				content: content.value,
				author: author.value,
				information: information.value
			});

			if(response.status === 200){
				notyf.success("Post updated successfully");

				title.value = "";
				content.value = "";
				author.value = "";
				information.value = "";

				router.push({ path: '/posts' });
			} else {
				notyf.error("Failed to update post. Please try again.")
			}
		} catch(error){
			console.error(error);
			notyf.error("Something went wrong. Please try again.");
		}
	}

	onBeforeMount(() => {
		if(!user.token){
			router.push({ path: '/' });
		}
	});
</script>