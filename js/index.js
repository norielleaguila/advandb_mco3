const db = firebase.database().ref().child('text');
            
db.on('value', snap => {
    $("#object span").text(snap.val());
});
