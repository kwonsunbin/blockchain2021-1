git clone https://github.com/kwonsunbin/blockchain2021-1/

npm install 

node server.js

# 잔고 확인 
http://localhost:3000/balance/

{
    "success": true,
    "balance": "5",
    "walletAddress": "0xcA8CF6b998d89bE0A0D09504C2f4Aaa4833F6ABe",
    "contractAddress": "0xc26918b7b629d5544d19b2f17f9674c30a0e82c1"
}

* 받는 Json에서 "balance"는 설문 참여자의 balance 입니다 
* 로그인 기능 구현할 순 없으니 유저는 한 명으로 고정
* walletAddress는 참여자의 지갑 주소
* contractAddress는 발행한 토큰의 스마트 컨트랙트 주소

# 송금
http://localhost:3000/transfer/ 

{
    "success": true,
    "contractAddress": "0xc26918b7b629d5544d19b2f17f9674c30a0e82c1",
    "walletAddress": "0xcA8CF6b998d89bE0A0D09504C2f4Aaa4833F6ABe"
}

* walletAddress는 설문 참여자의 지갑 주소
* contractAddress는 발행한 토큰의 스마트 컨트랙트 주소

# 토큰 정보
* 토큰 이름 : Poll
* 토큰 심볼 : POL
