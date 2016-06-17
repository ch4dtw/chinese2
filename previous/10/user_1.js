var checked=false;
var right, wrong;
$(document).ready(function(){
    right = document.createElement('audio');
    right.setAttribute('src', 'audio/dindong.mp3');
    wrong = document.createElement('audio');
    wrong.setAttribute('src', 'audio/error.mp3');
    //audioElement.load()
    $.get();
    var W = $('img.frame').width();
    var H = $('img.frame').height();
    $('.droppable').css({
        width: W,
        height: H
    });
})
$('.draggable').draggable({ revert: 'invalid' });
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function( event, ui ) {
        //$( this ).addClass( 'ui-state-highlight' );
        ui.draggable.css('position','static')
        var id = $(this).children('div.holder').children('.draggable');
        if(id.attr('id')) { id = id.attr('id');Resume(id);}
        $( this ).children('div.holder').html(ui.draggable);
    }
});
function Resume(id){
    var Toadd=$('<img class="draggable" id="'+id+'" src="img/p'+id+'.jpg">');
    Toadd.draggable({ revert: "invalid" });
    $('div#p'+id).html(Toadd);
}

var time=30;
$('document').ready(function(){
    setTimeout(countdown(),1000);
})


$('button.check').click(function(){
    if(checked) return;
    check();
});
function countdown(){
    if(checked) return;
    time--;
    if(time==0){
        check(); return;
    }
    $('span.left').text(time);
    setTimeout(countdown,1000);
}
var score=0, ans={'f1':5, 'f2':4, 'f3':3, 'f4':2, 'f5':1};
function check(){
    checked=true;
    var flag= true;
    $('div.droppable').each(function(){
        var pid = $(this).attr('id'), id=$(this).children('div.holder').children('img').attr('id');
        if(!(pid in ans) || ans[pid]!= id)
        flag=false;
    })
    if(flag){
        score+=30;
        right.play();
        $('button.check').text('正確').removeClass('btn-primary').addClass('btn-success');
        $('div.q2').fadeIn('slow');
    }
    else{
        wrong.play();
        $('button.check').text('錯誤').removeClass('btn-primary').addClass('btn-danger');
    }    
    $('img.draggable').draggable('disable');
    $('span#score').text(score);
}
$('div.q2 > button').click(function(){
    console.log('test');
    if($(this).attr('id')=='ans'){
        score+=10;
        right.play()
        $('span#score').text(score);
        applause.play();
    }
    else wrong.play();
    $('div.q2 > button').unbind('click');
})
