// stage: 主畫面,解說1,開始1,遊戲1,結束1,解說2,開始2,開始3,結束2,挑戰成功
// onclick: 主畫面,解說1,解說2
var click_status = 0;
var lock = 0;

$(document).ready(function(){
    $('#start1_mid_img').css('visibility','visible').hide().fadeIn(2000);
    $('#start1_left_img').css('visibility','visible').hide().fadeIn(6000);
    $('#start1_right_img').css('visibility','visible').hide().fadeIn(6000);
});

//按左鍵出現Start按鈕的畫面
$(document).on('click', function () {
    if(click_status == 0 && lock == 0){
        $("#main_page").hide();
        $("#prompt1_page").show();
        click_status += 1;
    }
    else if(click_status == 1 && lock == 0){
        $("#prompt1_page").hide();
        $("#start1_page").show();
        lock = 1;
        click_status += 1;
    }
    else if(click_status == 2 && lock == 0){
        $("#prompt2_page").hide();
        $("#start2_page").show();
        lock = 1;
        click_status += 1;
    }
});