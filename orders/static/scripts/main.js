$(function() {

    $(".list").click(function(event) {
        //console.log(this);
        if(String($("#"+(this.cells[0]).innerHTML).html()) != '-')
            $("#theInput").val($("#"+(this.cells[0]).innerHTML).html())
        $("#hidden_item_id").html(String((this.cells[0]).innerHTML))
        $("#item_name").html(String((this.cells[1]).innerHTML))
        $("#hidden_base_price").html(String((this.cells[2]).innerHTML))
    });

    var dict = [];
    $.each(document.cookie.split(/; */), function() {
        var splitCookie = this.split('=');
        // name is splitCookie[0], value is splitCookie[1]
        if((splitCookie[0]).startsWith("item-details")){
            // let str = (splitCookie[1]).substring(1, (splitCookie[1]).length-1);
            let str = splitCookie[1] ; 
            let ar = str.split('--');
            // console.log(ar[2]);
            $("#"+ar[0]).html(ar[2])
            dict.push({
                item_id : parseInt(ar[0]) ,
                item_name: ar[1],
                quantity:  parseInt(ar[2]),
                bill : parseInt(ar[3])
            });
        }
    });
    //var dict = {};
    $("#plus").click(function(){
        //console.log($("#theInput").val());
        $("#theInput").val(parseInt($("#theInput").val()) +1)
    });
    $("#minus").click(function(){
        $("#theInput").val(parseInt($("#theInput").val()) -1)
    });
    $("#ok").click(function(){
        if(String($("#"+$("#hidden_item_id").html()).html()) != '-'){
            //console.log("updated");
            for(let i=0;i<dict.length;i++){
                if((dict[i])['item_id']==$("#hidden_item_id").html()){
                    dict[i]['quantity'] = parseInt($("#theInput").val()); //At position i remove the 1 item
                }
            }
        }
        //console.log($("#item_name").html());
        else{
            dict.push({
                item_id : parseInt($("#hidden_item_id").html()) ,
                item_name: $("#item_name").html(),
                quantity:  parseInt($("#theInput").val()),
                bill : parseInt($("#theInput").val()) * parseInt($("#hidden_base_price").html())
            });
        }
        // dict[$("#item_name").html()] = $("#theInput").val();
        console.log(dict);
        // $("#"+(that.cells[2]).id).html(String($("#theInput").val()))
        $("#"+$("#hidden_item_id").html()).html($("#theInput").val())
        $("#theInput").val(1)
        //console.log('#' + (that.cells[2]).id);
    });

  
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    $("#clearcart").click(function(){
        // console.log(dict.length);
        $.ajax({
            url : "delcook/",
            type : "POST",
            headers: { "X-CSRFToken": getCookie("csrftoken") } ,
            data : {'len': dict.length},
            success : function(json) {
                console.log(json['message'])
                window.location.href="";
            },
            error : function(json) { 
                alert('Something went wrong');
            }
        });
    });

    $("#placeorder").click(function(){
        console.log('Place my order B*tch');
        if(dict.length == 0)
            alert("Fortunately you didn't pick anything")
        else{
            $.ajax({
                url : "order/",
                type : "POST",
                headers: { "X-CSRFToken": getCookie("csrftoken") } ,
                data : {'data': JSON.stringify(dict)},
                success : function(json) {
                    console.log(json['message'])
                    window.location.href="placeorder/";
                },
                error : function(json) { 
                    alert('we blocked you');
                }
            });
        }
    });

});