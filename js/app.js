
(function (window) {
  'use strict';

	var $newTodo = $('.new-todo');
	var $todoList = $('.todo-list');

	init();

	function init() {
		countTodo();
	}

	function countTodo() {
		$todoList.each(function () {
			var count= $(this).children().not('.completed').length;
			$('.todo-count').remove();
			$('.footer').prepend('<span class="todo-count"> <strong>'+ count + '  </strong>' + "item left" + '</span>');
		});
	}


	/* new Todo event */
	$newTodo.on('keypress', function(e) {
		var key = e.which;
		var enterKey = 13;

		if(key == enterKey) {
			createTodo();
			init();
		}
	});

	function createTodo() {
		var todoVal = $newTodo.val().trim();
		if(todoVal != 0) { //if val is not a null
			var tag = "<li>" + "<input class='toggle' type='checkbox'> <label>" + todoVal;
			var closeTag = "</label>" + "<button class='destroy'></button>" + "<input class='edit' value=" + todoVal + ">" + "</li>";

			$todoList.append(tag + closeTag);
			$newTodo.val(" ");
			allShow();
		}
	 else {
			console.log("입력할 데이터가 없습니다!");
	 }
	}


	/* todo List event */
	$todoList.on('click', '.toggle', function(e) {
		var eventTarget = e.target;

		if($(this).prop('checked')==true) {
			this.setAttribute("checked", true);
			$(eventTarget).parent().addClass('completed');
		}
		else {
			$(eventTarget).removeAttr('checked');
			$(eventTarget).parent().removeClass('completed');
		}
		init();
	});

	$todoList.on('click', 'button', function(e) {
		$(this).parent().remove();
		init();
	});



	/* filters event */
	$('a[href $="#/active"]').on('click', function(e) {
		$todoList.children().each(function() {
			if($(this).is('.completed')){
				$(this).hide();
			}
			else {
				$(this).show();
			}
		});
	});

	$('a[href $="#/completed"]').on('click', function(e) {
		$todoList.children().each(function() {
			if($(this).is('.completed')){
				$(this).show();
			}
			else {
				$(this).hide();
			}
		});
	});

	$('.clear-completed').on('click', function(e) {
		$todoList.children().each(function() {
			if($(this).is('.completed')){
				$(this).remove();
			}
		});
	});

	$('.selected').on('click', function (e) {
		allShow();
	});

function allShow() {
	$todoList.children().each(function() {
		$(this).show();
	});
}


})(window);
