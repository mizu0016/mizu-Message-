function handleCredentialResponse(response) {
    // Googleからユーザー情報を解読して取得
    const user = JSON.parse(atob(response.credential.split('.')[1]));
    
    // 次の画面（2.html）で使うために名前とメールアドレスを保存
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);

    // ログインが完了したら2.htmlへジャンプ
    window.location.href = "2.html";
}