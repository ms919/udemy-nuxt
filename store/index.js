import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth";

export const state = () => ({
	isAuthenticate: false,
});

export const getters = {
	isAuthenticate: (state) => state.isAuthenticate,
};

export const mutations = {
	updateAuthState(state, user) {
		console.log(user);
		state.isAuthenticate = user !== null;
	},
};

export const actions = {
	async googleLogin({ commit }) {
		try {
			const googleProvider = new GoogleAuthProvider();
			const auth = getAuth();
			const result = await signInWithPopup(auth, googleProvider);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			commit("updateAuthState", auth.currentUser);
			$nuxt.$router.push("/");
		} catch (err) {
			const credential = GoogleAuthProvider.credentialFromError(err);
			console.log(`エラー内容：${err}`);
		}
	},
	async logout({ commit }) {
		try {
			const auth = getAuth();
			await signOut(auth);
			commit("updateAuthState", auth.currentUser);
			$nuxt.$router.replace("/login");
		} catch (err) {
			console.log(`logout失敗:${err}`);
		}
	},
};
