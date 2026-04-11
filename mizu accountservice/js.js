// 名前チェックのシミュレーション（本来はGASでスプレッドシートを見に行く）
function checkNameName() {
  const name = document.getElementById('user-name').value;
  const status = document.getElementById('name-status');
  const waitMsg = document.getElementById('wait-msg');
  const suggestions = document.getElementById('suggestions');

  if (name === "mizu") { // すでに使われている名前の例
    status.innerText = "その名前は使用されています";
    status.style.color = "red";
    
    // 逆算機能スタート
    waitMsg.style.display = "block";
    suggestions.innerHTML = "";
    
    setTimeout(() => {
      waitMsg.style.display = "none";
      // 逆算ルール：人気ワード(red等)をつける
      const options = [name + "_red", name + "_cool", name + "123"];
      options.forEach(opt => {
        let span = document.createElement('span');
        span.className = "suggest-item";
        span.innerText = opt;
        span.onclick = () => { document.getElementById('user-name').value = opt; };
        suggestions.appendChild(span);
      });
    }, 1500); // 1.5秒待たせて安心させる
  } else {
    status.innerText = "";
    waitMsg.style.display = "none";
  }
}

// 自分の名前をコピー
function copyMyName() {
  const name = document.getElementById('display-name').innerText;
  navigator.clipboard.writeText(name);
  
  const toast = document.getElementById('copy-toast');
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// アカウント作成（デモ用）
function createAccount() {
  document.getElementById('signup-page').style.display = 'none';
  document.getElementById('home-page').style.display = 'block';
}
