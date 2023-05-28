<div align="center">
  <img width="800" alt="스크린샷 2023-05-28 오후 7 23 33" src="https://github.com/chichi-is-happy/motion/assets/107830853/553abd77-c158-44e5-8c93-052453c44f2f">
  </div>

- [Motion Web](https://motion-zeta.vercel.app/)
- TypeScript와 Redux-Toolkit을 사용, 드래그 앤 드롭 기능을 구현한 Motion 프로젝트

<br>
<br>

## Skills : 개발 환경 및 기술스택
- React
- TypeScript
- Redux-Toolkit
- TailwindCSS
- eslint

<br>
<br>

## Directory Structure : 디렉토리 구조
```
└─ src
  ├─ components : 컴포넌트 파일 
  ├─ hooks : 커스텀 훅 파일
  ├─ pages : 각 페이지 
  ├─ constants : 상수 모음 파일
  ├─ styles : CSS 파일 
  ├─ utils : 정규표현식, 공통함수
  ├─ store : redux 관리 파일
  └─types : 타입 지정 파일
  ```
  
<br>
<br>
  
  ## Key Features : 주요 기능 소개
  ### 게시글 등록
  
  <table cellspacing="0" cellpadding="0">
  <tr>
  <tr>
    <td>Image 등록</td>
    <td>Video 등록</td>
    <td>Note 등록</td>
    <td>Todo 등록</td>
  </tr>
  <tr>
    <td><img width="300" alt="이미지 업로드" src="https://github.com/chichi-is-happy/motion/assets/107830853/97715846-5085-43c9-bc24-cb000c347809"></td>
    <td><img width="300" alt="비디오 업로드" src="https://github.com/chichi-is-happy/motion/assets/107830853/73230100-7550-44d6-a057-3dc8f82f2000"></td>
    <td><img width="300" alt="노트 업로드" src="https://github.com/chichi-is-happy/motion/assets/107830853/bdcb0a54-b4a7-4431-bdf1-406f081ba18a"></td>
    <td><img width="300" alt="TODO 업로드" src="https://github.com/chichi-is-happy/motion/assets/107830853/e5ae3d4d-4e69-4fe8-a685-5b54ad5fb53d"></td>
  </tr>
</table>

* VIDEO 게시글 등록 시 모달 창에서 입력한 유튜브 영상 미리보기 가능
* TASK 게시글의 완료한 TODO는 취소선과 체크박스로 변경되어 구분할 수 있음
* 이미지 첨부 시 이미지 파일만 첨부할 수 있음
* 유튜브 링크 첨부 시 올바른 링크가 아닌 경우 경고 문구를 표시하고, 업로드 불가능 하도록 등록 버튼이 사라짐

<br>
<br>



### 게시글 삭제
|![image](https://github.com/chichi-is-happy/motion/assets/107830853/81d42a98-53c4-4b56-8499-84a147a9ac84)|
|---|
* 각 게시글의 오른쪽 상단 x 버튼을 클릭해 삭제할 수 있음  
  클릭 시 삭제 확인 모달 창에서 ‘확인’ 버튼을 누르면 삭제됨  
* 모달 창 바깥을 누르거나, ‘취소’ 버튼을 눌러서 모달 창을 닫을 수 있음
 
<br>
<br>

### 게시글 순서 이동
|![image](https://github.com/chichi-is-happy/motion/assets/107830853/a2401f7a-a7ae-4fa7-9b8a-3370d4af5bb1)|
|---|
* 게시글의 순서를 드래그 앤 드롭으로 변경할 수 있음

<br>
<br>

### URL 유효성 검사
|![image](https://github.com/chichi-is-happy/motion/assets/107830853/6e28d01e-d31d-4c4f-9f15-beb66767f7f7)|
|---|
* 이미지 첨부 시 이미지 파일만 첨부할 수 있음
* 유튜브 링크 첨부 시 올바른 링크가 아닌 경우 경고 문구를 표시하고, 업로드 불가능 하도록 등록 버튼이 사라짐

<br>
<br>

### VIDEO 미리보기
|![image](https://github.com/chichi-is-happy/motion/assets/107830853/c6518427-ceb0-452f-a607-393e8a7bbb27)|
|---|
* VIDEO 게시글 등록 시 모달 창에서 입력한 유튜브 영상 미리보기 가능
<br>
<br>


