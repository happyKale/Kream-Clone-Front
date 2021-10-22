# ⚖️ [KREAM clone coding](http://kream-clone-coding.s3-website.ap-northeast-2.amazonaws.com/) 
항해 99 3기 클론코딩 - 프론트 원격 저장소

[백엔드 원격 저장소](https://github.com/Smallzoo-dev/KreamCloneBackend)

👤 프론트 : 김세연, 권영준, 심선아

👤 백 : 강준규, 구산하, 김태웅

## 🖥 사이트 뷰

이미지
## ⚒ 기술

- 프론트
    - React, Redux, Axios, Immer, S3
-  백엔드
    - Spring boot, Spring Security, My

## 클론 범위
- Header, Footer
- 로그인 : 계정찾기 제외
- 회원가입
- 메인 페이지 : 상품 리스트 축소, style picks 제외
- 상세 페이지 : 신발 사이즈 6개 한정
- 상세 페이지에서 거래 페이지 사이의 과정 생략
- 거래 페이지 : 약관 체크 생략
- 마이페이지 : 카테고리 생략

## 📔 라이브러리

- axios
    - 서버와의 연결
- lodash
    - input 이벤트 콜백 감소
- react-slick
    - 메인 슬라이더 뷰 구성
- react-redux
    - 전역 상태 관리 
- react-router
    - 페이지 이동 관리
- styled-components
    - 전체적인 사이트 스타일 작업 
- immer 
    - 불변성 유지


## 우리팀이 해결한 문제
- 사용자 인증 토큰 전달
    - header의 Authorization 에 넣어도 서버에서 받을 수가 없어서 백엔드가 설정한 key 값을 맞춰서 header에 넣는다.
