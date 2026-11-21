(()=>{const $=id=>document.getElementById(id);
// Scrolling fills the career spine as the story passes through the viewport.
const career=$('career-timeline');function updateCareer(){if(!career)return;const r=career.getBoundingClientRect();const pct=Math.max(0,Math.min(100,((innerHeight*.55-r.top)/Math.max(r.height,1))*100));career.style.setProperty('--career-progress',pct+'%')}
addEventListener('scroll',updateCareer,{passive:true});addEventListener('resize',updateCareer);updateCareer();
})();