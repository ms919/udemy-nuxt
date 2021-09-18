<template>
	<div>
		<h1>個人ページ</h1>
		<p>{{ $route.params.id }}</p>
		<router-link to="/">top</router-link>
	</div>
</template>

<script>
export default {
  validate ({ params }) {
    // すべて数字
    return /^\d+$/.test(params.id)
  }
}
</script>