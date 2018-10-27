'user strict';

var ls = window.top.localStorage;

var input_text = document.querySelector('#input-text'),
    todo_list = document.querySelector('.todo-list'),
    delete_completed_tasks = document.querySelector('#delete-completed-tasks'),
    top_id = parseInt(ls.getItem("top_id")),
    ctx = JSON.parse(ls.getItem("ctx"));

if (!top_id) top_id = 1;
if (!ctx) ctx = [];


function updateLocalStorage() { 
  top_id++;
  ls.setItem("top_id", ''+top_id);
  console.log(JSON.stringify(ctx));
  ls.setItem("ctx", JSON.stringify(ctx));
}


function deleteFromCtx(item) {
  console.log(item.id); 
  for (var i = 0; i < ctx.length; i++) {
    if (item.id == ctx[i].id) {
      ctx.splice(i, 1);
    }
  }
  updateLocalStorage();
  item.remove();
}

// add new element, when enter is pressed
input_text.addEventListener('keypress', function(event) {
  if (event.keyCode == 13) {
    if (input_text.value !== '') {
      appendNewItem({
        id: top_id,
        text: input_text.value
      });
    }

    ctx.push({
      'id': top_id,
      'text': input_text.value
    });
    
    updateLocalStorage();

    input_text.value = "";
  }
});


delete_completed_tasks.addEventListener('click', function() {
  for (var i = 0; i < todo_list.children.length; i++) {
    var item = todo_list.children[i];

    if (~item.classList.value.split(' ').indexOf('complete')) {
      console.log(item.id);
      deleteFromCtx(item);
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
    //var id = wrapper.id;
    deleteFromCtx(wrapper);
    //wrapper.remove();
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
