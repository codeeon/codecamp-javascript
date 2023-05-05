const dateFormMaker = () => {
  const inputYear = document.querySelector('#target-year-input').value;
  const inputMonth = document.querySelector('#target-month-input').value;
  const inputDate = document.querySelector('#target-date-input').value;

  // const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`; //템플릿 리터럴, 위 주석과 동일한 의미

  return dateFormat; // return은 함수 안의 변수(지역변수)를 밖으로 내어줄 뿐만 아니라 해당 함수를 종료시키는 기능도 있다. 아래 콘솔로그의 주석처리를 해제하더라도 진행되지 않을 것.
  // console.log(inputYear, inputMonth, inputDate);
};

const counterMaker = () => {
  const targetDateInput = dateFormMaker();
  console.log(targetDateInput);
  const nowDate = new Date();
  const targetDate = new Date(targetDateInput).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  const remainingDate = Math.floor(remaining / 3600 / 24);
  const remainingHour = Math.floor(remaining / 3600) % 24;
  const remainingMin = Math.floor(remaining / 60) % 60;
  const remainingSec = Math.floor(remaining) % 60;

  console.log(remainingDate, remainingHour, remainingMin, remainingSec);
};
