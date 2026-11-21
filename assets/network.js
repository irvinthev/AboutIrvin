(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas=document.getElementById('network-canvas');const panel=canvas?.parentElement;if(!canvas||!panel)return;
const ctx=canvas.getContext('2d');if(!ctx)return;
const points=[{x:.13,y:.30,s:3},{x:.30,y:.19,s:2},{x:.55,y:.21,s:2},{x:.79,y:.30,s:3},{x:.86,y:.54,s:2},{x:.61,y:.69,s:3},{x:.37,y:.59,s:3},{x:.16,y:.68,s:2},{x:.46,y:.40,s:4},{x:.67,y:.47,s:4},{x:.30,y:.40,s:2},{x:.72,y:.79,s:2},{x:.21,y:.49,s:2},{x:.50,y:.82,s:2},{x:.90,y:.18,s:2}];
const links=[[0,1],[0,10],[0,12],[1,2],[1,8],[2,3],[2,8],[2,9],[3,4],[3,9],[4,9],[4,11],[5,6],[5,9],[5,11],[5,13],[6,7],[6,8],[6,10],[7,12],[8,9],[8,10],[8,13],[9,11],[10,12],[11,13],[3,14]];
let w=0,h=0,dpr=1,frame=0,visible=true;const pointer={x:.51,y:.48,active:false};
function resize(){const box=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=box.width;h=box.height;canvas.width=Math.max(1,Math.floor(w*dpr));canvas.height=Math.max(1,Math.floor(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0)}
const ro=new ResizeObserver(resize);ro.observe(canvas);resize();
panel.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const box=panel.getBoundingClientRect();pointer.x=(e.clientX-box.left)/box.width;pointer.y=(e.clientY-box.top)/box.height;pointer.active=true});panel.addEventListener('pointerleave',()=>pointer.active=false);
function draw(){if(!w||!h)return;ctx.clearRect(0,0,w,h);const t=reduced?0:frame*.005;
 const positions=points.map((p,i)=>{const amp=reduced?0:Math.sin(t+i*1.9)*.009;let x=(p.x+amp)*w,y=(p.y+amp*.75)*h;if(pointer.active&&!reduced){let dx=x-pointer.x*w,dy=y-pointer.y*h;let distance=Math.max(32,Math.hypot(dx,dy));const strength=Math.max(0,1-distance/160)*13;x+=dx/distance*strength;y+=dy/distance*strength}return{x,y,s:p.s}});
 for(const [a,b] of links){const x=positions[a],y=positions[b];ctx.beginPath();ctx.moveTo(x.x,x.y);ctx.lineTo(y.x,y.y);ctx.strokeStyle='rgba(186,218,199,.29)';ctx.lineWidth=1.1;ctx.stroke()}
 positions.forEach((p,i)=>{const central=i===8||i===9;ctx.beginPath();ctx.arc(p.x,p.y,central?5:p.s,0,Math.PI*2);ctx.fillStyle=central?'#e5ac86':'#bddbc9';ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,central?15:9,0,Math.PI*2);ctx.strokeStyle=central?'rgba(236,176,131,.28)':'rgba(206,234,214,.16)';ctx.lineWidth=1;ctx.stroke()});
 const x=w*.49,y=h*.45;const grad=ctx.createRadialGradient(x,y,5,x,y,w*.48);grad.addColorStop(0,'rgba(184,114,74,.13)');grad.addColorStop(1,'rgba(15,31,30,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
}
function loop(){if(!visible||document.hidden)return;draw();frame++;if(!reduced)requestAnimationFrame(loop)}
if('IntersectionObserver' in window){const visibleObserver=new IntersectionObserver(entries=>{const was=visible;visible=entries[0].isIntersecting;if(visible&&!was)loop()},{threshold:0});visible=false;visibleObserver.observe(panel)}else{visible=true;loop()}
document.addEventListener('visibilitychange',()=>{if(!document.hidden && visible)loop()});
if(reduced){draw()}
})();