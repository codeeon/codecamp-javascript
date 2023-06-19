const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list'); // DOM element.

const createTodo = () => {
  //console.log(todoInput);

  const newLi = document.createElement('li');
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');

  newBtn.addEventListener('click', () => {
    newLi.classList.toggle('complite');
  }); // addEventListener('attribute__event key?', 익명 함수_실행할 것);
  // classList.toggle('클래스이름');은 클래스 이름을 토글 괄호 안의 문자열로 지정해 주는 것 or 이미 해당 클래스 있을 시 삭제.(해당 클래스 추가/삭제 -> 토글이기 때문)

  newLi.addEventListener('dblclick', () => {
    // dblclick === 더블클릭
    newLi.remove(); // 해당 li 삭제. 함수 내부나, 이벤트리스너나 createElement('li')가 들어가는데 단순히 해당 내용을 삭제할 수 있다? 왜? 이벤트리스너 때문?.?
  });

  newSpan.textContent = todoInput.value;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan); // <li><button></button><span>todoInput.value</span></li>
  todoList.appendChild(newLi);
  todoInput.value = '';
  //console.log(event); // window.event 에서 window 생략.
  //console.log(todoList.children[0].querySelector('span').textContent); // todoList라는 DOM의 children[0]의 span태그의 text를 선택.하여 로그 확인
  saveItemsFn();
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

const deleteAll = () => {
  const liList = document.querySelectorAll('li'); // 해당 노드 리스트가 배열 취급이 되어, 인덱스로 접근이 가능하다. liList[0]~[2]
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove(); // 반복문을 활용하여 모든 li 요소를 삭제.
  }
};

const saveItemsFn = () => {
  const saveItems = [];
  console.log(todoList.children[0].querySelector('span').textContent); // todoList라는 DOM의 children[0]의 span태그의 text를 선택.하여 로그 확인
  for (let i = 0; i < todoList.children.length; i++) {
    //const todo = todoList.children[i].querySelector('span').textContent; // 아래에 객체로 포함시킴.
    const todoObj = {
      contents: todoList.children[i].querySelector('span').textContent,
      complete: todoList.children[i].classList.contains('complete'), // contains('문자열_여기선 클래스 이름')불리언으로 리턴해줌. false or true
    };
    saveItems.push(todoObj);
  }
  console.log(saveItems);
};
