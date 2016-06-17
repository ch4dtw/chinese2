var boo, applause, H, W, lock=false, cnt=0, score=0, chance=4;
var pos = {'sexy':0.3, 'friendly':0.4, 'smart':0.5, 'rebellious':0.6, 'hesitate': 0.7, 'generous':0.8}
var open = ['sexy', 'friendly', 'smart', 'rebellious', 'hesitate', 'generous']

var women = $('img#preg');
$(document).ready(function(){
    boo = document.createElement('audio');
    applause = document.createElement('audio');
    boo.setAttribute('src', 'audio/boo.mp3');
    applause.setAttribute('src', 'audio/applause.mp3');
    //audioElement.load()
    $.get();
    H = women.height(); W = women.width();
    setcard(); 
})
var cardpos=[[0.55,0.44],[0.54,0.38],[0.49,0.35],
            [0.6,0.48],[0.62,0.42],[0.6,0.35]]

function setcard(){
    for(var i=1;i<7;i++)
        $('div.card#'+i).css({
            width: 0.05*W,
            height: 0.05*H,
            top: cardpos[i-1][0]*H,
            left: cardpos[i-1][1]*W
        });
    $('img.card').css({
        width:0.4*W,
        height: 0.2*W,
        top: 0,
        left: 1.1*W
    })
}
$('div.card').mouseenter(function(){
    var id = $(this).attr('id');
    $('img#preg').attr('src','img/preganant-'+id+'.png');
    $('img#c'+id).fadeIn('slow');
}).mouseleave(function(){
    var id = $(this).attr('id');
    $('img#preg').attr('src','img/preganant-static.png');
    $('img#c'+id).fadeOut('slow');
}).click(function(){
    if(chance>0)
        check($(this).attr('id'));
    $(this).unbind('click');
})

var ans=[1,3,4,5];
function check(id){
    if ($.inArray(parseInt(id),(ans))>=0){
        applause.pause();
        applause.currentTime=0;
        boo.pause();
        boo.currentTime=0;
        boo.play();
        score+=5;
        $('span#score').text(score);
    }
    else{
        applause.pause();
        applause.currentTime=0;
        boo.pause();
        boo.currentTime=0;
        applause.play();
    }
    chance--;
}

