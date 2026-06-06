// =============================================
// email.js – EmailJS + Google Sheets integration
// AP Physics 2 Diagnostic
// =============================================

const CONFIG = {
  emailjs: {
    serviceId:  'YOUR_EMAILJS_SERVICE_ID',
    studentTpl: 'YOUR_STUDENT_TEMPLATE_ID',
    adminTpl:   'YOUR_ADMIN_TEMPLATE_ID',
    publicKey:  'YOUR_EMAILJS_PUBLIC_KEY',
  },
  adminEmail: 'your-email@example.com',
  sheetsUrl:  'YOUR_GOOGLE_APPS_SCRIPT_URL',
};

function loadEmailJS(cb) {
  if (window.emailjs) { cb(); return; }
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = () => { emailjs.init(CONFIG.emailjs.publicKey); cb(); };
  document.head.appendChild(s);
}

function sendEmails(result) {
  if (CONFIG.emailjs.serviceId === 'YOUR_EMAILJS_SERVICE_ID') {
    console.warn('EmailJS not configured – skipping.'); return;
  }
  loadEmailJS(() => {
    const base = {
      student_name:  result.student.name,
      student_email: result.student.email,
      student_phone: result.student.phone,
      score:         `${result.correct}/${result.total}`,
      percentage:    result.pct + '%',
      grade:         result.grade,
      submit_time:   new Date(result.submitTime).toLocaleString(),
    };
    emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.studentTpl, { ...base, to_email: result.student.email })
      .catch(err => console.error('Student email failed:', err));
    const doc = generatePDFReport(result, false);
    emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.adminTpl, {
      ...base, to_email: CONFIG.adminEmail,
      report_pdf: doc.output('datauristring').split(',')[1]
    }).catch(err => console.error('Admin email failed:', err));
  });
}

function saveToSheets(result) {
  if (CONFIG.sheetsUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
    console.warn('Google Sheets URL not configured – skipping.'); return;
  }
  const doc = generatePDFReport(result, false);
  fetch(CONFIG.sheetsUrl, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: result.student.name, email: result.student.email, phone: result.student.phone,
      score: result.correct, total: result.total, percentage: result.pct,
      grade: result.grade, wrong: result.wrong, unattempted: result.unattempted,
      submitTime: result.submitTime, reportPdf: doc.output('datauristring').split(',')[1]
    })
  }).catch(err => console.error('Sheets save failed:', err));
}
