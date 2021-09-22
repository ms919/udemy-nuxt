<template>
	<div>
		<h1>ユーザー一覧</h1>
		<table>
			<th>id</th>
			<th>name</th>
			<th>age</th>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>{{ user.id }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.age }}</td>
					<td>
						<router-link :to="'/users/' + user.id">個人ページ</router-link>
					</td>
				</tr>
			</tbody>
		</table>
		<button @click="getUsers">GET</button>
		<div>
			<label for="name">name</label>
			<input type="text" v-model.lazy.number="name" id="name" />
			<label for="age">age</label>
			<input type="number" v-model.lazy.number="age" id="age" />
		</div>
		<button @click="addUser">Add</button>
		<router-link to="/">top</router-link>
	</div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default {
	data() {
		return {
			users: [],
			age: 0,
			name: "",
		};
	},
	methods: {
		async getUsers() {
      let obj = new Object;
			const querySnapshot = await getDocs(collection(db, "users"));
			querySnapshot.forEach((doc) => {
				// console.log(doc);
        obj = doc.data();
        obj.id = doc.id
				console.log(obj);
				this.users.push(obj);
			});
			console.log(this.users);
		},
		async addUser() {
			const docRef = await addDoc(collection(db, "users"), {
				name: this.name,
				age: this.age,
			});
		},
	},
};
</script>
