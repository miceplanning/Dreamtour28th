/*
  =====================================================================
   [운영팀 전용] 참가자 사진 업로드 저장소(Firebase) 설정 파일
  =====================================================================
  ✅ 이 파일은 "매 행사마다" 바꾸는 파일이 아니라, 사진 업로드 기능을
     처음 켤 때 딱 한 번만 설정하는 파일입니다. (js/content.js 와는 다릅니다)
  ✅ 설정 방법은 README.md의 "📸 참가자 사진 업로드 기능 설정하기" 섹션을
     그대로 따라 하시면 됩니다.
  ✅ 아래 값을 채우기 전까지는 사진 업로드 기능이 자동으로 꺼진 상태로
     동작합니다 (사이트가 깨지지 않습니다).
  =====================================================================
*/

window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
