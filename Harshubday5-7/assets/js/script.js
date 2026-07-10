/* ── PETALS ── */
(function(){
  const c = document.getElementById('petals');
  const items = ['🌸','💕','✨','🌷','💖','🌺','🥀'];
  function spawn(){
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = items[Math.floor(Math.random()*items.length)];
    el.style.left = Math.random()*100+'vw';
    const d = 9+Math.random()*14;
    el.style.animationDuration = d+'s';
    el.style.animationDelay = Math.random()*3+'s';
    el.style.fontSize = (.7+Math.random()*1)+'rem';
    c.appendChild(el);
    setTimeout(()=>el.remove(),(d+3)*1000);
  }
  for(let i=0;i<10;i++) spawn();
  setInterval(spawn,700);
})();

/* ── SCROLL REVEAL ── */
const io = new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ── ENVELOPE MODAL ── */
function openEnvelope(){
  document.getElementById('envModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  launchFireworks();
}
function closeEnvelope(){
  document.getElementById('envModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('envModal').addEventListener('click',function(e){
  if(e.target===this) closeEnvelope();
});

/* ── FIREWORKS ── */
const cv = document.getElementById('fw');
const cx = cv.getContext('2d');
let pts = [];
function resize(){ cv.width=innerWidth; cv.height=innerHeight; }
window.addEventListener('resize',resize); resize();

function explode(x,y){
  const cols=['#c94060','#f2c4ce','#c9924a','#f5e6c8','#fff','#ff7096'];
  for(let i=0;i<70;i++){
    const a=(Math.PI*2/70)*i, sp=2+Math.random()*6;
    pts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,
      life:1,decay:.013+Math.random()*.02,
      color:cols[~~(Math.random()*cols.length)],size:2+Math.random()*3});
  }
}
function launchFireworks(){
  for(let i=0;i<8;i++)
    setTimeout(()=>explode(innerWidth*(.2+Math.random()*.6),innerHeight*(.15+Math.random()*.5)),i*200);
}
(function loop(){
  requestAnimationFrame(loop);
  if(!pts.length){cx.clearRect(0,0,cv.width,cv.height);return;}
  cx.fillStyle='rgba(0,0,0,.12)';cx.fillRect(0,0,cv.width,cv.height);
  pts=pts.filter(p=>p.life>0);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=.09;p.life-=p.decay;
    cx.globalAlpha=p.life;cx.fillStyle=p.color;
    cx.beginPath();cx.arc(p.x,p.y,p.size,0,Math.PI*2);cx.fill();
  });
  cx.globalAlpha=1;
  if(!pts.length)cx.clearRect(0,0,cv.width,cv.height);
})();

/* auto-launch on load */
setTimeout(launchFireworks,1600);

/* ── MOBILE ONLY MEMORY GALLERY EXPAND ──
   Mobile/tablet view la photo tap pannina full screen la show aagum.
   Desktop la original hover design same ah irukkum.
*/
(function(){
  var gallery = document.querySelector('#gallery .photo-grid');
  if (!gallery) return;

  var viewer = document.createElement('div');
  viewer.className = 'mobile-photo-viewer';
  viewer.innerHTML = `
    <button class="mobile-photo-viewer-close" type="button" aria-label="Close photo">×</button>
    <img src="" alt="Expanded memory photo">
    <div class="mobile-photo-viewer-caption"></div>
  `;
  document.body.appendChild(viewer);

  var viewerImg = viewer.querySelector('img');
  var viewerCaption = viewer.querySelector('.mobile-photo-viewer-caption');
  var closeBtn = viewer.querySelector('.mobile-photo-viewer-close');

  function isMobileView(){
    return window.innerWidth <= 1024;
  }

  function openPhoto(slot){
    if (!isMobileView()) return;

    var img = slot.querySelector('img');
    var caption = slot.querySelector('.p-caption');

    if (!img) return;

    viewerImg.src = img.src;
    viewerImg.alt = img.alt || 'Expanded memory photo';
    viewerCaption.textContent = caption ? caption.textContent.trim() : '';
    viewer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePhoto(){
    viewer.classList.remove('open');
    viewerImg.src = '';
    document.body.style.overflow = '';
  }

  gallery.querySelectorAll('.p-slot').forEach(function(slot){
    slot.addEventListener('click', function(){
      openPhoto(slot);
    });
  });

  closeBtn.addEventListener('click', closePhoto);

  viewer.addEventListener('click', function(event){
    if (event.target === viewer) {
      closePhoto();
    }
  });

  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') {
      closePhoto();
    }
  });

  window.addEventListener('resize', function(){
    if (!isMobileView()) {
      closePhoto();
    }
  });
})();

/* ── BIRTHDAY BACKGROUND MUSIC ── */

var birthdaySong = document.getElementById("birthdaySong");
var musicButton = document.getElementById("musicButton");
var musicStarted = false;

/* Music volume */
birthdaySong.volume = 0.5;

/* Mobile/browser autoplay block aagum.
   User first time page click pannumbodhu song start aagum. */
function startBirthdayMusic() {
  if (musicStarted === false) {
    birthdaySong.play()
      .then(function () {
        musicStarted = true;
        musicButton.innerHTML = "🔊";
        musicButton.classList.add("playing");
      })
      .catch(function () {
        musicButton.innerHTML = "🎵";
      });
  }
}

/* First click or touch la music start */
document.addEventListener("click", startBirthdayMusic, {
  once: true
});

document.addEventListener("touchstart", startBirthdayMusic, {
  once: true
});

/* Music button play / pause */
musicButton.addEventListener("click", function (event) {
  event.stopPropagation();

  if (birthdaySong.paused === true) {
    birthdaySong.play();

    musicButton.innerHTML = "🔊";
    musicButton.classList.add("playing");
    musicStarted = true;
  } else {
    birthdaySong.pause();

    musicButton.innerHTML = "🔇";
    musicButton.classList.remove("playing");
  }
});
