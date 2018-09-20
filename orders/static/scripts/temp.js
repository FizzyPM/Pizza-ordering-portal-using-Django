$(function() {

    var bill=0;
    var dict={};
    let i=0;
    $.each(document.cookie.split(/; */), function() {
        var tr = $("<tr>");
        var splitCookie = this.split('=');
        // name is splitCookie[0], value is splitCookie[1]
        if((splitCookie[0]).startsWith("item-details")){
            // let str = (splitCookie[1]).substring(1, (splitCookie[1]).length-1);
            let str = splitCookie[1]
            let ar = str.split('--');
            bill = bill + parseInt(ar[3]);
            dict[i]={'item_id':ar[0],'quantity':ar[2]}
            //console.log(splitCookie[1]);
            var td1 = $("<td>", {html: ar[0]});
            var td2 = $("<td>", {html: ar[1]});
            var td3 = $("<td>", {html: ar[2]});
            var td4 = $("<td>", {html: ar[3]});
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            i++;
        }
        $("#ordetails").append(tr);
      });
      let trow = $("<tr>");
      let tdata = $("<td id='tamount' colspan='3'>", {html: ''});
      trow.append(tdata);
      let amt = $("<td>", {html: bill});
      trow.append(amt);
      $("#ordetails").append(trow);
      $("#tamount").html('Total amount to be paid :')
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
      $("#confirmorder").click(function(){
        if($("#addr").val()){
            dict['info']={'total':bill,'addr':$("#addr").val()}
            console.log(dict);
            $.ajax({
                url : "confirm/",
                type : "POST",
                headers: { "X-CSRFToken": getCookie("csrftoken") } ,
                data : {'data': JSON.stringify(dict)},
                dataType: "json",
                success : function(json) {
                    alert(json['message'])
                    window.location.href="http://127.0.0.1:8000/";
                },
                error : function(json) { 
                    alert('Got an error dude');
                }
            });
        }
        else {
            alert('Where the shit are you ?')
        }        
    });

});