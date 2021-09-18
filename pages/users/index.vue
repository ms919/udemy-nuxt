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
		<router-link to="/">top</router-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			users: [
				{ id: 1, name: "A子", age: 20 },
				{ id: 2, name: "B子", age: 25 },
			],
		};
	},
};
</script>
