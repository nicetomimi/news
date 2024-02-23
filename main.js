// const APIkey = "59d2f9679b42470fa08092471f450467" // API key 따로 설정
// let newsList = [] // 전역변수로 선언
// const getLatestNews = async () => {
//   const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${APIkey}`) // URL이라는게 이미 설정되어있어서 이거 활용(자동으로 객체로 분리)
//   const response = await fetch(url) // 데이터 불러오는 함수 fetch, 기다림이 필요하므로 await 사용, await는 async함수랑 세트로 사용
//   const data = await response.json() // json은 파일확장자, 얘도 기다림이 필요
//   newsList = data.articles // 재할당
//   render()
//   console.log(data.articles)
// }
// getLatestNews()



let url = new URL (`https://rad-mandazi-a1f507.netlify.app/top-headlines?category=business&page=1&pageSize=10`)

const getNews = async () => {
// 에러핸들링
try{
  const response = await fetch(url)
  const data = await response.json()
   if(response.status == 200){
     if(data.articles.length===0){
      throw new Error("No result for this search")
     }
    newsList = data.articles 
    render()
   }else{
    throw new Error(data.message)
   }
}
catch(error){
 errorRender(error.message)
 console.log("error", error.message)
}
}

//과제제출용-누나api
let newsList = [] 
const getLatestNews = ()=>{
    url = new URL(`https://rad-mandazi-a1f507.netlify.app/top-headlines?category=business&page=1&pageSize=10`) 
    getNews()
}
getLatestNews()



//보여주는 ui
const render = () => {

  const newsHTML = newsList.map(news => //2. 뭘 가져올건지! 위에 선언한 newsList 가져오기, map 함수 사용, html에 만들어 놓은 코드 가져오기
    `<div class="row news">
  <div class="col-lg-4">
    <img class="new-img-size"
      src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}"/>
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description == null || news.description == ""
      ? "내용없음"
      : news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description}</p> 
    <div class="source-text">${news.source.name || "no source"} ${moment(news.publishedAt).fromNow()}</div>
  </div>
</div>`)
    .join('') // 배열을 스트링타입으로 바꾸는 함수 (,콤마 표기 없애기)
  document.getElementById("news-board").innerHTML = newsHTML   //1. 어느 영역에 넣을건지! 영역 가져오기
}

const errorRender = (errorMessage)=>{
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>` //html이 아니니까 스트링으로 넣어줘야 한다
document.getElementById("news-board").innerHTML = errorHTML 
}


//카테고리별 검색
//1. 버튼들에 클릭이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 보여주기
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click", (event) => getNewByCategory(event)))
const menusMobile = document.querySelectorAll(".side-menu-list button")
menusMobile.forEach(menu => menu.addEventListener("click", (event) => getNewByCategory(event)))
const getNewByCategory = (event) => {
  const category = event.target.textContent.toLowerCase()
  url = new URL(`https://rad-mandazi-a1f507.netlify.app/top-headlines?category=${category}&page=1&pageSize=10`)
  getNews()
}


//모바일 햄버거 버튼
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


//검색창
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};


//키워드 검색
const searchNews = ()=> {
  const keyword = document.getElementById("search-input").value
  url = new URL(`https://rad-mandazi-a1f507.netlify.app/top-headlines?q=${keyword}&page=1&pageSize=10`)
  getNews()
}

