const $mnus = document.querySelectorAll('header>.container>nav>.gnb>li>a');
const $top = document.querySelector('a.top');

//활성화표시에 사용할 변수
let nowIdx = 0;
let oldIdx = nowIdx;


//각 article의 top값을 저장하는 배열
//어떤 요소의 top 값(body로부터 떨어진 거리)을 구하는 $DOM.offsetTop 속성
const arrTopVal = [];
arrTopVal[0] = document.querySelector('.cont1').offsetTop; //0;
arrTopVal[1] = document.querySelector('.cont2').offsetTop; //1000;
arrTopVal[2] = document.querySelector('.cont3').offsetTop; //1845;
arrTopVal[3] = document.querySelector('.cont4').offsetTop; //2645;
arrTopVal[4] = document.querySelector('.cont5').offsetTop; //3245;

//반복되는 코드를 함수화
const pageAni = function(){

	//활성화 표시
	$mnus[oldIdx].parentElement.classList.remove('on');//on 제거
	$mnus[nowIdx].parentElement.classList.add('on');//on 추가
	
	//window.scrollTo(0, 500*idx);
	
	//스크롤바의 top값에 변화를 줘서 smooth하게 움직이게 설정
	window.scrollTo({
		left:0,
		top:arrTopVal[nowIdx],
		behavior:'smooth'
	});
};


//메뉴에 대한 클릭이벤트
$mnus.forEach(($mnu, idx)=>{
	$mnu.addEventListener('click', (evt)=>{
		evt.preventDefault();
		
		oldIdx = nowIdx;
		nowIdx = idx;		
		
		pageAni();
	})
});


//화살표에 대한 클릭이벤트
$top.addEventListener('click', function(evt){
	evt.preventDefault();
		
	oldIdx = nowIdx;
	nowIdx = 0;		
	
	pageAni();
});