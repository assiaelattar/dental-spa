/* Mobile V4: progressive UX improvements. No network requests or patient data persistence. */
(() => {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('menuToggle');
  if (menu && toggle) {
    const heading = document.createElement('div');
    heading.className = 'mobile-menu-heading';
    heading.textContent = 'EXPLORER DENTAL SPA';
    menu.prepend(heading);
    const contact = document.createElement('div');
    contact.className = 'mobile-menu-contact';
    contact.innerHTML = '<span>Cabinet dentaire · Casablanca</span><a href="tel:+212631232954">Appeler le cabinet ↗</a>';
    menu.append(contact);
    const syncMenu = () => {
      document.body.classList.toggle('mobile-nav-open', !menu.hidden && window.matchMedia('(max-width:780px)').matches);
      toggle.setAttribute('aria-label', menu.hidden ? 'Ouvrir le menu' : 'Fermer le menu');
    };
    toggle.addEventListener('click',syncMenu);
    window.addEventListener('hashchange',syncMenu);
    window.addEventListener('resize',syncMenu,{passive:true});
    document.addEventListener('keydown',event => {if(event.key==='Escape') requestAnimationFrame(syncMenu);});
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click',() => requestAnimationFrame(syncMenu)));
    syncMenu();
  }

  const bar = document.createElement('div');
  bar.className = 'mobile-action-bar';
  bar.setAttribute('aria-label', 'Accès rapide Dental Spa');
  bar.innerHTML = '<a href="#reservation">Prendre rendez-vous <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></a><a href="tel:+212631232954" aria-label="Appeler le cabinet"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.7 3.6 4.3 6a3 3 0 0 0-.7 3.2 20 20 0 0 0 11.2 11.2 3 3 0 0 0 3.2-.7l2.4-2.4-4.7-4.7-2.4 2.4a15 15 0 0 1-4.3-4.3L11.4 8Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></a>';
  document.body.append(bar);

  const carousel = document.querySelector('#services-home .service-grid');
  if(carousel){
    carousel.setAttribute('role','region');
    carousel.setAttribute('aria-roledescription','carrousel');
    carousel.setAttribute('aria-label','Domaines de soins dentaires');
    const cards = [...carousel.querySelectorAll('.service-card')];
    const tools = document.createElement('div');
    tools.className='mobile-carousel-tools';
    tools.innerHTML='<span>Faites défiler les expertises ↔</span><div class="carousel-controls"><button type="button" class="carousel-prev" aria-label="Expertise précédente">←</button><output aria-live="polite">01 / 03</output><button type="button" class="carousel-next" aria-label="Expertise suivante">→</button></div>';
    carousel.before(tools);
    const counter=tools.querySelector('output');
    const prev=tools.querySelector('.carousel-prev');
    const next=tools.querySelector('.carousel-next');
    const activeIndex=()=>cards.reduce((best,card,i)=>Math.abs(card.getBoundingClientRect().left-carousel.getBoundingClientRect().left)<Math.abs(cards[best].getBoundingClientRect().left-carousel.getBoundingClientRect().left)?i:best,0);
    const update=()=>{const i=activeIndex();counter.textContent=String(i+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');prev.disabled=i===0;next.disabled=i===cards.length-1;};
    const scrollToIndex=i=>cards[Math.max(0,Math.min(cards.length-1,i))]?.scrollIntoView({inline:'start',block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
    prev.addEventListener('click',()=>scrollToIndex(activeIndex()-1));
    next.addEventListener('click',()=>scrollToIndex(activeIndex()+1));
    carousel.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
    window.addEventListener('resize',update,{passive:true});
    update();
  }
  // After a booking step changes, make the new question visible below the sticky site header.
  const continueButton = document.getElementById('bookingContinue');
  const previousButton = document.getElementById('bookingPrevious');
  [continueButton, previousButton].forEach(btn => btn?.addEventListener('click',() => {
    if(window.matchMedia('(max-width:780px)').matches){
      requestAnimationFrame(() => document.getElementById('bookingTitle')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'}));
    }
  }));
})();
