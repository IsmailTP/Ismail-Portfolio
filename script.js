// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Typed line
(function typed(){
  const el = document.querySelector('.typed');
  if(!el) return;
  const phrases = JSON.parse(el.getAttribute('data-phrases')||'[]');
  let i=0,j=0,typing=true;
  const speed=55, hold=1200, erase=24;
  function step(){
    const p = phrases[i]||'';
    if(typing){
      el.textContent = p.slice(0, j+1); j++;
      if(j===p.length){ typing=false; setTimeout(step, hold); return; }
      setTimeout(step, speed);
    }else{
      el.textContent = p.slice(0, j-1); j--;
      if(j===0){ typing=true; i=(i+1)%phrases.length; }
      setTimeout(step, erase);
    }
  }
  step();
})();

// Reveal on scroll
(function reveal(){
  const items = document.querySelectorAll('.section-observe');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold:0.2});
  items.forEach(el=>io.observe(el));
})();
