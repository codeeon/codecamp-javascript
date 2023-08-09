const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list'); // DOM element.

const savedTodoList = JSON.parse(localStorage.getItem('saved-items')); // 로컬 스토리지 saved-items에 담긴 데이터를 가져 오는 것. JSON.parse()는 문자열을 객체 또는 배열로 변환해준다.
const savedWeatherData = JSON.parse(localStorage.getItem('saved-weather'));

const createTodo = (storageData) => {
  //console.log(todoInput);
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement('li');
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');

  newBtn.addEventListener('click', () => {
    newLi.classList.toggle('complete');
    saveItemsFn(); // 로컬스토리지에 저장하는 함수.
  }); // addEventListener('attribute__event key?', 익명 함수_실행할 것);
  // classList.toggle('클래스이름');은 클래스 이름을 토글 괄호 안의 문자열로 지정해 주는 것 or 이미 해당 클래스 있을 시 삭제.(해당 클래스 추가/삭제 -> 토글이기 때문)

  newLi.addEventListener('dblclick', () => {
    // dblclick === 더블클릭
    newLi.remove(); // 해당 li 삭제. 함수 내부나, 이벤트리스너나 createElement('li')가 들어가는데 단순히 해당 내용을 삭제할 수 있다? 왜? 이벤트리스너 때문?.?
    saveItemsFn();
  });

  if (storageData?.complete) {
    // ?는 옵셔널체이닝, ?앞의 값이 정상적인 값(undefined, null 등은 X)으로 존재할 때에 그 다음을(.complete) 실행하는 것. === if(storageData && storageData.complete) - Q. true or false를 확인하는 것인가?
    newLi.classList.add('complete');
  } // 취소선이 새로고침해도 유지되게끔, 로컬스토리지에 저장하는 용도

  newSpan.textContent = todoContents;
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
  if (window.event.keyCode === 13 && todoInput.value.trim() !== '') {
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
  saveItemsFn();
};

const saveItemsFn = () => {
  const saveItems = [];
  // console.log(todoList.children[0].querySelector('span').textContent); // todoList라는 DOM의 children[0]의 span태그의 text를 선택.하여 로그 확인
  for (let i = 0; i < todoList.children.length; i++) {
    //const todo = todoList.children[i].querySelector('span').textContent; // 아래에 객체로 포함시킴.
    const todoObj = {
      contents: todoList.children[i].querySelector('span').textContent,
      complete: todoList.children[i].classList.contains('complete'), // contains('문자열_여기선 클래스 이름')불리언으로 리턴해줌. false or true
    };
    saveItems.push(todoObj);
  }

  saveItems.length === 0 ? localStorage.removeItem('saved-items') : localStorage.setItem('saved-items', JSON.stringify(saveItems));

  // saveItems.length === 0 ? localStorage.removeItem('saved-items') : localStorage.setItem('saved-items', JSON.stringify(saveItems)); // 삼항연산자. saveItems의 길이가 0인 게 true면, 로컬스토리지의 saved-items를 지우고, 아니면, saved-items에 saveItems를 문자열로 로컬스토리지에 저장(세팅)한다.
  // ===
  // if (saveItems.length === 0) {
  //   localStorage.removeItem('saved-items'); // 빈 배열일 때의 saveItems인 경우, 쓸 데 없는 메모리를 차지하여, 삭제함.
  // } else {
  //   localStorage.setItem('saved-items', JSON.stringify(saveItems)); // 해당 아이템을 로컬 스토리지에 저장한다. 문자열로 저장하네...?
  // }

  // console.log(typeof JSON.stringify(saveItems)); 확인하고 싶은 데이터 앞에 typeof와 공백을 넣으면, 해당 데이터의 타입을 알 수 있음. JSON.stringify()는 ()안의 배열 또는 객체 데이터를 바로 문자열로 만들어 줄 수 있음.
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherDateActive = ({ location, weather }) => {
  const weatherMainList = ['Clear', 'Clouds', 'Drizzle', 'Rain', 'Snow', 'Thunderstorm'];
  weather = weatherMainList.includes(weather) ? weather : 'Fog'; // weather에 weatherMainList의 배열에 포함되면(includes(weather에 포함된)) weather 그대로 할당, 아니면 'Fog'로 할당.
  const locationNameTag = document.querySelector('#location-name-tag');
  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url('../images/${weather}.jpeg')`;

  if (!savedWeatherData || savedWeatherData.location !== location || savedWeatherData.weather !== weather) {
    localStorage.setItem('saved-weather', JSON.stringify({ location, weather }));
    console.log('조건식 성립 - 데이터 저장 필요'); // 데이터 (불러와서)로컬 저장 필요
  }
  console.log('조건식 성립 X - 저장된 데이터가 있으며, 동일'); // 저장된 데이터가 있으며, 현재와 동일
};

const weatherSearch = ({ latitude, longitude }) => {
  const openWeatherRes = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4d7f9a361d9d22f03cacea04546f0ca2`)
    .then((res) => {
      return res.json(); // JSON.parse()를 사용하지 않는 이유는, header가 존재하기 때문. JSON.parse()는 바디만 존재할 때 사용 가능.
    })
    .then((json) => {
      console.log(json.name, json.weather[0].main); // description -> main
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDateActive(weatherData);
    })
    .catch((err) => {
      console.log(err);
      // console.error(err);
    }); // catch는 then의 실행 중 오류가 났을 때, 정상적인 경우는 여기로 빠지지 않음. then과 catch는 항상 같이 붙여 씀.
  //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
};

// const accessToGeo = (position) => {
//   // doSomething(position.coords.latitude, position.coords.longitude);
//   const positionObj = {
//     latitude: position.coords.latitude, //위도
//     longitude: position.coords.longitude, //경도
//   };
//   weatherSearch(positionObj);
// }; // 구조분해할당 전 원본, 아래는 구조분해할당으로 간소화(리팩토링)

const accessToGeo = ({ coords }) => {
  // doSomething(position.coords.latitude, position.coords.longitude);
  const { latitude, longitude } = coords;
  const positionObj = {
    latitude, //위도
    longitude, //경도
  };
  weatherSearch(positionObj);
};

const askForLocation = () => {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {});
};

askForLocation();

if (savedWeatherData) {
  weatherDateActive(savedWeatherData);
}

// const promiseTest = () => {
//   return new Promise((resolver, reject) => {
//     setTimeout(() => {
//       resolver('success');
//       //reject('error'); // 거절 당했을 시
//     }, 2000);
//   });
// };
// promiseTest().then((res) => {
//   console.log(res);
// }); // promise 객체의 테스트.
