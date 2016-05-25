$(function() {
    var winH = $(window).height();
    $(".page-wrap").css("top",winH+'px');
    $(window).resize(function () {
        if($("body").hasClass("fullpage")){
            winH = $(window).height();
            $(".page-wrap").css("top",winH+'px');
        }
    });
    //nav
    $("#searchBtn").click(function() {
        $("#searchForm").addClass("show");
    });
    $("#closeSearch").click(function() {
        $("#searchForm").removeClass("show");
    });
    $("a").attr("target","_top");
    var menuSize = $("#menu_ul li").size();
    var menuW = 116*menuSize;
    $("#menu_ul").width(menuW);
    $('#menu_ul').on("swipeleft",function(e){
        var l = $("#menu_ul").width();
        var thisL = $("#menu_ul").parent().width();
        var sl = $(this).position().left;
        var ml = l-thisL;
        if(sl-232<-ml) {$(this).animate({"left":'-'+ml+'px'},600);}
        else{$(this).animate({"left":sl-232+'px'},600);}
    });
    $('#menu_ul').on("swiperight",function(e){
        var sr = $(this).position().left;
        if(sr>-232) {$(this).animate({"left":'0px'},600);}
        else{$(this).animate({"left":sr+232+'px'},600);}
    });
    //$.mobile.loading( 'hide');
})