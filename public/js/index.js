var db = firebase.database().ref();

var index = 0;

var currNode;

function createBaseTable(){
    db.on('value', function(snap){
        // iterate through nodes
        snap.forEach(function(data){
            
            currNode = data.key;

            // iterate through values of each node
            data.forEach(function(cdata){

                var country = cdata.val();
                
                var sRef = cdata.child('SE_XPD_MTOT_ZS');

                sRef.forEach(function(sData){
                    if(sData.key != "SeriesName"){
                        if(sData.key != "SeriesCategory"){
                            var b = $("#table_body");
                            
                            var tRow = $("<tr>");
                            var tdCName = $("<td>");
                            var tdRegion = $("<td>");
                            var tdYear = $("<td>");
                            var tdData = $("<td>");
                            
                            tdCName.addClass("editCN");
                            tdCName.attr("contenteditable", "true");
                            tdCName.attr("id", "cn" + index);
                            tdCName.attr("data-ccode", cdata.key);
                            tdCName.attr("data-node", currNode);
                            
                            tdCName.text(country.CountryName);
                            tdRegion.text(country.Region);
                            tdYear.text(sData.key);
                            tdData.text(sData.val());
                            
                            tRow.append(tdCName);
                            tRow.append(tdRegion);
                            tRow.append(tdYear);
                            tRow.append(tdData);
                            b.append(tRow);

                            index++;
                        }
                    }
                });

            });

        });

    });
}

createBaseTable();

$(document).ready(function(){
    
    close();
    
    lRead();
    
    editCN();
    editYD();
    
    accessNode2TC();
    
});

function close(){
    $("#window-close").click(createBaseTable);
}

function lRead(){
    var i = 0;
    
    $("#lRead").click(function(){
        
        var aruba = firebase.database().ref().child('Node2').child('ABW');
        
        // reset table
        $("#table_body").html("");
        
        aruba.on('value', snap => {
            var data = snap.val();
            
            var sInfo = snap.child('SE_XPD_MTOT_ZS');
            
            sInfo.forEach(function(sData){
                if(sData.key != "SeriesName"){
                    if(sData.key != "SeriesCategory"){
                        
                        $("#table_body").append(
                            "<tr>" + 
                                "<td>" + data.CountryName + "</td>" +
                                "<td>" + data.Region + "</td>" +
                                "<td>" + sData.key + "</td>" +
                                "<td class='editYD' contenteditable='true' id='yd" + i + "'>" + sData.val() + "</td>" +
                            "</tr>"
                        );
                        
                        index++;
                    }
                }
            });
            
        });
        
    });
}

function editYD(){
    $(document).on("click",".editYD", function () {
        
        var editYD = $(this);
        
        $(document).keyup(function(e){
            if(e.which == 13){
                e.preventDefault();
                
                var yearData = editYD.text();
                
                editYD.text(yearData.trim());
                
                editYD.blur();
                
//                firebase.database().ref().child(currentNode).(row);
                
                return false;
            }
        });
        
    });
}

function editCN(){
    $(document).on("click",".editCN", function () {
        
        var editCN = $(this);
        
        $(document).keyup(function(e){
            if(e.which == 13){
                e.preventDefault();
                
                var countryName  = editCN.text();
                
                editCN.text(countryName.trim());
                
                editCN.blur();
                
                firebase.database().ref().child(editCN.attr("data-node")).child(editCN.attr("data-ccode")).update({CountryName: editCN.text()});
                createBaseTable();
                return false;
            }
        });
        
    });
}

function accessNode2TC(){
    // access TCLog of Node 2
//    $.get('node2.html', null, function(text){
//        alert($(text).find('#tclog1').text());
//    });
}
    
    







