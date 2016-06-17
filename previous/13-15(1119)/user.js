// variable
var arrow_backup, horse_cnt=[0,0,0], right, wrong, babysong, DONE=false;
// Counter
var timeID, times = 0;

$(document).ready(function(){
    right = document.createElement('audio');
    wrong = document.createElement('audio');
    babysong = document.createElement('audio');
    right.setAttribute('src', 'audio/dindong.mp3');
    wrong.setAttribute('src', 'audio/error.mp3');
    babysong.setAttribute('src', 'audio/babysong.mp3');
    $.get();
    setTimeout(function(){
        $('img.start').fadeOut(3000);
        $('.scene.scene-1').fadeIn(3000);
        $('.main').css('background-image','url("img/back-1.png")');
        startCount();
        addClick('scene-1');
    }, 11000);
    
})


// Change scene Handle
$('.arrow').hover(arrowIn,arrowOut)
function arrowIn(){
    $(this).css('background','#dddddd').css('opacity', 0.5);
    $(this).html('<img src="img/'+$(this).attr('id')+'.png">');
}
function arrowOut(){
    $(this).css('background','transparent');
    $(this).empty();
}

//test 
/*
function testFunc(){
//    addObj({data:'shelf-book'});
//    addObj({data:'red-pen'});
    addObj({data:'star'});
    addObj({data:'corner-bird'});
    addObj({data:'fish'});
    addObj({data:'flower'});
    addObj({data:'key'});

}
*/


// Scale subscene handle
function scaleScene(e){
    var data = e;
    if('data' in e) data = e.data;
    var item = data[0], prev = data[1];
    var newlayer = $('<div class="'+item+'"></div>');
    if($('div.scale').is(':empty'))
        $('img.'+prev).fadeOut();
    else
        $('div.scale > div.layer:last-child').fadeOut();
    newlayer.appendTo('div.scale');
    $('img.'+prev+':first').fadeOut(function(){
        for(var i=0; i<itemList[item].length;i++)
        $('<img src="img/'+itemList[item][i][0]+'.'+itemList[item][i][1]+'" class="lg '+item+'" id="'+itemList[item][i][0]+'">').appendTo(newlayer).fadeIn();
    $('div.holder div.layer:last-child').fadeOut();
    setTimeout(addClick,500,item);
    $('.toggleRemove').fadeIn();
    $('.arrow').unbind('mouseenter mouseleave').fadeOut();
    })
}

$('.toggleRemove').click(function(){
    $('div.holder').fadeIn();
    var toplayer=$('div.scale div:last-child');
    var item=toplayer.attr('class');
    toplayer.fadeOut(function(){
        $('img.'+item).fadeIn();    //For scene
        $('div.scale div:last-child').fadeIn(); //for layer
        $('div.scale div:last-child img').fadeIn();
    }).remove();
    Re_removeClick(item);
    if($('div.holder > div.layer:last-child').hasClass('obj'))
        $('div.holder > div.layer:last-child').remove();
    $('div.holder > div.layer:last-child').fadeIn();
    if($('div.scale').is(':empty')){
        $(this).fadeOut();
        $('.arrow').hover(arrowIn,arrowOut).fadeIn();
    }
});

// pos = L T W H
var click={
    'scene-1':{
        'click':{
            'shelf':{
                'pos':['18%', '20%', '15%', '33%'],
                'subscene': 'shelf'
            },
            'chair':{
                'pos':['15%','60%','15%', '33%'],
                'subscene': 'chair'
            },
            'table_':{
                'pos':['65%','60%','20%', '30%'],
                'subscene': 'table_'
            },
            'god':{
                'pos':['40%', '10%', '18%', '60%'],
                'subscene': 'god'
            },
            'door':{
                'pos':['68%', '12%', '12%', '35%'],
                'subscene': 'door'
            }, 
        },
        'ref':'div.scene-1'
    },
    'shelf':{
        'click':{
            'drawer':{
                'pos':['68%', '55%', '10%', '7%']
            },
            'book':{
                'pos':['30%', '20%', '25%', '20%'],
                'subscene': 'shelf'
            }
        },
        'ref':'div.scale img#shelf'
    },
    'drawer':{
        'click':{
            'match':{
                'pos':['76%', '58%', '7%', '3%'], 
                'callback':'obj'
            },
            'inv':{
                'pos':['79%', '61%', '10%', '7%']
            }
        },
        'ref':'div.scale img#shelf',
        'self': 'drawer',
        'img':{'drawer':true}
    },
    'book':{
        'click':{
            'five-lg':{
                'pos':['50%', '25%','7%','50%'],
                'callback':'obj'
            }
        },
        'ref':'div.scale img#book'
    },
    'chair':{
        'click':{
            'paper':{
                'pos':['0%', '70%','20%','20%'],
                 'callback':'obj'
            }
        },
        'ref':'div.scale img#chair' 
    },
    'table_':{
        'click':{
            'pot':{
                'pos':['38%', '13%','25%','30%'],
                 'callback':'obj'
            }
        },
        'ref':'div.scale img#table' 
    },
    'god':{
        'click':{
        },
        'ref':'div.scale img#god-desk',
        'close': godHandle
    },
    'door':{
        'click':{
        },
        'ref':'div.scale img#door',
        'close': doorHandle
    },
    'upstair':{
        'handler': function(){$('.toggleRemove').click();
            $('.arrow#up').click()}
    }
    ,
    'scene-2':{
        'click':{
            'wall':{
                'pos':['15%', '10%', '20%', '15%'],
                'subscene': 'wall'
            },
            'kitchen-shelf':{
                'pos':['65%', '5%', '20%', '60%'],
                'subscene': 'kitchen-shelf'
            },
            'wash':{
                'pos':['35%', '30%', '25%', '40%'],
                'subscene': 'wash'
            },
            'stove':{
                'pos':['5%', '50%', '30%', '40%'],
                'subscene': 'stove'
            },
            'wood':{
                'pos':['47%', '75%', '10%', '18%'],
                 'callback':'obj'
            },
        },
        'ref':'div.scene-2'
    },
    'wall':{
        'click':{
            'box':{
                'pos':['30%', '20%','35%','20%'],
                 'callback':'obj'
            }
        },
        'ref':'div.scale img#wall' 
    },
    'kitchen-shelf':{
        'click':{
            'kitchen-drawer':{
                'pos':['18%', '55%', '32%', '7%']
            },
            'shelf-door':{
                'pos':['52%', '65%', '33%', '18%'],
            }
        },
        'ref':'div.scale img#kitchen-shelf'
    },
    'kitchen-drawer':{
        'click':{
            'handy':{
                'pos':['19%', '58%', '23%', '3%'], 
                'callback':'obj'
            },
            'inv':{
                'pos':['13%', '61%', '33%', '7%']
            }
        },
        'ref':'div.scale img#kitchen-shelf',
        'self':'kitchen-drawer',
        'img':{'kitchen-drawer':true}
    },
    'shelf-door':{
        'click':{
            'shelf-book':{
                'pos':['60%', '68%', '20%', '14%'],
                'callback':'obj'
            }
        },
        'handler': doorOpen
    },
    'wash':{
        'click':{
            'wash-door':{
                'pos':['43%', '42%', '27%', '38%']
            },
            'sink':{
                'pos':['10%', '22%', '35%', '10%'],
                'subscene': 'wash'
            }
        },
        'ref':'div.scale img#wash'
    },
    'wash-door':{
        'click':{
            'washbasin':{
                'pos':['47%', '45%', '18%', '30%'],
                'callback':'obj'
            },
            'inv':{
                'pos':['65%', '40%', '28%', '45%']
            }
        },
        'ref':'div.scale img#wash',
        'self': 'wash-door',
        'img':{'wash-door':true}
    },
    'sink':{
        'click':{
            'water':{
                'pos':['2%','30%','5%','15%'],
            }
        },
        'ref':'div.scale img#sink',
        'close': sinkHandle,
    },
    'water':{
        'click':{
            'inv':{
                'pos':['4%','30%','5%','15%'],
            }
        },
        'ref':'div.scale img#sink',
        'self': 'water',
        'img':{'water':true},
        'close': waterHandle,
    },
    'stove':{
        'click':{
            'stove-lock':{
                'pos':['50%', '63%', '30%', '30%'],
                'subscene': 'stove'
            }
        },
        'close': stovenHandle,
        'ref':'div.scale img#stove'
    },
    'stove-lock':{
        'handler': stoveProb
    },
    'scene-3':{
        'click':{
            'frame':{
                'pos':['8%', '22%', '20%', '33%'],
                'subscene': 'frame'
            },
            'babybed':{
                'pos':['25%','38%','32%','45%'],
                'subscene': 'babybed'
            },
            'toy':{
                'pos':['35%','5%','20%','30%'],
                'subscene': 'toy'
            },
            'horse':{
                'pos':['65%','55%','20%','40%'],
                'subscene': 'horse'
            },
            'closet':{
                'pos':['62%','7%','30%','43%'],
                'subscene': 'closet'
            },
        },
        'ref':'div.scene-3'
    },
    'babybed':{
        'click':{
            'corner':{
                'pos':['40%','70%','20%','20%'],
                'subscene': 'babybed'
            },
            'baby':{
                'pos':['50%','30%','25%','25%'],
                'subscene': 'babybed'
            }
        },
        'ref':'div.scale img#babybed' 
    },
    'toy':{
        'click':{},
        'close':toyHandle,
        'ref':'div.scale img#toy'
    },
    'corner':{
        'click':{
            'corner-bird':{
                'pos':['40%','65%','35%','25%'],
                'callback':'obj'
            }
        },
         'ref':'div.scale img#corner' 
    },
    'horse':{
        'click':{
            'red':{'pos':['50%','38%','5%','5%']},
            'white':{'pos':['57%','43%','5%','5%']},
            'yellow':{'pos':['65%','38%','5%','5%']},
        },
        'ref':'div.scale img#horse' 
    },
    'red':{'handler': function(){if(horse_cnt[0]<4) horse_cnt[0]++; horse_cnt[1]=horse_cnt[2]=0}},
    'white':{'handler': horseHandle},
    'yellow':{'handler': function(){if(horse_cnt[2]<5) horse_cnt[2]++; if(horse_cnt[0]!=4) horse_cnt[0]=0; horse_cnt[1]=0}},
    'closet':{
        'click':{
            'closet-big':{'pos':['30%', '30%', '30%', '30%'], 'subscene':'closet'},
            'closet-drawer':{'pos':['68%', '75%', '24%', '15%']},
        },
        'ref':'div.scale img#closet' 
    },
    'closet-big':{
        'click':{
            'red-pen':{'pos':['46%','43%','5%','5%'], 'callback':'obj'}
        },
        'ref':'div.scale img#closet-big' 
    },
    'closet-drawer':{
        'click':{
            'fish':{
                'pos':['72%', '75%', '8%', '8%'], 
                'callback':'obj'
            },
            'inv':{
                'pos':['62%', '82%', '24%', '15%']
            }
        },
        'ref':'div.scale img#closet',
        'self': 'closet-drawer',
        'img':{'closet-drawer':true}
    },
    'book-item':{
        'click':{
            'star':{
                'pos':['58%','42%','10%','15%'],
                'callback':'obj'
            }
        },
        'ref':'div.scale img#book-item', 
    },
    'shelfbook':{
        'click':{
            'star':{
                'pos':['58%','42%','10%','15%'],
                'callback':'obj'
            }
        },
        'ref':'div.scale img#shelfbook', 
    },
}
var itemList={
    'shelf':[['shelf', 'png'], ['five', 'png']],
    'book':[['book', 'png'], ['five-lg', 'png']],
    'drawer':[['drawer', 'png'],['match', 'png']],
    'five-item':[['five-item', 'png']],
    'match-item':[['match-item', 'png']],
    'five-scene':[['five-scene', 'gif']],
    'bud-scene':[['佛-item', 'png']],
    'light-scene':[['光-item','png']],
    'pu-scene':[['普-item','png']],
    'chau-scene':[['照-item','png']],
    'chair':[ ['paper', 'png'], ['chair', 'png']],
    'paper-item':[['paper-item', 'png']],
    'table_':[['table', 'png'], ['pot', 'png']],
    'pot-item':[['pot-item', 'png']],
    'god':[['god-desk','png']],
    'door':[['door','png']],
    'wall':[['wall','png'], ['box', 'png']],
    'box-item':[['box-item', 'png']],
    'kitchen-shelf':[['kitchen-shelf', 'png'], ['shelf-book', 'png'], ['shelf-door', 'png']],
    'kitchen-drawer':[['kitchen-draw', 'png'], ['handy', 'png']],
    'handy-item':[['handy-item', 'png']],
    'shelf-book':[['shelf-book', 'png']],
    'book-item':[['book-item', 'png']],
    'wash':[['wash', 'png']],
    'wash-door':[['wash-door', 'png'], ['washbasin', 'png']],
    'basin-item':[['basin-item', 'png']],
    'sink':[['sink','png']],
    'water':[['water','gif']],
    'stove':[['stove','png'], ['stove-lock', 'png']],
    'stove-lock':[['stove-lock-lg','png']],
    'wood':[['wood', 'png']],
    'lamp-item':[['lamp-item', 'png']],
    'key-item':[['key-item', 'png']],
    'frame':[['frame', 'png']],
    'babybed':[['babybed-bird','png'],['babybed','png']],
    'corner':[['corner-bird','png'],['corner','png']],
    'toy':[['toy','png']],
    'horse':[['horse','png']],
    'flower-item':[['flower-item','png']],
    'bird-item':[['bird-item','png']],
    'closet':[['closet','png'], ['closet-pen','png']],
    'closet-big':[['closet-big','png'], ['closet-big-pen','png']],
    'red-pen-item':[['red-pen-item','png']],
    'closet-drawer':[['closet-drawer','png'],['fish','png']],
    'fish-item':[['fish-item','png']],
    'star-item':[['star-item','png']],
    'baby':[['babycry','png']],
}

var objList={
    'match':{'item':{'drawer':'match'}, 'click':{'drawer':'match'}, 'obj':'match-item', 'scene':'match-item'},
    'five-lg':{'item':{'book':'five-lg'}, 'click':{'book':'five-lg'}, 'obj':'five-item', 'scene':'five-scene'},
    '佛':{'item':{}, 'click':{}, 'obj':'佛-item', 'scene':'bud-scene'},
    '光':{'item':{}, 'click':{}, 'obj':'光-item', 'scene':'light-scene'},
    '普':{'item':{}, 'click':{}, 'obj':'普-item', 'scene':'pu-scene'},
    '照':{'item':{}, 'click':{}, 'obj':'照-item', 'scene':'chau-scene'},
    'paper':{'item':{'chair':'paper'}, 'click':{'chair':'paper'}, 'obj':'paper-item', 'scene':'paper-item'},
    'pot':{'item':{'table_':'pot'}, 'click':{'table_':'pot'}, 'obj':'pot-item', 'scene': 'pot-item'},
    'box':{'item':{'wall':'box'}, 'click':{'wall':'box'}, 'obj':'box-item', 'scene': 'box-item'},
    'handy':{'item':{'kitchen-drawer':'handy'}, 'click':{'kitchen-drawer':'handy'}, 'obj':'handy-item', 'scene': 'handy-item'},
    'shelf-book':{'item':{'kitchen-shelf':'shelf-book'}, 'click':{'shelf-door':'shelf-book'}, 'obj':'book-item', 'scene': 'book-item'},
    'washbasin': {'item':{'wash-door':'washbasin'}, 'click':{'wash-door':'washbasin'}, 'obj':'basin-item', 'scene': 'basin-item'},
    'wood':{'item':{}, 'click':{'scene-2': 'wood'}, 'obj': 'wood', 'scene': 'wood'},
    'lamp':{'item':{'god':'lamp'}, 'click':{'god':'lamp'}, 'obj':'lamp-item', 'scene':'lamp-item'},
    'key':{'item':{'god':'key'}, 'click':{'god':'key'}, 'obj':'key-item', 'scene':'key-item'},
    'flower':{'item':{'horse':'flower'}, 'click':{'horse':'flower'}, 'obj':'flower-item', 'scene':'flower-item'},
    'corner-bird':{'item':{'babybed':'babybed-bird', 'corner':'corner-bird'}, 'click':{'corner':'bird'}, 'obj':'bird-item', 'scene':'bird-item'},
    'red-pen':{'item':{'closet':'closet-pen', 'closet-big':'closet-big-pen'}, 'click':{'closet-big':'red-pen'}, 'obj':'red-pen-item', 'scene':'red-pen-item'},
    'fish':{'item':{'closet-drawer':'fish'}, 'click':{'closet-drawer':'fish'}, 'obj':'fish-item', 'scene':'fish-item'},
    'star':{'item':{'book-item':'book-star'}, 'click':{'book-item':'star'}, 'obj':'star-item', 'scene':'star-item'}
}


var objHandle={
    'five-scene': fiveHandle,
    'paper-item': paperHandle,
    'box-item': boxHandle,
    'book-item': bookHandle, 
}

function addClick(itemName){
    var subSceneFlag = true;
    if($.type(itemName)=='object' && 'data' in itemName){ itemName = itemName.data; subSceneFlag = false;}
    if(!(itemName in click))   return;
    var itemArr = click[itemName];
    if('handler' in itemArr) {itemArr.handler(); return;}

    var s;
    if('self' in itemArr)  { s=itemArr.self; $('div.holder div.'+itemArr.self).fadeOut();}
    if('img' in itemArr){
        for(var comp in itemArr.img)
            if(itemArr.img[comp]){
                for(var i=0;i < itemList[comp].length; i++)
                    $('<img class=" lg" id="'+itemList[comp][i][0]+'" src="img/'+itemList[comp][i][0]+'.'+itemList[comp][i][1]+'">').appendTo('div.scale div');
            }else
                for(var i=0;i < itemList[comp].length; i++)
                    $('img.'+itemList[comp][i][0]).remove();
    }
    var ref = itemArr.ref;
    var pos = $(ref).position();    
    var newlayer = $('<div class="layer '+itemName+'"></div>');
    var newStyle={
        left:pos.left,
        top:pos.top,
        width:$(ref).width(),
        height:$(ref).height()
    };
    if(!subSceneFlag)
        newStyle={width: '100%', height: '100%'};
    newlayer.css(newStyle);

    itemArr = itemArr['click'];
    for (var item in itemArr){
        var Toappend = $('<div class="clickable click '+item+'"></div>');
        Toappend.css({
            left:itemArr[item]['pos'][0],
            top:itemArr[item]['pos'][1],
            width:itemArr[item]['pos'][2],
            height:itemArr[item]['pos'][3],
        })
        if(item == 'inv')
            Toappend.bind('click',s, removeClick);
        else{
            if('subscene' in itemArr[item])
                Toappend.addClass('subscene').bind('click', [item, itemArr[item].subscene] , scaleScene); 
            else if('callback' in itemArr[item]){
                if(itemArr[item].callback == 'obj')
                    Toappend.bind('click',item, addObj);
            }else{
                Toappend.bind('click',item, addClick);
            }
        }
        newlayer.append(Toappend);
    }
    if(subSceneFlag)
        $('div.holder').append(newlayer);
    else
        $('div.holder > div:last-child').append(newlayer);
    if('close' in click[itemName])
        click[itemName].close();
}

function removeClick(itemName){
    if($.type(itemName)=='object' && 'data' in itemName) itemName = itemName.data;
    var itemArr = click[itemName];
    $('div.holder div.layer.'+itemName).remove();
    if('img' in itemArr){
        for(var comp in itemArr.img)
            if(!itemArr.img[comp]){
                for(var i=0;i < itemList[comp].length; i++)
                    $('<img class="lg" id="'+itemList[comp][i][0]+'" src="img/'+itemList[comp][i][0]+'.'+itemList[comp][i][1]+'">').appendTo('div.scale div');
            }else
                for(var i=0;i < itemList[comp].length; i++)
                    $('img#'+itemList[comp][i][0]).remove();
    }
    $('div.holder div.'+itemArr.self).fadeIn();
}

function Re_removeClick(itemName){
    if(itemName in click){
        for(var i in click[itemName].click)
            Re_removeClick(i);
        removeClick(itemName);
    }
}

function addObj(item){
    if('data' in item) item = item.data;
    $('div.holder div.'+item).remove();
    for(var i in objList[item].item)
        itemList[i] = $.grep(itemList[i], function(value) {return value[0] != objList[item].item[i]});
    for(var i in objList[item].click){
        delete click[i].click[objList[item].click[i]];
    }
    $('img#'+item).fadeOut().remove();
    var ToAppend=$('<div class="obj-item"></div>'), tmpImg = $('<img src="img/'+objList[item].obj+'.png" class="'+objList[item].obj+'" id="'+objList[item].obj+'">');
    tmpImg.bind('click',objList[item].scene, scaleObj);
    ToAppend.append(tmpImg).draggable({revert:true});
    ToAppend.appendTo('div.item');
}

function scaleObj(e){
    var scene = e.data;
    var newlayer = $('<div class="'+scene+' obj"></div>');
    var lstChld=$('div.scale > div:last-child');
    if(lstChld.hasClass('obj')){
        lstChld.remove();
        $('div.holder > div.obj').remove();
    }
    else
        lstChld.fadeOut();
    newlayer.appendTo('div.scale');
    var ts= new Date().getTime();
    for(var i=0; i<itemList[scene].length;i++)
        $('<img src="img/'+itemList[scene][i][0]+'.'+itemList[scene][i][1]+'?ts='+ts+'" class="lg '+scene+'" id="'+itemList[scene][i][0]+'">').appendTo(newlayer).fadeIn();
    $('div.holder > div.layer:last-child').fadeOut();
    $('div.holder').append('<div class="layer obj"></div');
    $('.toggleRemove').fadeIn();
    $('.arrow').unbind('mouseenter mouseleave').fadeOut();
    if(scene in objHandle)
        setTimeout(objHandle[scene], 1000);
}


var sec = 0, min = 0;
function startCount(){
    setTimeout(count,1000);
}
function count(){
    sec+=1;
    if(sec==60) {min+=1; sec=0}
    if(min==60) min=0;
    var psec = sec<10 ? '0'+sec : sec;
    var pmin = min<10 ? '0'+min : min;
    $('div.counter').text(pmin+':'+psec) 
        setTimeout(count,1000);
}

var five_arr=['木','火','土','金','水'];
function fiveHandle(){
   //render fonts
   var five_cnt=[0,0];
   $('div.holder').fadeOut();
   var problem = $('<span class="prob">你不能阻攔我</br>從犁尖和大地的親吻中躍出</br>或者我竟然就<span class="clickable five" id="0">木</span>遁回來</br>當鶴嘴啄開第一塊礦石</br>你不能阻攔我</br>從剛毅對頑強的火花中降世</br>或者我竟然就<span class="clickable five" id="1">木</span>遁回來</br>當鋸齒咬出第一口樹漿</span>');
   problem.css({
        left: '23%',
        top : '25%'
   })
   $('div.five-scene').append(problem).fadeIn(); 
   $('span.clickable.five').click(function(){
        var id = parseInt($(this).attr('id'));
        five_cnt[id] = (five_cnt[id]+1)%5;
        $(this).html(five_arr[five_cnt[id]]);
        if(five_cnt[0] == 3 && five_cnt[1] == 0){
            $('span.prob').fadeOut().remove();
            var tmp = $('<img src="img/佛-item.png" class="lg"></img>')
            tmp.bind('click', function(){
                addObj({data:'佛'});
                $('.toggleRemove').click();
                $('img#five-item').parent('div.obj-item').remove();
            }).css({
                left:'25%',
                top: '25%',
                cursor: 'pointer'
            });
            tmp.appendTo('div.five-scene').fadeIn();
        }
   })
}

function paperHandle(){
    $('div.holder').fadeOut();
    $('img#match-item').parent('div.obj-item').draggable({'revert': 'invalid'});
    $('img#paper-item').droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var id = ui.draggable.children('img').attr('id');
            if(id!='match-item')
                ui.draggable.draggable({'revert' :true})
            else{
                ui.draggable.remove();
                addObj({data:'普'});
                var ts= new Date().getTime();
                
                $(this).attr('src','img/paper.gif?ts='+ts);
                setTimeout(function(){ 
                    $('img#paper-item').parent('div.obj-item').remove(); 
                    $('img#match-item').parent('div.obj-item').remove(); 
                    //$('.toggleRemove').click();
                }, 2000);
            }
                
        }
    })
}

var boxSecret = [0, 0, 0, 0], ansSecret = [8, 9, 4, 8];
function boxHandle(){
    $('div.holder').fadeOut();
    var secret = $('<span class="box clickable" id="0">7</span><span class="box clickable" id="1">9</span><span class="box clickable" id="2">4</span><span class="box clickable" id="3">8</span>');
    secret.css({
        left: '25%', top: '52%', width: '5%', height: '15%', 
        'font-size': '200%',
    })
    secret.appendTo('div.box-item');
    $('span.box').click(function(){
        var id = parseInt($(this).attr('id')), number = parseInt($(this).text());
        number++;
        number%=10;
        $(this).text(number);
        boxSecret[id] = number;
        for(var i=0;i<4;i++)
            if(boxSecret[i] != ansSecret[i])
                break;
        if(i==4){
            $('span.box').unbind('click').removeClass('clickable').fadeOut();
            $('div.scale img#box-item').attr('src','img/box-item.gif');
            setTimeout(function(){
                $('img#box-item').fadeOut(function(){
                    $(this).remove();
                    $('img#box-item').parent('div.obj-item').remove();
                });
                addObj({data:'光'});
                addObj({data:'照'});
            }, 1000);
        }
    })
}
var godLock = 0;
function godHandle(){
    var word = $('<span class=droppable></span>');
    word.css({
        width: '100%', height: '100%',
    }).droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var id = ui.draggable.children('img').attr('id');
            ui.draggable.draggable({'revert' :true});
            if(id == '佛-item'){
                ui.draggable.children('img').unbind('click');
                $('div.scale > div.god').append('<img src="img/佛.png" class="lg god" id="佛-item">');
                itemList.god.push(['佛','png']);
                setTimeout(function(){$('.obj-item img#佛-item').parent('div.obj-item').remove();},200);
                godLock ++;
            }
            if(id == '光-item'){
                ui.draggable.children('img').unbind('click');
                $('div.scale > div.god').append('<img src="img/光.png" class="lg god" id="光-item">');
                itemList.god.push(['光','png']);
                setTimeout(function(){$('.obj-item img#光-item').parent('div.obj-item').remove();},200);
                godLock ++;
            }
            if(id == '普-item'){
                ui.draggable.children('img').unbind('click');
                $('div.scale > div.god').append('<img src="img/普.png" class="lg god" id="普-item">');
                itemList.god.push(['普','png']);
                setTimeout(function(){$('.obj-item img#普-item').parent('div.obj-item').remove();},200);
                godLock ++;
            }
            if(id == '照-item'){
                ui.draggable.children('img').unbind('click');
                $('div.scale > div.god').append('<img src="img/照.png" class="lg god" id="照-item">');
                itemList.god.push(['照','png']);
                setTimeout(function(){$('.obj-item img#照-item').parent('div.obj-item').remove();},200);
                godLock ++;
            }
            if(id == 'lamp-item'){
                ui.draggable.children('img').unbind('click');
                $('div.scale > div.god').append('<img src="img/right-lamp.png" class="lg god" id="lamp-item">');
                $('div.scale > div.god').append('<img src="img/god-draw.png" class="lg god" id="god-draw">');
                $('div.scale > div.god').append('<img src="img/god-key.png" class="lg god" id="key">');
                itemList.god.push(['right-lamp','png']);
                itemList.god.push(['god-draw','png']);
                itemList.god.push(['god-key','png']);
                setTimeout(function(){$('.obj-item img#lamp-item').parent('div.obj-item').remove();},200);
                click.god.click['key']={'pos':['50%', '50%', '5%', '6%'],'callback':'obj'};
                addClick('god');
            }
            if(godLock == 4){
                $('div.scale > div.god').append('<img src="img/goddesk-open.png" class="lg god" id="open-item">');
                $('div.scale > div.god').append('<img src="img/lamp.png" class="lg god" id="lamp">');
                itemList.god.push(['goddesk-open','png']); 
                itemList.god.push(['lamp','png']);
                click.god.click['lamp']={'pos':['45%', '8%', '5%', '6%'],'callback':'obj'};
                addClick('god');
                godLock = 5;
            }

        }
    }).appendTo('div.layer.god');
}

function doorHandle(){
    var doorLock = $('<span class=droppable></span>');
    doorLock.css({
        width: '100%', height: '100%',
    }).droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var id = ui.draggable.children('img').attr('id');
            ui.draggable.draggable({'revert' :true});
            if(id == 'key-item'){
                    ui.draggable.children('img').unbind('click');
                    $('div.scale div.door').append('<img src="img/door-open.png" class="lg door" id="door-open">'); 
                    setTimeout(function(){$('.obj-item img#key').parent('div.obj-item').remove()},500);
                    itemList.stove.push(['door-open','png']);
                    $('div.scene.scene-1 div.door').append('<img class="door" id="door" src="img/door-open.png">'); 
                    delete click['scene-1'].click.door['subscene'];
                    click.door.click['upstair']={'pos':['26%', '18%', '35%', '65%']};
                    addClick('door');
                    click.door['handler']=function(){$('.arrow#up').click()};
                    $('div.clickable.click.door').unbind('click').bind('click', ['door'],addClick);
            }
        }
    }).appendTo('div.layer.door')
}


var stoveLock = true;
var woodAdded = false;
function stovenHandle(){
    var stoven = $('<span class="droppable"></span>');
    stoven.css({
        left: '25%', top: '40%', width: '20%', height: '15%',
    }).droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var id = ui.draggable.children('img').attr('id');
            ui.draggable.draggable({'revert' :true});
            if(id == 'pot-item'){
                ui.draggable.children('img').unbind('click');
                var ts= new Date().getTime();
                if(woodAdded) 
                    $('div.scale div.stove').append('<img src="img/pot.gif" class="lg stove" id="pot-item">');
                else
                    $('div.scale div.stove').append('<img src="img/pot-stove.png" class="lg stove" id="pot-item">');
                setTimeout(function(){ui.draggable.children('img').bind('click',objList['pot'].scene, scaleObj);}, 1000);
            }
                
        }
    }).appendTo('div.layer.stove');

    if(!stoveLock && !woodAdded){   //problem solved but wood not yet added, add droppable
       var stoven = $('<span class="droppable"></span>');
        stoven.css({
            left: '55%', top: '65%', width: '20%', height: '25%'
        }).droppable({
            activeClass: 'ui-state-default',
            hoverClass: 'ui-state-hover',
            drop: function( event, ui ) {   // wood added
                var id = ui.draggable.children('img').attr('id');
                ui.draggable.draggable({'revert' :true});   
                if(id == 'wood'){
                    ui.draggable.children('img').unbind('click');
                    $('div.scale div.stove').append('<img src="img/wood.gif" class="lg stove" id="wood">'); 
                    setTimeout(function(){$('.obj-item img#wood').parent('div.obj-item').remove()},500);
                    itemList.stove.push(['wood','gif']);
                    woodAdded = true;
                }

            }
        }).appendTo('div.layer.stove');
    }
}

var basinAdded = false, handyAdded = false;
function sinkHandle(){
    var sink = $('<span class="droppable"></span>');
    sink.css({
        left: '10%', top: '30%', width: '80%', height: '50%',
    }).droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var id = ui.draggable.children('img').attr('id');
            ui.draggable.draggable({'revert' :true});
            if(id == 'basin-item'){
                ui.draggable.children('img').unbind('click');
                var ts= new Date().getTime();
                $('div.scale div.sink').append('<img src="img/basin-sink.png" class="lg sink" id="basin-item">'); 
                setTimeout(function(){$('.obj-item img#basin-item').parent('div.obj-item').remove()},500);
                itemList.sink.push(['basin-sink','png']);
                basinAdded = true;
            }
            if(id == 'handy-item'){
                if(waterFilled){
                    ui.draggable.children('img').unbind('click');
                    $('div.scale div.sink img#basin-item').after('<img src="img/handy-sink.gif" class="lg sink" id="handy-item">');
                    setTimeout(function(){$('.obj-item img#handy-item').parent('div.obj-item').remove()},500);
                    itemList.sink.splice(2, 0, ['handy-sink','gif']);
                }
                else if (basinAdded){
                    ui.draggable.children('img').unbind('click');
                    $('div.scale div.sink img#basin-item').after('<img src="img/handy-sink.png" class="lg sink" id="handy-item">');
                    setTimeout(function(){$('.obj-item img#handy-item').parent('div.obj-item').remove()},500);
                    itemList.sink.push(['handy-sink','png']);
                    handyAdded = true;
                }
            }
        }
    }).appendTo('div.layer.sink');
}
var waterFilled = false;
function waterHandle(){
    if(basinAdded && !waterFilled){
        $('div.scale div.sink').append('<img src="img/basin-water.gif" class="lg sink" id="basin-water">');
        itemList.sink.push(['basin-water','gif']);
        waterFilled = true;
    }    
    if(handyAdded){
        handyAdded = false;
        itemList.sink[2] = ['handy-sink', 'gif'];
        $('img#handy-item').attr('src', 'img/handy-sink.gif');
    }
}

function doorOpen(){
    var ts= new Date().getTime();
    $('img#shelf-door').attr('src','img/shelf-open.gif?ts='+ts);
    $('div.holder div.shelf-door').css({
        left:'20%'
    }).unbind('click').click(function(){
        $('img#shelf-door').attr('src','img/shelf-close.gif?ts='+ts);
        $('div.holder div.shelf-door').css({
            left:'52%'
        }).unbind('click').click(doorOpen);
        removeClick('shelf-door'); 
    });
    var Arr = click['shelf-door'].click;
    if('shelf-book' in Arr){
            var newlayer = $('<div class="layer shelf-door"></div>');
            newlayer.css({height:'100%', width:'100%'});
            var Toappend = $('<div class="clickable click shelf-book"></div>');
            Toappend.css({
                left:Arr['shelf-book']['pos'][0],
                top:Arr['shelf-book']['pos'][1],
                width:Arr['shelf-book']['pos'][2],
                height:Arr['shelf-book']['pos'][3],
            }).bind('click','shelf-book', addObj).appendTo(newlayer);
            $('div.holder > div:last-child').append(newlayer);
    }
    $('div.holder div.kitchen-shelf').append('')
}


function stoveProb(){
    $('div.holder').fadeOut();
    var problem = $('<span class="prob"></span>');
    var ref = $('img#stove-lock-lg').position();
    var H = $('img#stove-lock-lg').height();
    var W = $('img#stove-lock-lg').width();
    problem.css({
        left: ref.left + 0.15*W,
        top: ref.top + 0.35*H,
        width: 0.7*W,
        height: 0.7*H,
        'font-size': '100%',
        color: 'white'
    })
    $('div.scale div.stove-lock').append(problem);
    RenderProb(0);
}
var stoveProbArr = [
        ['Ａ、何者可以用來形容粉娘的子孫表達出的態度？', '（ａ）不稂不莠', '（ｂ）缾罄罍恥', '（ｃ）不拘小節', '（ｄ）進退維谷'],
        ['Ｂ、下列敘述何者有誤？', '（ａ）〈抱孫〉展現出老者對新生兒的關愛與期待', '（ｂ）《放生》以寫實反諷的筆觸描述社會現象，描繪細膩生動，刻劃入微，展現對現代社會的深切關懷', '（ｃ）余光中的詩作情感豐沛、題材多樣、富於想像', '（ｄ）〈死去活來〉寫出壯有所用是老者安之的根柢'],
        ['Ｃ、下列何者在〈抱孫〉的對比中並非兩兩對照？', '（ａ）滄桑／謎面', '（ｂ）世故／天真', '（ｃ）典故／預言', '（ｄ）過去／未來'],
        ['Ｄ、下列詩句中，沒有運用轉化手法來美化詩句的是哪個選項？', '（ａ）羊齒植物／沿著白色的石階／一路嚼了下去', '（ｂ）昨日我沿著河岸／漫步到／蘆葦彎腰喝水的地方／順便請煙囪／在天空為我寫一封長長的信', '（ｃ）西風裏換了毛的駱駝羣／舉起四蹏的沉重／又輕輕踏下，／街上已有一層薄霜', '（ｄ）在沒有燈的屋子裡／自己照亮自己。於是／紙煙乃如一枝枝的粉筆，／在夜的黑板上，／我默默地寫著／人生的問題與答案，／美麗的童話和詩句'],
    ];
var stoveProbAns = [2,4,1,3];
var stoveLampOn = [[3,5],[4],[1,2],[4,5]], stoveLampOff=[[4,2],[1,5],[3],[2]], stoveConf= [false, false, false, false, false];
function RenderProb(stage){
    $('span.prob').empty();
    if(stage<stoveProbArr.length){
        var prob = $('<span class="stoveProb"></span>');
        prob.css({ display : 'block', position: 'relative'}).text(stoveProbArr[stage][0]).appendTo('span.prob');
        for(var i=1; i<5; i++){
            var answer = $('<span class="stoveAns" id="'+i+'"></span>');
            answer.css({
                display: 'block',
                cursor: 'pointer',
                position: 'relative'
            }).text(stoveProbArr[stage][i]).appendTo('span.prob');
        }
        $('span.stoveAns').click(function(){
            var select = $(this).attr('id');
            if(select == stoveProbAns[stage]){
                for(var i=1; i<=5; i++)
                    if(stoveLampOn[stage].indexOf(i)!=-1 && !stoveConf[i-1]){
                        $('<img src="img/stove-lamp-'+i+'.png" class="lg stove-lock" id="stove-lamp-'+i+'">').insertAfter('img.stove-lock').fadeIn();
                        stoveConf[i-1] = true;
                    }
            }
            else{
                for(var i=1; i<=5; i++)
                    if(stoveLampOff[stage].indexOf(i)!=-1 && stoveConf[i-1]){
                        $('img#stove-lamp-'+i).fadeOut().remove();
                        stoveConf[i-1] = false;
                    }
            }
            stage+=1;
            RenderProb(stage);
        })
    }
    else{
        if(stoveConf.indexOf(false) == -1){
           delete click.stove.click['stove-lock'];
           itemList.stove.splice(1,2);
           $('img#stove-lock').remove();
           $('div.stove-lock').remove();
           $('.toggleRemove').click();
           stoveLock = false;
        }
        else
            $('.toggleRemove').click();
    }
}


function horseHandle(){
    if(horse_cnt[0]!=4 || horse_cnt[2]!=5) {horse_cnt[0] = horse_cnt[2] = 0 ; return;}
    horse_cnt[1]++;
    if(horse_cnt[1] == 6){
                $('div.scale > div.horse').append('<img src="img/flower.gif" class="lg horse" id="flower">');
                itemList.horse.push(['flower','gif']);
                click.horse.click['flower']={'pos':['27%', '75%', '10%', '10%'],'callback':'obj'};
                addClick('horse');
    }
}

$('div.arrow').click(function(){
    var dir = $(this).attr('id');
    if(dir=='left'){
        $('.scene-1').fadeOut();
        Re_removeClick('scene-1');
        $('.scene-2').fadeIn();
        addClick('scene-2');
        $('.main').css('background-image','url("img/back-2.png")');
    }
    else if(dir == 'right'){
        $('.scene-2').fadeOut();
        Re_removeClick('scene-2');
        $('.scene-1').fadeIn();
        addClick('scene-1');
        $('.main').css('background-image','url("img/back-1.png")');
    }
    else if(dir == 'up'){
        $('.scene-1').fadeOut();
        Re_removeClick('scene-1');
        $('.scene-3').fadeIn();
        addClick('scene-3');
        $('.main').css('background-image','url("img/back-3.png")');
    }
    else if(dir == 'down'){
        $('.scene-3').fadeOut();
        Re_removeClick('scene-3');
        $('.scene-1').fadeIn();
        addClick('scene-1');
        $('.main').css('background-image','url("img/back-1.png")');
    }
})

function bookHandle(){
    $('div.holder').fadeOut();
    $('img#red-pen-item').parent('div.obj-item').draggable({'revert': 'invalid'});
    $('img#book-item').droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var id = ui.draggable.children('img').attr('id');
            if(id!='red-pen-item')
                ui.draggable.draggable({'revert' :true})
            else{
                ui.draggable.remove();
                var ts= new Date().getTime();
                setTimeout(function(){ 
                    $('img#red-pen').parent('div.obj-item').remove(); 
                }, 500);
                itemList['book-item'][0] = ['book-open','gif'];
                $(this).attr('src','img/book-open.gif?ts='+ts);
                objHandle['book-item'] = renderSticker;
                renderSticker();
            }
        }
    })

}

var sticker=[
        {'text':'臂彎', 'class':'L', 'pos':{left: '10%', top: '10%'}},
        {'text':'胸膛', 'class':'L', 'pos':{left: '70%', top: '10%'}},
        {'text':'歷史', 'class':'L', 'pos':{left: '15%', top: '70%'}},
        {'text':'滄桑', 'class':'L', 'pos':{left: '76%', top: '50%'}},
        {'text':'俯窺', 'class':'L', 'pos':{left: '50%', top: '5%'}},
        {'text':'典故', 'class':'L', 'pos':{left: '5%', top: '50%'}},
        {'text':'世故', 'class':'L', 'pos':{left: '67%', top: '30%'}},
        {'text':'十磅</br>之輕', 'class':'R', 'pos':{left: '8%', top: '30%'}},
        {'text':'兩尺</br>之短', 'class':'R', 'pos':{left: '30%', top: '5%'}},
        {'text':'仰望', 'class':'R', 'pos':{left: '30%', top: '80%'}},
        {'text':'未來', 'class':'R', 'pos':{left: '80%', top: '80%'}},
        {'text':'謎面', 'class':'R', 'pos':{left: '85%', top: '30%'}},
        {'text':'預言', 'class':'R', 'pos':{left: '60%', top: '60%'}},
        {'text':'天眞', 'class':'R', 'pos':{left: '50%', top: '80%'}},
   ];
var sticker_solved = false;
var cnt = 0;
function renderSticker(){
    if(sticker_solved){addClick('book-item'); console.log('test');return;}
    cnt = 0;
    $('div.holder').fadeOut();
    for(var i in sticker){
        var Toappend=$('<span class="sticker"><img src="img/sticker.png"><span class="text">'+sticker[i].text+'</span></span>');
        Toappend.css({'width':'10%', 'height':'20%'}).css(sticker[i].pos);
        Toappend.children('img').css({'width':'100%', 'height':'100%'}).addClass('sticker').addClass(sticker[i].class);
        Toappend.appendTo('div.scale'); 
        Toappend.draggable({'revert': 'invalid'});
    }
    $('.toggleRemove').click(function(){
        $('div.book-item.obj').remove();
        $('span.sticker').remove();
        console.log('Hello');
    });
    $('img#book-item').droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            var cl = ui.draggable.children('img').attr('class');
            var id = ui.draggable.children('img').attr('id');
            if(cl.indexOf('sticker')==-1)
                ui.draggable.draggable({'revert' :true})
            else{
                var ui_w = $('img.sticker').width();
                var dropx = ui.offset.left - $(this).offset().left + ui_w/2;
                var w = $(this).width();
                if(dropx > w/3 && dropx < w*2/3){
                    var ans = cl.indexOf('L');
                    if(dropx < $(this).width()/2)
                        if(ans == -1){  //Put R in L
                            right.pause();
                            wrong.pause();
                            wrong.play();                                
                            ui.draggable.draggable({'revert' :true});
                        }
                        else{
                            right.pause();
                            wrong.pause();
                            right.play();
                            cnt += 1;            
                            setTimeout(function(){ 
                                ui.draggable.remove();
                            }, 100);
                        }
                    else
                        if(ans == -1){  //Put R in R
                            right.pause();
                            wrong.pause();
                            right.play();
                            cnt += 1;            
                            setTimeout(function(){ 
                                ui.draggable.remove();
                            }, 100);
                        }
                        else{
                            right.pause();
                            wrong.pause();
                            wrong.play();                                
                            ui.draggable.draggable({'revert' :true});
                        }
                    if(cnt == 1){
                        sticker_solved=true;
                        var ts= new Date().getTime();
                        $('img#book-item').attr('src','img/shelf-book-star.gif?ts='+ts);
                        itemList['book-item'][0] = ['shelf-book-star','gif'];
                        itemList['book-item'].push(['book-star','png']);
                        $('div.holder > div.obj').remove();
                        addClick('book-item');
                        $('div.holder').fadeIn();
                        $('div.holder > div.book-item').addClass('obj');
                    }
                }
                else
                    ui.draggable.draggable({'revert' :true})
            }
        }
    })
}
var toy_finish = 0;
function toyHandle(){
    $('div.holder').fadeOut();
    if(toy_finish == 4) babysong.play();
    $('img#toy').droppable({
        activeClass: 'ui-state-default',
        hoverClass: 'ui-state-hover',
        drop: function( event, ui ) {
            ui.draggable.draggable({'revert' :true});
            var id = ui.draggable.children('img').attr('id');
            if(id == 'fish-item'){
                ui.draggable.remove();
                $(this).after('<img class="lg toy" id="toy-fish" src="img/toy-fish.png">');
                itemList.toy.push(['toy-fish','png']);
                $('div.scene-3.scene div.toy').append('<img class="toy" id="toy-fish" src="img/toy-fish.png">')
                setTimeout(function(){ 
                    $('img#fish-item').parent('div.obj-item').remove(); 
                }, 1000);
                toy_finish += 1;
            }
            if(id == 'flower-item'){
                ui.draggable.remove();
                $(this).after('<img class="lg toy" id="toy-flower" src="img/toy-flower.png">');
                itemList.toy.push(['toy-flower','png']);
                $('div.scene-3.scene div.toy').append('<img class="toy" id="toy-fish" src="img/toy-flower.png">')
                setTimeout(function(){ 
                    $('img#flower-item').parent('div.obj-item').remove(); 
                }, 1000);
                toy_finish += 1;
            }
            if(id == 'bird-item'){
                ui.draggable.remove();
                $(this).after('<img class="lg toy" id="toy-bird" src="img/toy-bird.png">');
                itemList.toy.push(['toy-bird','png']);
                $('div.scene-3.scene div.toy').append('<img class="toy" id="toy-fish" src="img/toy-bird.png">')
                setTimeout(function(){ 
                    $('img#bird-item').parent('div.obj-item').remove(); 
                }, 1000);
                toy_finish += 1;
            }
            if(id == 'star-item'){
                ui.draggable.remove();
                $(this).after('<img class="lg toy" id="toy-star" src="img/toy-star.png">');
                itemList.toy.push(['toy-star','png']);
                $('div.scene-3.scene div.toy').append('<img class="toy" id="toy-fish" src="img/toy-star.png">')
                setTimeout(function(){ 
                    $('img#star-item').parent('div.obj-item').remove(); 
                }, 1000);
                toy_finish += 1;
            }
            if(toy_finish == 4){
                $('img#toy-fish').remove();
                $('img#toy-flower').remove();
                $('img#toy-star').remove();
                $('img#toy-bird').remove();
                $('div.scene-3 img#toy').attr('src', 'img/toy.gif');
                $(this).attr('src', 'img/toy.gif');
                itemList.toy=[['toy','gif']];
                babysong.play();
                itemList.baby[0]=['babysmile','gif'];
                click.baby={ 'handler': function(){
                    //The End
                    setTimeout(function(){
                        $('img#babysmile').fadeOut();
                        $('.scene-3.scene').fadeOut()
                        $('img.animate.end').fadeIn()}, 5500);
                    setTimeout(function(){
                        $('.container').fadeOut().html('<h1 style="text-align:center">THE END</h1>').fadeIn();
                    },13000) 
                }}
                DONE = true;
            }
        }
    });
}   
