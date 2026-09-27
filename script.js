// ================================
// MYFLIX — Main Script
// ================================
document.addEventListener("DOMContentLoaded", function () {

  // ══════════════════════════════════════
  // PROFILE SCREEN — Who's Watching?
  // ══════════════════════════════════════
  const psScreen   = document.getElementById("ps-screen");
  const psSplash   = document.getElementById("ps-splash");
  const psWatching = document.getElementById("ps-watching");
  let profileDone  = false;

  function enterMainContent() {
    if (profileDone) return;
    profileDone = true;
    psScreen.classList.add("ps-fade-out");
    setTimeout(() => { psScreen.style.display = "none"; }, 850);
    setTimeout(() => launchConfetti(160), 400);
    setTimeout(tryStartMusic, 700);
    setTimeout(initSparkles, 500);
  }

  // Logo shows for ~2.2s, then transition to Who's Watching
  setTimeout(() => {
    psSplash.style.transition = "opacity .4s";
    psSplash.style.opacity = "0";
    setTimeout(() => {
      psSplash.style.display = "none";
      psWatching.style.display = "block";
    }, 400);
  }, 2200);

  // Profile click
  document.querySelectorAll(".ps-profile").forEach(p => {
    p.addEventListener("click", () => {
      if (profileDone) return;
      p.classList.add("selected");
      setTimeout(enterMainContent, 480);
    });
  });
  document.querySelector(".ps-manage-btn").addEventListener("click", enterMainContent);

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 60));

  // ── HERO VIDEO FALLBACK ──
  const hv = document.getElementById("hero-video");
  const hf = document.getElementById("hero-fallback");
  if (hv) {
    hv.addEventListener("canplay", () => { hv.classList.add("loaded"); hf.style.opacity = "0"; });
    hv.addEventListener("error",   () => { hv.style.display = "none"; });
  }

  // ── VIDEO MODAL ──
  const videoModal = document.getElementById("video-modal");
  const mainVideo  = document.getElementById("main-video");
  const vmOverlay  = document.getElementById("vm-overlay");
  const vmClose    = document.getElementById("vm-close");
  function openVideo() { videoModal.classList.add("active"); document.body.style.overflow = "hidden"; mainVideo.play().catch(() => {}); }
  function closeVideo() { videoModal.classList.remove("active"); document.body.style.overflow = ""; mainVideo.pause(); mainVideo.currentTime = 0; }
  document.getElementById("openVideoBtn").addEventListener("click", openVideo);
  vmClose.addEventListener("click", closeVideo);
  vmOverlay.addEventListener("click", closeVideo);

  // ── MORE INFO MODAL ──
  const miModal   = document.getElementById("mi-modal");
  const miScrim   = document.getElementById("mi-scrim");
  const miClose   = document.getElementById("mi-close-btn");
  const miPlayBtn = document.getElementById("mi-play-btn");
  function openMoreInfo() { miModal.classList.add("active"); document.body.style.overflow = "hidden"; }
  function closeMoreInfo() { miModal.classList.remove("active"); document.body.style.overflow = ""; }
  document.getElementById("openMoreInfoBtn").addEventListener("click", openMoreInfo);
  miClose.addEventListener("click", closeMoreInfo);
  miScrim.addEventListener("click", closeMoreInfo);
  miPlayBtn.addEventListener("click", function() { closeMoreInfo(); setTimeout(openVideo, 200); });

  // ── LIGHTBOX ──
  const lightbox = document.getElementById("lightbox");
  const lbImg    = document.getElementById("lb-img");
  const lbCap    = document.getElementById("lb-caption");
  const lbOv     = document.getElementById("lb-overlay");
  const lbClose  = document.getElementById("lb-close");
  document.querySelectorAll(".photo-card").forEach(card => {
    card.addEventListener("click", () => {
      const photo = card.dataset.photo || ""; const caption = card.dataset.caption || "";
      if (photo) { lbImg.src = photo; lbImg.style.display = "block"; } else { lbImg.style.display = "none"; }
      lbCap.textContent = caption;
      lightbox.classList.add("active"); document.body.style.overflow = "hidden";
    });
  });
  function closeLB() { lightbox.classList.remove("active"); document.body.style.overflow = ""; }
  lbOv.addEventListener("click", closeLB);
  lbClose.addEventListener("click", closeLB);

  // ── ESC KEY ──
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeVideo(); closeMoreInfo(); closeLB(); } });

  // ── SCROLL REVEAL ──
  const io = new IntersectionObserver(
    entries => entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("visible"); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // ── 30 REASONS ──
  const reasons = [
    "Your smile that always brightens the day",
    "Your laughter that is impossibly contagious",
    "The way you care for everyone around you",
    "Your courage in facing life",
    "The sincerity in the way you love",
    "Your spirit that never fades",
    "The way you listen with full attention",
    "Your honesty that I deeply admire",
    "Your calm when I am in a panic",
    "The way you make me feel safe",
    "Your passion for the things you love",
    "Your creativity that constantly inspires me",
    "The patience you have with me",
    "Every sacrifice you make without complaint",
    "Your constant drive to become better",
    "Your intelligence that never stops impressing me",
    "The way you always see the good in things",
    "Your genuine gentleness",
    "How fiercely you protect the ones you love",
    "Your humor that always makes me smile",
    "The way you fight without ever giving up",
    "The sincerity in everything you do",
    "The way you are fully present in every moment",
    "The warmth I always feel from you",
    "How you create beautiful memories together",
    "Your trust that makes me want to be better",
    "The way you are completely, unapologetically yourself",
    "Your choice to keep growing",
    "The way you inspire without even knowing it",
    "Your presence in my life — that is what I am most grateful for"
  ];
  const grid = document.getElementById("reasons-grid");
  reasons.forEach((r, i) => {
    const el = document.createElement("div");
    el.className = "reason-card";
    el.innerHTML = "<span class=\"reason-num\">" + (i + 1) + "</span><p class=\"reason-text\">" + r + "</p>";
    grid.appendChild(el);
  });

  // ══════════════════════════════════════
  // SPARKLE SYSTEM (init after profile)
  // ══════════════════════════════════════
  const SCOLS = ["#FFD700","#FFFFFF","#FF6B9D","#FFA500","#FFE4B5","#E0C8FF","#FF1493"];
  const BURST = ["\u2726","\u2605","\u2736","\u2665","\u2734","\u2739"];
  let sparkCanvas, sCtx, sparks = [];

  function initSparkles() {
    sparkCanvas = document.createElement("canvas");
    sparkCanvas.id = "sparkle-canvas";
    document.body.insertBefore(sparkCanvas, document.body.firstChild);
    sCtx = sparkCanvas.getContext("2d");
    function rsz() { sparkCanvas.width = window.innerWidth; sparkCanvas.height = window.innerHeight; }
    rsz(); window.addEventListener("resize", rsz);
    for (let i = 0; i < 28; i++) sparks.push(mkAmbient());
    animSparkCanvas();

    let lastST = 0;
    window.addEventListener("scroll", () => {
      if (window.scrollY < 200) return;
      const now = Date.now(); if (now - lastST < 110) return; lastST = now;
      const n = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < n; i++) {
        setTimeout(() => {
          const col = SCOLS[Math.floor(Math.random() * SCOLS.length)];
          const size = Math.random() * 13 + 8;
          const dur = (Math.random() * .9 + 1.1).toFixed(2);
          const el = document.createElement("span");
          el.className = "burst-spark";
          el.textContent = BURST[Math.floor(Math.random() * BURST.length)];
          el.style.cssText = "left:" + (Math.random() * window.innerWidth) + "px;top:" + (20 + Math.random() * (window.innerHeight - 60)) + "px;font-size:" + size + "px;color:" + col + ";text-shadow:0 0 10px " + col + ";animation-duration:" + dur + "s;";
          document.body.appendChild(el);
          setTimeout(() => el.remove(), parseFloat(dur) * 1000 + 100);
          sparks.push({ x: Math.random() * sparkCanvas.width, y: Math.random() * sparkCanvas.height, r: Math.random() * 5 + 3, color: col, vx: (Math.random() - .5) * 2.5, vy: -(Math.random() * 3 + 1), life: 0, lifeSpeed: .018 + Math.random() * .01, ambient: false });
        }, i * 60);
      }
    });
  }

  function mkAmbient() {
    return { x: Math.random() * (window.innerWidth||800), y: Math.random() * (window.innerHeight||600),
      r: Math.random() * 2.2 + .8, color: SCOLS[Math.floor(Math.random() * SCOLS.length)],
      phase: Math.random() * Math.PI * 2, speed: Math.random() * .012 + .006,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, ambient: true };
  }

  function drawDot(x, y, r, col, alpha) {
    if (!sCtx) return;
    sCtx.save(); sCtx.globalAlpha = alpha; sCtx.fillStyle = col;
    sCtx.shadowColor = col; sCtx.shadowBlur = r * 4;
    sCtx.beginPath(); sCtx.arc(x, y, r, 0, Math.PI * 2); sCtx.fill();
    sCtx.restore();
  }

  function animSparkCanvas() {
    if (!sCtx) return;
    sCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    sparks = sparks.filter(s => s.ambient || s.life < 1);
    sparks.forEach(s => {
      if (s.ambient) {
        s.phase += s.speed; s.x += s.vx; s.y += s.vy;
        if (s.x < -10) s.x = sparkCanvas.width + 10;
        if (s.x > sparkCanvas.width + 10) s.x = -10;
        if (s.y < -10) s.y = sparkCanvas.height + 10;
        if (s.y > sparkCanvas.height + 10) s.y = -10;
        drawDot(s.x, s.y, s.r, s.color, (Math.sin(s.phase) * .5 + .5) * .5 + .05);
      } else {
        s.life += s.lifeSpeed; s.x += s.vx; s.y += s.vy; s.vy -= .05;
        let a = s.life < .25 ? s.life / .25 : s.life < .65 ? 1 : 1 - (s.life - .65) / .35;
        drawDot(s.x, s.y, s.r, s.color, Math.max(0, a) * .9);
      }
    });
    requestAnimationFrame(animSparkCanvas);
  }

  // ══════════════════════════════════════
  // MUSIC
  // ══════════════════════════════════════
  const bgMusic     = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicLabel  = document.getElementById("music-label");
  const mPlay       = document.getElementById("music-icon-play");
  const mPause      = document.getElementById("music-icon-pause");

  function setMusicUI(playing) {
    musicToggle.classList.toggle("playing", playing);
    mPlay.style.display  = playing ? "none"  : "block";
    mPause.style.display = playing ? "block" : "none";
    if (playing && musicLabel) musicLabel.classList.add("hidden");
  }

  function tryStartMusic() {
    bgMusic.volume = 0.45;
    bgMusic.play().then(() => setMusicUI(true)).catch(() => {
      const unlock = () => { bgMusic.play().then(() => setMusicUI(true)).catch(() => {}); };
      document.addEventListener("click",      unlock, { once: true });
      document.addEventListener("touchstart", unlock, { once: true });
    });
  }

  musicToggle.addEventListener("click", e => {
    e.stopPropagation();
    if (bgMusic.paused) { bgMusic.play().then(() => setMusicUI(true)).catch(() => {}); }
    else { bgMusic.pause(); setMusicUI(false); }
  });

  // ══════════════════════════════════════
  // CONFETTI
  // ══════════════════════════════════════
  const canvas = document.getElementById("confetti-canvas");
  const ctx    = canvas.getContext("2d");
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener("resize", () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
  let pts = [];
  const CCOLS = ["#E50914","#FF6B9D","#FFD700","#FF8C00","#FFFFFF","#FF69B4","#FFA500"];
  function mkPt() {
    return { x: Math.random() * W, y: -14, w: Math.random() * 10 + 5, h: Math.random() * 5 + 3,
      c: CCOLS[Math.floor(Math.random() * CCOLS.length)], vx: (Math.random() - .5) * 3.5,
      vy: Math.random() * 3 + 1.8, r: Math.random() * Math.PI * 2, rs: (Math.random() - .5) * .12, op: 1 };
  }
  function animC() {
    ctx.clearRect(0, 0, W, H); pts = pts.filter(p => p.op > 0 && p.y < H + 20);
    pts.forEach(p => {
      ctx.save(); ctx.translate(p.x + p.w / 2, p.y + p.h / 2); ctx.rotate(p.r);
      ctx.globalAlpha = p.op; ctx.fillStyle = p.c; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h); ctx.restore();
      p.x += p.vx; p.y += p.vy; p.r += p.rs; if (p.y > H * .72) p.op -= .016;
    });
    if (pts.length > 0) requestAnimationFrame(animC);
  }
  function launchConfetti(n) {
    let done = 0;
    const iv = setInterval(() => { for (let i = 0; i < 6; i++) pts.push(mkPt()); done += 6; if (done >= n) clearInterval(iv); }, 28);
    animC();
  }

});
