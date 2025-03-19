// Express 모듈을 불러옵니다
const express = require('express');

// Express 애플리케이션 생성
const app = express();

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, Nodejs~~');
});

// 서버가 3000번 포트에서 실행되도록 설정
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
