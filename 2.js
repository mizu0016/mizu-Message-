window.onload = function() {
    const name = localStorage.getItem('userName');
    const icon = localStorage.getItem('userIcon'); // Googleから来たアイコン

    if (!name) { 
        window.location.href = "1.html"; 
        return; 
    }

    document.getElementById('welcome-message').innerText = name + " さん";
    
    // アイコンがあれば表示する
    if (icon) {
        document.getElementById('my-icon-display').src = icon;
        document.getElementById('profile-preview').src = icon;
    }
};
