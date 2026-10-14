const toast = document.querySelector('#toast'); let timer;
function notify(text) { toast.textContent=text;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),4000); }
const counterKey='agentusage-action-clicks-v1';
let counts={download:0,github:0};
try {const saved=JSON.parse(localStorage.getItem(counterKey));for(const key of Object.keys(counts)){if(Number.isSafeInteger(saved?.[key]) && saved[key]>=0)counts[key]=saved[key];}} catch {}
function renderCounts(){document.querySelectorAll('[data-count]').forEach(element=>{element.textContent=counts[element.dataset.count].toLocaleString();});}
renderCounts();
document.querySelectorAll('[data-action="GitHub"]').forEach(link=>link.addEventListener('click',()=>{
const key='github';
if(counts[key]<Number.MAX_SAFE_INTEGER)counts[key]++;
try {localStorage.setItem(counterKey,JSON.stringify(counts));}catch {}
renderCounts();
}));
document.querySelector('#copy').addEventListener('click',async()=>{try { await navigator.clipboard.writeText('node cli.mjs dashboard');document.querySelector('#copy-label').textContent='COPIED';setTimeout(()=>document.querySelector('#copy-label').textContent='COPY',2000);}catch {notify('Launch command: node cli.mjs dashboard');}});
const dialog=document.querySelector('#image-dialog');document.querySelector('#expand').addEventListener('click',()=>dialog.showModal());document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const revealObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }); }, { threshold: 0.08 }); document.querySelectorAll('.section-head, .feature-grid, .how, .screenshot, .privacy, .pricing-grid, .install').forEach(element => { if (element.getBoundingClientRect().top >= window.innerHeight) { element.classList.add('scroll-reveal'); revealObserver.observe(element); } }); }

const motionToggle=document.querySelector('#motion-toggle');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const pointerPreference=window.matchMedia('(hover: hover) and (pointer: fine)');
let motionPaused=false;
try {motionPaused=localStorage.getItem('agentusage-motion-paused')==='true';}catch {}
function syncMotion(){
  document.body.dataset.motionPaused=String(motionPaused || document.hidden || motionPreference.matches);
  motionToggle.disabled=motionPreference.matches;
  motionToggle.setAttribute('aria-pressed',String(motionPaused || motionPreference.matches));
  motionToggle.innerHTML=motionPreference.matches?'Motion reduced':motionPaused?'<span aria-hidden="true">▶</span> Resume motion':'<span aria-hidden="true">Ⅱ</span> Pause motion';
  syncLogoInteractions();
}
motionToggle.hidden=false;
motionToggle.addEventListener('click',()=>{
  motionPaused=!motionPaused;
  try {localStorage.setItem('agentusage-motion-paused',String(motionPaused));}catch {}
  syncMotion();
});
const networkCanvas=document.querySelector('.logo-network');
const networkContext=networkCanvas.getContext('2d');
const driftingLogos=[...document.querySelectorAll('.logo-drift')].map((wrapper,index)=>{
  const logo=wrapper.querySelector('.data-trail');
  const layer=index%3;
  const seconds=parseFloat(getComputedStyle(logo).animationDuration)||20;
  wrapper.classList.add(['depth-far','depth-mid','depth-near'][layer]);
  wrapper.style.setProperty('--depth-duration',`${seconds*[1.45,1.18,1][layer]}s`);
  return {wrapper,logo,x:0,y:0,depth:[.55,.78,1][layer],id:index};
});
let interactionFrame=0,lastInteractionTime=0,networkTime=0,networkWidth=0,networkHeight=0;
let pointerX=0,pointerY=0,pointerActive=false;
function resizeNetwork(){
  networkWidth=networkCanvas.clientWidth;networkHeight=networkCanvas.clientHeight;
  const scale=Math.min(window.devicePixelRatio||1,1.5);
  networkCanvas.width=Math.round(networkWidth*scale);networkCanvas.height=Math.round(networkHeight*scale);
  networkContext?.setTransform(scale,0,0,scale,0,0);
}
function drawLogoInteractions(time){
  interactionFrame=requestAnimationFrame(drawLogoInteractions);
  if(lastInteractionTime && time-lastInteractionTime<32)return;
  const seconds=lastInteractionTime?Math.min((time-lastInteractionTime)/1000,.1):1/30;
  lastInteractionTime=time;networkTime+=seconds;
  const easing=1-Math.exp(-seconds*7),points=[];
  driftingLogos.forEach(item=>{
    const bounds=item.logo.getBoundingClientRect();
    const baseX=bounds.left+bounds.width/2-item.x,baseY=bounds.top+bounds.height/2-item.y;
    let targetX=0,targetY=0;
    if(pointerActive){
      const dx=baseX-pointerX,dy=baseY-pointerY,distance=Math.hypot(dx,dy);
      if(distance<145){const strength=32*item.depth*(1-distance/145);targetX=dx/(distance||1)*strength;targetY=(distance?dy/distance:-1)*strength;}
    }
    item.x+=(targetX-item.x)*easing;item.y+=(targetY-item.y)*easing;
    item.wrapper.style.transform=`translate3d(${item.x}px,${item.y}px,0)`;
    const x=baseX+item.x,y=baseY+item.y;
    if(x>=0 && x<=networkWidth && y>=0 && y<=networkHeight)points.push({x,y,red:item.logo.classList.contains('trail-rising') && !item.logo.classList.contains('trail-blue'),blue:item.logo.classList.contains('trail-blue'),depth:item.depth,id:item.id});
  });
  if(!networkContext)return;
  networkContext.clearRect(0,0,networkWidth,networkHeight);
  let links=0;
  for(let i=0;i<points.length && links<48;i++)for(let j=i+1;j<points.length && links<48;j++){
    const a=points[i],b=points[j],distance=Math.hypot(a.x-b.x,a.y-b.y);
    if(distance>300)continue;
    const phase=(networkTime*.65+a.id*.9+b.id*.7)%(Math.PI*2);
    const pulse=Math.max(0,Math.sin(phase));
    if(pulse<.1)continue;
    const intensity=Math.sqrt(1-distance/300)*pulse*Math.max(.7,Math.min(a.depth,b.depth));
    const alpha=.34*intensity;
    const color=(a.red && b.red)?'239,119,127':(a.blue && b.blue)?'91,168,255':'178,154,255';
    networkContext.strokeStyle=`rgba(${color},${alpha})`;
    networkContext.lineWidth=1;networkContext.beginPath();networkContext.moveTo(a.x,a.y);networkContext.lineTo(b.x,b.y);networkContext.stroke();links++;
    const progress=phase/Math.PI;
    const start=a.y>=b.y?a:b,end=a.y>=b.y?b:a;
    const sparkX=start.x+(end.x-start.x)*progress,sparkY=start.y+(end.y-start.y)*progress;
    const sparkRadius=2.1+.35*Math.sin(networkTime*5+a.id);
    networkContext.fillStyle=`rgba(${color},${.2*intensity})`;
    networkContext.beginPath();networkContext.arc(sparkX,sparkY,sparkRadius*3,0,Math.PI*2);networkContext.fill();
    networkContext.fillStyle=`rgba(${color},${.95*intensity})`;
    networkContext.beginPath();networkContext.arc(sparkX,sparkY,sparkRadius,0,Math.PI*2);networkContext.fill();
    networkContext.fillStyle=`rgba(235,245,255,${.85*intensity})`;
    networkContext.beginPath();networkContext.arc(sparkX,sparkY,.85,0,Math.PI*2);networkContext.fill();
  }
}
function syncLogoInteractions(){
  cancelAnimationFrame(interactionFrame);lastInteractionTime=0;
  if(motionPreference.matches){
    networkContext?.clearRect(0,0,networkWidth,networkHeight);
    driftingLogos.forEach(item=>{item.x=0;item.y=0;item.wrapper.style.transform='';});
  }
  if(!motionPaused && !document.hidden && !motionPreference.matches)interactionFrame=requestAnimationFrame(drawLogoInteractions);
}
document.addEventListener('pointermove',event=>{
  pointerActive=pointerPreference.matches && event.pointerType!=='touch';pointerX=event.clientX;pointerY=event.clientY;
},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>pointerActive=false);
window.addEventListener('blur',()=>pointerActive=false);
pointerPreference.addEventListener('change',()=>pointerActive=false);
window.addEventListener('resize',resizeNetwork);
resizeNetwork();
motionPreference.addEventListener('change',syncMotion);
document.addEventListener('visibilitychange',syncMotion);
syncMotion();

