<template>
	<div>
		<h1>Login</h1>
		<button @click="googleLogin">Google</button>
	</div>
</template>
<script>
// import { googleProvider } from "~/plugins/firebase.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
	methods: {
		googleLogin() {
			this.$store.dispatch("googleLogin");
		},
	},
};
</script>
