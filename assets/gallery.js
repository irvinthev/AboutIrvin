
// V6.2 art interaction: user-initiated lightbox, reduced-motion-aware hallway depth.
(()=>{
 const stage=document.querySelector('.hallway-stage');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let pending=false;
 const update=()=>{pending=false;if(!stage||reduced.matches||window.innerWidth<651)return;
  const rect=stage.getBoundingClientRect(),extent=window.innerHeight+rect.height;
  const fraction=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/extent));
  stage.style.setProperty('--hallway-scroll',((fraction-.5)*44).toFixed(1)+'px');
 };
 window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});update();
 const dialog=document.getElementById('art-lightbox'),img=document.getElementById('lightbox-image'),title=document.getElementById('lightbox-title'),meta=document.getElementById('lightbox-meta');
 let previous=null;
 document.querySelectorAll('[data-art]').forEach(button=>button.addEventListener('click',()=>{
  previous=button;const source=button.querySelector('img');
  img.src=source.src;img.alt=source.alt;
  title.textContent=button.querySelector('b').textContent;
  meta.textContent=button.querySelector('small').textContent+' / Original by Irvin Thevaranjan';
  if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
 }));
 dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 dialog.addEventListener('close',()=>{img.removeAttribute('src');previous?.focus()});
})();
