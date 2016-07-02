class Zan {
	constructor (selector, number) {
		this.$selector = $(selector);
		this.num = number;

		this.init();
	}

	init () {
		let _this = this,
			iFlag = false;
		this.$selector.click( ()=>{
			if ( _this.num < 10 && !iFlag ) {
				_this.num ++;
				iFlag = true;
				_this.$selector.parent()
								.find('.total-num')
								.text(this.num)
								.end()
								.find('#num')
								.show()
								.animate({'bottom': 200 +'px','opacity': 0}, 1000, function(){
									$(this).css({'bottom': 0, 'opacity': 1, 'display': 'none'});
									iFlag = false;
								});
			}
		} );
	}
}

class ZanStar extends Zan {
	constructor (selector, number, type) {
		super(selector, number);
		this.type = type;

		this.initType();
	}

	initType () {
		if ( this.type === 'star' ) {
			this.$selector.attr('id', 'star-five');
		} else if ( this.type === 'hand' ) {
			this.$selector.attr('id', 'hand');
		}
	}
}
class ZanHand extends Zan {

}

$(document).ready(function(){
	new ZanStar('#star-five', 0);
});