<template>
	<div class="container">
		<h1 class="text-center my-5">All Posts</h1>
		<div v-if="isLoading" class="text-center my-5">Loading blog posts...
		</div>
		<div class="row d-flex justify-content-center" v-else>
			<Posts v-for="post in posts.data" :key="post._id" :postData="post" />
		</div>
	</div>
</template>

<script setup>
	import { ref, reactive, watch, onBeforeMount } from 'vue';
	import { useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global';

	import api from '../api';

	import Posts from '../components/Posts.vue';

	const router = useRouter();
	const { user } = useGlobalStore();

	const isLoading = ref(false);
	const posts = reactive({ data: [] });

	watch([user], async () => {
		isLoading.value = true;

		let { data } = await api.get('/posts/getPosts');
		posts.data = data.posts;

		isLoading.value = false;
	}, { immediate: true });

	onBeforeMount(() => {
		if(!user.token){
			router.push({ path: '/login' });
		}
	});
</script>