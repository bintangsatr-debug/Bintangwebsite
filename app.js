const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS={g:(k,d)=>{try{return JSON.parse(localStorage.getItem('psl.'+k))??d}catch{return d}},s:(k,v)=>{try{localStorage.setItem('psl.'+k,JSON.stringify(v))}catch{}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const app=$('#app');
const ext=h=>/^https?:/.test(h);
const tgt=h=>ext(h)?' target="_blank" rel="noopener noreferrer"':'';
/* kartu menu: link jika href terisi, jika kosong tampil "segera hadir" */
const linkCard=x=>x.href?`<a class="card tilt" href="${esc(x.href)}"${tgt(x.href)}><div class="ic">${x.i}</div><h3>${esc(x.n)}</h3><small>Buka ↗</small></a>`
  :`<div class="card" style="opacity:.55"><div class="ic">${x.i}</div><h3>${esc(x.n)}</h3><small>Segera hadir</small></div>`;
const secH=(t,d,l)=>`<div class="sec-h"><div><h2>${t}</h2><p>${d}</p></div>${l?`<a href="${l}">Lihat semua</a>`:''}</div>`;
/* ---------- Router ---------- */
function route(){
  const p=location.hash.slice(2).split('/')[0];
  $$('#nav a').forEach(l=>l.classList.toggle('on',l.dataset.r===p));
  app.style.animation='none';app.offsetHeight;app.style.animation='';scrollTo(0,0);
  if(p==='materi')list('Materi Pelajaran',SUBJ);else if(p==='game')list('Game Edukasi',GAMES);else if(p==='buku')books();else home();
  observe();
  $('#fstat').textContent=`${SUBJ.length} MATERI · ${BOOKS.length} BUKU · ${GAMES.length} GAME`;
}
addEventListener('hashchange',route);
const list=(t,L)=>app.innerHTML=`<div class="h2s"><h2>${t}</h2></div><div class="grid">${L.map(linkCard).join('')}</div>`;
/* ---------- Beranda ---------- */
function home(){
  app.innerHTML=`<section class="hero-box"><div class="hud mono"><span>&gt; SELAMAT DATANG</span><span><i class="dot"></i>SYSTEM ONLINE</span></div>
  <h1 class="hero caret" id="name" aria-label="${esc(OWNER)}"></h1>
  <div class="hud mono" style="margin-top:6px"><span>/// Penyimpanan Materi dan Buku PDF</span><span>ID-${String(SUBJ.length).padStart(3,'0')}-X</span></div>
  <p>Website aing nih,khusus buat nyimpen materi sama buku pdf buat belajar</p></section>
  <div class="stats"><div class="stat"><b>${SUBJ.length}</b><small>MATERI</small></div><div class="stat"><b>${BOOKS.length}</b><small>BUKU</small></div><div class="stat"><b>${GAMES.length}</b><small>GAME</small></div></div>
  <section class="sec rv">${secH('Materi Pelajaran','Pilih mata pelajaran untuk mulai belajar.','#/materi')}<div class="grid">${SUBJ.map(linkCard).join('')}</div></section>
  <section class="sec rv">${secH('Perpustakaan Buku PDF','Koleksi buku digital untuk menambah wawasan.','#/buku')}<div class="grid">${BOOKS.slice(0,4).map(bookCard).join('')}</div></section>
  <section class="sec rv">${secH('Game Edukasi','Belajar lebih seru dengan permainan.','#/game')}<div class="grid">${GAMES.map(linkCard).join('')}</div></section>`;
  bindBooks();
  const el=$('#name');if(RM){el.textContent=OWNER}else{let i=0;const k=setInterval(()=>{el.textContent=OWNER.slice(0,++i);if(i>=OWNER.length)clearInterval(k)},90)}
}
/* ---------- Buku PDF (hanya dibaca, dikelola lewat data.js) ---------- */
const FAV=()=>LS.g('fav',[]);
const bookCard=b=>{const k=BOOKS.indexOf(b);return `<div class="card tilt"><button class="fav" data-fav="${k}" aria-label="Favorit">${FAV().includes(k)?'★':'☆'}</button><div class="cover">PDF</div><h3>${esc(b.title)}</h3><small>${esc(b.author||'—')} · ${esc(b.cat)}</small><div class="row" style="margin-top:10px">${b.href?`<button class="btn sm" data-read="${k}">Baca</button><a class="btn sm o" href="${esc(b.href)}" download${tgt(b.href)}>Unduh</a>`:'<small>Segera hadir</small>'}</div></div>`};
function bindBooks(){
  $$('[data-fav]').forEach(b=>b.onclick=()=>{const k=+b.dataset.fav;let f=FAV();f=f.includes(k)?f.filter(x=>x!==k):[...f,k];LS.s('fav',f);b.textContent=f.includes(k)?'★':'☆'});
  $$('[data-read]').forEach(b=>b.onclick=()=>{const k=BOOKS[+b.dataset.read],m=$('#modal');m.hidden=false;
    m.innerHTML=`<div class="row" style="justify-content:space-between"><b>${esc(k.title)}</b><span class="row"><a class="btn sm o" href="${esc(k.href)}" target="_blank" rel="noopener">Tab baru</a><button class="btn sm" id="cl">Tutup</button></span></div><iframe src="${esc(k.href)}" title="${esc(k.title)}"></iframe>`;
    $('#cl').onclick=()=>{m.hidden=true;m.innerHTML=''}});
}
let bf={cat:'Semua',q:'',fav:false};
function books(){
  const F=FAV(),L=BOOKS.filter((b,k)=>(bf.cat==='Semua'||b.cat===bf.cat)&&(!bf.fav||F.includes(k))&&(b.title+' '+b.author).toLowerCase().includes(bf.q.toLowerCase()));
  app.innerHTML=`<div class="h2s"><h2>Perpustakaan Buku PDF</h2></div>
  <div class="row" style="margin-bottom:14px"><input id="bq" type="search" placeholder="Cari buku…" value="${esc(bf.q)}">${['Semua',...CATS].map(c=>`<button class="chip ${bf.cat===c?'on':''}" data-c="${esc(c)}">${c}</button>`).join('')}<button class="chip ${bf.fav?'on':''}" id="ff">★ Favorit</button></div>
  ${L.length?`<div class="grid">${L.map(bookCard).join('')}</div>`:'<div class="empty">Tidak ada buku yang cocok.</div>'}`;
  $('#bq').oninput=e=>{bf.q=e.target.value;const p=e.target.selectionStart;books();const i=$('#bq');i.focus();i.setSelectionRange(p,p)};
  $$('[data-c]').forEach(b=>b.onclick=()=>{bf.cat=b.dataset.c;books()});$('#ff').onclick=()=>{bf.fav=!bf.fav;books()};
  bindBooks();
}
/* ---------- Pencarian global ---------- */
$('#q').oninput=e=>{const v=e.target.value.trim().toLowerCase(),r=$('#res');if(!v){r.style.display='none';return}
  const out=[];
  SUBJ.forEach(s=>s.n.toLowerCase().includes(v)&&out.push(['Materi',s.n,s.href||'#/materi',s.href]));
  GAMES.forEach(g=>g.n.toLowerCase().includes(v)&&out.push(['Game',g.n,g.href||'#/game',g.href]));
  BOOKS.forEach(b=>(b.title+' '+b.author).toLowerCase().includes(v)&&out.push(['Buku',b.title,'#/buku']));
  r.innerHTML=out.slice(0,10).map(o=>`<a href="${esc(o[2])}"${o[3]?tgt(o[3]):''}><span>${esc(o[1])}</span><span class="tag">${o[0]}</span></a>`).join('')||'<a>Tidak ada hasil</a>';r.style.display='block'};
document.addEventListener('click',e=>{if(!e.target.closest('.srch'))$('#res').style.display='none';else if(e.target.closest('#res a')){$('#res').style.display='none';$('#q').value=''}});
/* ---------- Tema, jam, efek ---------- */
const setTheme=t=>{document.documentElement.dataset.theme=t;LS.s('theme',t)};
setTheme(LS.g('theme',matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'));
$('#theme').onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
const tick=()=>$('#clock').textContent=new Date().toLocaleTimeString('id-ID',{hour12:false});tick();setInterval(tick,1000);
let io;function observe(){io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.08});$$('.rv').forEach(x=>io.observe(x))}
if(!RM&&matchMedia('(hover:hover)').matches)document.addEventListener('pointermove',e=>{const c=e.target.closest?.('.tilt');$$('.tilt').forEach(x=>{if(x!==c)x.style.transform=''});if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(600px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`});
(()=>{const c=$('#bg'),x=c.getContext('2d');let W,H,P=[];const N=innerWidth<600?35:70;
const fit=()=>{W=c.width=innerWidth;H=c.height=innerHeight;P=Array.from({length:N},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,v:Math.random()*.25+.05}))};
const draw=()=>{x.clearRect(0,0,W,H);x.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--fg');P.forEach(p=>{x.globalAlpha=.25+p.r/3;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();if(!RM){p.y-=p.v;if(p.y<0){p.y=H;p.x=Math.random()*W}}})};
const loop=()=>{draw();if(!RM&&!document.hidden)requestAnimationFrame(loop)};
fit();addEventListener('resize',fit);document.addEventListener('visibilitychange',()=>!document.hidden&&!RM&&loop());loop()})();
route();setTimeout(()=>$('#loader').classList.add('off'),RM?0:900);
