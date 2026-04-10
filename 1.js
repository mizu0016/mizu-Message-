function handleCredentialResponse(response) {
    // 1. 入力欄から「自分で決めたIDと名前」をゲット
    const userId = document.getElementById('user-id-input').value;
    const userName = document.getElementById('user-name-input').value;

    if (!userId || !userName) {
        alert("先にIDと名前を入力してから、Googleログインしてください");
        return;
    }

    // 2. Googleの情報（メアドやアイコン）を解読
    const googleUser = JSON.parse(atob(response.credential.split('.')[1]));
    
    // 3. ブラウザに全部保存（ID, 名前, メアド, アイコンURL）
    localStorage.setItem('myId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', googleUser.email);
    localStorage.setItem('userIcon', googleUser.picture);

    // 4. スプレッドシートに送信
    const s_url = "https://script.google.com/macros/s/AKfycbxLg7kmU6KUT47RRfJgwFrKB2iEVwxYfc8PTlLB4XMQviIC1lDY6Y3KN2hErFbrBjStWg/exec";
    fetch(`${s_url}?id=${userId}&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(googleUser.email)}&message=新規登録完了`, {
        mode: 'no-cors'
    }).then(() => {
        window.location.href = "2.html";
    }).catch(() => {
        window.location.href = "2.html";
    });
}
