$(function() {
    //左侧导航收缩
    $("#navCollapse").click(function(){
        if($(".nav").hasClass("in")){
            $(".nav").removeClass("in");
            $(".page").removeClass("out");
        }else{
            $(".nav").addClass("in");
            $(".page").addClass("out");
        }
    });
    //二级导航
    var menuSize = $(".menu li").size();
    var menulW = 116*menuSize+37*(menuSize-1);
    $(".menu ul").width(menulW);
    var menuW = $(".menu .center").width();
    if(menulW < menuW){$(".menu ul").css("position","static");}



    $(".menu ul").touchwipe({
        wipeLeft: function () {
            var l = $(".menu ul").width();
            var thisL = $(".menu ul").parent().width();
            var sl = $(".menu ul").position().left;
            var ml = l-thisL;
            if(sl-153<-ml) {$(".menu ul").animate({"left":'-'+ml+'px'},400);}
            else{$(".menu ul").animate({"left":sl-153+'px'},400);}
        },
        wipeRight:function(){
            var sr = $(".menu ul").position().left;
            if(sr>-153) {$(".menu ul").animate({"left":'15px'},400);}
            else{$(".menu ul").animate({"left":sr+153+'px'},400);}
        }
    });
});