const titleInp = document.querySelector('.title');
const descInp = document.querySelector('.description');
const imageInp = document.querySelector('.image');
const rowEl = document.querySelector('.row');
const errorEl = document.querySelector('.error');
const formEl = document.querySelector('form');
const btnSignOut = document.querySelector('.signOut');

window.addEventListener("load", () => {
  if (localStorage.getItem("isAuth") === "false") {
    window.open("./register.html", "_self");
  };
  if (!localStorage.getItem("todoList")) {
    localStorage.setItem("todoList", JSON.stringify([]));
  }
  renderOnPage(todoList);
});

const todoList = JSON.parse(localStorage.getItem("todoList"));

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const todoItem = {
    title: titleInp.value,
    desc: descInp.value,
    img: imageInp.value,
  };
  todoList.push(todoItem);
  renderOnPage(todoList);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  formEl.reset();
});

const renderTodo = (el, idx) => {
  return `<div class="boxes" id="${idx}">
 <h4>${el.title}</h4>
 <img src="${el.img}" alt="image">
 <h4>${el.desc}</h4>
 <div class="btn_inline">
 <button>configure</button><button>delete</button>
 </div>
 </div>`;
}

const renderOnPage = (todoList) => {
  rowEl.innerHTML = (todoList.map((el, idx) => renderTodo(el, idx))).join('');
}

rowEl.addEventListener('click', event => {
  let currEl = +event.target.closest('.boxes').getAttribute('id');
  if (event.target.textContent === 'delete') {
    todoList.splice(currEl, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    event.target.closest('.boxes').remove();
    renderOnPage(todoList);
  } else if (event.target.textContent === 'configure') {
    todoList.find((el, idx) => {
      if (idx === currEl) {
        el.title = prompt('Enter new value');
        el.desc = prompt('Enter new value');
        localStorage.setItem('todoList', JSON.stringify(todoList));
        renderOnPage(todoList);
      }
    })
  }
});

btnSignOut.addEventListener('click', () => {
  localStorage.setItem("isAuth", "false");
  window.open("./register.html", "_self");
});