const todoInput = document.querySelector('#todo-input');

const createTodo = () => {
  const todoList = document.querySelector('#todo-list');
  //console.log(todoInput);

  const newLi = document.createElement('li');
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');

  newBtn.addEventListener('click', () => {
    newLi.classList.toggle('complite');
  }); // addEventListener('attribute__event key?', 익명 함수_실행할 것);
  // classList.toggle('클래스이름');은 클래스 이름을 토글 괄호 안의 문자열로 지정해 주는 것 or 이미 해당 클래스 있을 시 삭제.(해당 클래스 추가/삭제 -> 토글이기 때문)

  newSpan.textContent = todoInput.value;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan); // <li><button></button><span>todoInput.value</span></li>
  todoList.appendChild(newLi);
  todoInput.value = '';
  //console.log(event); //window.event 에서 window 생략.
};

const keyCodeCheck = () => {
  //console.log(window.event.keyCode === 13); // keyCode: 13은 Enter, 엔터 누를 시만 true.
  if (window.event.keyCode === 13 && todoInput !== '') {
    // const todoList = document.querySelector('#todo-list');
    // //console.log(todoInput);

    // const newLi = document.createElement('li');
    // const newSpan = document.createElement('span');

    // newSpan.textContent = todoInput.value;
    // newLi.appendChild(newSpan); // <li><span>todoInput.value</span></li>
    // todoList.appendChild(newLi);
    // todoInput.value = ''; //이걸 createTodo()로 옮김
    createTodo();
  }
};
