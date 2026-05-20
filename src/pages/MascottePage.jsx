import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BRAND } from "@/api/supabase";

// Contenu HTML du questionnaire injecté directement (évite le cache iframe)
const MASCOTTE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"/>
<title>Le Tour de Dour — Questionnaire Mascotte</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Montserrat:wght@200;300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}
:root{--or:#D47A2C;--or-b:#F0C982;--bleu:#1E6FA5;--blanc:#F8F4EC;--dark:#08080C;}
html,body{width:100%;height:100%;overflow:hidden;background:var(--dark);font-family:'Montserrat',sans-serif;-webkit-tap-highlight-color:transparent;touch-action:manipulation;color:var(--blanc);}
body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E");opacity:.35;animation:grain .1s steps(1) infinite;}
@keyframes grain{0%{transform:translate(0,0);}25%{transform:translate(-2px,1px);}50%{transform:translate(1px,-2px);}75%{transform:translate(-1px,2px);}100%{transform:translate(2px,-1px);}}
#overlay-noir{position:fixed;inset:0;z-index:9000;background:#000;opacity:0;pointer-events:none;transition:opacity .5s ease;}
#overlay-noir.on{opacity:1;pointer-events:all;}
#pbar{position:fixed;top:0;left:0;height:3px;width:0%;z-index:600;background:linear-gradient(90deg,var(--bleu),var(--or),var(--or-b));box-shadow:0 0 12px rgba(212,122,44,.8);transition:width .7s cubic-bezier(.4,0,.2,1);pointer-events:none;}
/* INTRO */
#screen-intro{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse 80% 60% at 50% 40%,rgba(30,111,165,.18) 0%,transparent 70%),var(--dark);overflow:hidden;}
#screen-intro::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,transparent 49.9%,rgba(212,122,44,.07) 50%,transparent 50.1%) 0 0/100% 60px,linear-gradient(90deg,transparent 49.9%,rgba(212,122,44,.04) 50%,transparent 50.1%) 0 0/60px 100%;animation:gridPulse 6s ease-in-out infinite;}
@keyframes gridPulse{0%,100%{opacity:.4;}50%{opacity:.9;}}
.intro-badge{font-weight:200;font-size:clamp(.55rem,1.4vw,.7rem);letter-spacing:.6em;text-transform:uppercase;color:rgba(240,201,130,.5);margin-bottom:clamp(24px,4vh,40px);position:relative;z-index:2;}
.intro-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(2.2rem,8vw,6rem);text-align:center;line-height:.9;background:linear-gradient(170deg,#fff 0%,var(--or-b) 40%,var(--or) 70%,#8a4a00 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 40px rgba(212,122,44,.4));position:relative;z-index:2;animation:titleReveal 1.2s cubic-bezier(.16,1,.3,1) forwards;}
@keyframes titleReveal{0%{opacity:0;transform:translateY(30px) scale(.95);filter:blur(12px);}100%{opacity:1;transform:translateY(0) scale(1);}}
.intro-ligne{width:clamp(80px,20vw,160px);height:1px;background:linear-gradient(90deg,transparent,var(--or),transparent);margin:clamp(16px,3vh,28px) 0;position:relative;z-index:2;}
.intro-sub{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(.85rem,2.2vw,1.25rem);color:rgba(240,201,130,.75);text-align:center;position:relative;z-index:2;line-height:1.6;max-width:min(500px,85vw);animation:subReveal 1.4s ease forwards .4s;opacity:0;}
@keyframes subReveal{0%{opacity:0;transform:translateY(16px);}100%{opacity:1;transform:translateY(0);}}
.intro-desc{font-size:clamp(.72rem,1.6vw,.88rem);font-weight:300;color:rgba(255,255,255,.45);text-align:center;line-height:1.8;max-width:min(480px,85vw);margin-top:clamp(10px,2vh,18px);position:relative;z-index:2;animation:subReveal 1.4s ease forwards .7s;opacity:0;}
.intro-cta{margin-top:clamp(28px,5vh,48px);position:relative;z-index:2;animation:subReveal 1.4s ease forwards 1s;opacity:0;}
.btn-demarrer{display:flex;align-items:center;gap:14px;background:rgba(212,122,44,.1);border:1px solid rgba(212,122,44,.4);border-radius:60px;padding:clamp(14px,2.5vw,18px) clamp(32px,6vw,60px);font-family:'Cinzel',serif;font-weight:700;font-size:clamp(.8rem,1.8vw,.95rem);letter-spacing:.22em;text-transform:uppercase;color:rgba(240,201,130,.95);cursor:pointer;transition:all .3s ease;position:relative;overflow:hidden;animation:ctaPulse 2.5s ease-in-out infinite 1.5s;}
.btn-demarrer:hover{background:rgba(212,122,44,.2);border-color:rgba(240,201,130,.7);box-shadow:0 0 40px rgba(212,122,44,.3);}
@keyframes ctaPulse{0%,100%{box-shadow:0 0 0 0 rgba(212,122,44,.3);}50%{box-shadow:0 0 0 10px rgba(212,122,44,0);}}
.btn-dot{width:8px;height:8px;border-radius:50%;background:var(--or-b);animation:dotBlink 1s ease-in-out infinite;box-shadow:0 0 8px var(--or-b);}
@keyframes dotBlink{0%,100%{opacity:1;}50%{opacity:.2;}}
.intro-credit{position:absolute;bottom:clamp(16px,3vh,28px);font-size:.65rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.18);z-index:2;}
.intro-credit span{color:rgba(240,201,130,.4);}
/* QUIZ */
#screen-quiz{position:fixed;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(20px,4vw,48px);opacity:0;pointer-events:none;transition:opacity .6s ease;background:radial-gradient(ellipse 70% 50% at 50% 30%,rgba(30,111,165,.12) 0%,transparent 70%),var(--dark);}
#screen-quiz.visible{opacity:1;pointer-events:all;}
#dour-letters{display:flex;gap:clamp(10px,3vw,24px);margin-bottom:clamp(24px,5vh,48px);position:relative;z-index:2;}
.dour-lettre{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(2.4rem,8vw,5rem);line-height:1;color:transparent;-webkit-text-stroke:1px rgba(212,122,44,.2);transition:all .8s cubic-bezier(.16,1,.3,1);}
.dour-lettre.active{color:var(--or-b);-webkit-text-stroke:0px transparent;text-shadow:0 0 40px rgba(212,122,44,.8),0 0 80px rgba(240,201,130,.4);animation:letterFlare .6s ease forwards;}
@keyframes letterFlare{0%{transform:scale(1.5);opacity:0;filter:blur(8px);}40%{transform:scale(1.1);opacity:1;filter:blur(0);}70%{transform:scale(.97);}100%{transform:scale(1);}}
.quiz-num{font-weight:200;font-size:clamp(.6rem,1.4vw,.72rem);letter-spacing:.55em;text-transform:uppercase;color:rgba(240,201,130,.45);margin-bottom:clamp(10px,2vh,18px);position:relative;z-index:2;}
#question-text{font-family:'Cinzel',serif;font-weight:700;font-size:clamp(1.2rem,3.5vw,2rem);text-align:center;line-height:1.35;color:#fff;max-width:min(640px,88vw);min-height:clamp(56px,8vh,90px);position:relative;z-index:2;margin-bottom:clamp(24px,4vh,40px);}
#question-text .cursor{display:inline-block;width:2px;height:1.1em;background:var(--or-b);margin-left:3px;vertical-align:text-bottom;animation:curBlink .7s step-end infinite;}
@keyframes curBlink{0%,100%{opacity:1;}50%{opacity:0;}}
#answer-zone{width:100%;max-width:min(560px,88vw);position:relative;z-index:2;}
.free-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(212,122,44,.25);border-radius:12px;padding:clamp(14px,2.5vw,20px) clamp(16px,3vw,24px);font-family:'Montserrat',sans-serif;font-weight:300;font-size:clamp(.88rem,1.8vw,1rem);color:#fff;resize:none;outline:none;transition:border-color .3s ease,box-shadow .3s ease;line-height:1.7;min-height:clamp(90px,15vh,130px);}
.free-input::placeholder{color:rgba(255,255,255,.22);}
.free-input:focus{border-color:rgba(212,122,44,.6);box-shadow:0 0 0 3px rgba(212,122,44,.1),0 0 30px rgba(212,122,44,.08);}
.options-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(10px,2vw,16px);width:100%;}
.option-btn{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.04);border:1px solid rgba(212,122,44,.2);border-radius:12px;padding:clamp(14px,2.5vw,20px);font-family:'Montserrat',sans-serif;font-weight:500;font-size:clamp(.82rem,1.8vw,.95rem);color:rgba(255,255,255,.8);cursor:pointer;transition:all .25s ease;text-align:left;}
.option-btn .opt-icon{font-size:clamp(1.4rem,3vw,1.8rem);}
.option-btn:hover{border-color:rgba(212,122,44,.5);background:rgba(212,122,44,.08);color:#fff;}
.option-btn.selected{border-color:var(--or);background:rgba(212,122,44,.15);color:#fff;box-shadow:0 0 20px rgba(212,122,44,.2);}
#btn-next{margin-top:clamp(18px,3.5vh,32px);display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,var(--or),#b85a10);border:none;border-radius:60px;padding:clamp(13px,2.2vw,17px) clamp(36px,7vw,64px);font-family:'Cinzel',serif;font-weight:700;font-size:clamp(.78rem,1.7vw,.92rem);letter-spacing:.2em;text-transform:uppercase;color:#fff;cursor:pointer;box-shadow:0 4px 24px rgba(212,122,44,.35);position:relative;z-index:2;opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .4s ease,transform .4s ease,box-shadow .3s ease;}
#btn-next.show{opacity:1;transform:translateY(0);pointer-events:all;}
#btn-next:hover{box-shadow:0 6px 36px rgba(212,122,44,.55);transform:translateY(-2px);}
/* MERCI */
#screen-merci{position:fixed;inset:0;z-index:50;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(12px,2.5vh,20px);padding:clamp(24px,5vw,60px);opacity:0;pointer-events:none;transition:opacity .8s ease;background:radial-gradient(ellipse 70% 50% at 50% 40%,rgba(30,111,165,.15) 0%,transparent 70%),var(--dark);}
#screen-merci.visible{opacity:1;pointer-events:all;}
.merci-dour{display:flex;gap:clamp(8px,2.5vw,20px);margin-bottom:clamp(8px,2vh,16px);}
.merci-dour .dour-lettre{color:var(--or-b);-webkit-text-stroke:0px transparent;text-shadow:0 0 40px rgba(212,122,44,.8),0 0 80px rgba(240,201,130,.4);}
.merci-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(1.6rem,5vw,3rem);background:linear-gradient(170deg,#fff 0%,var(--or-b) 50%,var(--or) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center;}
.merci-sub{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(.9rem,2vw,1.15rem);color:rgba(240,201,130,.7);text-align:center;max-width:min(480px,85vw);line-height:1.7;}
.merci-ligne{width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--or),transparent);}
.merci-credit{font-size:.65rem;letter-spacing:.35em;text-transform:uppercase;color:rgba(255,255,255,.2);margin-top:clamp(8px,2vh,16px);}
.merci-credit span{color:rgba(240,201,130,.4);}
#collect-form{display:flex;flex-direction:column;gap:12px;width:100%;max-width:min(400px,88vw);margin-top:clamp(8px,2vh,16px);}
.collect-input{background:rgba(255,255,255,.05);border:1px solid rgba(212,122,44,.2);border-radius:10px;padding:clamp(12px,2vw,16px) clamp(14px,2.5vw,20px);font-family:'Montserrat',sans-serif;font-weight:300;font-size:clamp(.82rem,1.7vw,.92rem);color:#fff;outline:none;transition:border-color .3s ease;}
.collect-input::placeholder{color:rgba(255,255,255,.25);}
.collect-input:focus{border-color:rgba(212,122,44,.5);}
.rgpd-check{display:flex;align-items:flex-start;gap:10px;font-size:clamp(.68rem,1.4vw,.78rem);color:rgba(255,255,255,.4);line-height:1.5;cursor:pointer;}
.rgpd-check input[type=checkbox]{width:16px;height:16px;flex-shrink:0;margin-top:2px;accent-color:var(--or);cursor:pointer;}
.btn-envoyer{background:linear-gradient(135deg,var(--or),#b85a10);border:none;border-radius:60px;padding:clamp(13px,2vw,16px) clamp(30px,5vw,50px);font-family:'Cinzel',serif;font-weight:700;font-size:clamp(.78rem,1.6vw,.9rem);letter-spacing:.2em;text-transform:uppercase;color:#fff;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 24px rgba(212,122,44,.35);align-self:center;}
.btn-envoyer:hover{box-shadow:0 6px 36px rgba(212,122,44,.55);}
#canvas-bg{position:fixed;inset:0;z-index:1;pointer-events:none;}
</style>
</head>
<body>
<canvas id="canvas-bg"></canvas>
<div id="overlay-noir"></div>
<div id="pbar"></div>
<section id="screen-intro">
  <div class="intro-badge">Commune de Dour · Tour de Dour</div>
  <h1 class="intro-title">LE TOUR<br/>DE DOUR</h1>
  <div class="intro-ligne"></div>
  <p class="intro-sub">Participez à la naissance<br/>de notre mascotte officielle</p>
  <p class="intro-desc">4 questions pour capturer l'âme de Dour.<br/>Chaque réponse allume une lettre de notre ville.</p>
  <div class="intro-cta">
    <button class="btn-demarrer" onclick="demarrer()">
      <span class="btn-dot"></span>
      Commencer l'expérience
    </button>
  </div>
  <div class="intro-credit">Questionnaire réalisé par <span>JS-Innov.IA</span></div>
</section>
<section id="screen-quiz">
  <div id="dour-letters">
    <span class="dour-lettre" id="l-D">D</span>
    <span class="dour-lettre" id="l-O">O</span>
    <span class="dour-lettre" id="l-U">U</span>
    <span class="dour-lettre" id="l-R">R</span>
  </div>
  <div class="quiz-num" id="quiz-num">Question 1 · 4</div>
  <div id="question-text"><span id="q-txt"></span><span class="cursor"></span></div>
  <div id="answer-zone"></div>
  <button id="btn-next" onclick="suivant()">
    Suivant
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  </button>
</section>
<section id="screen-merci">
  <div class="merci-dour">
    <span class="dour-lettre">D</span><span class="dour-lettre">O</span><span class="dour-lettre">U</span><span class="dour-lettre">R</span>
  </div>
  <h2 class="merci-title">Merci pour ta voix !</h2>
  <div class="merci-ligne"></div>
  <p class="merci-sub">Ta contribution aide à façonner la mascotte qui représentera Dour pour les années à venir.</p>
  <div id="collect-form">
    <input class="collect-input" type="text" id="inp-prenom" placeholder="Prénom (optionnel)"/>
    <input class="collect-input" type="email" id="inp-email" placeholder="Email pour être informé(e)"/>
    <label class="rgpd-check">
      <input type="checkbox" id="rgpd-ok"/>
      J'accepte que mes réponses soient utilisées pour le projet mascotte du Tour de Dour, conformément au RGPD.
    </label>
    <button class="btn-envoyer" onclick="envoyerReponses()">Envoyer mes réponses</button>
  </div>
  <div class="merci-credit">Questionnaire réalisé par <span>JS-Innov.IA</span></div>
</section>
<script>
(function(){
  const cv=document.getElementById('canvas-bg');
  const ctx=cv.getContext('2d');
  let W,H,pts=[];
  function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;init();}
  function init(){pts=[];const N=Math.floor((W*H)/18000);for(let i=0;i<N;i++){pts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*.8+.2,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,a:Math.random()});}}
  function tick(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;p.a+=.005;const op=.15+.1*Math.sin(p.a);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(212,122,44,'+op+')';ctx.fill();});requestAnimationFrame(tick);}
  addEventListener('resize',resize);resize();tick();
})();
const QUESTIONS=[
  {id:0,lettre:'D',num:'Question 1 · 4',txt:'Quels mots représentent le mieux Dour ?',type:'free',placeholder:'Chaleureux, minier, festif, solidaire…'},
  {id:1,lettre:'O',num:'Question 2 · 4',txt:'Quels lieux ou symboles ?',type:'free',placeholder:'Le chevalement, la grand-place, les terrils…'},
  {id:2,lettre:'U',num:'Question 3 · 4',txt:'Si Dour était une créature ?',type:'choice',options:[{icon:'🦅',label:'Aigle',val:'aigle'},{icon:'🌳',label:'Chêne',val:'chene'},{icon:'🦁',label:'Lion',val:'lion'},{icon:'🦊',label:'Renard',val:'renard'}]},
  {id:3,lettre:'R',num:'Question 4 · 4',txt:'La mascotte idéale, elle devrait sembler…',type:'free',placeholder:'Fière, accueillante, moderne, ancrée dans l\\'histoire…'}
];
let qi=0,reponses={mots:'',lieux:'',creature:'',mascotte:''};
const KEYS=['mots','lieux','creature','mascotte'];
let typingTimer=null;
function noir(cb){const ov=document.getElementById('overlay-noir');ov.classList.add('on');setTimeout(()=>{if(cb)cb();},500);setTimeout(()=>ov.classList.remove('on'),900);}
function demarrer(){noir(()=>{document.getElementById('screen-intro').style.display='none';document.getElementById('screen-quiz').classList.add('visible');chargerQuestion(0);});}
function chargerQuestion(idx){
  const q=QUESTIONS[idx];qi=idx;
  document.getElementById('pbar').style.width=((idx/QUESTIONS.length)*100)+'%';
  document.getElementById('quiz-num').textContent=q.num;
  activerLettre(q.lettre);
  const el=document.getElementById('q-txt');el.textContent='';
  if(typingTimer)clearTimeout(typingTimer);
  typewrite(el,q.txt,0);
  const zone=document.getElementById('answer-zone');zone.innerHTML='';
  if(q.type==='free'){
    const ta=document.createElement('textarea');ta.className='free-input';ta.rows=4;ta.placeholder=q.placeholder||'';
    if(reponses[KEYS[idx]])ta.value=reponses[KEYS[idx]];
    ta.addEventListener('input',()=>{reponses[KEYS[idx]]=ta.value.trim();toggleNext(ta.value.trim().length>0);});
    zone.appendChild(ta);setTimeout(()=>ta.focus(),600);
    toggleNext(reponses[KEYS[idx]]?true:false);
  } else if(q.type==='choice'){
    const grid=document.createElement('div');grid.className='options-grid';
    q.options.forEach(opt=>{
      const btn=document.createElement('button');btn.className='option-btn';
      if(reponses[KEYS[idx]]===opt.val)btn.classList.add('selected');
      btn.innerHTML='<span class="opt-icon">'+opt.icon+'</span><span class="opt-label">'+opt.label+'</span>';
      btn.onclick=()=>{grid.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');reponses[KEYS[idx]]=opt.val;toggleNext(true);};
      grid.appendChild(btn);
    });
    zone.appendChild(grid);toggleNext(reponses[KEYS[idx]]?true:false);
  }
}
function typewrite(el,txt,i){if(i<=txt.length){el.textContent=txt.slice(0,i);typingTimer=setTimeout(()=>typewrite(el,txt,i+1),i===0?200:28);}}
function activerLettre(lettre){document.querySelectorAll('#dour-letters .dour-lettre').forEach(l=>{if(l.textContent===lettre&&!l.classList.contains('active'))l.classList.add('active');});}
function toggleNext(show){const btn=document.getElementById('btn-next');if(show)btn.classList.add('show');else btn.classList.remove('show');}
function suivant(){
  const zone=document.getElementById('answer-zone');const ta=zone.querySelector('textarea');
  if(ta)reponses[KEYS[qi]]=ta.value.trim();
  if(qi<QUESTIONS.length-1){noir(()=>chargerQuestion(qi+1));}
  else{document.getElementById('pbar').style.width='100%';noir(()=>{document.getElementById('screen-quiz').classList.remove('visible');document.getElementById('screen-merci').classList.add('visible');});}
}
async function envoyerReponses(){
  const prenom=document.getElementById('inp-prenom').value.trim();
  const email=document.getElementById('inp-email').value.trim();
  const rgpd=document.getElementById('rgpd-ok').checked;
  if(!rgpd){alert('Merci d\\'accepter les conditions RGPD.');return;}
  const btn=document.querySelector('.btn-envoyer');btn.textContent='Envoi…';btn.disabled=true;
  const payload={prenom,email,reponse_mots:reponses.mots,reponse_lieux:reponses.lieux,reponse_creature:reponses.creature,reponse_mascotte:reponses.mascotte,consentement_rgpd:rgpd,session_id:'sess_'+Date.now()};
  try{
    const res=await fetch('https://api.base44.com/api/apps/6a0371a87c9257126b051d5a/functions/saveMascotteReponse',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(res.ok){btn.textContent='✓ Réponses envoyées !';document.getElementById('collect-form').style.opacity='.5';document.getElementById('collect-form').style.pointerEvents='none';}
    else throw new Error();
  }catch(e){btn.textContent='Erreur — réessaie';btn.disabled=false;}
}
<\/script>
</body>
</html>`;

export default function MascottePage() {
  const navigate = useNavigate();
  const [showBack, setShowBack] = useState(true);
  const hideTimer = useRef(null);

  useEffect(() => {
    hideTimer.current = setTimeout(() => setShowBack(false), 5000);
    return () => clearTimeout(hideTimer.current);
  }, []);

  const handleActivity = () => {
    setShowBack(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowBack(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-0 bg-black"
      onMouseMove={handleActivity}
      onTouchStart={handleActivity}
    >
      {/* Iframe avec srcdoc — contenu injecté directement, pas de cache */}
      <iframe
        srcDoc={MASCOTTE_HTML}
        title="Questionnaire Mascotte — Tour de Dour"
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay"
        sandbox="allow-scripts allow-forms allow-same-origin"
      />

      {/* Bouton retour flottant */}
      <motion.button
        onClick={() => navigate("/")}
        animate={{ opacity: showBack ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{
          background: "rgba(0,0,0,0.65)",
          border: `1px solid rgba(212,122,44,0.4)`,
          color: "#F0C982",
          backdropFilter: "blur(10px)",
          pointerEvents: showBack ? "auto" : "none",
        }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Retour
      </motion.button>
    </div>
  );
}
