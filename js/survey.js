/*
  =====================================================================
   설문조사 안내 페이지 렌더링 (survey.js)
  =====================================================================
  ✅ 설문 링크와 예상 소요시간은 js/content.js 의 survey 값을 수정하세요.
  =====================================================================
*/

document.addEventListener("DOMContentLoaded", function () {
  const c = window.CONTENT;
  const root = document.getElementById("survey-content");

  if (c.sectionsEnabled && c.sectionsEnabled.survey === false) {
    root.innerHTML = '<p style="color:var(--color-muted); padding:20px;">이번 회차는 설문조사가 준비되어 있지 않습니다.</p>';
    return;
  }

  if (!c.survey) {
    root.innerHTML = '<p style="color:var(--color-muted); padding:20px;">등록된 설문조사가 없습니다.</p>';
    return;
  }

  root.innerHTML =
    '<div class="card survey-box">' +
    '<div class="emoji">📝</div>' +
    "<h2>오늘 하루 어떠셨나요?</h2>" +
    "<p>소중한 의견을 남겨주시면 다음 " + escapeHtml(c.eventSubtitle || "행사") + " 준비에 큰 도움이 됩니다.</p>" +
    '<a class="btn btn-accent" href="' + escapeHtml(c.survey.url) + '" target="_blank" rel="noopener noreferrer">설문 참여하기</a>' +
    '<div class="survey-duration">⏱️ 예상 소요시간: ' + escapeHtml(c.survey.duration) + "</div>" +
    "</div>";
});
