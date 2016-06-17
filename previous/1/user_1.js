var right, wrong;
$(document).ready(function(){
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    right.setAttribute('src', 'audio/dindong.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
    //audioElement.load()
    $.get();

})

$('.draggable').draggable({ revert: 'invalid' });
var ans=['fire', 'ling', 'cloud', 'circle']
var score = 0;
$('.droppable').droppable({
    activeClass: 'ui-state-default',
    hoverClass: 'ui-state-hover',
    drop: function( event, ui ) {
	var id = ui.draggable.attr('id');
    var flag = false;
    for(var i=0;i <ans.length;i++)
        if(ans[i] == id){
            flag=true; break;
        }
    if(flag){
        score+= 5;
        right.pause();
        right.currentTime=0;
        wrong.pause();
        wrong.currentTime=0;
        right.play();
        AddImage(id);
    }
    else{
        right.pause();
        right.currentTime=0;
        wrong.pause();
        wrong.currentTime=0;
        wrong.play();
        Resume(id);
    }
    $('span#score').text(score);
    }
})
function AddImage(id){
    $('div#'+id).html('');
    $('.droppable').after($('<img src="img/'+id+'-1.png" style="position:absolute">'))
}
function Resume(id){
    $('div#'+id).html('<img class="draggable" id="'+id+'" src="img/'+id+'.png">');
    $('img#'+id).draggable({ revert: "invalid" });
}
