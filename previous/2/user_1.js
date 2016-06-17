var right, wrong;
$(document).ready(function(){
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    right.setAttribute('src', 'audio/dindong.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
    //audioElement.load()
    $.get();

})
$('.draggable').draggable();
var score = 0;
var ans = {'dream':'看野火', 'castle':'爬梯子', 'dorm':'遠眺，看河谷與蝴蝶', 'lib':'看畫報', 'liter':'聽課'};
$('.check').click(function(){
    score = 0; 
    $('.draggable').each(function(){
        var text = $(this).children('div').children('input').val();
        if(text !== undefined){
            var id = $(this).attr('id');
            if(text === ans[id]){
                score += 4;
                $(this).addClass('has-success');
                $(this).removeClass('has-error');
                $(this).children().children('span.form-control-feedback').addClass('glyphicon-ok').removeClass('glyphicon-remove');
            }
            else{
                $(this).addClass('has-error');
                $(this).removeClass('has-success');
                $(this).children().children('div span.form-control-feedback').addClass('glyphicon-remove').removeClass('glyphicon-ok');
            }
        }
     });
     $('span.check-text').text('重對答案')
     if(score == 20) right.play();
     else wrong.play()
     $('#score').text(score);
})
