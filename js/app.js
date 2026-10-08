// ===== Helpers =====
const app = document.getElementById("app");
const KEY = "ceReviewerProgress";

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
}
function saveProgress(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {}
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// Tag each question with its subject so mock exams can mix them
function questionsFor(subject) {
  return subject.questions.map(q => ({ ...q, subjectId: subject.id, subjectName: subject.name }));
}

// ===== State for the current quiz =====
let quiz = null; // { title, list, index, score, answers, locked }

// ===== Screens =====
function showHome() {
  const p = loadProgress();
  let html = "<h2>Choose a subject</h2>";
  SUBJECTS.forEach(s => {
    const st = p[s.id] || { attempted: 0, correct: 0, best: 0 };
    const pct = st.attempted ? Math.round((st.correct / st.attempted) * 100) : 0;
    html += `<button class="card subject" data-subject="${s.id}">
      <b>${s.name}</b>
      <small>${s.questions.length} questions · Best score: ${st.best}%</small>
      <div class="bar"><i style="width:${pct}%"></i></div>
    </button>`;
  });
  html += `<button class="btn" id="mockBtn">Start mock exam (all subjects, 20 questions)</button>`;
  app.innerHTML = html;
  document.querySelectorAll("[data-subject]").forEach(b =>
    b.addEventListener("click", () => startQuiz(b.dataset.subject)));
  document.getElementById("mockBtn").addEventListener("click", startMock);
}

function startQuiz(id) {
  const s = SUBJECTS.find(x => x.id === id);
  quiz = { title: s.name, list: shuffle(questionsFor(s)), index: 0, score: 0, answers: [], locked: false, subjectId: id };
  showQuestion();
}
function startMock() {
  const all = SUBJECTS.flatMap(questionsFor);
  quiz = { title: "Mock Exam", list: shuffle(all).slice(0, 20), index: 0, score: 0, answers: [], locked: false, subjectId: null };
  showQuestion();
}

function showQuestion() {
  const q = quiz.list[quiz.index];
  let html = `<div class="meta"><span>${quiz.title}</span><span>Question ${quiz.index + 1} of ${quiz.list.length}</span></div>
    <div class="bar"><i style="width:${(quiz.index / quiz.list.length) * 100}%"></i></div>
    <div class="card"><p class="q">${q.q}</p>`;
  q.choices.forEach((c, i) => {
    html += `<button class="choice" data-i="${i}">${String.fromCharCode(65 + i)}. ${c}</button>`;
  });
  html += `<div id="feedback"></div></div>`;
  app.innerHTML = html;
  quiz.locked = false;
  document.querySelectorAll(".choice").forEach(b =>
    b.addEventListener("click", () => checkAnswer(Number(b.dataset.i))));
  window.scrollTo(0, 0);
}

function checkAnswer(pick) {
  if (quiz.locked) return;
  quiz.locked = true;
  const q = quiz.list[quiz.index];
  const right = pick === q.answer;
  if (right) quiz.score++;
  quiz.answers.push({ q, pick, right });

  document.querySelectorAll(".choice").forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add("correct");
    else if (i === pick) b.classList.add("wrong");
  });
  const last = quiz.index === quiz.list.length - 1;
  document.getElementById("feedback").innerHTML = `
    <div class="explain"><b>${right ? "Correct!" : "Incorrect."}</b> ${q.explanation}</div>
    <button class="btn" id="nextBtn">${last ? "See results" : "Next question"}</button>`;
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (last) showResults(); else { quiz.index++; showQuestion(); }
  });
}

function showResults() {
  const total = quiz.list.length;
  const pct = Math.round((quiz.score / total) * 100);
  recordResults(pct);
  let html = `<div class="card"><div class="meta"><span>${quiz.title}</span><span>Result</span></div>
    <p class="score">${pct}%</p>
    <p>You got <b>${quiz.score}</b> of <b>${total}</b> correct. ${pct >= 70 ? "Passing level. Keep it up." : "Below 70%. Review the explanations below and try again."}</p></div>
    <h2>Review</h2>`;
  quiz.answers.forEach((a, n) => {
    html += `<div class="card"><p><span class="${a.right ? "ok" : "no"}">${a.right ? "Correct" : "Wrong"}</span> · ${n + 1}. ${a.q.q}</p>
      <p>Your answer: ${a.q.choices[a.pick]}<br>Correct answer: <b>${a.q.choices[a.q.answer]}</b></p>
      <div class="explain">${a.q.explanation}</div></div>`;
  });
  html += `<button class="btn" id="retry">Try again</button><button class="btn alt" id="home">Back to subjects</button>`;
  app.innerHTML = html;
  document.getElementById("retry").addEventListener("click", () => quiz.subjectId ? startQuiz(quiz.subjectId) : startMock());
  document.getElementById("home").addEventListener("click", showHome);
  window.scrollTo(0, 0);
}

// Save attempts, correct counts, and best score per subject
function recordResults(pct) {
  const p = loadProgress();
  quiz.answers.forEach(a => {
    const id = a.q.subjectId;
    p[id] = p[id] || { attempted: 0, correct: 0, best: 0 };
    p[id].attempted++;
    if (a.right) p[id].correct++;
  });
  if (quiz.subjectId) p[quiz.subjectId].best = Math.max(p[quiz.subjectId].best, pct);
  p._mock = p._mock || { taken: 0, best: 0 };
  if (!quiz.subjectId) { p._mock.taken++; p._mock.best = Math.max(p._mock.best, pct); }
  saveProgress(p);
}

function showProgress() {
  const p = loadProgress();
  let html = "<h2>Your progress</h2><div class='card'>";
  SUBJECTS.forEach(s => {
    const st = p[s.id] || { attempted: 0, correct: 0, best: 0 };
    const pct = st.attempted ? Math.round((st.correct / st.attempted) * 100) : 0;
    html += `<div class="row"><span>${s.name}</span><span>${st.correct}/${st.attempted} correct (${pct}%)</span></div>
      <div class="bar"><i style="width:${pct}%"></i></div>`;
  });
  const m = p._mock || { taken: 0, best: 0 };
  html += `</div><div class="card"><div class="row"><span>Mock exams taken</span><b>${m.taken}</b></div>
    <div class="row"><span>Best mock score</span><b>${m.best}%</b></div></div>
    <button class="btn alt" id="reset">Reset all progress</button>`;
  app.innerHTML = html;
  document.getElementById("reset").addEventListener("click", () => {
    if (confirm("Delete all saved progress?")) { saveProgress({}); showProgress(); }
  });
}

document.getElementById("navHome").addEventListener("click", showHome);
document.getElementById("navProgress").addEventListener("click", showProgress);
showHome();
