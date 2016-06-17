$('.draggable').draggable({ 
	revert: 'invalid',
});

$('.droppable').droppable({
	hoverClass: "ui-state-active",
  drop: function( event, ui ) {
		matchId = match[this.id];

		checkOccupied(matchId, ui.draggable.attr('id'));
		match[this.id] = ui.draggable.attr('id');

		offset = $('#'+this.id+'.droppable').offset();
		$('#'+ui.draggable.attr('id')+'.draggable').css('position', 'absolute');
		$('#'+ui.draggable.attr('id')+'.draggable').css('top',offset.top);
		$('#'+ui.draggable.attr('id')+'.draggable').css('left',offset.left);

		if(rightAns(this.id, match[this.id])) {
			$('audio')[0].play();
		} else {
			showError();	
			$('audio')[1].play();
		}
  }
});

function showError() {
	$('#cross').css('display', 'block');
	
	setTimeout(function(){
		$('#cross').css('display', 'none');
	}, 750);
}

function rightAns(qusId, ansId) {
	//alert('qusId: '+qusId+' ansId: '+ansId);
	if(answers[qusId] == ansId)
		return true;
	return false;
}

function checkOccupied(newId, oldId) {
	if(newId != 0 && newId != oldId) {
		$('#'+newId+'.draggable').css('position', 'relative');
		$('#'+newId+'.draggable').css('top', 0);
		$('#'+newId+'.draggable').css('left', 0);
	}
}

var match = [0,0,0,0,0,0,0,0,0,0,0,0,0];
var answers = [0,2,5,8,9,12,3,6,11,7,10,1,4];
