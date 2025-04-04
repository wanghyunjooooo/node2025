const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 2007;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    console.log('MySQL 연결 성공!');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 여행 목록 조회
app.get('/travel', async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM travellist');
        res.render('travel', { travelList: results });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});

// 특정 여행 상세 정보 조회
app.get('/travel/:id', async (req, res) => {
    const travelId = req.params.id;
    try {
        const [results] = await db.promise().query('SELECT * FROM travellist WHERE id = ?', [travelId]);
        if (results.length === 0) {
            return res.status(404).send('여행 정보를 찾을 수 없습니다.');
        }
        res.render('travelDetail', { travel: results[0] });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중`);
});
