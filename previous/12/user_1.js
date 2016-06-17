var arrowOn=false, arrowNum=7, stage=0, W, startFlag=false, audio=[];
var slideFlag=false, right, wrong;
$(document).ready(function(){
    wrong = document.createElement('audio');
    right = document.createElement('audio');
    wrong.setAttribute('src', 'audio/error.mp3');
    right.setAttribute('src', 'audio/dindong.mp3');
    for(var i=0;i<3;i++){
        audio[i] = document.createElement('audio');
        audio[i].setAttribute('src', 'audio/audio-'+i+'.mp3');
        $(audio[i]).bind('ended',start);
    }
    $.get();
    
})
$('.start').click(function(){
   $('.des').fadeOut(); 
   $('div.arrows img, img#bow').fadeIn();
   $('div.arrows img').css('display','inline-block');
})
$('#bow').mouseenter(function(){
    if(arrowOn || arrowNum ==0) return;
    $(this).attr('src','img/bow.gif');
    $('div.arrows img:last').remove();
    $('div.shot').css('cursor',' url("img/aim.png"),pointer').bind('dblclick',shot);
    arrowOn = true;
    arrowNum --;
    if(!startFlag){
        startFlag = true;
        audio[stage].play();
    }
})
function shot(e){
    $('#bow').attr('src','img/bow.png');
    arrowOn=false;
    $('div.shot').css('cursor','default').unbind('dblclick');
    var ts= new Date().getTime();
    $('img#arrow').css({
        left: e.clientX-$('div.shot').offset().left,
        top: e.clientY-$('div.shot').offset().top
    }).attr('src','img/arrow.gif?'+ts).fadeIn().fadeOut();
}
var num=0, onReading=false;
function start(){
    W=$('div.shot').width();
    $('div.card').css('left','0').html(card[stage][num]).fadeIn();
    var left=0;
    slideFlag=true;
    setTimeout(slide, 500);
}
function slide(){
    if(onReading) {setTimeout(slide, 500); return;}
    var card = $('div.card');
    var left = parseInt(card.css('left'));
    if(left < W && slideFlag){
        left += W*0.08;
        card.css('left',left);
        setTimeout(slide, 500);
    }
    else{
        if(num == 6) {
            stage++;
            num=0;
            audio[stage].play();
        }
        else {
            num++;
            start();
        }
    }
}
var score=0;
$('div.card').dblclick(function(){
    slideFlag=false;
    if(ans[stage].indexOf(num)!=-1){
        score +=5;
        right.play();
    }
    else{
        wrong.play();
    } 
    $('span#score').text(score);
})

var card=[['溫<br>泉','淚<br>珠','可<br>樂','溪<br>水','體<br>液','星<br>河','汗<br>水'],
    ['星<br>河','淚<br>珠','溪<br>水','體<br>液','溫<br>泉','汗<br>水','可<br>樂'],
    ['體<br>液','淚<br>珠','溪<br>水','汗<br>水','可<br>樂','星<br>河','溫<br>泉']],
ans=[[1,4,6],[4,6],[2,5]];
