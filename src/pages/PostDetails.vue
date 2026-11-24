<template>
	<div class="container my-5">
		<div v-if="isLoading" class="text-center my-5">Fetching details...
		</div>
		<div class="row justify-content-center" v-else>
			<div class="col-md-8">
				<div class="card shadow-sm">
					<div class="card-body p-4">
						<h1 class="text-center mb-4">{{ post.title }}</h1>

						<p class="mb-3">
							<strong>Content:</strong> {{ post.content }}
						</p>
						<p class="mb-3">
							<strong>Author:</strong> {{ post.author }}
						</p>
						<p class="mb-3">
							<strong>Information:</strong> {{ post.information }}
						</p>
						<p class="mb-3">
							<strong>Date Posted:</strong> {{ formatDateTime(post.dateCreated) }}
						</p>

						<div class="text-center">
							<router-link :to="{ path: `/posts/${postId}/update` }" class="btn btn-secondary mx-3 mt-3">
								Update
							</router-link>
							<button @click="deletePost" class="btn btn-danger mx-3 mt-3" v-if="user.isAdmin">
								Delete
							</button>
							<router-link :to="{ path: '/posts' }" class="btn btn-secondary mx-3 mt-3">
								Back to All Posts
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onBeforeMount, onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global';
	import { Notyf } from 'notyf';

	import api from '../api';

	const notyf = new Notyf();
	const route = useRoute();
	const router = useRouter();
	const { user } = useGlobalStore();

	const post = ref("");
	const postId = computed(() => route.params.id);
	const isLoading = ref(false);

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

	async function getPost(id){
		isLoading.value = true;

		try {
			const { data } = await api.get(`/posts/getPost/${id}`);
			post.value = data;
		} catch(error){
			console.error(error);
			notyf.error("Something went wrong. Please try again.");
		} finally {
			isLoading.value = false;
		}
	}

	async function deletePost(postId){
		if(!window.confirm("Are you sure you want to delete this post?")){
			return;
		}

		postId = route.params.id;

		try {
			const response = await api.delete(`/posts/deletePost/${postId}`);

			if(response.status === 200){
				notyf.success("Post deleted successfully");
			} else {
				notyf.error("Failed to delete post. Please try again.");
			}

			router.push({ path: '/posts' });
		} catch(error){
			console.error(error);
			notyf.error("Something went wrong. Please try again.");
		}
	}

	onBeforeMount(() => {
		if(!user.token){
			router.push({ path: '/login' });
		}
	});

	onMounted(() => {
		if(route.params.id){
			getPost(route.params.id);
		}
	});
</script>