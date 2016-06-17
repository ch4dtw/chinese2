var boo, applause, H, W, lock=false, cnt=0, score=0, chance=4;
var pos = {'sexy':0.3, 'friendly':0.4, 'smart':0.5, 'rebellious':0.6, 'hesitate': 0.7, 'generous':0.8}
var open = ['sexy', 'friendly', 'smart', 'rebellious', 'hesitate', 'generous']
var chi = ['性感', '友善', '聰明', '叛逆', '徬徨無主', '不存在小心眼']
var ans = ['sexy', 'friendly', 'hesitate', 'generous' ];

var women = $('img#women');
var men = $('img#sexy');
$(document).ready(function(){
    boo = document.createElement('audio');
    applause = document.createElement('audio');
    boo.setAttribute('src', 'audio/boo.mp3');
    applause.setAttribute('src', 'audio/applause.mp3');
    //audioElement.load()
    $.get();
    H = $( window ).height(); W = $(window).width();
    women.css({
        width: 0.08*W,
        bottom: 0.05*H,
        left: 0.2*W});
    for(id in pos){
        $('img#'+id).css({
            width: (0.085-(pos[id]/18))*W,
            bottom: (pos[id]/4)*H,
            left: pos[id]*W
        })
    }
})
$( window ).resize(function() {
    if(H-$( window ).height()>10 || $( window ).height()-H > 10 || W-$(window).width()>10 || $(window).width()-W > 10){
        var Hs = $( window ).height()/H;
        var Ws = $(window).width()/W;
        H = $( window ).height(); W = $(window).width();
        $('img').each(function(){
            $(this).css({
                'width': parseInt($(this).css('width'))*Ws,
                'bottom': parseInt($(this).css('bottom'))*Hs,
                'left': parseInt($(this).css('left'))*Ws});   
        });
        $('div.think').each(function(){
            $(this).css({
                'width': parseInt($(this).css('width'))*Ws,
                'top': parseInt($(this).css('top'))*Hs,
                'left': parseInt($(this).css('left'))*Ws});   
        });
    }
});
var Ans = ['fat','work','money','child'];
var score = 0, cnt=0;

$('button.start').click(function(){
    if(lock==false){
        lock=true;
        women.attr('src','img/women.gif');    
        walk();
    }
    $(this).remove();
});

function walk(){
    if(parseInt(women.css('left'))< 0.9*W){
        setTimeout(walk, 500)
        women.css({
            'width': parseInt(women.css('width'))*0.98,
            'bottom': parseInt(women.css('bottom'))+0.005*H,
            'left': parseInt(women.css('left'))+0.025*W
        });
        if(parseInt(women.css('left')) > parseInt(men.css('left'))-0.05*W){
            var think = $('<div class="think" id="'+open[cnt]+'" style="position:absolute">'+chi[cnt]+'</div>');
            think.css({
                'width': parseInt(men.css('width'))*3,
                'height': parseInt(men.css('width')),
                'top': parseInt(men.position('bottom').top)-parseInt(men.css('width')),
                'left': parseInt(men.css('left'))}); 
            think.bind('click',check);
            men.before(think);
            cnt++;
            men = $('img#'+open[cnt]);
        }
    }
    else
        women.attr('src','img/women.png');    
}

function check(){
    if(chance == 0) return;
    var id=$(this).attr('id');

    if(ans.indexOf(id)!=-1) {
        applause.pause();
        applause.currentTime=0;
        boo.pause();
        boo.currentTime=0;
        applause.play();    
        score+=5;
    
    }

    else {
        applause.pause();
        applause.currentTime=0;
        boo.pause();
        boo.currentTime=0;
        boo.play();
        score -= 5;}
    $('span#score').text(score);
    chance--;
    $(this).unbind('click');
}
