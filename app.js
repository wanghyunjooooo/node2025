// HTTP 모듈을 불러옵니다
const http = require('http');

// 서버를 생성하고 요청을 처리합니다
const server = http.createServer((req, res) => {
  // 응답 헤더 설정
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // 응답 내용 작성
  res.end('Hello, World!\n');
});

// 서버가 3000번 포트에서 실행되도록 설정
server.listen(3000, () => { 
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
