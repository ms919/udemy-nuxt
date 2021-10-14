<template>
	<div>
		<header class="sticky-top">
			<template v-if="isAuthenticate">
				<router-link to="/">top</router-link>
				<router-link to="/users">user</router-link>
				<span class="header-item" @click="logout">ログアウト</span>
			</template>
			<template v-else>
				<router-link to="/login" class="header-item">Login</router-link>
			</template>
		</header>
		<nuxt />
		<footer class="text-center fixed-bottom bg-dark">footer</footer>
	</div>
</template>
<script>
export default {
	computed: {
		isAuthenticate() {
			return this.$store.state.isAuthenticate;
		},
	},
	methods: {
		logout() {
			this.$store.dispatch("logout");
		},
	},
};
</script>
<style scoped>
header,
footer {
	background-color: black;
}
.header-item {
	color: white;
	cursor: pointer;
}
</style>
