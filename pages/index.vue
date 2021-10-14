<template>
	<div>
		<h1>顔認証</h1>
		<!-- video の上に canvas をオーバーレイするための div 要素 -->
		<div id="container">
			<!-- カメラ映像を流す video -->
			<video id="video" width="400" height="300" autoplay></video>
			<!-- 重ねて描画する canvas -->
			<canvas id="canvas" width="400" height="300"></canvas>
		</div>
		<!-- データ表示用 div 要素 -->
		<div id="dat"></div>
	</div>
</template>
<script>
export default {
	head() {
		return {
			script: [
				{ src: "/js/clmtrackr.min.js" },
				{ src: "/js/model_pca_20_svm.js" },
			],
		};
	},
	methods: {
		showData(pos) {
			const str = ""; // データの文字列を入れる変数
			for (const i = 0; i < pos.length; i++) {
				// 全ての特徴点（71個）について
				str +=
					"特徴点" +
					i +
					": (" +
					Math.round(pos[i][0]) +
					", " + // X座標（四捨五入して整数に）
					Math.round(pos[i][1]) +
					")<br>"; // Y座標（四捨五入して整数に）
			}
			const dat = document.getElementById("dat"); // データ表示用div要素の取得
			dat.innerHTML = str; // データ文字列の表示
		},
		drawLoop(obj) {
			// 次の呼び出しをしておく
			requestAnimationFrame(this.drawLoop);
			obj.context.clearRect(0, 0, obj.canvas.width, obj.canvas.height); // canvas をクリア
			// 顔部品の現在位置の取得
			const position = obj.tracker.getCurrentPosition();
			if (position) {
				obj.tracker.draw(obj.canvas); // canvas にトラッキング結果を描画
				this.showData(positions); // データの表示
			};
			// console.log(obj.tracker);
			// console.log(positions);
		},
	},
	mounted() {
		// もろもろの準備
		const video = document.getElementById("video"); // video 要素を取得
		const canvas = document.getElementById("canvas"); // canvas 要素の取得
		const context = canvas.getContext("2d"); // canvas の context の取得

		// getUserMedia によるカメラ映像の取得
		navigator.mediaDevices
			.getUserMedia({
				// メディアデバイスを取得
				video: { facingMode: "user" }, // カメラの映像を使う（スマホならインカメラ）
				audio: false, // マイクの音声は使わない
			})
			.then((stream) => {
				// メディアデバイスが取得できたらvideo 要素にストリームを渡す
				video.srcObject = stream;
			})
			.catch((err) => {
				console.log("メディアデバイス取得に失敗しました");
				console.log(err);
			});
		console.log("---mejirushi");
		// console.log(video.srcObject);
		// clmtrackr の開始
		const tracker = new clm.tracker(); // tracker オブジェクトを作成
		tracker.init(pModel); // tracker を所定のフェイスモデル（※）で初期化
		tracker.start(video); // video 要素内でフェイストラッキング開始
		console.log(canvas.height);
		console.log(canvas.width);
		// drawLoop 関数を実行
		this.drawLoop({
			tracker: tracker,
			context: context,
			canvas: canvas,
		});
	},
};
</script>
<style scoped>
/* video 要素の上に canvas 要素をオーバーレイするための CSS */
#container {
	/* コンテナ用の div について */
	position: relative; /* 座標指定を相対値指定にする */
}
#video {
	/* カメラ映像を流す video について */
	transform: scaleX(-1); /* 左右反転させる */
}
#canvas {
	/* 描画用の canvas について */
	transform: scaleX(-1); /* 左右反転させる */
	position: absolute; /* 座標指定を絶対値指定にして */
	left: 0; /* X座標を0に */
	top: 0; /* Y座標を0に */
}
</style>
