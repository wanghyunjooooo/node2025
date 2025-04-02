const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 2007;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mirim4',
    database: 'traveldb'
});

db.connect(err => {
    if(err){
        console.error('mysql 연결 실패 :',err);
        return;
    }
    console.log('musql에 연결 성공');
})

app.set('view engine', 'ejs');

//__dirname : 현재 파일이 속해 있는 디렉토리의 절대경로
//path.foin : 운영체제에 맞추어 경로지정자를 설정해준다
app.set('views', path.join(__dirname, 'views'));

const travelList = ['뉴욕', '파리', '우리집', '도쿄'];

app.get('/travel', (req, res) => {
    res.render('travel', { travelList });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중`);
});
