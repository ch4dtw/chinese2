var right, wrong, score=0;
$(document).ready(function(){
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    right.setAttribute('src', 'audio/dindong.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
    //audioElement.load()
    $.get();

})

$('.draggable').draggable({ revert: 'invalid' });
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function( event, ui ) {
        $( this ).addClass( 'ui-state-highlight' );
        ui.draggable.css('position','static')
    var id = $(this).children('div.holder').children('.draggable');
    if(id) { 
        var text = id.html();
        id = id.attr('id');
        Resume(id,text);
    }
    if($(this).hasClass('right')){
        Play(wrong);
        score-=3;
        $('span#score').text(score);
    }
    $( this ).children('div.holder').removeClass('vacant').html(ui.draggable).append($('<button class="btn remove"><span class="glyphicon glyphicon-remove"></span></button>'));
    check($(this));
    ToggleRemove();
}
});
function check(dom){
    var hold = dom.children('div.holder');
    if(hold.attr('id') === hold.children('.draggable').attr('id')){
        dom.addClass('right').removeClass('wrong');
        score+=3;
        Play(right);
    }
    else{
        Play(wrong);
        dom.addClass('wrong').removeClass('right');
    }
    $('span#score').text(score);

}

function ToggleRemove(){
    $('.remove').click(function(){
        var prev =  $(this).prev('.draggable');
        var id = prev.attr('id');
        var text= prev.html();
        Resume(id,text);
        var holder = $(this).parent('div.holder');
        if(holder.parent('div.droppable').hasClass('right')){
            score-=3;
            $('span#score').text(score);
        }
        holder.addClass('vacant').empty();
        holder.parent('div.droppable').removeClass('right').removeClass('wrong');
    });
}

function Resume(id, text){
    var tmp = $('<div class="draggable" id="'+id+'"></div>').html(text).appendTo('div.ans-hold.'+id);
    tmp.fadeIn().draggable({ revert: "invalid" });
}
function Play(audio){
        right.pause();
        right.currentTime=0;
        wrong.pause();
        wrong.currentTime=0;
        audio.play();
}
