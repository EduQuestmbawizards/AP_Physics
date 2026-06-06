// =============================================
// AP Physics 2 – script.js
// =============================================

let student    = {};
let answers    = {};
let current    = 0;
let timerInt;
let secsLeft   = 80 * 60;
const LETTERS  = ['A','B','C','D'];
const $        = id => document.getElementById(id);
const q        = () => QUESTIONS[current];

// ── Page switch ──────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $(id).classList.add('active');
}

// ── Registration ──────────────────────────────
function startTest() {
  const name  = $('regName').value.trim();
  const email = $('regEmail').value.trim();
  const phone = $('regPhone').value.trim();
  if (!name || !email || !phone) { alert('Please fill in all fields.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email.'); return; }
  student = { name, email, phone, startTime: new Date().toISOString() };
  sessionStorage.setItem('student', JSON.stringify(student));
  showPage('pageTest');
  buildPalette();
  renderQ();
  startTimer();
  window.addEventListener('beforeunload', e => { e.preventDefault(); e.returnValue = ''; });
}

// ── Timer ─────────────────────────────────────
function startTimer() {
  const box = $('timerBox');
  box.style.display = 'flex';
  timerInt = setInterval(() => {
    secsLeft--;
    const m = String(Math.floor(secsLeft / 60)).padStart(2,'0');
    const s = String(secsLeft % 60).padStart(2,'0');
    $('timerDisplay').textContent = `${m}:${s}`;
    if (secsLeft <= 300) box.classList.add('warn');
    if (secsLeft <= 0)   { clearInterval(timerInt); submitTest(); }
  }, 1000);
}

// ── Palette ───────────────────────────────────
function buildPalette() {
  const g = $('palette');
  g.innerHTML = '';
  QUESTIONS.forEach((qObj, i) => {
    const b = document.createElement('button');
    b.className = 'pb';
    b.textContent = qObj.id;
    b.id = `pb-${i}`;
    b.onclick = () => jumpTo(i);
    g.appendChild(b);
  });
}

function syncPalette() {
  QUESTIONS.forEach((qObj, i) => {
    const b = $(`pb-${i}`);
    b.className = 'pb' +
      (answers[qObj.id] !== undefined ? ' done' : '') +
      (i === current ? ' cur' : '');
  });
  const done = Object.keys(answers).length;
  $('progFill').style.width = `${(done / QUESTIONS.length) * 100}%`;
  $('progLbl').textContent  = `${done} / ${QUESTIONS.length}`;
}

// ── Render question ───────────────────────────
function renderQ() {
  const qObj = q();
  $('qNum').textContent   = `Q ${qObj.id} / ${QUESTIONS.length}`;
  $('qTopic').textContent = TOPIC_MAP[qObj.topic]?.name || '';
  $('qText').textContent  = qObj.text;

  // Image
  const imgWrap = $('qImage');
  const imgEl   = $('qImg');
  if (qObj.image) {
    imgEl.src = qObj.image;
    imgWrap.style.display = 'block';
  } else {
    imgWrap.style.display = 'none';
  }

  // Options
  const opts = $('qOpts');
  opts.innerHTML = '';
  qObj.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'opt' + (answers[qObj.id] === i ? ' selected' : '');
    div.innerHTML = `<div class="opt-letter">${LETTERS[i]}</div><div class="opt-text">${opt}</div>`;
    div.onclick = () => selectAns(i);
    opts.appendChild(div);
  });

  $('btnPrev').style.display   = current === 0 ? 'none' : 'inline-flex';
  $('btnNext').style.display   = current < QUESTIONS.length - 1 ? 'inline-flex' : 'none';
  $('btnSubmit').style.display = current === QUESTIONS.length - 1 ? 'inline-flex' : 'none';
  syncPalette();

  // Smooth scroll to top of card on mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectAns(idx) {
  answers[q().id] = idx;
  sessionStorage.setItem('answers', JSON.stringify(answers));
  renderQ();
}

function navigate(dir) {
  current = Math.max(0, Math.min(QUESTIONS.length - 1, current + dir));
  renderQ();
}

function jumpTo(i) { current = i; renderQ(); }

// ── Submit ────────────────────────────────────
function confirmSubmit() {
  const left = QUESTIONS.length - Object.keys(answers).length;
  $('modalTitle').textContent = 'Submit Test?';
  $('modalMsg').textContent   = left > 0
    ? `${left} question(s) unanswered. Sure you want to submit?`
    : 'All questions answered. Ready to submit?';
  $('modal').classList.add('open');
}
function closeModal() { $('modal').classList.remove('open'); }

function submitTest() {
  clearInterval(timerInt);
  closeModal();
  window.removeEventListener('beforeunload', () => {});

  let correct = 0, wrong = 0, unattempted = 0;
  const details = QUESTIONS.map(qObj => {
    const chosen = answers[qObj.id];
    let status;
    if (chosen === undefined) { unattempted++; status = 'unattempted'; }
    else if (chosen === qObj.answer) { correct++; status = 'correct'; }
    else { wrong++; status = 'wrong'; }
    return { ...qObj, chosen, status };
  });

  const pct   = Math.round((correct / QUESTIONS.length) * 100);
  const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';

  const result = {
    student, correct, wrong, unattempted,
    total: QUESTIONS.length, pct, grade, details,
    submitTime: new Date().toISOString()
  };
  result.topicAnalysis = buildTopics(details);

  sessionStorage.setItem('result', JSON.stringify(result));
  showPage('pageResult');
  renderResults(result);

  if (typeof saveToSheets === 'function')  saveToSheets(result);
  if (typeof sendEmails   === 'function')  sendEmails(result);
}

function buildTopics(details) {
  return Object.entries(TOPIC_MAP).map(([id, { name, questions: qNums }]) => {
    const rows    = details.filter(d => qNums.includes(d.id));
    const attempted = rows.filter(d => d.status !== 'unattempted').length;
    const correct   = rows.filter(d => d.status === 'correct').length;
    const wrong     = rows.filter(d => d.status === 'wrong').length;
    const acc       = attempted ? Math.round((correct / attempted) * 100) : 0;
    return { id, name, total: rows.length, attempted, correct, wrong, acc };
  });
}

// ── Results ───────────────────────────────────
function renderResults(result) {
  const { student, correct, wrong, unattempted, total, pct, grade, topicAnalysis, details } = result;
  const wrap = $('resWrap');
  const gradeColor = pct >= 70 ? '#059669' : pct >= 50 ? '#d97706' : '#dc2626';

  wrap.innerHTML = `
    <div class="res-hero">
      <div class="grade" style="color:${gradeColor}">${grade}</div>
      <div class="score-line">${correct} / ${total} &nbsp;·&nbsp; ${pct}%</div>
      <div class="score-sub">${student.name} &nbsp;·&nbsp; ${new Date(result.submitTime).toLocaleString()}</div>
    </div>

    <div class="stats-row">
      <div class="stat-card c"><div class="num">${correct}</div><div class="lbl">Correct</div></div>
      <div class="stat-card w"><div class="num">${wrong}</div><div class="lbl">Wrong</div></div>
      <div class="stat-card s"><div class="num">${unattempted}</div><div class="lbl">Skipped</div></div>
      <div class="stat-card"><div class="num">${pct}%</div><div class="lbl">Score</div></div>
    </div>

    <div class="charts-row">
      <div class="chart-card"><h3>Score Breakdown</h3><canvas id="pieChart"></canvas></div>
      <div class="chart-card"><h3>Topic Accuracy</h3><canvas id="barChart"></canvas></div>
    </div>

    <div class="topic-tbl">
      <h3>Topic-wise Performance</h3>
      <table>
        <thead><tr><th>Topic</th><th>Qs</th><th>✓</th><th>✗</th><th>Accuracy</th></tr></thead>
        <tbody>
          ${topicAnalysis.map(t => {
            const color = t.acc>=70?'#059669':t.acc>=40?'#d97706':'#dc2626';
            return `<tr>
              <td><strong>${t.name}</strong></td>
              <td>${t.total}</td>
              <td style="color:var(--green);font-weight:600">${t.correct}</td>
              <td style="color:var(--red);font-weight:600">${t.wrong}</td>
              <td><div style="display:flex;align-items:center;gap:8px">
                <div class="bar-wrap" style="flex:1"><div class="bar-fill" style="width:${t.acc}%;background:${color}"></div></div>
                <span style="font-family:'IBM Plex Mono',monospace;font-size:0.82rem;min-width:38px;text-align:right;color:${color};font-weight:600">${t.acc}%</span>
              </div></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    ${wrong > 0 ? `
    <div class="inc-review">
      <h3>⚠️ Incorrect Answers Review (${wrong})</h3>
      <div>
        ${details.filter(d => d.status === 'wrong').map(qObj => `
          <div class="inc-q">
            <h4>Q${qObj.id}: ${qObj.text}</h4>
            ${qObj.image ? `<div style="margin-bottom:10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:6px;text-align:center">
              <img src="${qObj.image}" style="max-width:100%;max-height:180px;object-fit:contain;border-radius:4px" alt="diagram">
            </div>` : ''}
            <div class="inc-row wrong"><span class="label">❌ Your answer:</span><span>(${LETTERS[qObj.chosen]}) ${qObj.options[qObj.chosen]}</span></div>
            <div class="inc-row right"><span class="label">✅ Correct:</span><span>(${LETTERS[qObj.answer]}) ${qObj.options[qObj.answer]}</span></div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <div class="res-actions">
      <button class="btn btn-primary" onclick="downloadPDF()">⬇ Download PDF Report</button>
      <button class="btn btn-outline" onclick="location.reload()">🔄 Retake Test</button>
    </div>`;

  // Charts
  new Chart($('pieChart'), {
    type: 'doughnut',
    data: {
      labels: ['Correct','Wrong','Skipped'],
      datasets: [{ data: [correct, wrong, unattempted],
        backgroundColor: ['#059669','#dc2626','#d97706'],
        borderWidth: 0, hoverOffset: 4 }]
    },
    options: { plugins: { legend: { position:'bottom', labels:{ font:{ family:'IBM Plex Sans' } } } }, cutout:'68%' }
  });

  new Chart($('barChart'), {
    type: 'bar',
    data: {
      labels: topicAnalysis.map(t => t.name.split(' ').slice(0,3).join(' ')),
      datasets: [{ label:'Accuracy %', data: topicAnalysis.map(t => t.acc),
        backgroundColor: topicAnalysis.map(t => t.acc>=70?'rgba(5,150,105,.2)':t.acc>=40?'rgba(217,119,6,.2)':'rgba(220,38,38,.2)'),
        borderColor:     topicAnalysis.map(t => t.acc>=70?'#059669':t.acc>=40?'#d97706':'#dc2626'),
        borderWidth:2, borderRadius:6 }]
    },
    options: { indexAxis:'y', plugins:{ legend:{display:false} },
      scales:{ x:{ max:100, ticks:{ callback: v=>v+'%', font:{family:'IBM Plex Mono'} } } } }
  });
}

function downloadPDF() {
  const result = JSON.parse(sessionStorage.getItem('result'));
  if (result && typeof generatePDFReport === 'function') generatePDFReport(result, true);
}
