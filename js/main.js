"use strict";
var todoItems = [];
function addTodo(text) {
    var todo = {
        text: text,
        checked: false,
        id: Date.now()
    };
    todoItems.push(todo);
    var list = document.querySelector('.js-todo-list');
    list.insertAdjacentHTML('beforeend', "\n    <li class=\"todo-item\" data-key=\"" + todo.id + "\">\n      <input id=\"" + todo.id + "\" type=\"checkbox\"/>\n      <label for=\"" + todo.id + "\" class=\"tick js-tick\"></label>\n      <span>" + todo.text + "</span>\n      <button class=\"delete-todo js-delete-todo\">\n        <svg><use href=\"#delete-icon\"></use></svg>\n      </button>\n    </li>\n  ");
}
// function for clicking done on an item
function toggleDone(key) {
    var index = todoItems.findIndex(function (item) { return item.id === Number(key); });
    todoItems[index].checked = !todoItems[index].checked;
    var item = document.querySelector("[data-key='" + key + "']");
    if (todoItems[index].checked) {
        item.classList.add('done');
    }
    else {
        item.classList.remove('done');
    }
}
// listen for submit events on the input
var form = document.querySelector('.js-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var input = document.querySelector('.js-todo-input');
    var text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
});
// Add tick to tick box
var list = document.querySelector('.js-todo-list');
list.addEventListener('click', function (event) {
    if (event.target.classList.contains('js-tick')) {
        var itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    //Create delete todo function
    function deleteTodo(key) {
        var _a;
        todoItems = todoItems.filter(function (item) { return item.id !== Number(key); });
        var item = document.querySelector("[data-key='" + key + "']");
        (_a = item) === null || _a === void 0 ? void 0 : _a.remove();
        // select the list element and trim all whitespace once there are no todo items left
        var list = document.querySelector('.js-todo-list');
        if (todoItems.length === 0)
            list.innerHTML = '';
    }
    //detect deletion of todo item
    if (event.target.classList.contains('js-delete-todo')) {
        var itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});
//# sourceMappingURL=main.js.map