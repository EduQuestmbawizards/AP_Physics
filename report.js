// =============================================
// report.js – PDF report generation via jsPDF
// AP Physics 2 Diagnostic
// =============================================

function generatePDFReport(result, shouldSave = true) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210, M = 15;
  let y = 0;

  const line  = (x1,y1,x2,y2,r=200,g=200,b=200,lw=0.3) => { doc.setDrawColor(r,g,b); doc.setLineWidth(lw); doc.line(x1,y1,x2,y2); };
  const rect  = (x,yy,w,h,r,g,b,fill=true) => { fill?doc.setFillColor(r,g,b):doc.setDrawColor(r,g,b); fill?doc.rect(x,yy,w,h,'F'):doc.rect(x,yy,w,h,'S'); };
  const txt   = (s,x,yy,sz=10,bold=false,color=[30,30,30],align='left') => { doc.setFontSize(sz); doc.setFont('helvetica',bold?'bold':'normal'); doc.setTextColor(...color); doc.text(String(s),x,yy,{align}); };

  // Header
  rect(0,0,W,26,13,13,20);
  rect(0,0,6,26,79,70,229);
  txt('AP Physics 2 — Section I Diagnostic', W/2,12,15,true,[255,255,255],'center');
  txt('Official Performance Report', W/2,20,9,false,[180,180,210],'center');
  y = 32;

  // Student info
  rect(M,y,W-2*M,20,245,245,252);
  txt('STUDENT INFO', M+4,y+6,7.5,true,[79,70,229]);
  txt(`Name:  ${result.student.name}`,   M+4, y+12, 9);
  txt(`Email: ${result.student.email}`,  M+4, y+17, 9);
  txt(`Phone: ${result.student.phone}`,  W/2+4, y+12, 9);
  txt(`Date:  ${new Date(result.submitTime).toLocaleString()}`, W/2+4, y+17, 9);
  y += 26;

  // Score hero
  const gc = result.pct>=70?[5,150,105]:result.pct>=50?[217,119,6]:[220,38,38];
  rect(M,y,W-2*M,22,...gc);
  txt(result.grade, M+8,y+15,22,true,[255,255,255]);
  txt(`${result.pct}%`, M+30,y+15,22,true,[255,255,255]);
  txt(`${result.correct} Correct · ${result.wrong} Wrong · ${result.unattempted} Skipped`, W/2+12,y+10,10,false,[255,255,255]);
  txt(`Out of ${result.total} questions`,W/2+12,y+17,8,false,[220,240,255]);
  y += 28;

  // Stat boxes
  const boxes = [['Correct',result.correct,[5,150,105]],['Wrong',result.wrong,[220,38,38]],['Skipped',result.unattempted,[217,119,6]],['Score',result.pct+'%',[79,70,229]]];
  const bw    = (W-2*M-9)/4;
  boxes.forEach(([label,val,[r,g,b]],i) => {
    const bx = M+i*(bw+3);
    doc.setDrawColor(r,g,b); doc.setLineWidth(0.4); doc.rect(bx,y,bw,14,'S');
    txt(String(val),bx+bw/2,y+8,13,true,[r,g,b],'center');
    txt(label,      bx+bw/2,y+13,7,false,[100,100,100],'center');
  });
  y += 20;

  // Topic table
  txt('TOPIC-WISE PERFORMANCE', M,y+6,8,true,[79,70,229]);
  y += 10;
  rect(M,y,W-2*M,7,235,235,252);
  ['Topic','Total','Correct','Wrong','Accuracy'].forEach((h,i) => {
    txt(h,[M+2,M+80,M+98,M+112,M+127][i],y+5,7.5,true,[79,70,229]);
  });
  y += 7;
  result.topicAnalysis.forEach((t,idx) => {
    if (y > 265) { doc.addPage(); y = 20; }
    if (idx%2===0) rect(M,y,W-2*M,7,249,249,252);
    txt(t.name,   M+2,   y+5, 8);
    txt(t.total,  M+82,  y+5, 8,false,[80,80,80],'center');
    txt(t.correct,M+100, y+5, 8,false,[5,150,105],'center');
    txt(t.wrong,  M+114, y+5, 8,false,[220,38,38],'center');
    const bc = t.acc>=70?[5,150,105]:t.acc>=40?[217,119,6]:[220,38,38];
    rect(M+127,y+2,55,3,220,220,220);
    rect(M+127,y+2,55*(t.acc/100),3,...bc);
    txt(`${t.acc}%`,M+184,y+5,7,false,[80,80,80]);
    y += 7;
  });

  // Incorrect answers
  const LETTERS = ['A','B','C','D'];
  const wrong = result.details.filter(d => d.status === 'wrong');
  if (wrong.length > 0) {
    doc.addPage(); y = 20;
    rect(M,y,W-2*M,8,255,240,240);
    doc.setDrawColor(220,38,38); doc.setLineWidth(0.4); doc.rect(M,y,W-2*M,8,'S');
    txt('INCORRECT ANSWERS REVIEW', M+4,y+5.5,9,true,[220,38,38]);
    y += 14;

    const clean = str => (str||'').replace(/<[^>]*>/g,'').replace(/&[a-z]+;/g,m=>({'&nbsp;':' ','&deg;':'°','&rarr;':'→','&larr;':'←','&minus;':'−','&plus;':'+','&sub;':'','&sup;':''}[m]||m));

    wrong.forEach(qObj => {
      const qLines = doc.splitTextToSize(`Q${qObj.id}: ${clean(qObj.text)}`, W-2*M-8);
      const yLines = doc.splitTextToSize(`Your Answer: (${LETTERS[qObj.chosen]}) ${clean(qObj.options[qObj.chosen])}`, W-2*M-12);
      const cLines = doc.splitTextToSize(`Correct:     (${LETTERS[qObj.answer]}) ${clean(qObj.options[qObj.answer])}`, W-2*M-12);
      const need   = qLines.length*4.5 + yLines.length*4 + cLines.length*4 + 10;
      if (y+need > 272) { doc.addPage(); y = 20; }
      rect(M,y,1.5,need-4,220,38,38);
      let iy = y;
      doc.setFontSize(8.5); doc.setFont('helvetica','bold'); doc.setTextColor(30,30,30);
      qLines.forEach(l => { doc.text(l,M+4,iy+3); iy+=4.5; });
      doc.setFontSize(8); doc.setFont('helvetica','normal'); doc.setTextColor(220,38,38);
      yLines.forEach(l => { doc.text(l,M+8,iy+3); iy+=4; });
      doc.setTextColor(5,150,105);
      cLines.forEach(l => { doc.text(l,M+8,iy+3); iy+=4; });
      y += need;
    });
  }

  // Footer
  if (y > 270) { doc.addPage(); y = 20; }
  line(M,y+4,W-M,y+4);
  txt('AP Physics 2 Diagnostic Portal', W/2,y+9,7,false,[150,150,150],'center');
  txt(`© ${new Date().getFullYear()} – Confidential`, W/2,y+13,7,false,[180,180,180],'center');

  if (shouldSave) doc.save(`${result.student.name.replace(/\s+/g,'_')}_APPhysics2_Report.pdf`);
  return doc;
}
