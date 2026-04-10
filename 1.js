function handleCredentialResponse(response) {
    const userId = document.getElementById('user-id-input').value;
    const userName = document.getElementById('user-name-input').value;

    if (!userId || !userName) {
        alert("IDと名前を入力してください");
        return;
    }

    const googleUser = JSON.parse(atob(response.credential.split('.')[1]));
    
    localStorage.setItem('myId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', googleUser.email);
    localStorage.setItem('userIcon', googleUser.picture);

    const s_url = "https://script.google.com/macros/s/AKfycbxLg7kmU6KUT47RRfJgwFrKB2iEVwxYfc8PTlLB4XMQviIC1lDY6Y3KN2hErFbrBjStWg/exec";
    
    fetch(`${s_url}?id=${userId}&name=${encodeURIComponent(userName)}&email=${encodeURIComponent(googleUser.email)}&message=新規登録`, {
        mode: 'no-cors'
    }).then(() => {
        window.location.href = "2.html";
    }).catch(() => {
        window.location.href = "2.html";
    });
}
