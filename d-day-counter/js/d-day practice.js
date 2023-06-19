const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');
const intervalIdArr = []; // 인터벌 아이디 값을 배열로 만들어주기 위해 생성.
const savedDate = localStorage.getItem('saved-date');

container.style.display = 'none';

messageContainer.style.color = 'tomato'; // JS에서 CSS 조작. HTML과 CSS의 텍스트를 건드는 것은 전부 문자열.
messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';

if (savedDate) {
  // if()괄호 안에 들어가는 값이 falsy(0, null, NaN etc.)가 아니면 truthy인데, true로 취급됨 -> 조건문 작동함.
  console.log(savedDate);
} else {
  console.log('data is null');
}

const dateFormMaker = () => {
  const inputYear = document.querySelector('#target-year-input').value;
  const inputMonth = document.querySelector('#target-month-input').value;
  const inputDate = document.querySelector('#target-date-input').value;

  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`; //템플릿 리터럴, 위 주석과 동일한 의미

  return dateFormat; // return은 함수 안의 변수(지역변수)를 밖으로 내어줄 뿐만 아니라 해당 함수를 종료시키는 기능도 있다. 아래 콘솔로그의 주석처리를 해제하더라도 진행되지 않을 것.
  // console.log(inputYear, inputMonth, inputDate);
};

const counterMaker = (data) => {
  if (data !== savedDate) {
    localStorage.setItem('saved-date', data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0); // setHours()를 통해서 0시 0분을 기준점으로 한다. (한국 시간이면 기본값이 09시 -> 동경 130도)
  const remaining = (targetDate - nowDate) / 1000;
  // 만약, remaining이 0이라면, 타이머가 종료되었습니다. 출력
  // 수도코드 = 위에 적은 '만약,' 주석처럼, 로직을 세분화해서 먼저 작성해보는 것.

  if (remaining <= 0) {
    // 만약, remaining이 0이라면, 또는 0이하라면, 타이머가 종료되었습니다. 출력
    console.log('타이머가 종료되었습니다.');
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
    messageContainer.style.display = 'flex';
    setClearInterval(); // 카운트 다운 타이머는 실행하지 않아도, 인터벌아이디 값은 실행되고 인터벌이 진행되기 때문에, 종료해주어야 함.
    return;
  } else if (isNaN(remaining)) {
    // NaN을 조건에 쓰려면 isNaN()을 사용해야 한다.
    // 만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    console.log('유효한 시간대가 아닙니다.');
    container.style.display = 'none';
    messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
    messageContainer.style.display = 'flex';
    setClearInterval(); // 카운트 다운 타이머는 실행하지 않아도, 인터벌아이디 값은 실행되고 인터벌이 진행되기 때문에, 종료해주어야 함.
    return; // 현 조건에 들어왔을 경우, 아래의 불필요한 연산을 실행하지 않고 함수를 종료시킨다.
  }

  // const remainingDate = Math.floor(remaining / 3600 / 24);
  // const remainingHour = Math.floor(remaining / 3600) % 24;
  // const remainingMin = Math.floor(remaining / 60) % 60;
  // const remainingSec = Math.floor(remaining) % 60;
  // remainingObj라는 객체는 위에 4개의 변수 선언을 동시에 진행하는 것과 비슷하다고 할 수 있다.
  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHour: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  }; // 값이 달라서 반복문 활용으로 리팩토링 하지는 못 했다.

  // const day = document.querySelector('#day');
  // const hour = document.getElementById('hour');
  // const min = document.getElementById('min');
  // const sec = document.querySelector('#sec');
  // documentObj의 객체 지정도 위와 같다.

  // const documentObj = {
  //   day: document.querySelector('#day'),
  //   hour: document.getElementById('hour'),
  //   min: document.getElementById('min'),
  //   sec: document.querySelector('#sec'),
  // }; // 아래의 for-of문이

  // 아래의 documentArr와 timeKeys를 포함해, for-of문으로
  const documentArr = ['day', 'hour', 'min', 'sec'];
  const timeKeys = Object.keys(remainingObj);

  const format = (time) => {
    if (time < 10) {
      return '0' + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    //console.log(tag);
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  } // for-of문, tag는 of Arr에서 배열(주로 배열)의 '태그(요소, 값)'를 가져온다. 배열의 길이만큼 반복한다.

  //const docKeys = Object.keys(documentObj); // 아래의 for-in문에서 documentObj[key]를 사용하였기에, 변수가 필요 없어짐. 리팩토링.

  // for (let i = 0; i < timeKeys.length; i++) { // 아래의 for-in문이 여기 for문을 대체함.
  //   //console.log(documentObj[docKeys[i]]);
  //   documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  // } // 위 변수와 이 for문이 아래의 4줄짜리 주석을 압축시켰다. 반복문, 객체와의 콜라보가 화려하다.
  // documentObj.day.textContent = remainingObj['remainingDate'];
  // documentObj.hour.textContent = remainingObj.remainingHour;
  // documentObj['min'].textContent = remainingObj['remainingMin'];
  // documentObj['sec'].textContent = remainingObj.remainingSec;

  // for (let key in documentObj) {
  //   //console.log(documentObj[key], key);
  //   documentObj[key].textContent = remainingObj[timeKeys[i]];
  //   i++;
  // } // for-in문, key는 in Obj에서 객체(주로 객체)의 '키'를 가져온다. 객체 프로퍼티(키:값)의 갯수만큼 반복한다. / 현재 for-of문의 사용으로 주석 처리 했다.
};

const starter = (targetDateInput) => {
  setClearInterval();
  //const targetDateInput = dateFormMaker(); // 변수 지정하지 않고 if문으로, starter 함수의 전달인자로, 활용.(변수로 사용 시, 함수 전달인자 x)
  if (!targetDateInput) {
    // !targetDateInput === !undefined === true
    targetDateInput = dateFormMaker();
  }
  localStorage.setItem('saved-date', targetDateInput); // 로컬 스토리지를 활용하는 법(저장-setItem), setItem(키, 값);이라는 메소드는, 키의 이름을 만들고, 값은 대상.
  //localStorage.getItem('saved-date'); // 로컬 스토리지에서 가져오는 법, getItem() 메소드는 저장해 둔 데이터를 가져와서 사용하는 것, 키만 입력해도 됨.
  container.style.display = 'flex';
  messageContainer.style.display = 'none';
  counterMaker(targetDateInput); // setInterval(,)의 딜레이가 최초 실행에도 있기 때문에, 즉시 실행을 위해서 함수를 한 번 넣어준다.
  const intervalId = setInterval(() => {
    counterMaker(targetDateInput);
  }, 1000); // setInterval은 각각 고유의 id값을 가진다. 1회 실행 시 1번, 2회 실행 시 1번, 2번...
  intervalIdArr.push(intervalId); // 인터벌 아이디 값을 인터벌아이디배열에 넣어줌.

  // for (let i = 0; i < 100; i++) {
  //   setTimeout(() => {
  //     counterMaker();
  //   }, 1000 * i); // setTimeout(() => {함수}, 숫자)는 함수의 실행을 숫자ms만큼 지연시켜주는 기능(메소드)이다.(딜레이) / setTimeout에 함수를 넣어줘야 하는데, 내부에 익명 화살표 함수 없이, 바로 함수 넣어도 사용 가능. but, 함수에 매개변수(전달인자)를 사용할 경우, 익명 화살표 함수로 작성해야 함.
  // } // 이렇게 설정한 함수는, 끊김이 생기고, 동작의 한계가 생기기 때문에 다른 방법을 이용하는 것이 좋다. -> setInterval(() => {함수}, 1000) == 1초마다 함수를 반복. / 내부에 익명 화살표 함수 없이, 바로 함수 넣어도 사용 가능. but, 함수에 매개변수(전달인자)를 사용할 경우, 익명 화살표 함수로 작성해야 함.
}; // counterMaker()를 포함시켜 버림. display의 none과 flex의 조절로 화면 출력/사라짐을 나타냄.

const setClearInterval = () => {
  localStorage.removeItem('saved-date');
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
    // 스타터를 여러 번 실행했을 경우에도 모두 삭제하기 위해 이렇게 만듦.
  }
};

const resetTimer = () => {
  container.style.display = 'none';
  messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
  messageContainer.style.display = 'flex';
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = 'none';
  messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
}
