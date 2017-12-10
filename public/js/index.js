const db = firebase.database().ref();

db.on('value', snap => {
    var n = 0;
    var x = $("#window-content");
    
    // iterate through nodes
    snap.forEach(function(data){
        
        var b = $('#table_body');
        
        // iterate through values of each node
        data.forEach(function(cdata){
            
            var country = cdata.val();
            
            var sInfo = country.SE_XPD_MTOT_ZS;
            
            var sRef = cdata.child('SE_XPD_MTOT_ZS');
            
            sRef.forEach(function(sData){
                if(sData.key != "SeriesName"){
                    if(sData.key != "SeriesCategory"){
                        b.append("<tr><td>" + country.CountryName +  "</td><td>" + 
                         country.Region + "</td>" + "</td><td>" + 
                         sData.key + "</td><td>" + 
                         sData.val() + "</td></tr>");
                    }
                }
            });
            
        });
        
    });
    
});








