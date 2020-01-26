let todoItems: Array<TodoItems> = [];

interface TodoItems {
    text: String,
    checked: Boolean,
    id: Number
}

function addTodo(text: string) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);

  const list = <HTMLElement>document.querySelector('.js-todo-list');
  list.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `);
}


// function for clicking done on an item
function toggleDone(key:string) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  const item = <Element>document.querySelector(`[data-key='${key}']`);
  if (todoItems[index].checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
}

// listen for submit events on the input
const form = <HTMLFormElement>document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = <HTMLInputElement>document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});


// Add tick to tick box
const list = <HTMLLabelElement>document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if ((<Element>event.target).classList.contains('js-tick')) {
    const itemKey = (<HTMLElement>event.target).parentElement!.dataset.key;
    toggleDone(itemKey!);
  }

  //Create delete todo function
  function deleteTodo(key: string)
  {
    todoItems = todoItems.filter(item => item.id !== Number(key))
    const item = document.querySelector(`[data-key='${key}']`);
    item?.remove();

  // select the list element and trim all whitespace once there are no todo items left
  const list = <HTMLElement>document.querySelector('.js-todo-list');
  if (todoItems.length === 0) list.innerHTML = '';
  }

  //detect deletion of todo item
  if ((<Element>event.target).classList.contains('js-delete-todo')) {
    const itemKey = (<HTMLElement>event.target).parentElement!.dataset.key;
    deleteTodo(itemKey!);
  }

});