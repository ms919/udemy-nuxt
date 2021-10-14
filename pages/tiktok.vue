<template>
	<div class="tiktok-wrapper">
		<blockquote
			class="tiktok-embed"
			cite="https://www.tiktok.com/@kostvjolyx/video/6994978774966095110"
			data-video-id="6994978774966095110"
		>
			<section></section>
		</blockquote>
	</div>
</template>
<script>
export default {
	head() {
		return {
			script: [{ src: "https://www.tiktok.com/embed.js" }],
		};
	},
};
</script>
<style scoped>
.tiktok-wrapper {
	width: 20%;
	/* position: relative;
	padding-top: 177%; */
	aspect-ratio: 9/16;
	background-color: blue;
}
blockquote {
	/* margin: 3rem; */
	/* position: absolute;
	top: 0;
	right: 0; */
	width: 100%;
	height: 100%;
}
#emotion_str {
	display: block;
	margin-top: 20rem;
}
@media screen and (max-width: 425px) {
	#app {
		display: block;
	}
	.tiktok-wrapper {
		width: 90%;
	}
	blockquote {
		width: 100%;
		height: 79vh;
	}
}
</style>
