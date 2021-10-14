<template>
	<div>
		<h1>ユーザー一覧</h1>
		<table class="table table-sm">
			<thead>
				<tr>
					<th>id</th>
					<th>name</th>
					<th>age</th>
				</tr>
			</thead>
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
			<input type="text" v-model.lazy="name" id="name" />
			<label for="age">age</label>
			<input type="number" v-model.lazy.number="age" id="age" />
		</div>
		<button @click="addUser">Add</button>
		<router-link to="/">top</router-link>
	</div>
</template>

<script>
import { db } from "~/plugins/firebase.js";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

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
			let obj = new Object();
			// const querySnapshot = await getDocs(collection(db, "users"));
			// querySnapshot.forEach((doc) => {
			// 	// console.log(doc);
			// 	obj = doc.data();
			// 	obj.id = doc.id;
			// 	console.log(obj);
			// 	this.users.push(obj);
			// });

			// ランダム取得
			let arr = [];
			let hogeObj = {};
			let i = 1;
			const max = 5;
			const min = 1;
			// const num = Math.floor(Math.random() * (max - min + 1) + min);
			// console.log(num);
			const num = 2;
			const q = query(collection(db, "users"), where("group", "==", num));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				obj = doc.data();
				// console.log(obj);
				arr.push([obj['name'], obj['age']]);
				// hogeObj[i].name = obj['name'];
				// hogeObj[i].age = obj['age'];
				hogeObj[i] = {...hogeObj, name: obj['name'], age: obj['age']};
				this.users.push(arr);
				++i
			});
			console.log(arr);
			console.log(hogeObj);
			// console.log(querySnapshot.size);
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
