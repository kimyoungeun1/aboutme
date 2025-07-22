const $logo = document.querySelector('h1.logo');
const $mnus = document.querySelectorAll('header>.container>nav>.gnb>li>a');
const $articles = document.querySelectorAll('article');
const $top = document.querySelector('a.top');

//활성화표시에 사용할 변수
let nowIdx = 0;
let oldIdx = nowIdx;


const arrTopVal = [];//각 article의 top값을 저장하는 배열

//전자동으로 article의 top값을 가져와 arrTopVal 배열에 추가
$articles.forEach(($article,idx)=>{
	//어떤 요소의 top 값(body로부터 떨어진 거리)을 구하는 $DOM.offsetTop 속성
	arrTopVal[idx] = $article.offsetTop; 
});

console.log('arrTopVal =', arrTopVal);
//[0, 1000, 1845, 2645, 3245] + 마진탑66
//=> [66, 1066, 1911, 2711, 3311]

//반복되는 코드를 함수화
const pageAni = function(idx){

	//window.scrollTo(0, 500*idx);
	
	//스크롤바의 top값에 변화를 줘서 smooth하게 움직이게 설정
	window.scrollTo({
		left:0,
		top:arrTopVal[idx]-66,
		behavior:'smooth'
	});
};


//window 객체에 대한 scroll 이벤트 구문
window.addEventListener('scroll', function(){
	
	const scrollTop = Math.ceil(window.scrollY);//현재 스크롤바의 top 값
	console.log('scrollTop =', scrollTop);
	
	//for문을 이용하여 5개의 if 구문을 하나로 합침
	for(let i=0;i<$articles.length;i++){
		if(scrollTop>=arrTopVal[i]-66){		
			oldIdx = nowIdx;
			nowIdx = i;		
			
			//활성화 표시
			$mnus[oldIdx].parentElement.classList.remove('on');//on 제거
			$mnus[nowIdx].parentElement.classList.add('on');//on 추가
		} else if(scrollTop>=arrTopVal[0]-66){//비주얼영역
			$mnus[nowIdx].parentElement.classList.remove('on');//on 제거
		}	
	}

});


//메뉴에 대한 클릭이벤트
$mnus.forEach(($mnu, idx)=>{
	$mnu.addEventListener('click', (evt)=>{
		evt.preventDefault();			
		
		pageAni(idx);
	})
});


//화살표에 대한 클릭이벤트
$top.addEventListener('click', function(evt){
	evt.preventDefault();

	pageAni(0);
});

//로고에 대한 클릭이벤트
$logo.addEventListener('click', function(evt){
	evt.preventDefault();
		
	$top.click();//클릭이벤트만 강제발생 가능 
});