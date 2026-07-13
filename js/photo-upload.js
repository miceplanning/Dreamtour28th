/*
  =====================================================================
   참가자 사진 업로드 공용 모듈 (photo-upload.js)
  =====================================================================
  ✅ 일정 항목별로 참가자가 활동 사진을 올리고, 편집기에서 확인할 수 있게
     해주는 기능입니다. 저장소로 Firebase Storage를 사용합니다.
  ✅ js/firebase-config.js 에 실제 값이 채워져 있어야 동작합니다.
     아직 설정 전이면 이 파일의 함수들은 조용히 "사용 불가" 상태로 동작하고,
     화면에는 안내 문구만 표시됩니다 (에러로 사이트가 깨지지 않습니다).
  ✅ 이 파일은 schedule.html(참가자 - 업로드용)과 editor.html(운영팀 - 조회용)
     양쪽에서 공통으로 불러 씁니다.
  =====================================================================
*/

// firebase-config.js 를 아직 실제 값으로 채우지 않았는지 확인합니다.
function isUploadConfigured() {
  const cfg = window.FIREBASE_CONFIG;
  return !!(cfg && cfg.apiKey && cfg.apiKey.indexOf("YOUR_") !== 0 && typeof firebase !== "undefined");
}

let _firebaseApp = null;
function getStorageRef() {
  if (!isUploadConfigured()) return null;
  if (!_firebaseApp) {
    _firebaseApp = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(window.FIREBASE_CONFIG);
  }
  return firebase.storage(_firebaseApp).ref();
}

// 일정 항목마다 별도 폴더에 저장합니다: uploads/{행사날짜}/schedule-{일정id}/
function scheduleFolderPath(eventDate, scheduleId) {
  return "uploads/" + (eventDate || "unknown-date") + "/schedule-" + scheduleId;
}

function sanitizeUploadFileName(name) {
  return String(name).replace(/\s+/g, "-");
}

/**
 * 참가자가 고른 사진 파일을 해당 일정의 폴더에 업로드합니다.
 * @returns {Promise<void>}
 */
function uploadSchedulePhoto(eventDate, scheduleId, file, uploaderName, onProgress) {
  const root = getStorageRef();
  if (!root) return Promise.reject(new Error("업로드 기능이 아직 설정되지 않았습니다."));

  const namePart = uploaderName ? sanitizeUploadFileName(uploaderName) + "_" : "";
  const fileName = Date.now() + "_" + namePart + sanitizeUploadFileName(file.name);
  const fileRef = root.child(scheduleFolderPath(eventDate, scheduleId) + "/" + fileName);
  const task = fileRef.put(file);

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      reject,
      resolve
    );
  });
}

/**
 * 해당 일정 폴더에 업로드된 사진들의 다운로드 링크 목록을 가져옵니다.
 * @returns {Promise<Array<{url: string, name: string}>>}
 */
async function listSchedulePhotos(eventDate, scheduleId) {
  const root = getStorageRef();
  if (!root) return [];
  const folderRef = root.child(scheduleFolderPath(eventDate, scheduleId));
  const result = await folderRef.listAll();
  const items = await Promise.all(
    result.items.map(async (itemRef) => ({
      url: await itemRef.getDownloadURL(),
      name: itemRef.name
    }))
  );
  // 최신 업로드가 먼저 보이도록 (파일명 앞부분이 업로드 시각이라 이름 역순 정렬)
  return items.sort((a, b) => (a.name < b.name ? 1 : -1));
}
