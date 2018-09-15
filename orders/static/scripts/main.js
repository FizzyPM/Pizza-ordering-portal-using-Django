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
                    dict.splice(i, 1); //At position i remove the 1 item
                }
            }
        }
        //console.log($("#item_name").html());
        dict.push({
            item_id : $("#hidden_item_id").html() ,
            item_name:   $("#item_name").html(),
            quantity:  $("#theInput").val(),
            bill : parseInt($("#theInput").val()) * parseInt($("#hidden_base_price").html())
        });
       // dict[$("#item_name").html()] = $("#theInput").val();
        console.log(dict);
        // $("#"+(that.cells[2]).id).html(String($("#theInput").val()))
        $("#"+$("#hidden_item_id").html()).html($("#theInput").val())
        $("#theInput").val(1)
        //console.log('#' + (that.cells[2]).id);
    });
});