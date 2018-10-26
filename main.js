'user strict';

var ctx = [
  {id: 1, complete: true, text: "Learn html"},
  {id: 2, complete: false, text: "Learn css"},
  {id: 3, complete: false, text: "Learn js"},
  {id: 4, complete: false, text: "Learn python"},
];

var input_text = document.querySelector('#input-text'),
    button_add = document.querySelector('#add-new-item');

button_add.addEventListener('click', function(event) {
  if (input_text.value !== '') {
    appendNewItem({
      id: NaN,
      text: input_text.value
    });
  }
});

var todo_list = document.querySelector('.todo-list');

function getTodoItem(obj) {
  var wrapper = document.createElement("div");
  wrapper.className = 'todo-item';
  wrapper.id = '' + obj.id

  var text = document.createTextNode(obj.text);

  var close_button = document.createElement("span");
  close_button.innerText = '❌';

  close_button.addEventListener('click', function(event) {
    var id = wrapper.id;

    // detele item from ctx
    for (var i = 0; i < ctx.length; i++) {
      if (ctx[i].id == id) {
        ctx.splice(i, 1);
        break;
      }
    }

    wrapper.remove();
  });

  wrapper.appendChild(text);
  wrapper.appendChild(close_button);

  return wrapper;
}

function appendNewItem(obj) {
  todo_list.insertBefore(getTodoItem(obj), todo_list.firstChild);
}

for (var i = 0; i < ctx.length; i++) {
  appendNewItem(ctx[i]);
}
