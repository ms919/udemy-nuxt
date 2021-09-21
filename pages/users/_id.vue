<template>
	<div>
		<h1>個人ページ</h1>
		<table>
			<th>id</th>
			<th>name</th>
			<th>age</th>
			<tbody>
				<tr>
					<td>{{ $route.params.id }}</td>
					<td><input type="text" v-model.lazy="name" /></td>
					<td><input type="number" v-model.lazy.number="age" /></td>
				</tr>
			</tbody>
		</table>
		<button @click="updateUser">Update</button>
		<button @click="deleteUser">Delete</button>
		<router-link to="/">top</router-link>
		<router-link to="/users">users</router-link>
	</div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default {
	data() {
		return {
			name: "",
			age: 0,
			edit: false,
			userDoc: doc(db, "users", this.$route.params.id),
		};
	},
	async beforeCreate() {
		const userData = await getDoc(doc(db, "users", this.$route.params.id));
		const user = userData.data();
		this.name = user.name;
		this.age = user.age;
	},
	methods: {
		async deleteUser() {
			await deleteDoc(this.userDoc);
		},
		async updateUser() {
			try {
				await updateDoc(this.userDoc, {
					name: this.name,
					age: this.age,
				});
			} catch (err) {
				confirm("Error…");
			}
			confirm("更新完了！");
		},
	},
};
</script>
