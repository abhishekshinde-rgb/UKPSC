const menuToggle=document.getElementById('menuToggle'),navLinks=document.getElementById('navLinks');
menuToggle?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
const filters=[...document.querySelectorAll('.filter')],notices=[...document.querySelectorAll('.notice')],empty=document.getElementById('emptyState');
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(f=>f.classList.toggle('active',f===btn));const type=btn.dataset.filter;let count=0;notices.forEach(n=>{const show=type==='all'||n.dataset.category===type;n.hidden=!show;if(show)count++;});empty.hidden=count!==0;empty.textContent='No notices in this category in this sample view.';}));
document.getElementById('siteSearch')?.addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('searchInput').value.trim().toLowerCase();if(!q){document.getElementById('searchInput').focus();return;}filters.forEach(f=>f.classList.toggle('active',f.dataset.filter==='all'));let count=0;notices.forEach(n=>{const show=n.textContent.toLowerCase().includes(q);n.hidden=!show;if(show)count++;});empty.textContent=count?`Showing ${count} matching notice${count===1?'':'s'} in this sample view.`:'No matching notices in this sample view. Try another keyword.';empty.hidden=count!==0;document.getElementById('notices').scrollIntoView({behavior:'smooth'});});
document.getElementById('contrastToggle')?.addEventListener('click',e=>{const on=document.body.classList.toggle('high-contrast');e.currentTarget.setAttribute('aria-pressed',String(on));});
let size=16;function setSize(){document.documentElement.style.setProperty('--font',`${size}px`);}
document.getElementById('fontUp')?.addEventListener('click',()=>{size=Math.min(20,size+1);setSize();});
document.getElementById('fontDown')?.addEventListener('click',()=>{size=Math.max(14,size-1);setSize();});
document.getElementById('fontReset')?.addEventListener('click',()=>{size=16;setSize();});
document.getElementById('languageToggle')?.addEventListener('click',()=>alert('Concept preview: a production version should provide complete Hindi and English content managed through the CMS.'));

// Interactive hero banner: manual controls, keyboard-friendly dots, auto-rotation with pause.
const bannerSlides=[
 {title:'A future of service.<br><em>A commitment to merit.</em>',description:'Your trusted destination for recruitment notifications, examination schedules and official candidate updates.',primary:'Explore recruitments',primaryHref:'#notices',secondary:'Candidate services',secondaryHref:'#candidate-services'},
 {title:'Every exam update.<br><em>Clear and accessible.</em>',description:'Find important dates, admit cards, answer keys and results through a simpler candidate-first experience.',primary:'View latest notices',primaryHref:'#notices',secondary:'Browse resources',secondaryHref:'#resources'},
 {title:'Your journey.<br><em>One trusted portal.</em>',description:'Explore the stages of recruitment and access official information designed to work across desktop and mobile.',primary:'Explore candidate services',primaryHref:'#candidate-services',secondary:'About UKPSC',secondaryHref:'#commission'}
];
let activeBanner=0,rotationPaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let rotationTimer=null;
const titleEl=document.getElementById('bannerTitle'),descEl=document.getElementById('bannerDescription');
const primaryEl=document.getElementById('bannerPrimary'),secondaryEl=document.getElementById('bannerSecondary');
const currentEl=document.getElementById('slideCurrent'),dots=[...document.querySelectorAll('.banner-dot')];
function setBanner(index){
 activeBanner=(index+bannerSlides.length)%bannerSlides.length;const s=bannerSlides[activeBanner];
 const content=document.querySelector('.banner-content');
 if(content){content.style.animation='none';void content.offsetWidth;content.style.animation='';}
 titleEl.innerHTML=s.title;descEl.textContent=s.description;
 primaryEl.href=s.primaryHref;primaryEl.querySelector('span').textContent=s.primary;
 secondaryEl.href=s.secondaryHref;secondaryEl.querySelector('span').textContent=s.secondary;
 currentEl.textContent=String(activeBanner+1).padStart(2,'0');
 dots.forEach((d,i)=>{d.classList.toggle('active',i===activeBanner);d.setAttribute('aria-pressed',String(i===activeBanner));});
}
function stopRotation(){if(rotationTimer){clearInterval(rotationTimer);rotationTimer=null;}}
function startRotation(){stopRotation();if(!rotationPaused)rotationTimer=setInterval(()=>setBanner(activeBanner+1),7000);}
document.getElementById('bannerPrev')?.addEventListener('click',()=>{setBanner(activeBanner-1);startRotation();});
document.getElementById('bannerNext')?.addEventListener('click',()=>{setBanner(activeBanner+1);startRotation();});
dots.forEach((d,i)=>d.addEventListener('click',()=>{setBanner(i);startRotation();}));
const pauseBtn=document.getElementById('bannerPause');
function syncPauseButton(){pauseBtn.setAttribute('aria-pressed',String(rotationPaused));pauseBtn.setAttribute('aria-label',rotationPaused?'Resume automatic banner rotation':'Pause automatic banner rotation');pauseBtn.innerHTML=rotationPaused?'<svg class="ico"><use href="#i-play"/></svg><span>Play</span>':'<svg class="ico"><use href="#i-pause"/></svg><span>Pause</span>';}
pauseBtn?.addEventListener('click',()=>{rotationPaused=!rotationPaused;syncPauseButton();startRotation();});
const heroBanner=document.querySelector('.hero-banner');
heroBanner?.addEventListener('mouseenter',stopRotation);
heroBanner?.addEventListener('mouseleave',startRotation);
heroBanner?.addEventListener('focusin',stopRotation);
heroBanner?.addEventListener('focusout',startRotation);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopRotation();else startRotation();});
syncPauseButton();startRotation();
