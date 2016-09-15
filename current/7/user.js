var boo, applause;
$(document).ready(function(){
    boo = document.createElement('audio');
    applause = document.createElement('audio');
    boo.setAttribute('src', 'audio/boo.mp3');
    applause.setAttribute('src', 'audio/applause.mp3');
    //audioElement.load()
    $.get();
    $(applause).bind('ended',function(){

        $('#Liao').attr('src','img/Liao.png');
    })
});

var Ans = ['fat','work','money','child'];
var score = 0, cnt=0;

$('.draggable').draggable({ revert: 'invalid' });
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function( event, ui ) {
        $( this ).addClass( 'ui-state-highlight' );
	    ui.draggable.remove();
        if(Ans.indexOf(ui.draggable.attr('id'))!=-1){
            applause.play();
            score += 5;
            cnt ++ ;
            $('#Liao').attr('src','img/Liao-1.png');
        }
        else{
            boo.play();
            score -= 5;
        }
        if(cnt==4){
            $(this).droppable('disable');
        }
        $('#score').html(score);
    }
});
