window.onload = function() {
    // 1.jsで保存した名前を取り出してヘッダーに表示
    const name = localStorage.getItem('userName');
    if (name) {
        document.getElementById('welcome-message').innerText = name + " さん";
    } else {
        // 名前がなければログイン画面に戻す
        window.location.href = "1.html";
    }
};

// IDを検索してチャット画面に切り替える関数
function searchAndStartChat() {
    const partnerId = document.getElementById('search-id-input').value;
    
    // 空欄の場合はアラートを出す
    if (partnerId.trim() === "") {
        alert("IDを入力してください");
        return;
    }

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
    // チャット画面（B）を隠して、検索画面（A）を表示する
    document.getElementById('chat-section').style.display = 'none';
    document.getElementById('search-section').style.display = 'flex';
    
    // チャットエリアを初期状態にリセットする
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
    newMessage.innerText = name + ": " + text;
    
    // 画面に追加
    chatArea.appendChild(newMessage);
    
    // 入力欄を空にする
    textInput.value = ""; 
    
    // 自動的に一番下までスクロールする
    chatArea.scrollTop = chatArea.scrollHeight;
}