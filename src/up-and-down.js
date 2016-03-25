/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2016-03-25
 * Time: 16:48:54
 * Contact: 55342775@qq.com
 */
;
(function(root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.UpAndDown = factory(window.Zepto || window.jQuery || $);
	}
})(this, function($) {
	var UpAndDown = function() {
		this.baseIndex = 100;
	};
	UpAndDown.prototype = {
		init: function(settings) {
			this.settings = $.extend({order:'asc'}, settings);
			this.settings.target = $(this.settings.target);
			if(settings.order == 'asc' ){
				this.index = this.baseIndex;
			}else{
				this.index = this.baseIndex + this.settings.content.length+1;
			}
			for (var i = 0, l = this.settings.content.length; i < l; i++) {
				// code...
				if(settings.order == 'asc' ){
					this.index ++;
				}else{
					this.index --;
				}
				var page = $('<div class="up-and-down-item"><div class="up"></div><div class="down"></div></div>');
				page.css('zIndex',this.index);
				var h = this.settings.target.height();
				var w = this.settings.target.width();
				var up = page.find('.up').css({
					'background-image': 'url(' + this.settings.content[i] + ')',
					'background-size':w+'px '+h+'px',
					'background-position':'center 0px'
				});
				var down = page.find('.down').css({
					'background-image': 'url(' + this.settings.content[i] + ')',
					'background-size':w+'px '+h+'px',
					'background-position':'center -'+h/2+'px'
				});
				this.settings.target.append(page);
			}
			this.bindEvent();
		}
		,bindEvent:function(){
			var _this = this;
			this.settings.target.on('click','.up-and-down-item>div',function(){
				console.log(this)
				if($(this).hasClass('up')){
					//up
					_this.down(this);
				}else{
					_this.up(this);
				}
				return false;
			});
		},
		up:function(obj){
			var p = $(obj).parent();
			var zIndex = $(obj).siblings().css('zIndex')||1;
			$(obj).css('zIndex',++zIndex);
			$(obj).addClass('up-animate');
			setTimeout(function(){
				p.hide();
			},3000);
		},
		down:function(obj){
			var p = $(obj).parent();
			var zIndex = $(obj).siblings().css('zIndex')||1;
			$(obj).css('zIndex',++zIndex);
			$(obj).addClass('down-animate');
			setTimeout(function(){
				p.hide();
			},3000);
		}
	}
	return UpAndDown;
});