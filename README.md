# 무인의류매장 플랫폼 운영 위한, AI 기반 매장 안내 점원 로봇 개발

<br>


## 🚀Skills

![vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![mysql](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) ![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white) ![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)


<br>

## 실행 명령어

frontend -> backend 순서로 실행

frontend 폴더에서 명령어

```
npm run serve

npm run build
```

backend 폴더에서 명령어

```
npm start
```

* 페이지 수정사항이 있으면 frontend 폴더에서 명령어 실행을 하여 최신화를 하고 backend 폴더에서 서버 실행을 해야 수정사항이 적용이 된다.

<br> 

## 페이지 설명

### 상품 페이지(Men, Women)
  - 상품 이미지 클릭 시 상품 상세정보, 관심상품 등록, 장바구니 담기 기능

<img width="1358" alt="Untitled" src="https://github.com/user-attachments/assets/5c7c437a-0c05-4ef5-9d65-c69fea5890c0">

### 관심상품 페이지
  - 관심상품 페이지에서도 장바구니 담기 기능 가능
  - 
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/eb0b7d4e-c3db-4de5-9a72-532810a6405c/Untitled.png)

### 장바구니 페이지
  - 장바구니에 담긴 상품들을 수량 체크 후 결제
  - 결제하기 버튼 클릭 시 사용자 이름 입력란이 나오고 입력한 이름과 결제금액 정보가 결제페이지로 이동
  - 설문조사를 통해 사용자들의 만족도 데이터 수집
  - 
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/6df98240-fcbc-4c8f-9fcc-c1e768754ab7/Untitled.png)
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/f3bdc2e8-548a-4f77-a6b6-b664f9ee3946/Untitled.png)
![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/72431279-3291-4e68-b8bf-0cad73558759/image.png)

### 결제 페이지
  - 결제하기 버튼 클릭시 웹결제창이 뜨고 결제 가능
  - 삭제하기 버튼 클릭시 사용자 이름과 결제정보 삭제

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/3d345383-eadf-4475-9149-de4142a0eeea/Untitled.png)
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/5d3d268e-b9e1-4539-807e-708444b9e241/Untitled.png)
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/0373acf9-bca6-4b23-8d4f-974fb1ec888e/Untitled.png)

### 데이터가 저장되는 DB
  - 사용자 이름, 결제금액, 만족도 설문조사 데이터 저장

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/3c51bc57-21b9-42ec-af9a-5d1eaf3eee88/4dfd5feb-8e87-4455-bf04-3a370ba5f2b0/Untitled.png)
