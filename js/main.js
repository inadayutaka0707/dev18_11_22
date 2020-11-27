let name;
let pass;
let userAccount = [];
let setCount = 0;
let datas = [];
let loginUser = [];

/*-----------------
Firebaseの処理
------------------*/
var firebaseConfig = {
    apiKey: "AIzaSyARmTaggGBWnkJvS2Stc-H4wsJeejpcR_8",
    authDomain: "dev18-chat-15a8a.firebaseapp.com",
    databaseURL: "https://dev18-chat-15a8a.firebaseio.com",
    projectId: "dev18-chat-15a8a",
    storageBucket: "dev18-chat-15a8a.appspot.com",
    messagingSenderId: "79031230023",
    appId: "1:79031230023:web:55ef84d4199bad079f1b62"
};
firebase.initializeApp(firebaseConfig);
const newPostRef = firebase.database().ref("userprofiles");


newPostRef.on("child_added", function (data){
    userAccount.push([data.val()]);
    let v = data.val();
    datas.push({
        name: v.name,
        pass: v.pass
    });
    console.log(v);
    console.log(datas);
});
/*-----------------
Firebaseの処理
------------------*/


//新規登録
function registration(){
    var password = document.getElementById('pass').value.length;
    name = $("#name").val(); //入力値を取得
    pass = $("#pass").val(); //入力値を取得

    if(name == "" || password < 6){
        if(name == ""){
            alert('名前を入力してね');
            return false;
        }else if(password < 6){
            alert('パスワードは6文字以上入れてね');
            return false;
        }
    }else{
        for(var i = 0; i < userAccount.length; i++){
            if(userAccount[i][0].name == name){
                alert('既に登録されたログイン名です');
                $("#name").val("");
                $("#pass").val("");
                return false;
            }
        }
        newPostRef.push({
            name: $("#name").val(),
            pass: $("#pass").val()
        });
    }
}

//ログイン
function login(){
    var accountValue;
    name = $('#name').val();
    pass = $('#pass').val();
    var count = 0;
    if(userAccount.length == 0){
        alert('新規登録をしてください');
        window.location.href = 'index2.html';
    }
    for(var i = 0; i < userAccount.length; i++){

        if(userAccount[i][0].name == name){
            if(userAccount[i][0].pass == pass){
                loginUser = name;
                $("#name").val("");
                return true;
            }else if(pass == ""){
                if(userAccount[i][0].name == name){
                    alert('パスワードを入力してください');
                    count += 1;
                }
            }else{
                alert('パスワードが違います');
                count += 1;
                $("#pass").val("");
            }
        }
        
        if(i == userAccount.length - 1 && count == 0){
            alert('登録情報がありません');
            $("#name").val("");
        }
    }
    return false;
}

//ユーザーページ
window.onload = function(){
    console.log(datas.name);
    $("#header").html(`<h1>${userAccount.name}</h1>`);

    $("#save").on("click", function(){
        const key = $("#key").val();
        const value = $("#memo").val();
        
        localStorage.setItem(key, value); //一覧表示に追加
        const html = `<li><span>${key}</span><span>${value}</span></li>`;

        $("#list").append(html);
        $("#key").val("");
        $("#memo").val("");

        
    });
    $("#clear").on('click', function () {
        // 保存されたデータ（localStorage）を消す
        localStorage.clear();
  
        // 削除するときに、入力されている中身を空にする
        $("#key").val("");
        $("#memo").val("");
        //id="list"を削除する
        $("#list").empty();
    });

    //3.ページ読み込み：保存データ取得表示
    for (let i = 0; i < localStorage.length; i++) {
        // 保存されたデータのkeyを取得
        const key = localStorage.key(i);
  
        // 何が入っているか確認してみよう☺️
  
        // getItemのKeyを使って保存されたデータを全部取得
        const value = localStorage.getItem(key);
  
        // 何が入っているか確認してみよう☺️
        const html = `
        <li>
          <span>${key}</span>
          <span>${value}</span>
        </li>`
  
        // htmlに埋め込む
        $("#list").append(html);
  
      }
}
