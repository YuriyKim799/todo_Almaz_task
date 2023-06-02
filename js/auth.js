const inpEmailEl = document.querySelector(".email");
const inpPassEl = document.querySelector(".password");
const submitBtnEl = document.querySelector(".submitBtn");
const errorEl = document.querySelector(".error");

window.addEventListener("load", () => {
  if (localStorage.getItem("isAuth") === "true") {
    window.open("./index.html", "_self");
  };
});
const users = JSON.parse(localStorage.getItem("users"));
console.log(users);

submitBtnEl.addEventListener('click', event => {
  event.preventDefault();
  if (!inpEmailEl.value || !inpPassEl.value) {
    errorEl.innerHTML = 'Все поля должны быть заполнены';
    return;
  };

  users.map(el => {
    if (el.login === inpEmailEl.value && el.password === inpPassEl.value) {
      errorEl.innerHTML = "";
      localStorage.setItem("isAuth", "true");
      window.open("./index.html", "_self");
    } else if (el.login !== inpEmailEl.value || el.password !== inpPassEl.value) {
      localStorage.setItem("isAuth", "false");
      errorEl.innerHTML = 'Вы ввели не правильные данные';
      return;
    }
  })

})