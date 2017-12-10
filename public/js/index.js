const db = firebase.database().ref().child('regions');

db.on('value', snap => {
    var n = 0;
    var x = $("#window-content");
    
    snap.forEach(function(data){
        
        x.append("<b>" + data.key + "</b>");
        
        x.append(
            "<table>" +
                "<thead id='table_head" + n + "'>" +
                    "<tr>" +
                        "<td><b>Country Code</b></td>" +
                        "<td><b>Income</b></td>" +
                    "</tr>" +
                "</thead>" +
                "<tbody id='table_body" + n + "'>" +
                "</tbody>" +
             "</table>"
            );
    
        var b = $('#table_body' + n);

        data.forEach(function(cdata){
            var country = cdata.val();

            b.append("<tr><td>" + cdata.key + "</td><td>" + country.income + "</td><tr>");

        });
        
        n++;
        
    });
});


