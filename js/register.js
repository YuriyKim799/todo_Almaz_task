const inpEmailEl = document.querySelector(".email");
const inpPassEl = document.querySelector(".password");
const submitBtnEl = document.querySelector(".submitBtn");
const errorEl = document.querySelector(".error");


window.addEventListener("load", () => {
  if (localStorage.getItem("isAuth") === "true") {
    window.open("./index.html", "_self");
  };
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
});

const users = JSON.parse(localStorage.getItem("users"));

submitBtnEl.addEventListener('click', event => {
  let user = {};
  event.preventDefault();
  if (!inpEmailEl.value || !inpPassEl.value) {
    errorEl.innerHTML = 'Все поля должны быть заполнены';
    return;
  } else {
    errorEl.style.color = "green";
    errorEl.innerHTML = "Пользователь успешно зарегестрирован, ожидайте три секунды, вас переведет на страницу авторизации";
    setTimeout(() => {
      window.open("./auth.html", "_self");
    }, 3000)
    setNewUser();
  }

  function setNewUser() {
    user.login = inpEmailEl.value;
    user.password = inpPassEl.value;
    for (let user of users) {
      if (user.login === inpEmailEl.value) {
        errorEl.innerHTML = 'такой логин уже используется';
        return;
      } else {

      }
    }
    users.push(user);
    inpEmailEl.value = '';
    inpPassEl.value = '';
  }
  localStorage.setItem('users', JSON.stringify(users));
});
