// ===========================
// AULIAFLIX — Story Page Script
// ===========================
document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slide");
  const total = slides.length;
  let current = 0;
  let busy = false;

  const progressBar = document.getElementById("progress-bar");
  const navPrev = document.getElementById("nav-prev");
  const navNext = document.getElementById("nav-next");
  const dotsWrap = document.getElementById("slide-dots");

  // ── Create Dots ──
  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot-btn" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "Slide " + (i + 1));
    d.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(d);
  });

  // ── Go to Slide ──
  function goTo(idx) {
    if (busy || idx === current || idx < 0 || idx >= total) return;
    busy = true;
    slides[current].classList.remove("active");
    current = idx;
    slides[current].classList.add("active");
    updateUI();
    if (current === total - 1) launchFinaleConfetti();
    setTimeout(() => { busy = false; }, 900);
  }

  function updateUI() {
    progressBar.style.width = ((current + 1) / total * 100) + "%";
    navPrev.disabled = current === 0;
    navNext.disabled = current === total - 1;
    document.querySelectorAll(".dot-btn").forEach((d, i) => d.classList.toggle("active", i === current));
  }

  updateUI();
  navPrev.addEventListener("click", () => goTo(current - 1));
  navNext.addEventListener("click", () => goTo(current + 1));

  // ── Keyboard ──
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
    if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goTo(current - 1);
  });

  // ── Touch Swipe ──
  let tx = 0, ty = 0;
  document.addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; });
  document.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) dx < 0 ? goTo(current + 1) : goTo(current - 1);
  });

  // ── Auto-slide ──
  let autoInterval = null;
  const autoBtn = document.getElementById("auto-btn");
  const AUTO_DELAY = 6000;

  function startAuto() {
    stopAuto();
    autoInterval = setInterval(() => {
      if (current < total - 1) goTo(current + 1);
      else stopAuto();
    }, AUTO_DELAY);
    autoBtn.classList.add("running");
    autoBtn.title = "Hentikan Auto";
    autoBtn.textContent = "⏸";
  }

  function stopAuto() {
    clearInterval(autoInterval);
    autoInterval = null;
    autoBtn.classList.remove("running");
    autoBtn.title = "Auto Slide";
    autoBtn.textContent = "▶";
  }

  autoBtn.addEventListener("click", () => { autoInterval ? stopAuto() : startAuto(); });

  // ── Music ──
  const bgMusic = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  let playing = false;

  musicBtn.addEventListener("click", () => {
    if (playing) {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
      musicBtn.textContent = "🎵";
      playing = false;
    } else {
      bgMusic.play().then(() => {
        musicBtn.classList.add("playing");
        musicBtn.textContent = "🔊";
        playing = true;
      }).catch(() => {
        alert("Tidak bisa memutar musik.\nPastikan file lagu ada di assets/audio/our-song.mp3");
      });
    }
  });

  // ── Finale Confetti ──
  let confettiCanvas = null;
  function launchFinaleConfetti() {
    if (confettiCanvas) return;
    confettiCanvas = document.createElement("canvas");
    confettiCanvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999";
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    document.body.appendChild(confettiCanvas);
    const c = confettiCanvas.getContext("2d");
    const W = confettiCanvas.width, H = confettiCanvas.height;
    const COLORS = ["#E50914","#FF6B9D","#FFD700","#FF8C00","#FFFFFF","#FF69B4","#FFA500"];
    let pts = [];
    function mk() {
      return { x:Math.random()*W, y:-14, w:Math.random()*12+6, h:Math.random()*6+4,
        color:COLORS[Math.floor(Math.random()*COLORS.length)],
        vx:(Math.random()-.5)*4, vy:Math.random()*4+2,
        rot:Math.random()*Math.PI*2, rs:(Math.random()-.5)*.15, op:1 };
    }
    let spawned = 0;
    const iv = setInterval(() => {
      for(let i=0;i<6;i++) pts.push(mk());
      spawned+=6; if(spawned>=300) clearInterval(iv);
    }, 50);
    function draw() {
      c.clearRect(0,0,W,H);
      pts = pts.filter(p=>p.op>0&&p.y<H+20);
      pts.forEach(p=>{
        c.save(); c.translate(p.x+p.w/2,p.y+p.h/2); c.rotate(p.rot);
        c.globalAlpha=p.op; c.fillStyle=p.color;
        c.fillRect(-p.w/2,-p.h/2,p.w,p.h); c.restore();
        p.x+=p.vx; p.y+=p.vy; p.rot+=p.rs;
        if(p.y>H*.72) p.op-=.016;
      });
      if(pts.length>0||spawned<300) requestAnimationFrame(draw);
    }
    draw();
  }

});
