// --- 設定：音声・画像リスト ---
const sounds = {
    ringtone: new Audio('Telephone-Ringtone02-1.mp3'),
    police_start: new Audio('C:\\Users\\user\\Desktop\\119\\mp3\\001_青山龍星（ノーマル）_火事ですか、救急で….wav'),
    fire_start: new Audio('C:\\Users\\user\\Desktop\\119\\mp3\\001_青山龍星（ノーマル）_火事ですか、救急で….wav'),
    where: new Audio('C:\\Users\\user\\Desktop\\119\\mp3\\001_青山龍星（ノーマル）_場所はどこですか？….wav'),
    end: new Audio('C:\\Users\\user\\Desktop\\119\\mp3\\001_青山龍星（ノーマル）_今そちらに向かわせ….wav')
};

const images = {
    "110": [ "C:\\Users\\user\\Desktop\\119\\peg\\ChatGPT Image 2026年4月26日 11_12_25.png"], // 事故系の画像名を入れてね
    "119": ["C:\\Users\\user\\Desktop\\119\\peg\\ChatGPT Image 2026年4月26日 11_18_02.pngxcvgh", "C:\\Users\\user\\Desktop\\119\\peg\\ChatGPT Image 2026年4月26日 10_58_15.png"]     // 火事・救急系の画像名を入れてね
};
mbulance.jpg
let currentNumber = "";
const statusText = document.getElementById('status');
const numberText = document.getElementById('number-display');
const transcriptText = document.getElementById('transcript');
const sceneImg = document.getElementById('scene-img');

// 音声認識の準備
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';

async function playAudio(audio) {
    return new Promise(resolve => {
        audio.play();
        audio.onended = resolve;
    });
}

function press(num) {
    if (currentNumber.length < 3) {
        currentNumber += num;
        numberText.innerText = currentNumber;
    }
}

function reset() {
    currentNumber = "";
    numberText.innerText = "";
    transcriptText.innerText = "";
    statusText.innerText = "番号を入力してください";
    sceneImg.style.display = "none";
    document.getElementById('keypad').style.display = "grid";
}

function listen() {
    return new Promise(resolve => {
        statusText.innerText = "🎤 お話しください";
        recognition.start();
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            transcriptText.innerText = "「" + text + "」";
            resolve();
        };
        recognition.onerror = () => resolve();
    });
}

async function makeCall() {
    if (currentNumber === "110" || currentNumber === "119") {
        // 画像をランダム選出
        const imgList = images[currentNumber];
        sceneImg.src = imgList[Math.floor(Math.random() * imgList.length)];
        
        document.getElementById('keypad').style.display = "none";
        sceneImg.style.display = "block";

        // 1. 呼び出し音 (3秒)
        statusText.innerText = "🚨 発信中...";
        sounds.ringtone.loop = true;
        sounds.ringtone.play();
        await new Promise(r => setTimeout(r, 3000));
        sounds.ringtone.pause();
        sounds.ringtone.currentTime = 0;

        // 2. 第一声
        statusText.innerText = "📞 オペレーター";
        if (currentNumber === "110") await playAudio(sounds.police_start);
        else await playAudio(sounds.fire_start);

        // 3. 状況説明
        await listen();

        // 4. 場所確認
        await playAudio(sounds.where);

        // 5. 住所回答
        await listen();

        // 6. 終了
        await playAudio(sounds.end);
        statusText.innerText = "✅ 通報終了";
        setTimeout(reset, 4000);
    } else {
        alert("110 または 119 を入力してください");
        reset();
    }
}