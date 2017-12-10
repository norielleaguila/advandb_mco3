const db = firebase.database().ref();

db.on('value', snap => {
    var n = 0;
    var x = $("#window-content");
    
    // create table
    x.append(
            "<table>" +
                "<thead id='table_head" + n + "'>" +
                    "<tr>" +
                        "<td><b>Country Name</b></td>" +
                        "<td><b>Region</b></td>" +
                        "<td><b>Income</b></td>" +
                    "</tr>" +
                "</thead>" +
                "<tbody id='table_body" + n + "'>" +
                "</tbody>" +
             "</table>"
            );
    
//    // iterate through children
//    snap.forEach(function(data){
//        var b = $('#table_body' + n);
//        
//        var country = data.val();
//        
//        b.append("<tr><td>" + country.CountryName +  "</td><td>" + country.Region + "</td>" + "</td><td>" + country.Income + "</td><tr>");
//        
//        // iterate through values of each series
//        data.forEach(function(sdata){
//            
//
//        });
//        
//    });
//        
//    n++;
    
    // iterate through nodes
    snap.forEach(function(data){
        
        var b = $('#table_body' + n);
        
        // iterate through values of each node
        data.forEach(function(cdata){
            
            var country = cdata.val();
        
            b.append("<tr><td>" + country.CountryName +  "</td><td>" + country.Region + "</td>" + "</td><td>" + country.Income + "</td><tr>");
            
        });
        
    });
        
    n++;
});








