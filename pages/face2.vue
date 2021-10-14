<template>
	<div id="app">
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
// const tf = require("@tensorflow/tfjs-node");
// const faceapi = require("@vladmandic/face-api");
export default {
	methods: {
		onPlay() {
			const video = document.getElementById("video"); // video 要素を取得
			const canvas = document.getElementById("canvas"); // canvas 要素の取得
			const emotion_str = document.getElementById("emotion_str");

			setInterval(async () => {
				// ウェブカメラの映像から顔データを取得
				const detections = await faceapi
					.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
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
				if (detections[0] !== undefined) {
					const expressions = detections[0].expressions;
					emotion_str.innerHTML = `<p>sad:${expressions.sad}<br/>happy:${expressions.happy}<br/>angry:${expressions.angry}<br/>surprised:${expressions.surprised}<br/>disgusted:${expressions.disgusted}<br/>fearful:${expressions.fearful}</p>`;
				}
			}, 100);
		},
	},
	mounted() {
		// 顔モデルをロード
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
			faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
			faceapi.nets.faceExpressionNet.loadFromUri("/models"),
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
#emotion_str {
	display: block;
	margin-top: 20rem;
}
</style>
