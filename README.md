git clone https://github.com/kwonsunbin/blockchain2021-1/

npm install 

node server.js

# 잔고 확인 
http://localhost:3000/balance/

{
    "success": true,
    "balance": 1.11,
    "walletAddress": "0x906876E2A593A41651cD3eB8380376Ce73F61d90",
    "contractAddress": "0x66f77D2ec409544E440806CC9C3CFfb14ebDc52b"
}

* 받는 Json에서 "balance"는 설문 참여자의 balance 입니다 
* 로그인 기능 구현할 순 없으니 유저는 한 명으로 고정
* walletAddress는 참여자의 지갑 주소
* contractAddress는 발행한 토큰의 스마트 컨트랙트 주소

# 송금
http://localhost:3000/transfer/ 

{
    "success": true,
    "balanceBefore": "2099999989",
    "balanceAfter": "2099999989",
    "myAddress": "0xcA8CF6b998d89bE0A0D09504C2f4Aaa4833F6ABe",
    "destAddress": "0x906876E2A593A41651cD3eB8380376Ce73F61d90",
    "transferAmount": 100,
    "contractAddress": "0x66f77D2ec409544E440806CC9C3CFfb14ebDc52b"
}
* balanceBefore과 After는 토큰을 대량으로 보유하고 있는 앱 주인의 송금 전과 송금 후 잔고
* transferAmount 는 100 이 토큰 1개임
* myAddress는 토큰을 대량으로 보유하고 있는 앱 주인의 지갑 주소
* destAddress는 설문 참여자의 지갑 주소
* contractAddress는 발행한 토큰의 스마트 컨트랙트 주소

# 토큰 정보
* 토큰 이름 : Poll
* 토큰 심볼 : POL
