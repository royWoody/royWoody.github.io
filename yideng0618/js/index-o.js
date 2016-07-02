'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Zan = function () {
	function Zan(selector, number) {
		_classCallCheck(this, Zan);

		this.$selector = $(selector);
		this.num = number;

		this.init();
	}

	_createClass(Zan, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			var _this = this,
			    iFlag = false;
			this.$selector.click(function () {
				if (_this.num < 10 && !iFlag) {
					_this.num++;
					iFlag = true;
					_this.$selector.parent().find('.total-num').text(_this2.num).end().find('#num').show().animate({ 'bottom': 200 + 'px', 'opacity': 0 }, 1000, function () {
						$(this).css({ 'bottom': 0, 'opacity': 1, 'display': 'none' });
						iFlag = false;
					});
				}
			});
		}
	}]);

	return Zan;
}();

var ZanStar = function (_Zan) {
	_inherits(ZanStar, _Zan);

	function ZanStar(selector, number, type) {
		_classCallCheck(this, ZanStar);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ZanStar).call(this, selector, number));

		_this3.type = type;

		_this3.initType();
		return _this3;
	}

	_createClass(ZanStar, [{
		key: 'initType',
		value: function initType() {
			if (this.type === 'star') {
				this.$selector.attr('id', 'star-five');
			} else if (this.type === 'hand') {
				this.$selector.attr('id', 'hand');
			}
		}
	}]);

	return ZanStar;
}(Zan);

var ZanHand = function (_Zan2) {
	_inherits(ZanHand, _Zan2);

	function ZanHand() {
		_classCallCheck(this, ZanHand);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ZanHand).apply(this, arguments));
	}

	return ZanHand;
}(Zan);

$(document).ready(function () {
	new ZanStar('#star-five', 0);
});
