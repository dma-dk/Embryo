$(function() {
    var msiLayer = new MsiLayer();

    msiLayer.select(function(msi) {
        if (msi != null) showMsiInformation(msi);
        else hideMsiInformation();
    });

    addLayerToMap("msi", msiLayer, embryo.map);

    embryo.groupChanged(function(e) {
        if (e.groupId == "msi") {
            $("#msiControlPanel").css("display", "block");
            $("#msiControlPanel .collapse").data("collapse", null);
            openCollapse("#msiControlPanel .accordion-body:first");
        } else {
            $("#msiControlPanel").css("display", "none");
        }
    });

    
        function requestMsiList() {
            var messageId = embryo.messagePanel.show( { text: "Requesting active MSI warnings ..." });

            embryo.msi.service.list(function(data) {
                if(data.length == 0){
                    var html = "No active warnings";
                    $("#msiOverview div.e-accordion-inner").html(html);
                    embryo.messagePanel.replace(messageId, { text: data.length + " MSI warnings returned.", type: "success" });
                    return;
                }
                
                data = data.sort(function(a,b) {
                    return b.created-a.created;
                });

                for (var i in data) data[i].id = i;

                
                var html = "<table class='table table-condensed'><tr><th>Date</th><th>Type</th><th>Area</th></tr>";

                for (var i in data) {
                    html += "<tr index="+i+" style='cursor:pointer'><td>"+formatDate(data[i].created)+"</td><td>"+data[i].enctext+"</td><td>"+data[i].mainArea+" - "+data[i].subArea+"</td>";               
                }
                
                html += "</table>";
                
                 $("#msiOverview div.e-accordion-inner").html(html);

                $("#msiOverview tr").click(function(e) {
                    var msi = data[$(this).attr("index")];
                    showMsiInformation(msi);
                    msiLayer.select(msi);

                    switch (msi.type) {
                        case "Point":
                            embryo.map.setCenter(msi.points[0].longitude, msi.points[0].latitude, 8);
                            break;
                        case "Points":
                        case "Polygon":
                        case "Polyline":
                            embryo.map.setCenter(msi.points[0].longitude, msi.points[0].latitude, 8);
                            break;
                    }

                });

                msiLayer.draw(data);

                embryo.messagePanel.replace(messageId, { text: data.length + " MSI warnings returned.", type: "success" });
            }, function (errorMsg, status){
                embryo.messagePanel.replace(messageId, { text: errorMsg, type: "error" });
            });
        }

        requestMsiList();
        setInterval(requestMsiList, 1 * 60 * 1000 * 60);
        
        
        if(typeof embryo.authentication.permissions === 'undefined'){
            embryo.authenticated(function() {
                requestMsiList();
                setInterval(requestMsiList, 1 * 60 * 1000 * 60);
            });
        }else{
            requestMsiList();
            setInterval(requestMsiList, 1 * 60 * 1000 * 60);
        }

    
    embryo.ready(function() {
        function fixAccordionSize() {
            $("#msiControlPanel .e-accordion-inner").css("overflow", "auto");
            $("#msiControlPanel .e-accordion-inner").css("max-height", Math.max(100, $(window).height() - 233)+"px");
        }

        $(window).resize(fixAccordionSize);

        fixAccordionSize();
    });

    function showMsiInformation(msi) {
        var html = "";

        html += "<tr><td>Created</td><td>"+formatDate(msi.created)+"</td></tr>";
        html += "<tr><td>Updated</td><td>"+formatDate(msi.updated)+"</td></tr>";
        html += "<tr><td>Main Area</td><td>"+msi.mainArea+"</td></tr>";
        html += "<tr><td>Sub Area</td><td>"+msi.subArea+"</td></tr>";
        html += "<tr><td>Navtex Number</td><td>"+msi.navtexNo+"</td></tr>";

        $("#msiSelectedItem table").html(html);
        $("#msiSelectedItem p").html(msi.text);
        $("a[href=#msiSelectedItem]").html("Selected Warning - "+msi.enctext);
        openCollapse("#msiSelectedItem");
        $("#msiOverview tr").removeClass("alert");
        $("#msiOverview tr[index="+msi.id+"]").addClass("alert");
    }

    function hideMsiInformation() {
        closeCollapse("#msiSelectedItem");
        $("a[href=#msiSelectedItem]").html("Selected Warning");
        $("#msiOverview tr").removeClass("alert");
    }
});
