const weather = document.querySelector(".js-weather");

const API_KEY = "23e001ab07326a3a7613d2b897bfba08";

const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
       console.log(json) 
       const temperature = json.main.temp;
       weather.innerText = `${temperature} ℃`;
    })
}

function saveCoords(coordObj){
    localStorage.setItem( COORDS,JSON.stringify(coordObj) );
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude,
        longitude
    /* latitude : latitude,
       longitude : longitude가 정석이지만
       key와 value가 같을 땐 하나만 써도 됨 */
    }
    saveCoords(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords == null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();

// 1. 자바스크립트를 실행할 최초의 함수를 만든다.

// 2. 좌표를 가져오는 loadCoords 함수를 만든다.
    // 2-1. 로컬 스토리지에 COORDS라는 인자(key)에 대한 값을 반환하는 변수 loadedCoords를 만든다.
    // 2-1. 만약 loadCoords가 값을 가지고 있지 않다면 askForCoords 함수 실행
    // 2-2. 그렇지 않으면 날씨 정보를 가져와라.

// 3. aksForCoord는 navigator 객체를 사용한다. 
    //3-1. navigator 객체는 바로 뒤의 정보를 반환해준다.
    //3-2. navigator.geolocation.getCurrentPosition();을 써줄건데 
        // Geolocation.getCurrentPosition() 메서드는 장치의 현재 위치를 가져온다.
        // 특히 getCurrentPosition()에는 2개의 인자를 받을 수 있는데, 
        // 현재 위치를 가져오기에 성공했을 때(handleGeoSuccess) / 실패했을 때(handleGeoError) 2가지이다.
    //3-3. handleGeoSuccess에는 매개변수 position을 주어 장치의 현재 위치를 콘솔창에 입력하게 하고
    //3-4. handleGeoErrord에는 콘솔 창에 "엑세스 할 수 없음"이라고 입력되게 설정한다.

// 지금 실행한 것의 단계를 보면
// init함수에서 loadCoords 함수 실행 -> loadCoords 함수는 '로컬스토리지에 COORDS key 값을 반환해라'라는 변수 loadedCoords가 있음
// -> loadedCoords가 값이 없다면 (실제로 키 값 설정 X), askForCoords 함수 실행하라 -> askForCoords는 성공, 실패 두 개를 인자로 받는데
// -> 성공 시에는 position 값을 반환하고, 실패 시에는 콘솔 창에 엑세스 할 수 없음을 입력하라

// 이제 장치의 위치를 localhost에 입력하여 기억시키면 됨

// 4. 브라우저를 열면 위치에 관한 팝업창이 생기는데, 이 때 거절을 누르면 콘솔창에 엑세스 할 수 없다고 입력되고
    // 수락을 누르면 콘솔 창에 Geo location position이라고 객체가 나온다.
    // 여기서 coords 클릭 -> 위도와 경도의 값을 받아와서 handleGeoSucces의 변수로 설정해준다.
        // 위도와 경도의 값을 받아오는 것은 position(매개변수)->coords->latitude(longitude)의 경로로 받아왔기 때문에 ->빼고 .만 입력하면 됨
    // 그 값을 const latitude(longitude)로 만들어서 다시 coordObj라는 객체로 만들어 줌
    // 이제 로컬스토리지에 저장하기 위해서 saveCoords 함수를 만들어 coordObj를 매개변수로 설정 후
        // = coorObj를 한 번만 불러내면 현 장치의 위도와 경도가 동시에 나타남
    // handleGeoSucces 함수에서 saveCoords 함수에 인자로 coordObj를 넣고 실행

// 5. saveCoords 함수에는 localstorage에 setItem(업데이트할 key 값,업데이트할 value 값)을 입력한다.
    // localstorage.setItem(COORDS(key), JSON.stringify(coordsObj)(value);
    // 로컬 스토리지 결과 = COORDS(key) : {latitude: 37.499699199999995, longitude: 127.11690240000001}(value);

// 6. 그리고 날씨 api 사이트에서 로그인하고 api key 받아서 const api(다른 서버로부터 데이터를 가져오는 방법)로 설정해놓기

// 사실 경도와 위도를 구한 이유는 여기 날씨 api에서 사용해야 하기 때문에 구한 거였음

// 이제 날씨를 얻기 위해 getWeather 함수 생성, 매개변수 lan, lng 설정
// handleGeoSucces에서 getWeather 함수실행, 인자로 latitude, longitude 받아옴
// getWeather에서 fetch 메서드를 이용해서 함수를 받아옴, fetch안에는 By geographic coordinates에 나온 
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} 를 사용

// 그리고 처음에 생성했던 loadCoords 함수의 if문에서 else 부분에 (원래 여기가 get weather 부분이니까)
// loadedCoords (COORDS의 값을 받아옴)를 JSON의 형태로 parse(따옴표 부분 말고 값만 추출함)함.

// 개발자 도구에서 network 부분에 weather?lat~~~~?lon이라고 써있는 파일이 있는데 클릭하면 정보가 잘 전달됨을 알 수 있음
// header로 가서 url 복사 -> 새탭에서 열면 데이터가 한눈에 보인다 -> units=metric을 url에 붙여넣기 해서 미터법으로 볼 것

// getWeather함수에서 fetch메서드 다음 .then메서드를 사용하는데 then은 모든 메모리가 다 전달 된 후에 함수를 불러올거임
// then에서 바로 콜백함수로 매개변수를 사용해서(a라고 했다가 response로 바꿔줌) 콘솔로그를 불러와서 
// 객체 안의 메모리를 보고 json()메서드 사용해서 json의 형태로 바꿔줌
    // 근데 <pending>이라는 데이터를 끌어오는데 시간이 걸리니까 기다리라는 내용 = 다시 then 사용한다.
    // 동시에 방금 썼던 then(function(response){retrun response.json()})으로 변경
// 콜백함수로 json 매개변수 사용

//이제 html과 연결시킨다.