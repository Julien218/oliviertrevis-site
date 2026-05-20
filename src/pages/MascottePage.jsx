import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MASCOTTE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
<title>Le Tour de Dour — Mascotte</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Anton&family=Montserrat:wght@300;400;500;600;700&family=Dancing+Script:wght@700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --or:#D47A2C;
  --or2:#F0C982;
  --bleu:#1E6FA5;
  --dark:#07090D;
}
html,body{width:100%;height:100%;overflow:hidden;background:var(--dark);
  color:#fff;font-family:'Montserrat',sans-serif;-webkit-font-smoothing:antialiased;}

/* ════════════════════════════
   FOND GLOBAL — image DOUR très sombre, fixe, en bas
════════════════════════════ */
#bg{
  position:fixed;inset:0;z-index:0;
  pointer-events:none;
  background:
    url('https://base44.app/api/apps/69ed0a42be17008cf11027eb/files/mp/public/69ed0a42be17008cf11027eb/509b17250_6627432ea_WhatsAppImage2026-05-07at2254083.jpg')
    center bottom / cover no-repeat;
  filter:brightness(.07) saturate(.3);
  transition:filter 1.8s ease;
}
/* vignette noire par dessus */
#bg::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(7,9,13,1) 0%, rgba(7,9,13,.75) 55%, rgba(7,9,13,.55) 100%);
  pointer-events:none;
}

/* ════════════════════════════
   BARRE PROGRESSION
════════════════════════════ */
.pbar-wrap{position:fixed;top:0;left:0;right:0;height:3px;z-index:500;background:rgba(255,255,255,.06);}
.pbar{height:100%;width:0%;background:linear-gradient(90deg,var(--bleu),var(--or),var(--or2));transition:width .8s ease;}

/* ════════════════════════════
   SCÈNES
════════════════════════════ */
.sc{
  position:fixed;inset:0;z-index:10;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:clamp(20px,5vw,48px) clamp(16px,6vw,52px);
  opacity:0;pointer-events:none;transition:opacity .5s ease;
  gap:clamp(14px,2.8vh,26px);
}
.sc.on{opacity:1;pointer-events:all;}

/* ════════════════════════════
   INTRO
════════════════════════════ */
.eyebrow{
  font-size:clamp(.52rem,1.3vw,.68rem);letter-spacing:.45em;text-transform:uppercase;
  color:rgba(30,111,165,.75);font-weight:600;
}
.main-title{
  font-family:'Cinzel',serif;font-weight:900;
  font-size:clamp(2.8rem,10vw,6.5rem);
  letter-spacing:.07em;text-transform:uppercase;text-align:center;line-height:.95;
  background:linear-gradient(135deg,var(--or2) 0%,var(--or) 40%,var(--or2) 70%,var(--or) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-size:300% 300%;animation:sh 5s linear infinite;
  filter:drop-shadow(0 0 55px rgba(212,122,44,.4));
}
@keyframes sh{0%{background-position:0% 50%}100%{background-position:300% 50%}}

.sep{width:clamp(50px,12vw,100px);height:1px;
  background:linear-gradient(90deg,transparent,var(--or),transparent);opacity:.4;}

.intro-logo{
  width:clamp(88px,16vw,130px);
  filter:drop-shadow(0 0 32px rgba(212,122,44,.5));
  animation:fl 4s ease-in-out infinite;
}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

.credit{
  font-family:'Dancing Script',cursive;
  font-size:clamp(.76rem,1.8vw,.92rem);
  color:rgba(240,201,130,.35);
}
.credit b{color:rgba(240,201,130,.6);}

.cta{
  padding:clamp(13px,2.5vw,16px) clamp(40px,8vw,64px);
  font-family:'Montserrat',sans-serif;font-weight:700;
  font-size:clamp(.78rem,1.8vw,.9rem);letter-spacing:.22em;text-transform:uppercase;
  color:#07090D;background:linear-gradient(135deg,var(--or2),var(--or));
  border:none;border-radius:50px;cursor:pointer;
  box-shadow:0 0 50px rgba(212,122,44,.38),0 6px 24px rgba(0,0,0,.55);
  position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;
}
.cta::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
  transform:translateX(-100%);animation:sw 3s ease infinite;}
@keyframes sw{0%{transform:translateX(-100%)}55%,100%{transform:translateX(100%)}}
.cta:hover{transform:translateY(-2px);box-shadow:0 0 65px rgba(212,122,44,.52),0 8px 30px rgba(0,0,0,.55);}

/* ════════════════════════════
   QUIZ — layout 2 zones
════════════════════════════ */
#s-quiz{justify-content:space-between;padding-top:clamp(28px,5vh,50px);padding-bottom:clamp(10px,3vh,28px);gap:clamp(4px,1.2vh,12px);}

/* Zone haute — lettre héro + question */
.top-zone{
  display:flex;flex-direction:column;align-items:center;
  gap:clamp(5px,1.2vh,12px);flex:0 0 auto;
}
.q-badge{
  font-size:.58rem;letter-spacing:.35em;text-transform:uppercase;
  color:rgba(30,111,165,.7);font-weight:700;
  padding:4px 14px;border:1px solid rgba(30,111,165,.2);border-radius:20px;
}
/* Logo Tour de Dour — optimisé mobile */
.q-logo-dour{
  width:clamp(140px,52vw,240px);
  max-height:clamp(95px,20vh,165px);
  object-fit:contain;
  filter:drop-shadow(0 0 18px rgba(212,122,44,.5)) drop-shadow(0 0 40px rgba(30,111,165,.3));
  animation:logoFloat 4s ease-in-out infinite;
  flex-shrink:0;
}
@keyframes logoFloat{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-5px);}
}
.q-text{
  font-family:'Anton',sans-serif;
  font-size:clamp(.95rem,4.5vw,2rem);
  text-transform:uppercase;letter-spacing:.05em;
  color:#fff;text-align:center;line-height:1.2;
  text-shadow:0 2px 20px rgba(0,0,0,.9),0 0 40px rgba(0,0,0,.8);
  max-width:680px;min-height:2.4em;
}
.q-text .cur{
  display:inline-block;width:3px;height:.82em;
  background:var(--or);vertical-align:middle;margin-left:3px;
  animation:bl .7s step-end infinite;
}
@keyframes bl{0%,100%{opacity:1}50%{opacity:0}}

/* Zone milieu — input */
.mid-zone{
  display:flex;flex-direction:column;align-items:center;
  gap:clamp(8px,1.8vh,14px);flex:1 1 auto;justify-content:center;
  width:100%;max-width:580px;
}
.q-hint{
  font-size:clamp(.68rem,1.5vw,.82rem);font-style:italic;
  color:rgba(255,255,255,.32);letter-spacing:.06em;text-align:center;
  transition:opacity .45s;
}

/* Textarea */
.free-ta{
  width:100%;
  padding:clamp(14px,2.5vw,18px) clamp(16px,3vw,22px);
  font-family:'Montserrat',sans-serif;font-size:clamp(.88rem,2vw,1rem);
  color:#fff;
  background:rgba(15,20,30,.75);
  border:1.5px solid rgba(212,122,44,.25);
  border-radius:16px;outline:none;resize:none;
  min-height:72px;
  backdrop-filter:blur(16px);
  box-shadow:0 4px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.04);
  transition:border-color .25s,box-shadow .25s;
}
.free-ta::placeholder{color:rgba(255,255,255,.2);font-style:italic;}
.free-ta:focus{
  border-color:rgba(212,122,44,.6);
  box-shadow:0 0 28px rgba(212,122,44,.18),0 4px 30px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.04);
}

/* Options choix */
.opts{
  display:grid;grid-template-columns:1fr 1fr;
  gap:clamp(8px,2vw,12px);width:100%;
}
.opt{
  padding:clamp(12px,2.5vw,17px) clamp(12px,2.5vw,18px);
  background:rgba(15,20,30,.72);
  border:1.5px solid rgba(30,111,165,.2);
  border-radius:14px;cursor:pointer;
  font-family:'Montserrat',sans-serif;font-weight:600;
  font-size:clamp(.78rem,1.7vw,.92rem);
  color:rgba(255,255,255,.78);
  display:flex;align-items:center;gap:10px;
  backdrop-filter:blur(12px);
  box-shadow:0 4px 20px rgba(0,0,0,.35);
  transition:all .2s;text-align:left;
}
.opt:hover{
  background:rgba(30,111,165,.18);
  border-color:rgba(30,111,165,.55);
  color:#fff;transform:translateY(-2px);
  box-shadow:0 6px 28px rgba(30,111,165,.2);
}
.opt.sel{
  background:rgba(212,122,44,.18);
  border-color:var(--or);color:#fff;
  box-shadow:0 0 24px rgba(212,122,44,.25);
}

/* Zone basse — lettres DOUR + bouton */
.bot-zone{
  display:flex;flex-direction:column;align-items:center;
  gap:clamp(8px,1.8vh,14px);flex:0 0 auto;
}

/* Lettres DOUR en bas */
.dour-row{
  display:flex;gap:clamp(6px,2vw,18px);align-items:flex-end;
  overflow:visible; /* on laisse la lettre visible hors zone pour l'effet */
  /* padding-top pour que la lettre qui chute ne coupe pas */
  padding-top:clamp(60px,10vw,120px);
  margin-top:clamp(-60px,-10vw,-120px);
}
/* ══════════════════════════════════════════
   LETTRES D O U R — style de base
══════════════════════════════════════════ */
.dl{
  font-family:'Anton',sans-serif;
  font-size:clamp(2rem,8vw,5rem);
  line-height:1;
  display:inline-block;
  position:relative;
  /* invisible au départ */
  opacity:0;
  color:transparent;
  transform:translateY(-200px) scale(.6);
  will-change:transform,opacity,filter;
}

/* Lettre active — animation chute cinéma */
.dl.lit{
  animation:cineDrop .9s cubic-bezier(.12,.8,.2,1) forwards;
}

/* Lettre passée — dorée, stable, lumineuse */
.dl.past{
  opacity:1;
  color:rgba(240,201,130,.45);
  transform:translateY(0) scale(1);
  text-shadow:
    0 0 14px rgba(212,122,44,.4),
    0 0 30px rgba(212,122,44,.15);
  filter:none;
}

/* ══════════════════════════════════════════
   @keyframes CINÉDROP — 7 phases
   Chute cinématique premium
══════════════════════════════════════════ */
@keyframes cineDrop{

  /* 0% — départ très haut, invisible, flou */
  0%{
    opacity:0;
    color:transparent;
    transform:translateY(-240px) scale(.5) rotate(-12deg);
    filter:blur(14px) brightness(3);
    text-shadow:none;
  }

  /* 18% — apparition en chute rapide, traînée de lumière */
  18%{
    opacity:.55;
    color:rgba(255,255,255,.5);
    transform:translateY(-80px) scale(.85) rotate(-4deg);
    filter:blur(4px) brightness(2);
    text-shadow:
      0 -30px 40px rgba(212,122,44,.6),
      0 -60px 80px rgba(240,201,130,.3);
  }

  /* 45% — juste avant IMPACT, vitesse max */
  45%{
    opacity:.9;
    color:rgba(255,255,255,.9);
    transform:translateY(0px) scale(1.02) rotate(-1deg);
    filter:blur(1px) brightness(1.5);
    text-shadow:
      0 0 20px rgba(212,122,44,.8),
      0 0 50px rgba(212,122,44,.5);
  }

  /* 58% — IMPACT : écrasement brutal au sol */
  58%{
    opacity:1;
    color:#fff;
    transform:translateY(14px) scaleX(1.12) scaleY(.72) rotate(.8deg);
    filter:blur(0) brightness(1);
    text-shadow:
      0 0 40px rgba(240,201,130,1),
      0 0 80px rgba(212,122,44,.9),
      0 0 140px rgba(212,122,44,.5),
      0 16px 0 rgba(0,0,0,.8);
  }

  /* 68% — 1er rebond : montée vive */
  68%{
    transform:translateY(-18px) scaleX(.96) scaleY(1.1) rotate(-.6deg);
    color:#fff;
    text-shadow:
      0 0 50px rgba(240,201,130,1),
      0 0 100px rgba(212,122,44,.8),
      0 0 180px rgba(212,122,44,.35);
  }

  /* 78% — 2e rebond : retombée douce */
  78%{
    transform:translateY(6px) scaleX(1.02) scaleY(.94);
    text-shadow:
      0 0 30px rgba(212,122,44,.9),
      0 0 65px rgba(212,122,44,.5);
  }

  /* 87% — oscillation finale */
  87%{
    transform:translateY(-5px) scale(1.03);
    text-shadow:
      0 0 28px rgba(212,122,44,.85),
      0 0 55px rgba(212,122,44,.45);
  }

  /* 100% — position finale : lettre posée, dorée, rayonnante */
  100%{
    opacity:1;
    color:#fff;
    transform:translateY(-3px) scale(1.05);
    filter:none;
    text-shadow:
      0 0 22px var(--or),
      0 0 50px rgba(212,122,44,.65),
      0 0 100px rgba(212,122,44,.3),
      0 0 180px rgba(212,122,44,.12);
  }
}

/* ══════════════════════════════════════════
   FLASH D'IMPACT — trait lumineux au sol
══════════════════════════════════════════ */
@keyframes impactFlash{
  0%  { opacity:.9; transform:translateX(-50%) scaleX(1.6) scaleY(1.2); }
  40% { opacity:.7; transform:translateX(-50%) scaleX(2.4) scaleY(.8); }
  100%{ opacity:0;  transform:translateX(-50%) scaleX(3.5) scaleY(0); }
}

/* Particules d'impact */
@keyframes particleFly{
  0%  { opacity:1; transform:translate(0,0) scale(1); }
  100%{ opacity:0; transform:translate(var(--px),var(--py)) scale(0); }
}

/* Bouton suivant */
.next{
  padding:clamp(11px,2vw,14px) clamp(34px,7vw,54px);
  font-family:'Montserrat',sans-serif;font-weight:700;
  font-size:clamp(.76rem,1.7vw,.88rem);letter-spacing:.2em;text-transform:uppercase;
  color:#07090D;background:linear-gradient(135deg,var(--or2),var(--or));
  border:none;border-radius:50px;cursor:pointer;
  box-shadow:0 0 30px rgba(212,122,44,.3),0 4px 18px rgba(0,0,0,.45);
  transition:transform .2s,opacity .25s,box-shadow .2s;
  opacity:.25;pointer-events:none;
}
.next.on{opacity:1;pointer-events:all;}
.next.on:hover{transform:translateY(-2px);box-shadow:0 0 46px rgba(212,122,44,.5);}
.next:active{transform:scale(.97);}

/* ════════════════════════════
   FORMULAIRE
════════════════════════════ */
#s-form{overflow-y:auto;justify-content:flex-start;padding-top:clamp(30px,6vh,50px);}

.form-wrap{
  width:100%;max-width:460px;
  background:rgba(10,13,20,.9);
  border:1px solid rgba(212,122,44,.2);
  border-radius:22px;
  padding:clamp(22px,4vw,36px);
  backdrop-filter:blur(28px);
  display:flex;flex-direction:column;gap:14px;
  box-shadow:0 0 70px rgba(0,0,0,.65);
}

/* DOUR illuminé au-dessus */
.form-dour{display:flex;gap:clamp(4px,1.5vw,12px);justify-content:center;margin-bottom:2px;}
.fdl{
  font-family:'Anton',sans-serif;font-size:clamp(2rem,7vw,4rem);line-height:1;
  color:#fff;
  text-shadow:0 0 18px var(--or),0 0 45px rgba(212,122,44,.55),0 0 80px rgba(212,122,44,.25);
}

.ftitle{font-family:'Cinzel',serif;font-weight:700;font-size:clamp(.95rem,3vw,1.25rem);
  color:var(--or2);text-align:center;letter-spacing:.06em;}
.fsub{font-size:clamp(.68rem,1.5vw,.78rem);color:rgba(255,255,255,.38);text-align:center;line-height:1.65;}

.flabel{font-size:.64rem;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(212,122,44,.6);font-weight:700;display:block;margin-bottom:4px;}
.finput{
  width:100%;padding:10px 14px;
  font-family:'Montserrat',sans-serif;font-size:.9rem;color:#fff;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(212,122,44,.18);border-radius:10px;
  outline:none;transition:border-color .2s,box-shadow .2s;
}
.finput:focus{border-color:rgba(212,122,44,.5);box-shadow:0 0 16px rgba(212,122,44,.1);}
.finput::placeholder{color:rgba(255,255,255,.18);}

/* Facebook */
.fb{
  display:flex;align-items:center;justify-content:center;gap:9px;
  padding:12px 18px;
  background:linear-gradient(135deg,#1877F2,#0f5ec9);
  border-radius:12px;text-decoration:none;color:#fff;
  font-family:'Montserrat',sans-serif;font-weight:700;font-size:.8rem;letter-spacing:.06em;
  box-shadow:0 4px 24px rgba(24,119,242,.3);transition:transform .2s,box-shadow .2s;
}
.fb:hover{transform:translateY(-2px);box-shadow:0 6px 32px rgba(24,119,242,.45);}
.fb svg{width:18px;height:18px;fill:#fff;flex-shrink:0;}
.fb-note{font-size:.62rem;color:rgba(255,255,255,.22);text-align:center;margin-top:-8px;}

/* RGPD */
.rgpd{display:flex;align-items:flex-start;gap:10px;cursor:pointer;}
.rbox{
  width:17px;height:17px;min-width:17px;border-radius:4px;margin-top:2px;
  border:1px solid rgba(212,122,44,.28);background:rgba(255,255,255,.04);
  display:flex;align-items:center;justify-content:center;transition:all .2s;
}
.rbox.ok{background:var(--or);border-color:var(--or);}
.rbox.ok::after{content:'✓';font-size:.62rem;font-weight:900;color:#07090D;}
.rtxt{font-size:.66rem;color:rgba(255,255,255,.32);line-height:1.65;}
.rtxt a{color:rgba(212,122,44,.5);text-decoration:none;}

/* Bouton envoi */
.sbtn{
  width:100%;padding:13px 20px;
  font-family:'Montserrat',sans-serif;font-weight:700;
  font-size:.84rem;letter-spacing:.18em;text-transform:uppercase;
  color:#07090D;background:linear-gradient(135deg,var(--or2),var(--or));
  border:none;border-radius:50px;cursor:pointer;
  box-shadow:0 0 30px rgba(212,122,44,.28);
  transition:transform .2s,opacity .25s;
  opacity:.3;pointer-events:none;
}
.sbtn.on{opacity:1;pointer-events:all;}
.sbtn.on:hover{transform:translateY(-2px);}

/* ════════════════════════════
   ÉCRAN FINAL
════════════════════════════ */
#s-done{gap:clamp(14px,3vh,22px);}
.done-dour{display:flex;gap:clamp(4px,2vw,14px);}
.ddl{
  font-family:'Anton',sans-serif;font-size:clamp(3rem,12vw,7rem);line-height:1;
  color:#fff;
  text-shadow:0 0 30px var(--or),0 0 70px rgba(212,122,44,.55),0 0 120px rgba(212,122,44,.25);
}
.done-title{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(1.1rem,4vw,1.8rem);
  color:var(--or2);text-align:center;letter-spacing:.06em;}
.done-txt{font-size:clamp(.78rem,1.9vw,.95rem);color:rgba(255,255,255,.45);
  text-align:center;line-height:1.78;max-width:400px;}
.done-logo{width:clamp(78px,14vw,110px);filter:drop-shadow(0 0 24px rgba(212,122,44,.42));margin-top:6px;}
.done-sig{font-family:'Dancing Script',cursive;font-size:clamp(.74rem,1.7vw,.9rem);color:rgba(212,122,44,.28);}

/* Pied de page */
.footer{
  position:fixed;bottom:max(8px,env(safe-area-inset-bottom));
  left:0;right:0;text-align:center;z-index:400;pointer-events:none;
}
.footer span{font-family:'Dancing Script',cursive;font-size:.7rem;color:rgba(212,122,44,.14);}

/* ═══ OPTIMISATION PETITS MOBILES ═══ */
@media(max-width:380px){
  .q-logo-dour{width:46vw;max-height:16vh;}
  .dl{font-size:clamp(1.8rem,7.5vw,3rem);}
  .top-zone{gap:4px;}
  #s-quiz{padding-top:22px;padding-bottom:8px;}
  .q-badge{font-size:.52rem;}
}
@media(max-height:680px){
  .q-logo-dour{max-height:14vh;}
  .top-zone{gap:3px;}
  #s-quiz{padding-top:20px;}
}
</style>
</head>
<body>

<!-- FOND -->
<div id="bg"></div>
<div class="pbar-wrap"><div class="pbar" id="pb"></div></div>

<!-- ════════════════════════
     INTRO
════════════════════════ -->
<div class="sc on" id="s-intro">
  <p class="eyebrow">Participez au vote</p>
  <h1 class="main-title">Le Tour<br>de Dour</h1>
  <div class="sep"></div>
  <img class="intro-logo"
    src="https://base44.app/api/apps/69ed0a42be17008cf11027eb/files/mp/public/69ed0a42be17008cf11027eb/473857e8a_1a90dc4ba_logo-complet-800.png"
    alt="Js-Innov.IA"/>
  <p class="credit">Créé par <b>Js-Innov.IA</b> · www.jsinnovia.com</p>
  <button class="cta" onclick="start()">▶ &nbsp;Commencer l'expérience</button>
</div>

<!-- ════════════════════════
     QUIZ
════════════════════════ -->
<div class="sc" id="s-quiz">

  <!-- TOP : badge + logo Tour de Dour + question -->
  <div class="top-zone">
    <div class="q-badge" id="qbadge">Question 1 / 4</div>
    <img class="q-logo-dour"
      src="https://base44.app/api/apps/69ed0a42be17008cf11027eb/files/mp/public/69ed0a42be17008cf11027eb/468e07844_logo_tourdedour_v2_transparent.png"
      alt="Le Tour de Dour"/>
    <div class="q-text" id="qtext"></div>
  </div>

  <!-- MILIEU : hint + input -->
  <div class="mid-zone">
    <div class="q-hint" id="qhint"></div>
    <div id="qinput" style="width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;"></div>
  </div>

  <!-- BAS : lettres DOUR + bouton -->
  <div class="bot-zone">
    <div class="dour-row">
      <span class="dl" id="dD">D</span>
      <span class="dl" id="dO">O</span>
      <span class="dl" id="dU">U</span>
      <span class="dl" id="dR">R</span>
    </div>
    <button class="next" id="nextbtn" type="button" onclick="nextQ()">Continuer →</button>
  </div>
</div>

<!-- ════════════════════════
     FORMULAIRE
════════════════════════ -->
<div class="sc" id="s-form">
  <div class="form-wrap">

    <div class="form-dour">
      <span class="fdl">D</span><span class="fdl">O</span>
      <span class="fdl">U</span><span class="fdl">R</span>
    </div>

    <p class="ftitle">🎉 Merci pour votre participation !</p>
    <p class="fsub">Laissez vos coordonnées pour être informé(e) de la mascotte officielle du Tour de Dour.</p>

    <div>
      <label class="flabel">Prénom *</label>
      <input class="finput" id="fp" type="text" placeholder="Votre prénom" oninput="chk()"/>
    </div>
    <div>
      <label class="flabel">Nom *</label>
      <input class="finput" id="fn" type="text" placeholder="Votre nom" oninput="chk()"/>
    </div>
    <div>
      <label class="flabel">Email *</label>
      <input class="finput" id="fe" type="email" placeholder="votre@email.com" oninput="chk()"/>
    </div>

    <a class="fb"
       href="https://www.facebook.com/p/Le-Tour-de-Dour-dOlivier-Trevis-61564157237940"
       target="_blank" rel="noopener" onclick="fbDone()">
      <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      👍 Liker la page Facebook du Tour de Dour
    </a>
    <p class="fb-note">Cliquer valide votre participation</p>

    <div class="rgpd" onclick="togR()">
      <div class="rbox" id="rbox"></div>
      <p class="rtxt">J'accepte que mes données (prénom, nom, email) soient utilisées uniquement pour m'informer de la mascotte du Tour de Dour. Conformément au RGPD, suppression possible via <a href="mailto:contact@jsinnovia.com">contact@jsinnovia.com</a></p>
    </div>

    <button class="sbtn" id="sbtn" type="button" onclick="sub()">
      ✉️ &nbsp;Envoyer ma participation
    </button>
  </div>
</div>

<!-- ════════════════════════
     ÉCRAN FINAL
════════════════════════ -->
<div class="sc" id="s-done">
  <div class="done-dour">
    <span class="ddl">D</span><span class="ddl">O</span>
    <span class="ddl">U</span><span class="ddl">R</span>
  </div>
  <div class="done-title">Votre vote est enregistré !</div>
  <p class="done-txt">Merci de contribuer à l'identité du Tour de Dour.<br>Vous serez informé(e) dès que la mascotte sera révélée.<br><br>À très bientôt ! 🦅</p>
  <img class="done-logo"
    src="https://base44.app/api/apps/69ed0a42be17008cf11027eb/files/mp/public/69ed0a42be17008cf11027eb/473857e8a_1a90dc4ba_logo-complet-800.png"
    alt="Js-Innov.IA"/>
  <p class="done-sig">Powered by Js-Innov.IA · www.jsinnovia.com</p>
</div>

<div class="footer"><span>JS-Innov.IA · www.jsinnovia.com</span></div>

<script>
/* ── QUESTIONS ── */
const QS = [
  {
    letter:'D', badge:'Question 1 / 4',
    txt:'Quels mots représentent le mieux Dour ?',
    hint:'Quelques mots libres — ce qui vous vient naturellement ✍️',
    type:'free', ph:'Ex : convivialité, histoire, mines, verdure, festivals…'
  },
  {
    letter:'O', badge:'Question 2 / 4',
    txt:'Quels lieux ou symboles représentent Dour pour vous ?',
    hint:'Un bâtiment, un monument, un souvenir… ✍️',
    type:'free', ph:'Ex : le chevalement, la Grand-Place, le festival, la nature…'
  },
  {
    letter:'U', badge:'Question 3 / 4',
    txt:'Si Dour était une créature… laquelle ?',
    hint:'Décris-la librement en quelques mots ✍️',
    type:'free', ph:'Ex : un aigle fier, un renard malin, un lion chaleureux…'
  },
  {
    letter:'R', badge:'Question 4 / 4',
    txt:'La mascotte idéale de Dour devrait ressembler à…',
    hint:'Décrivez librement — apparence, caractère, histoire… ✍️',
    type:'free', ph:'Ex : un petit mineur courageux, un renard festif avec un casque…'
  }
];

/* ── ÉTAT ── */
let cur = 0, ans = {}, rgpd = false, fb = false, tw = null;
const $=id=>document.getElementById(id);

/* ── SCÈNE ── */
function go(id){
  document.querySelectorAll('.sc').forEach(s=>s.classList.remove('on'));
  $(id).classList.add('on');
}

/* ── FOND ── */
function setBg(step){
  // Éclaircir légèrement le fond au fil des questions
  const bri = [.07, .10, .13, .16, .20][step] || .07;
  $('bg').style.filter = \`brightness(\${bri}) saturate(.35)\`;
}

/* ── TYPEWRITER ── */
function tw_write(txt, el, cb){
  if(tw) clearTimeout(tw);
  el.innerHTML = '';
  let i = 0;
  const P = new Set(['.','!','?','…','—',',']);
  const cur = document.createElement('span'); cur.className='cur';
  function tick(){
    if(i<txt.length){
      el.textContent = txt.slice(0,++i);
      el.appendChild(cur);
      tw = setTimeout(tick, P.has(txt[i-1]) ? 80 : 25);
    } else {
      setTimeout(()=>cur.style.opacity='0', 800);
      if(cb) cb();
    }
  }
  tick();
}

/* ── LETTRES ── */
function litLetters(active){
  ['dD','dO','dU','dR'].forEach((id,i)=>{
    const el = $(id);
    el.classList.remove('lit','past');
    void el.offsetWidth; // reset animation

    if(i < active){
      el.classList.add('past');
    } else if(i === active){
      setTimeout(()=>{
        void el.offsetWidth;
        el.classList.add('lit');
        // Impact + particules à l'atterrissage (60% de l'animation = ~540ms)
        setTimeout(()=>{
          spawnImpact(el);
          spawnParticles(el);
        }, 520);
        // Passage en past après que la question soit finie
        setTimeout(()=>{
          if(el.classList.contains('lit')){
            el.classList.remove('lit');
            el.classList.add('past');
          }
        }, 6000);
      }, 60);
    }
  });
}

function spawnImpact(el){
  const rect = el.getBoundingClientRect();
  const imp = document.createElement('div');
  imp.style.position      = 'fixed';
  imp.style.left          = (rect.left + rect.width/2) + 'px';
  imp.style.top           = (rect.bottom - 2) + 'px';
  imp.style.width         = (rect.width * 1.4) + 'px';
  imp.style.height        = '5px';
  imp.style.background    = 'linear-gradient(90deg,transparent,rgba(240,201,130,.9),rgba(212,122,44,1),rgba(240,201,130,.9),transparent)';
  imp.style.borderRadius  = '50%';
  imp.style.pointerEvents = 'none';
  imp.style.zIndex        = '9998';
  imp.style.animation     = 'impactFlash .6s cubic-bezier(.22,1,.36,1) forwards';
  imp.style.boxShadow     = '0 0 20px rgba(212,122,44,.8), 0 0 40px rgba(212,122,44,.4)';
  document.body.appendChild(imp);
  setTimeout(()=>imp.remove(), 700);
}

function spawnParticles(el){
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.bottom;
  const count = 10;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    const angle = (Math.PI * (0.15 + .7 * i/(count-1))); // arc vers le bas
    const dist  = 30 + Math.random()*55;
    const px    = Math.cos(angle - Math.PI/2) * dist * (Math.random()>.5?1:-1);
    const py    = Math.abs(Math.sin(angle)) * dist * .6 + 8;
    const size  = 2 + Math.random()*3;
    const dur   = 400 + Math.random()*300;
    const clr   = Math.random()>.5 ? 'rgba(240,201,130,.9)' : 'rgba(212,122,44,.85)';

    p.style.position   = 'fixed';
    p.style.left       = cx + 'px';
    p.style.top        = cy + 'px';
    p.style.width      = size + 'px';
    p.style.height     = size + 'px';
    p.style.borderRadius = '50%';
    p.style.background = clr;
    p.style.boxShadow  = '0 0 6px ' + clr;
    p.style.pointerEvents = 'none';
    p.style.zIndex     = '9997';
    p.style.setProperty('--px', px+'px');
    p.style.setProperty('--py', py+'px');
    p.style.animation  = 'particleFly '+dur+'ms cubic-bezier(.22,1,.36,1) forwards';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), dur+100);
  }
}

/* ── PROGRESS ── */
function prog(pct){ $('pb').style.width=pct+'%'; }

/* ── START ── */
function start(){
  go('s-quiz');
  cur=0; ans={};
  setBg(0); prog(0);
  renderQ();
}

/* ── RENDER QUESTION ── */
function renderQ(){
  const q = QS[cur];
  $('qbadge').textContent = q.badge;
  // PAS de litLetters ici — la lettre tombe APRÈS la réponse (dans nextQ)
  prog((cur / QS.length) * 100);
  setBg(cur);

  const qi = $('qinput');
  qi.innerHTML = '';
  const nb = $('nextbtn');
  nb.classList.remove('on');
  ans[cur] = '';

  const hint = $('qhint');
  hint.style.opacity = '0';

  tw_write(q.txt, $('qtext'), ()=>{
    hint.textContent = q.hint;
    hint.style.transition = 'opacity .45s';
    hint.style.opacity = '1';
    buildInput(q, qi, nb);
  });
}

/* ── INPUT ── */
function buildInput(q, container, nb){
  if(q.type==='free'){
    const ta = document.createElement('textarea');
    ta.className = 'free-ta';
    ta.placeholder = q.ph;
    ta.rows = 2;
    ta.style.width = '100%';
    ta.style.maxWidth = '540px';
    ta.oninput = ()=>{
      ans[cur] = ta.value.trim();
      nb.classList.toggle('on', ta.value.trim().length>=2);
    };
    container.appendChild(ta);
    setTimeout(()=>ta.focus(), 100);
  }
  else if(q.type==='choice'){
    const grid = document.createElement('div');
    grid.className = 'opts';
    q.opts.forEach(o=>{
      const btn = document.createElement('button');
      btn.type='button'; btn.className='opt';
      btn.innerHTML=\`<span style="font-size:1.5em;flex-shrink:0">\${o.icon}</span>
        <span><strong>\${o.lbl}</strong><br>
        <small style="opacity:.55;font-size:.74em;font-weight:400">\${o.sub}</small></span>\`;
      btn.onclick=()=>{
        grid.querySelectorAll('.opt').forEach(b=>b.classList.remove('sel'));
        btn.classList.add('sel');
        ans[cur]=o.lbl; nb.classList.add('on');
      };
      grid.appendChild(btn);
    });
    container.appendChild(grid);
  }
}

/* ── SUIVANT ── */
function nextQ(){
  if(!$('nextbtn').classList.contains('on')) return;

  // Désactiver le bouton immédiatement
  const nb = $('nextbtn');
  nb.classList.remove('on');
  nb.style.opacity = '0';

  // La lettre qui correspond à la question RÉPONDUE tombe maintenant
  // Q1(cur=0) → lettre D(index 0), Q2(cur=1) → O, etc.
  const letterIdx = cur;
  const letterIds = ['dD','dO','dU','dR'];
  const el = $(letterIds[letterIdx]);

  // Reset + animation chute
  el.classList.remove('lit','past');
  void el.offsetWidth;
  el.classList.add('lit');

  // Impact + particules au timing d'atterrissage (520ms)
  setTimeout(()=>{
    spawnImpact(el);
    spawnParticles(el);
  }, 520);

  cur++;

  if(cur >= QS.length){
    // Après la dernière lettre R → cascade finale puis formulaire
    // Lettres déjà tombées passent en past
    setTimeout(()=>{
      letterIds.forEach((id, i)=>{
        if(i < letterIdx){
          // déjà en past, ok
        }
      });
      // Lettre R reste lit pendant transition
      setTimeout(()=>{
        prog(100);
        // Passer toutes en past puis go form
        letterIds.forEach(id=>{
          const e=$(id);
          e.classList.remove('lit');
          e.classList.add('past');
        });
        go('s-form');
      }, 400);
    }, 700);
  } else {
    // Attendre la fin de l'animation chute (900ms) puis afficher Q suivante
    setTimeout(()=>{
      // Passer la lettre qui vient de tomber en état "past" (stable)
      el.classList.remove('lit');
      el.classList.add('past');
      nb.style.opacity = '';
      // Petite pause dramatique puis question suivante
      setTimeout(()=>{
        renderQ();
      }, 180);
    }, 900);
  }
}

/* ── FORMULAIRE ── */
function fbDone(){ fb=true; chk(); }
function togR(){
  rgpd=!rgpd;
  $('rbox').classList.toggle('ok',rgpd);
  chk();
}
function chk(){
  const ok = $('fp').value.trim() && $('fn').value.trim()
           && $('fe').value.includes('@') && rgpd;
  $('sbtn').classList.toggle('on',!!ok);
}

async function sub(){
  if(!$('sbtn').classList.contains('on')) return;
  const btn=$('sbtn');
  btn.textContent='⏳ Envoi…';
  btn.style.opacity='.5'; btn.style.pointerEvents='none';

  const payload={
    prenom: $('fp').value.trim(),
    nom:    $('fn').value.trim(),
    email:  $('fe').value.trim(),
    profil_dominant: ans[2]||'',
    score_minier:  ans[2]==='Aigle'?3:0,
    score_nature:  ans[2]==='Chêne'?3:0,
    score_festif:  ans[2]==='Lion'?3:0,
    score_moderne: ans[2]==='Renard'?3:0,
    message_libre: ans[3]||'',
    reponses_detail: JSON.stringify({
      q1_mots:      ans[0]||'',
      q2_lieux:     ans[1]||'',
      q3_creature:  ans[2]||'',
      q4_mascotte:  ans[3]||''
    }),
    source:'Tour de Dour v2'
  };

  try{
    await fetch(
      'https://api.base44.com/api/apps/6a0371a87c9257126b051d5a/functions/saveMascotteReponse',
      {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}
    );
  }catch(e){ console.log('local', payload); }

  go('s-done'); prog(100);
}
</script>
</body>
</html>
`;

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
      <iframe
        srcDoc={MASCOTTE_HTML}
        title="Questionnaire Mascotte — Tour de Dour"
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay"
        sandbox="allow-scripts allow-forms allow-same-origin"
      />

      <motion.button
        onClick={() => navigate("/")}
        animate={{ opacity: showBack ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{
          background: "rgba(0,0,0,0.65)",
          border: "1px solid rgba(212,122,44,0.4)",
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
