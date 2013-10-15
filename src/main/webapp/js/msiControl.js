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
            $("#msiControlPanel .collapse").data("collapse", null)
            openCollapse("#msiControlPanel .accordion-body:first");
        } else {
            $("#msiControlPanel").css("display", "none");
        }
    });

    function formatDate(dato) {
        if (dato == null) return "-";
        var d = new Date(dato);
        return d.getFullYear()+"-"+(""+(101+d.getMonth())).slice(1,3)+"-"+(""+(100+d.getDate())).slice(1,3);
    }

    function formatTime(dato) {
        if (dato == null) return "-";
        var d = new Date(dato);
        return formatDate(dato) + " " + d.getHours()+":"+(""+(100+d.getMinutes())).slice(1,3);
    }

    embryo.authenticated(function() {
        var messageId = embryo.messagePanel.show( { text: "Requesting active MSI warnings ..." })

        $.ajax({
            url: embryo.baseUrl+"rest/msi/list",
            data: { },
            success: function(data) {
                data = data.sort(function(a,b) {
                    return b.created-a.created;
                });

                for (var i in data) data[i].id = i;

                var html = "<tr><th>Date</th><th>Type</th><th>Area</th></tr>";

                for (var i in data) {
                    html += "<tr index="+i+" style='cursor:pointer'><td>"+formatDate(data[i].created)+"</td><td>"+data[i].enctext+"</td><td>"+data[i].mainArea+" - "+data[i].subArea+"</td>";               }

                $("#msiOverview table").html(html);

                $("#msiOverview tr").click(function(e) {
                    var msi = data[$(this).attr("index")];
                    showMsiInformation(msi);
                    msiLayer.select(msi);
                    embryo.map.setCenter(msi.longitude, msi.latitude, 8);
                });

                msiLayer.draw(data);

                embryo.messagePanel.replace(messageId, { text: data.length + " MSI warnings returned.", type: "success" })
            },
            error: function(data) {
                embryo.messagePanel.replace(messageId, { text: "Server returned error code: " + data.status + " requesting MSI warnings.", type: "error" })
            }
        });
    });

    embryo.ready(function() {
        function fixAccordionSize() {
            $("#msiOverview .accordion-inner").css("overflow", "auto");
            $("#msiOverview .accordion-inner").css("max-height", Math.max(100, $(window).height()-350)+"px");
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