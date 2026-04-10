window.onload = function() {
    // 1.jsで保存した名前を取り出してヘッダーに表示
    const name = localStorage.getItem('userName');
    if (name) {
        document.getElementById('welcome-message').innerText = name + " さん";
    } else {
        // 名前がなければログイン画面に戻す（index.htmlにリネームした場合はここを index.html に変えてね）
        window.location.href = "index.html";
    }
};

// 【追加：13行目】チャット相手を記憶しておくための変数
let currentPartner = ""; 

// IDを検索してチャット画面に切り替える関数
function searchAndStartChat() {
    const partnerId = document.getElementById('search-id-input').value;
    
    // 空欄の場合はアラートを出す
    if (partnerId.trim() === "") {
        alert("IDを入力してください");
        return;
    }

    // 【修正：28行目】検索した相手のIDを記憶する
    currentPartner = partnerId;

    // 検索画面（A）を隠して、チャット画面（B）を表示する
    document.getElementById('search-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'flex';
    
    // ヘッダーに相手のID（名前）を表示
    document.getElementById('chat-partner-name').innerText = partnerId + " とのチャット";
    
    // 検索入力欄をリセットしておく
    document.getElementById('search-id-input').value = "";
}

// チャット画面から検索画面に戻る関数
function backToSearch() {
    document.getElementById('chat-section').style.display = 'none';
    document.getElementById('search-section').style.display = 'flex';
    
    // 【追加：48行目】相手の記憶をリセット
    currentPartner = "";

    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = '<div class="message system">チャットを開始しました</div>';
}

// メッセージを送信する関数
function sendMessage() {
    const textInput = document.getElementById('m-text');
    const text = textInput.value;
    
    // 空文字なら送信しない
    if (text.trim() === "") return;

    const chatArea = document.getElementById('chat-area');
    const newMessage = document.createElement('div');
    
    // 自分のメッセージなので、右寄せ用のクラスを追加する
    newMessage.className = "message my-message";
    
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail'); // メアドも取得

    newMessage.innerText = name + ": " + text;
    
    // 画面に追加
    chatArea.appendChild(newMessage);

    // 【追加：77行目〜】スプレッドシート（GAS）にメッセージを送る
    const s_url = "https://script.google.com/macros/s/AKfycbxLg7kmU6KUT47RRfJgwFrKB2iEVwxYfc8PTlLB4XMQviIC1lDY6Y3KN2hErFbrBjStWg/exec";
    
    // 自分の名前、メアド、チャット相手、メッセージをURLにくっつけて送る
    fetch(`${s_url}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&partner=${encodeURIComponent(currentPartner)}&message=${encodeURIComponent(text)}`, {
        mode: 'no-cors'
    });
    
    // 入力欄を空にする
    textInput.value = ""; 
    
    // 自動的に一番下までスクロールする
    chatArea.scrollTop = chatArea.scrollHeight;
}
