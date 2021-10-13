<template>
	<div id="app">
		<div class="tiktok-wrapper">
			<blockquote
				class="tiktok-embed"
				cite="https://www.tiktok.com/@kostvjolyx/video/6994978774966095110"
				data-video-id="6994978774966095110"
			>
				<section></section>
			</blockquote>
		</div>
		<!-- video の上に canvas をオーバーレイするための div 要素 -->
		<div id="container">
			<!-- カメラ映像を流す video -->
			<video id="video" width="300" height="200" @play="onPlay"></video>
			<!-- 重ねて描画する canvas -->
			<canvas id="canvas" width="300" height="200"></canvas>
		</div>
		<div id="emotion_str"></div>
		<!-- データ表示用 div 要素 -->
		<!-- <div id="dat"></div> -->
	</div>
</template>
<script>
export default {
	head() {
		return {
			script: [
				{ src: "/js/face-api.min.js" },
				{ src: "https://www.tiktok.com/embed.js" },
				{
					src:
						"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js",
				},
				{ src: "https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js" },
			],
		};
	},
	methods: {
		onPlay() {
			const video = document.getElementById("video"); // video 要素を取得
			const canvas = document.getElementById("canvas"); // canvas 要素の取得
			const emotion_str = document.getElementById("emotion_str");
			// const play_video = document.getElementById(
			// 	"_embed_player_video-item"
			// )[0];
			// const e = new Event("click");

			// setTimeout(async () => {
			// 	console.log(document.getElementsByClassName("tiktok-embed")[0]);
			// 	document.getElementById("play_video").play();
			// }, 1000);

			setInterval(async () => {
				// ウェブカメラの映像から顔データを取得
				const detections = await faceapi
					.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceLandmarks()
					.withFaceExpressions();
				// console.log(detections[0].expressions);
				// 顔データをリサイズ
				const resizedDetections = faceapi.resizeResults(detections, {
					width: video.width,
					height: video.height,
				});

				// キャンバスに描画
				canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
				// faceapi.draw.drawDetections(canvas, resizedDetections);
				faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
				// faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
				// console.log(detections[0].expressions.sad);
				const expressions = detections[0].expressions;
				emotion_str.innerHTML = `<p>sad:${expressions.sad}<br/>happy:${expressions.happy}<br/>angry:${expressions.angry}<br/>surprised:${expressions.surprised}<br/>disgusted:${expressions.disgusted}<br/>fearful:${expressions.fearful}</p>`;
			}, 100);
		},
	},
	mounted() {
		// 顔モデルをロード
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri("/js/weights"),
			faceapi.nets.faceLandmark68Net.loadFromUri("/js/weights"),
			faceapi.nets.faceExpressionNet.loadFromUri("/js/weights"),
		]).then(() => {
			// ウェブカメラへアクセス
			navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
				video.srcObject = stream;
				video.play();
			});
		});
	},
};
</script>
<style scoped>
/* video 要素の上に canvas 要素をオーバーレイするための CSS */
#app {
	/* コンテナ用の div について */
	display: flex;
}
.tiktok-wrapper {
	width: 20%;
	/* position: relative;
	padding-top: 177%; */
	/* aspect-ratio: 9/16; */
	background-color: blue;
}
#container {
	position: relative; /* 座標指定を相対値指定にする */
	margin: 3rem;
}
#video {
	/* カメラ映像を流す video について */
	transform: scaleX(-1); /* 左右反転させる */
	position: absolute;
}
#canvas {
	/* 描画用の canvas について */
	transform: scaleX(-1); /* 左右反転させる */
	position: absolute; /* 座標指定を絶対値指定にして */
	left: 0; /* X座標を0に */
	top: 0; /* Y座標を0に */
}
blockquote {
	/* margin: 3rem; */
	/* position: absolute;
	top: 0;
	right: 0; */
	width: 100%;
	height: 59vh;
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
