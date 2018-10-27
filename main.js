'user strict';

var input_text = document.querySelector('#input-text'),
    todo_list = document.querySelector('.todo-list'),
    delete_completed_tasks = document.querySelector('#delete-completed-tasks');


// add new element, when enter is pressed
input_text.addEventListener('keypress', function(event) {
  if (event.keyCode == 13) {
    if (input_text.value !== '') {
      appendNewItem({
        id: NaN,
        text: input_text.value
      });
    }
    input_text.value = "";
  }
});


delete_completed_tasks.addEventListener('click', function() {
  for (var i = 0; i < todo_list.children.length; i++) {
    var item = todo_list.children[i];

    if (~item.classList.value.split(' ').indexOf('complete')) {
      item.remove();
      i--;
    }
  }
});


function getTodoItem(obj) {
  var wrapper = document.createElement("div"),
      text = document.createTextNode(obj.text),
      close_button = document.createElement("span");

  wrapper.className = 'todo-item';
  if (obj.complete) wrapper.classList.toggle('complete');
  wrapper.id = '' + obj.id

  close_button.innerText = '❌';

  wrapper.addEventListener('click', function() {
    wrapper.classList.toggle('complete');
  });

  close_button.addEventListener('click', function(event) {
    var id = wrapper.id;
    wrapper.remove();
  });

  wrapper.appendChild(text);
  wrapper.appendChild(close_button);

  return wrapper;
}


function appendNewItem(obj) {
  todo_list.insertBefore(getTodoItem(obj), todo_list.firstChild);
}
