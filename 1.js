function handleCredentialResponse(response) {
    // 1. Googleからユーザー情報を解読して取得
    const user = JSON.parse(atob(response.credential.split('.')[1]));
    
    // 2. 次の画面（2.html）で使うために名前とメールアドレスをブラウザに保存
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);

    // 3. ミズのGAS URL（送り先）を設定
    const s_url = "https://script.google.com/macros/s/AKfycbxLg7kmU6KUT47RRfJgwFrKB2iEVwxYfc8PTlLB4XMQviIC1lDY6Y3KN2hErFbrBjStWg/exec";
    
    // 4. スプレッドシートに「名前」と「メール」を送信する
    // fetchを使って、GASの住所にデータを投げ飛ばします
    fetch(`${s_url}?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&message=ログインしました`, {
        mode: 'no-cors' // 送信専用（返事は待たない）という設定
    })
    .then(() => {
        // 5. 送信が成功したら、2.htmlへジャンプ
        window.location.href = "2.html";
    })
    .catch((error) => {
        // もしエラーが起きても、止まらずに2.htmlへ進むようにしておく
        console.log("送信エラー:", error);
        window.location.href = "2.html";
    });
}
