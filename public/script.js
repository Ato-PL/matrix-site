// Matrix rain — binarne 0/1 stylizowane na obrazek
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener('resize', resize);

// Znakowy zestaw — użyjemy 0 i 1 do efektu binarnego
const chars = '01'.split('');
const fontSize = Math.max(12, Math.floor(window.innerWidth / 100)); // skalowanie czcionki
let columns = Math.floor(canvas.width / fontSize);

// tablica wysokości "spadków" dla każdej kolumny
let drops = new Array(columns).fill(1);

function resetDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}
addEventListener('resize', () => {
  // drobne opóźnienie by uniknąć wielokrotnych resetów podczas resize
  setTimeout(resetDrops, 50);
});

function draw() {
  // półprzezroczysty czarny prostokąt by tworzyć efekt śladu
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${fontSize}px monospace`;
  // jaskrawa zieleń typowa dla Matrixa
  ctx.fillStyle = '#00ff41';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // rysuj znak
    ctx.fillText(text, x, y);

    // losowo resetuj drop gdy spadł poza ekran, dając efekt losowych przerw
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(draw);
}

// opcjonalne: większy kontrast i jaśniejsze "head" znaku — malutkie rozjaśnienie na górze spadu
// (prosty sposób: co kilka klatek narysować biały znak na głowie spadu) — pomijam by kod był prosty.

draw();
// --- FULLSCREEN HANDLER ---
const btn = document.getElementById('fullscreen-btn');

btn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Fullscreen error: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

