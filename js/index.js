// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyARmTaggGBWnkJvS2Stc-H4wsJeejpcR_8",
authDomain: "dev18-chat-15a8a.firebaseapp.com",
databaseURL: "https://dev18-chat-15a8a.firebaseio.com",
projectId: "dev18-chat-15a8a",
storageBucket: "dev18-chat-15a8a.appspot.com",
messagingSenderId: "79031230023",
appId: "1:79031230023:web:55ef84d4199bad079f1b62"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var myName = prompt("Enter your name");

function sendMessage(){
    var message = document.getElementById("message").value;

    firebase.database().ref("messages").push().set({
        "sender": myName,
        "message": message
    })

    return false;
}

firebase.database().ref("messages").on("child_added", function(snapshot){
    var html = "";

    html += `<li id='message-${snapshot.key}'>`;

    if(snapshot.val().sender == myName){
        html += `<button data-id='${snapshot.key}' onclick='deleteMessage(this);'>Delete</button>`
    }
    html += `${snapshot.val().sender}:${snapshot.val().message}`;

    html += "</li>"
    document.getElementById("messages").innerHTML += html;
});

function deleteMessage(self){
    var messageId = self.getAttribute("data-id");

    firebase.database().ref("messages").child(messageId).remove();
}

firebase.database().ref("messages").on("child_removed", function (snapshot){
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
});