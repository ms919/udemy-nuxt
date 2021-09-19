<template>
	<div>
		<h1>ユーザー一覧</h1>
		<table>
			<th>id</th>
			<th>name</th>
			<th>age</th>
			<tr v-for="user in users" :key="user.id">
				<td>{{ user.id }}</td>
				<td>{{ user.name }}</td>
				<td>{{ user.age }}</td>
				<td><router-link :to="'/users/' + user.id">個人ページ</router-link></td>
			</tr>
		</table>
		<button @click="getUsers">GET</button>
		<router-link to="/">top</router-link>
	</div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAx5fvZmj3T-UaHk1wGozSUKCdZYomZ2s0",
	authDomain: "nuxt-test-c0ed3.firebaseapp.com",
	projectId: "nuxt-test-c0ed3",
	storageBucket: "nuxt-test-c0ed3.appspot.com",
	messagingSenderId: "149834104760",
	appId: "1:149834104760:web:8e7b328eebc0c3e1e9594d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
	data() {
		return {
			users: [
				{ id: 1, name: "A子", age: 20 },
				{ id: 2, name: "B子", age: 25 },
			],
		};
	},
	methods: {
		async getUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data().name}:${doc.data().age}`);
			});
		},
	},
};
</script>
