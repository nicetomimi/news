// const APIkey = "59d2f9679b42470fa08092471f450467" // API key 따로 설정
// let news = [] // 전역변수로 선언
// const getLatestNews = async ()=>{
//     const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${APIkey}`) // URL이라는게 이미 설정되어있어서 이거 활용(자동으로 객체로 분리)
//     const response = await fetch(url) // 데이터 불러오는 함수 fetch, 기다림이 필요하므로 await 사용, await는 async함수랑 세트로 사용
//     const data = await response.json() // json은 파일확장자, 얘도 기다림이 필요
//     news = data.articles // 재할당
//     console.log(data.articles)
// }
// getLatestNews()


//과제제출용-누나api
let news = [] 
const getLatestNews = async ()=>{
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=아이유&contry=kr&pageSize=10`) 
    const response = await fetch(url) 
    const data = await response.json() 
    news = data.articles
    console.log(data.articles)
}
getLatestNews()