'user strict';


var context = (function() {
  var ls = window.top.localStorage,
      top_id = parseInt(ls.getItem("top_id")),
      ctx = JSON.parse(ls.getItem("ctx"));


  if (!top_id) top_id = 1;
  if (!ctx) ctx = [];


  function updateLocalStorage() {
    ls.setItem("top_id", ''+top_id);
    ls.setItem("ctx", JSON.stringify(ctx));
  }


  return {
    get: function() {
      return ctx;
    },

    getTopId: function() {
      return top_id;
    },

    deleteItem: function(item) {
      for (var i = 0; i < ctx.length; i++) {
        if (item.id == ctx[i].id) {
          ctx.splice(i, 1);
        }
      }
      updateLocalStorage();
    },

    appendItem: function(item) {
      ctx.push(item);
      top_id++;
      updateLocalStorage();
    }
  }
}());


var todo_list = (function() {
  // dom
  var input_text = document.querySelector('#input-text'),
      todo_list = document.querySelector('.todo-list'),
      delete_completed_tasks = document.querySelector('#delete-completed-tasks');


  // add new element, when enter is pressed
  input_text.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      if (input_text.value !== '') {
        obj = { id: context.getTopId(), text: input_text.value }

        appendItem(obj);
        context.appendItem(obj);

        input_text.value = "";
      }
    }
  });


  delete_completed_tasks.addEventListener('click', function() {
    for (var i = 0; i < todo_list.children.length; i++) {
      var item = todo_list.children[i];

      if (~item.classList.value.split(' ').indexOf('complete')) {
        context.deleteItem(item);
        item.remove();
        i--;
      }
    }
  });


  // create dom of new item
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
      context.deleteItem(wrapper);
      wrapper.remove();
    });

    wrapper.appendChild(text);
    wrapper.appendChild(close_button);

    return wrapper;
  }


  // append new item to dom of todo_list
  function appendItem(obj) {
    todo_list.insertBefore(getTodoItem(obj), todo_list.firstChild);
  }
  

  for (var i = 0; i < context.get().length; i++) {
    appendItem(context.get()[i]);
  }
}());
