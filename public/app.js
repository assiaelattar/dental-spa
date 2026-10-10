/* Dental Spa V3 — interactive UX prototype. No network requests or patient submissions. */
(() => {
  const pages=['accueil','expertises','technologies','docteur','reservation'];
  const navLinks=[...document.querySelectorAll('[data-nav]')];
  const menuToggle=document.getElementById('menuToggle');
  const mobileMenu=document.getElementById('mobileMenu');
  const header=document.getElementById('header');
  const readingTrack=document.getElementById('readingTrack');
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let observer;
  function revealVisible(){
    if(observer) observer.disconnect();
    const items=[...document.querySelectorAll('.page.active .reveal')];
    if(reduceMotion || !('IntersectionObserver' in window)){items.forEach(e=>e.classList.add('visible'));return;}
    observer=new IntersectionObserver(entries=>entries.forEach(ent=>{
      if(ent.isIntersecting){ent.target.classList.add('visible');observer.unobserve(ent.target);}
    }),{rootMargin:'0px 0px -40px 0px',threshold:.075});
    items.forEach(e=>observer.observe(e));
  }
  function route(){
    const raw=location.hash.replace('#','').toLowerCase();
    const page=pages.includes(raw)?raw:'accueil';
    pages.forEach(key=>document.getElementById('page-'+key).classList.toggle('active',key===page));
    navLinks.forEach(a=>a.classList.toggle('current',a.dataset.nav===page));
    document.title= (page==='accueil'?'Dental Spa':({expertises:'Nos expertises',technologies:'Technologies',docteur:'Dr Amina El Omrani',reservation:'Prendre rendez-vous'}[page]))+' — Dental Spa';
    document.body.dataset.page=page;
    window.scrollTo({top:0,behavior:'instant'});
    closeMenu();
    revealVisible();
    trackScroll();
    if(page==='reservation')renderBooking();
  }
  function closeMenu(){menuToggle.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');mobileMenu.hidden=true;}
  menuToggle.addEventListener('click',()=>{
    const opening=mobileMenu.hidden;
    mobileMenu.hidden=!opening;
    menuToggle.classList.toggle('open',opening);
    menuToggle.setAttribute('aria-expanded',String(opening));
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  window.addEventListener('hashchange',route);
  function trackScroll(){
    const max=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
    readingTrack.style.width=(max?100*window.scrollY/max:0)+'%';
    header.classList.toggle('is-scrolled',window.scrollY>14);
  }
  window.addEventListener('scroll',trackScroll,{passive:true});
  window.addEventListener('resize',trackScroll,{passive:true});

  // Technology phases: motion communicates the diagnostic workflow (not a real scan).
  const techLabels=[
    {mode:'01',view:'VIEW / OCCLUSAL'},
    {mode:'02',view:'VIEW / IMAGERIE'},
    {mode:'03',view:'VIEW / PLANIFICATION'}
  ];
  document.querySelectorAll('[data-tech]').forEach(btn=>btn.addEventListener('click',()=>{
    const n=Number(btn.dataset.tech);
    document.querySelectorAll('[data-tech]').forEach(x=>{
      x.classList.toggle('selected',x===btn);
      x.setAttribute('aria-selected',String(x===btn));
    });
    const display=document.querySelector('.tech-display');
    display.classList.remove('mode-0','mode-1','mode-2');
    display.classList.add('mode-'+n);
    document.getElementById('techModuleNo').textContent=techLabels[n].mode;
    document.getElementById('techCoordinates').textContent=techLabels[n].view;
  }));

  const journeyInfo=[
    'Une première consultation pour écouter votre demande et comprendre ce qui compte pour vous.',
    'L’examen clinique, les photographies et les outils numériques sont choisis selon la situation.',
    'Les options de traitement et leurs étapes sont présentées et discutées avec vous.',
    'L’équipe vous accompagne durant le traitement et organise un suivi adapté.'
  ];
  document.querySelectorAll('[data-journey]').forEach(btn=>btn.addEventListener('click',()=>{
    const n=Number(btn.dataset.journey);
    document.querySelectorAll('[data-journey]').forEach(x=>x.classList.toggle('active',x===btn));
    const detail=document.getElementById('journeyDetail');
    detail.querySelector('.eyebrow').textContent='ÉTAPE 0'+(n+1);
    detail.querySelector('p').textContent=journeyInfo[n];
    detail.querySelector('span:last-child').textContent='0'+(n+1)+' — 04';
  }));

  const book={step:0,service:'',date:null,time:'',name:'',email:'',phone:'',message:'',agreed:false};
  const serviceOptions=[
    ['Première consultation','Faire le point sur ma santé et mes besoins','ic-heart'],
    ['Orthodontie','Alignement et bilan orthodontique','ic-tooth'],
    ['Esthétique du sourire','Facettes et projet esthétique','ic-scan'],
    ['Implants / restauration','Évaluation et solutions possibles','ic-shield']
  ];
  const dynamic=document.getElementById('bookingDynamic');
  const next=document.getElementById('bookingContinue');
  const prev=document.getElementById('bookingPrevious');
  const titles=['Quel est l’objet de votre visite ?','Quel moment vous conviendrait ?','Faisons connaissance.','Votre demande est prête.'];
  const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  function dateLong(date){return new Intl.DateTimeFormat('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(date);}
  function futureDates(){
    const dates=[];const curr=new Date();curr.setHours(12,0,0,0);
    curr.setDate(curr.getDate()+1);
    for(let i=0;dates.length<7&&i<20;i++){
      const d=new Date(curr);d.setDate(d.getDate()+i);
      if(d.getDay()!==0)dates.push(d);
    }
    return dates;
  }
  function renderBooking(){
    const s=book.step;
    document.getElementById('bookingTitle').textContent=titles[s];
    document.getElementById('bookingStepLabel').textContent=s===3?'RÉCAPITULATIF DE DÉMONSTRATION':'ÉTAPE 0'+(s+1)+' SUR 03';
    document.getElementById('bookingProgressPercent').textContent=Math.min(100,Math.round((s+1)/3*100))+'%';
    document.getElementById('bookingFill').style.width=Math.min(100,Math.round((s+1)/3*100))+'%';
    prev.hidden=(s===0||s===3);
    next.hidden=(s===3);
    next.innerHTML=s===2?'Prévisualiser ma demande <svg><use href="#ic-arrow"/></svg>':'Continuer <svg><use href="#ic-arrow"/></svg>';
    if(s===0){
      dynamic.innerHTML='<div class="booking-choices">'+serviceOptions.map(([name,desc,icon])=>`<button type="button" class="booking-choice ${book.service===name?'selected':''}" data-service="${esc(name)}" aria-pressed="${book.service===name}"><span class="choice-radio"></span><svg><use href="#${icon}"/></svg><div><strong>${esc(name)}</strong><small>${esc(desc)}</small></div></button>`).join('')+'</div>';
      dynamic.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>{book.service=b.dataset.service;renderBooking();}));
      next.disabled=!book.service;
    }else if(s===1){
      const dates=futureDates();const month=new Intl.DateTimeFormat('fr-FR',{month:'long',year:'numeric'}).format(dates[0]);
      dynamic.innerHTML=`<div class="booking-month"><strong>${esc(month.charAt(0).toUpperCase()+month.slice(1))}</strong><span>Dates fictives pour la maquette</span></div><div class="booking-days">${dates.map((d,i)=>`<button type="button" class="booking-day ${book.date===d.toDateString()?'selected':''}" data-date="${esc(d.toDateString())}" aria-label="${esc(dateLong(d))}"><span>${esc(new Intl.DateTimeFormat('fr-FR',{weekday:'short'}).format(d))}</span><strong>${d.getDate()}</strong></button>`).join('')}</div><div class="booking-times-header"><span>Créneaux illustratifs</span><span>Durée à confirmer par le cabinet</span></div><div class="booking-times">${['09:00','10:00','11:00','12:00','14:00','15:00'].map(t=>`<button type="button" class="booking-time ${book.time===t?'selected':''}" data-time="${t}">${t}</button>`).join('')}</div>`;
      dynamic.querySelectorAll('[data-date]').forEach(b=>b.addEventListener('click',()=>{book.date=b.dataset.date;renderBooking();}));
      dynamic.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',()=>{book.time=b.dataset.time;renderBooking();}));
      next.disabled=!(book.date&&book.time);
    }else if(s===2){
      const niceDate=new Date(book.date+' 12:00:00');
      dynamic.innerHTML=`<div class="review-appointment"><span>VOTRE SÉLECTION</span><strong>${esc(book.service)}</strong><span>${esc(dateLong(niceDate))} · ${esc(book.time)} <span style="opacity:.75">(démo)</span></span></div><div class="booking-fields"><div class="field"><label for="bName">Nom complet *</label><input autocomplete="name" id="bName" placeholder="Votre nom" value="${esc(book.name)}" required></div><div class="field"><label for="bPhone">Téléphone *</label><input id="bPhone" autocomplete="tel" type="tel" placeholder="+212 ..." value="${esc(book.phone)}" required></div><div class="field wide"><label for="bEmail">Adresse e-mail *</label><input autocomplete="email" id="bEmail" type="email" placeholder="vous@exemple.com" value="${esc(book.email)}" required></div><div class="field wide"><label for="bMessage">Votre message (facultatif)</label><textarea id="bMessage" rows="3" placeholder="Un élément important pour votre consultation ?">${esc(book.message)}</textarea></div><label class="agreement field wide"><input type="checkbox" id="bAgreement" ${book.agreed?'checked':''}><span>Je comprends qu’il s’agit d’un prototype. Aucune information n’est transmise ni enregistrée.</span></label></div>`;
      const bind={bName:'name',bPhone:'phone',bEmail:'email',bMessage:'message'};
      Object.entries(bind).forEach(([id,key])=>document.getElementById(id).addEventListener('input',e=>{book[key]=e.target.value;validateDetails();}));
      document.getElementById('bAgreement').addEventListener('change',e=>{book.agreed=e.target.checked;validateDetails();});
      validateDetails();
    }else{
      dynamic.innerHTML=`<div class="booking-finished"><svg><use href="#ic-check"/></svg><h3>Votre parcours est préparé.</h3><p>Vous avez exploré l’expérience de réservation de Dental Spa. <strong>Aucune demande réelle n’a été envoyée.</strong> La confirmation, la disponibilité et les notifications seront fonctionnelles après intégration avec Dental OS.</p><a class="button button-dark" href="tel:+212631232954">Appeler le cabinet <svg><use href="#ic-arrow"/></svg></a></div>`;
    }
  }
  function validateDetails(){
    const email=book.email.trim();
    next.disabled=!(book.name.trim().length>=2&&book.phone.trim().length>=6&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)&&book.agreed);
  }
  next.addEventListener('click',()=>{if(next.disabled||book.step>=3)return;book.step++;renderBooking();});
  prev.addEventListener('click',()=>{if(book.step===0)return;book.step--;renderBooking();});
  route();
})();

