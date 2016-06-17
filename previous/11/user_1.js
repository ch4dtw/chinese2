var stage=0, lock=false,card_lock=true, correct=0, score=0;
var audio=[], applause, error;
var problem=
[['陶　鈴','米　地','米　地','英　花','陶　鈴','米　地'],
['陶　鈴','鈴　鐺','竹　簍','鈴　鐺','竹　簍','陶　鈴'],
['媽　媽','女　兒','太　太','米　地','　我　','兒　子'],
['涼　鞋','登山鞋','白Ｔ恤','遮陽帽','藍背包','牛仔褲'],
['無印良品','白色短牆','小教堂','晶亮燈飾','露天溫泉','小公寓']
];
var ans=[
{ans: [3], ans_num:1},
{ans: [0,5], ans_num:2},
{ans: [1,2,3], ans_num:3},
{ans: [1,2,4,5], ans_num:4},
{ans: [0,1,3,5], ans_num:4}
]
$('document').ready(function(){
    for(var i=0;i<5;i++){
        
        audio[i] = document.createElement('audio');
        audio[i].setAttribute('src', 'audio/audio-'+i+'.mp3');
        //audio[i].addEventListener('ended', startcountdown);
        $(audio[i]).bind('ended',startcountdown);

    }
        applause = document.createElement('audio');
        applause.setAttribute('src', 'audio/applause.mp3');
        error =document.createElement('audio');    
        error.setAttribute('src', 'audio/error.mp3');
        //audioElement.load()
    $.get();
})
$('button.next').click(function(){
    if(lock) return;
    lock=true;
    if(stage==0)
        $('div.description').fadeIn();
    setTimeout(showcard, 1000);
})
$('div.card > button').click(function(){
    if(card_lock) return;
    var id = $(this).attr('id');
    $(this).text(problem[stage][parseInt(id)]);
    if(ans[stage]['ans'].indexOf(parseInt(id)) != -1){
        $(this).removeClass('btn-primary').addClass('btn-success').unbind('click');
        correct++;
        if(correct == ans[stage]['ans_num']){
            if(stage != 0)score+=10;
            $('span#score').text(score);
            setTimeout(Next,1000);
            applause.play();
        }
    }
    else
        Fail();
})
function showcard(){
    $('div.animation').fadeIn();
    setTimeout(showword, 2000);
}
function showword(){
    $('div.card > button').each(function(){
        $(this).text(problem[stage][$(this).attr('id')]);
    })
    if(stage==0)
        $('div.description > p.lead').text('接著，字卡會翻成背面');
    setTimeout(hideword, 3000);
}
function hideword(){
    if(stage==0)
        $('div.description > p.lead').text('然後，你會聽到一道問題：「〈煙火旅館〉中，同志戀人逃離城市前往山中小村度假，村裡殘著唯一的旅店，請問這家旅店的名字叫什麼旅館？」');
    $('div.card > button').text('　　　');
    
    audio[stage].play();
    card_lock=false;
}
var time;
function startcountdown(){
    if(card_lock) return;
    if(stage==0){
        $('div.description > p.lead').text('答案是「英花」，所以，請點擊中間下排字卡，在時限內完成，即得分');
        setTimeout(function(){$('div.card > button#3').click()}, 5000);
    }
    time=10;
    $('span.countdown').text(time).fadeIn();
    setTimeout(countdown,1000);
}
function countdown(){
    if(!lock) return;
    time--;
    if(time==0){
        $('span.countdown').fadeOut();
        Fail(); return;
    }
    $('span.countdown').text(time);
    setTimeout(countdown,1000);
}

function Fail(){
   error.play();
   Next();
}
function Next(){
   correct = 0;
   stage++; lock=false; card_lock=true;
   if(stage == 1)
        $('span.next').text('開始');
   else if(stage == 5)
        $('span.next').text('結束');
   else
        $('span.next').text('下一題');
   $('div.animation').fadeOut();
   $('span.countdown').fadeOut();
   $('div.description').remove();
   $('div.card > button').text('　　　').removeClass('btn-success').addClass('btn-primary');
}
