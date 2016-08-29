// stage: 主畫面,解說1,開始1,遊戲1,結束1,解說2,開始2,開始3,結束2,挑戰成功
// onclick: 主畫面,解說1,解說2
$(document).ready(function(){
    $('#start_mid_img').css('visibility','visible').hide().fadeIn(2000);
    $('#start_left_img').css('visibility','visible').hide().fadeIn(6000);
    $('#start_right_img').css('visibility','visible').hide().fadeIn(6000);
});

//按左鍵出現Start按鈕的畫面
$(document).on('click', function () {
    // if (isPrompt == 1) {
    //     run++;
    //
    //     if (stage == 0 && run >= 2) {
    //         $("#GamePrompt1").hide();
    //         $("#GameStart1").fadeIn();
    //         stage++;
    //         isPrompt = 0;
    //         run = 0;
    //     }
    //     else if (stage == 1 && run >= 2) {
    //         $("#GamePrompt2").hide();
    //         $('#GameStart2').fadeIn();
    //         stage++;
    //         isPrompt = 0;
    //         run = 0;
    //     }
    // }
});