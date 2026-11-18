const main = document.querySelector('main');
const page = document.body.dataset.page;
const query = new URLSearchParams(location.search);
const dest = id => destinations.find(item => item.id === id);
const money = value => '$' + value.toLocaleString('en-US');
const photo = (name, alt, eager = false) => `<img src="assets/${name}.jpg" alt="${alt}" loading="${eager ? 'eager' : 'lazy'}" decoding="${eager ? 'sync' : 'async'}">`;
const paths = {
  sun:'<path d="M2 16h20M4 19h16M7 22h10M6 16a6 6 0 0 1 12 0M12 1v4M3 5l3 3M21 5l-3 3M1 11l3 1M23 11l-3 1"/>',
  pin:'<path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2.4"/>',
  search:'<circle cx="10" cy="10" r="6.8"/><path d="m16 16 5 5"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>', down:'<path d="m6 9 6 6 6-6"/>',
  menu:'<path d="M3 7h18M3 12h18M3 17h18"/>', close:'<path d="m5 5 14 14M19 5 5 19"/>',
  leaf:'<path d="M20 3C8 2 2 8 5 15s16 5 15-12ZM4 21l11-12"/>',
  wave:'<path d="M2 8q3-4 6 0t6 0 6 0M2 15q3-4 6 0t6 0 6 0"/>',
  check:'<path d="m4 12 5 5L20 6"/>'
};
const icon = (name, size=20) => `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
const brand = `<a class="brand" href="index.html" aria-label="Relar Travel home">${icon('sun',40)}<span>RELAR<small>TRAVEL</small></span></a>`;
const links = [['index','Home'],['destinations','Destinations'],['tours','Tours'],['about','About'],['contact','Contact']];
document.querySelector('#header').innerHTML = `<div class="wrap nav">${brand}<nav id="navigation" aria-label="Main navigation">${links.map(([url,label])=>`<a href="${url}.html" ${(page==='tour'?'tours':page)===url?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="nav-cta" href="contact.html">Plan a trip</a><button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="navigation">${icon('menu')}</button></div>`;
const menu = document.querySelector('.menu-toggle');
function toggleMenu(open) {
  document.querySelector('#header').classList.toggle('open',open);
  menu.setAttribute('aria-expanded',open);
  menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  menu.innerHTML=icon(open?'close':'menu');
}
menu.onclick=()=>toggleMenu(menu.getAttribute('aria-expanded')==='false');
document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu.getAttribute('aria-expanded')==='true'){toggleMenu(false);menu.focus();}});
document.querySelector('#footer').innerHTML=`<div class="wrap footer-top">${brand}<nav aria-label="Footer navigation">${links.slice(1).map(([url,label])=>`<a href="${url}.html">${label}</a>`).join('')}</nav></div><div class="wrap fine">Relar Travel is a fictional travel studio. All itineraries, prices and reviews are illustrative.</div>`;
const eyebrow = text => `<p class="eyebrow">${text}</p>`;
const button = (url,label,cls='primary') => `<a class="btn ${cls}" href="${url}">${label}</a>`;
const destOptions = () => destinations.map(d=>`<option value="${d.id}">${d.name}</option>`).join('');
const styles = ['Island retreat','Island hopping','Nature & culture'];
const durationOptions = '<option value="">Any duration</option><option value="short">4–6 days</option><option value="long">7–9 days</option>';
function selectField(label,name,options,glyph) {
  return `<label class="select-field">${glyph?icon(glyph,23):''}<span><strong>${label}</strong><select name="${name}">${options}</select></span>${icon('down',15)}</label>`;
}
function destinationCard(d, full=false) {
  const count=tours.filter(t=>t.destination===d.id).length;
  return `<article class="dest-card"><a href="tours.html?destination=${d.id}" aria-label="Explore ${d.name} tours">${photo(d.id,d.name+' landscape')}<span class="card-bottom"><small>${d.region}</small><strong>${d.name}</strong></span><span class="card-round">${icon('chevron',18)}</span></a>${full?`<p>${d.text}</p><a class="text-link" href="tours.html?destination=${d.id}">Explore ${count} demo tours</a>`:''}</article>`;
}
function tourCard(t) {
  const d=dest(t.destination);
  return `<article class="tour-card"><a href="tour.html?id=${t.id}"><div class="tour-photo">${photo(d.id,d.name)}<span>${icon('clock',15)} ${t.days} days</span></div><div class="tour-copy"><small>${d.name} / ${t.style}</small><h3>${t.name}</h3><div>${t.originalPrice?`<del>${money(t.originalPrice)}</del> `:""}<b>${money(t.price)}</b> <small>/ person · demo</small><i>${icon('chevron',16)}</i></div></div></a></article>`;
}
function sectionHead(pre,title,link='') {return `<div class="section-head"><div>${eyebrow(pre)}<h2>${title}</h2></div>${link}</div>`;}
const benefits = `<div class="benefits">${[['compass','Room to explore','Days balance guided discoveries with time to follow your own curiosity.'],['wave','A slower pace','Longer stays leave room for an extra swim or a second cup of coffee.'],['leaf','Closer to place','Local landscapes, food and craft shape each sample itinerary.']].map(([i,h,p])=>`<article>${icon(i,32)}<h3>${h}</h3><p>${p}</p></article>`).join('')}</div>`;
const cta = `<section class="closing"><div class="wrap"><h2>Where will you go next?</h2>${button('contact.html','Plan your trip','light')}</div></section>`;
const slides=[['hero','Maldives','Indian Ocean'],['bali','Bali','Indonesia'],['seychelles','Seychelles','Indian Ocean']];
function home(){
  main.innerHTML=`<section class="hero"><div class="hero-image">${photo('hero','A tropical lagoon in the Maldives',true)}</div><div class="wrap hero-inner"><div class="hero-copy"><p class="hero-kicker"><span></span> CURATED TROPICAL ESCAPES</p><h1>Discover Your<br><em>Next Paradise</em></h1><p>From hidden island coves to overwater villas, discover<br class="wide"> a slower kind of luxury with Relar Travel.</p>${button('destinations.html','Explore Destinations','light')}</div><div class="hero-bottom"><div class="slide-dots" aria-label="Featured destination"></div><div class="location" aria-live="polite"></div></div></div></section>
  <div class="wrap search-wrap"><form class="trip-search" action="tours.html">${selectField('Destination','destination','<option value="">Where to?</option>'+destOptions(),'pin')}${selectField('Travel style','style','<option value="">All experiences</option>'+styles.map(s=>`<option>${s}</option>`).join(''),'compass')}${selectField('Duration','duration',durationOptions,'clock')}<button class="btn primary">${icon('search',18)} Search tours</button></form></div>
  <section class="wrap section">${sectionHead('THE COLLECTION','Popular destinations',button('destinations.html','View all destinations','outline'))}<div class="grid">${destinations.slice(0,3).map(d=>destinationCard(d)).join('')}</div></section>
  <section class="tint"><div class="wrap section">${sectionHead('DEMONSTRATION OFFERS','Special offers',button('tours.html','Browse all tours','outline'))}<div class="grid">${tours.slice(0,3).map(tourCard).join('')}</div></div></section>
  <section class="wrap section">${sectionHead('WHY RELAR','Thoughtfully planned travel')}${benefits}</section>
  <section class="reviews"><div class="wrap section">${sectionHead('DEMONSTRATION REVIEWS','Traveller notes')}<div class="quote-grid"><blockquote>“The reef swim was the highlight. I loved having the afternoon free to go back to the water.”<cite>Alex · Maldives Lagoon Retreat</cite></blockquote><blockquote>“From Ubud’s cool mornings to the warmth of the coast, the change of pace felt just right.”<cite>Sam · Ubud to the Ocean</cite></blockquote></div></div></section>
  <section class="wrap section">${sectionHead('PHOTO JOURNAL','Postcards from paradise')}<div class="journal">${['thailand','greece','turkey'].map(id=>`<figure>${photo(id,dest(id).name)}<figcaption>${dest(id).name}</figcaption></figure>`).join('')}</div></section>${cta}`;
  const dots=document.querySelector('.slide-dots');
  dots.innerHTML=slides.map((s,i)=>`<button type="button" aria-label="Show ${s[1]} photograph" data-slide="${i}"><span></span></button>`).join('');
  function setSlide(i){
    const [file,name,region]=slides[i];
    const img=document.querySelector('.hero-image img');
    img.src='assets/'+file+'.jpg'; img.alt=name+' landscape';
    document.querySelector('.location').innerHTML=icon('pin',17)+`<span>${name}, ${region}</span>`;
    [...dots.children].forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));
  }
  dots.onclick=e=>{const b=e.target.closest('button');if(b)setSlide(Number(b.dataset.slide));};
  setSlide(0);
}
function banner(file,kicker,title,sub){
  return `<section class="banner">${photo(file,'',true)}<div class="wrap">${eyebrow(kicker)}<h1>${title}</h1><p>${sub}</p></div></section>`;
}
function destinationPage(){
  main.innerHTML=banner('seychelles','THE COLLECTION','Our destinations','Explore island shores, coastal villages and desert horizons.')+`<section class="wrap section"><div class="grid dest-grid">${destinations.map(d=>destinationCard(d,true)).join('')}</div></section>`+cta;
}
function catalog(){
  main.innerHTML=banner('hero','SAMPLE ITINERARIES','Tour collection','Find your escape. All prices are fictional, in USD per person.')+`<section class="wrap section catalog"><form id="filters"><label>Tour name<input type="search" name="q" placeholder="Search by name"></label>${selectField('Destination','destination','<option value="">All destinations</option>'+destOptions())}${selectField('Travel style','style','<option value="">All experiences</option>'+styles.map(s=>`<option>${s}</option>`).join(''))}${selectField('Duration','duration',durationOptions)}${selectField('Sort by','sort','<option value="">Featured</option><option value="asc">Price: low to high</option><option value="desc">Price: high to low</option>')}</form><div class="result-head"><p id="count" aria-live="polite"></p><button class="reset" type="button">Reset filters</button></div><div class="grid" id="results"></div></section>`;
  const f=document.querySelector('#filters');
  for(const el of f.elements) if(query.has(el.name)) el.value=query.get(el.name);
  function render(){
    const values=new FormData(f), val=k=>values.get(k)||'';
    const list=tours.filter(t=>(!val('destination')||t.destination===val('destination'))&&(!val('style')||t.style===val('style'))&&(!val('duration')||(val('duration')==='short'?t.days<=6:t.days>=7))&&t.name.toLowerCase().includes(val('q').trim().toLowerCase()));
    if(val('sort')) list.sort((a,b)=>val('sort')==='asc'?a.price-b.price:b.price-a.price);
    document.querySelector('#count').textContent=list.length+' demo '+(list.length===1?'tour':'tours');
    document.querySelector('#results').innerHTML=list.length?list.map(tourCard).join(''):'<div class="empty"><h2>No matching tours</h2><p>Try another name or reset your filters to see every itinerary.</p></div>';
  }
  function update(){
    render();
    const params=new URLSearchParams();
    for(const [k,v] of new FormData(f)) if(v) params.set(k,v);
    if(location.protocol!=='file:') history.replaceState(null,'','tours.html'+(params.size?'?'+params:''));
  }
  f.oninput=update; f.onsubmit=e=>{e.preventDefault();update();};
  document.querySelector('.reset').onclick=()=>{f.reset();update();}; render();
}
function detail(){
  const t=tours.find(t=>t.id===query.get('id'));
  if(!t){main.innerHTML=banner('hero','TOUR COLLECTION','Tour not found','This itinerary could not be found in our demo collection.')+`<div class="wrap section">${button('tours.html','Explore all tours')}</div>`;return;}
  const d=dest(t.destination);document.title=t.name+' | Relar Travel';
  const half=Math.ceil(t.days/2);
  const legs=[['Day 1','Settle in',`Arrive in ${d.name} and enjoy an unhurried introduction to your surroundings.`],[half===2?'Day 2':`Days 2–${half}`,'Explore the region',`Spend time discovering ${d.stops[0]} and ${d.stops[1]}.`],[half+1===t.days-1?`Day ${half+1}`:`Days ${half+1}–${t.days-1}`,'Take the scenic route',`Leave time for ${d.stops[2]} and a relaxed evening at your own pace.`],[`Day ${t.days}`,'Travel home','Enjoy a final breakfast before departure.']];
  main.innerHTML=banner(d.id,d.region,t.name,t.description)+`<div class="wrap section detail-layout"><section>${eyebrow(d.name+' / '+t.style)}<h2>Your itinerary</h2><p>${d.text} This ${t.days}-day sample journey pairs planned outings with time to explore independently.</p><ol class="itinerary">${legs.map(([day,title,desc])=>`<li><small>${day}</small><div><h3>${title}</h3><p>${desc}</p></div></li>`).join('')}</ol></section><aside class="booking"><small>DEMO PRICE PER PERSON</small><h2>${money(t.price)}</h2>${t.originalPrice?`<p><del>${money(t.originalPrice)}</del> original demo price</p>`:""}<p>${icon('clock',16)} ${t.days} days · ${d.name}</p>${button('contact.html?tour='+t.id,'Enquire about this tour')}<small>Sample itinerary. No booking or payment.</small></aside></div><section class="wrap section detail-photo">${photo(d.id+'-detail',d.name+' scenery')}</section>`;
}
function about(){
  main.innerHTML=banner('bali','OUR STORY','The Relar way','A fictional travel studio inspired by the coast.')+`<section class="wrap section story"><div>${eyebrow('THE IDEA')}<h2>Time to stay a little longer</h2><p>Relar began as a design idea. What would a travel collection look like if each journey left space for the small things? A walk before breakfast. A conversation at a market. Another hour beside the sea.</p><p>Our mission in this demonstration is to make that kind of travel easy to imagine. Each sample route brings together a landscape, a rhythm and a handful of places to explore.</p></div>${photo('seychelles','Tropical scenery in the Seychelles')}</section><section class="tint"><div class="wrap section">${sectionHead('OUR VALUES','What shapes the collection')}${benefits}</div></section>`+cta;
}
function contact(){
  const t=tours.find(t=>t.id===query.get('tour'));
  main.innerHTML=banner('maldives','TRIP ENQUIRIES','Plan your trip','Tell us about the escape you have in mind.')+`<section class="wrap section contact-layout"><div>${eyebrow('DEMONSTRATION FORM')}<h2>Your travel enquiry</h2><p>Try planning a journey with Relar. Your details stay in this browser tab. This demo creates no reservation and sends no message.</p></div><form class="enquiry"><div class="form-row"><label>Your name<input required autocomplete="name" name="name" maxlength="100"></label><label>Email address<input type="email" required name="email" autocomplete="email"></label></div><label>Destination<select required name="destination"><option value="">Select a destination</option>${destOptions()}</select></label>${t?`<p class="chosen">Selected tour · <b>${t.name}</b></p>`:''}<label>Message<textarea required name="message" rows="5" maxlength="3000" placeholder="Tell us a little about your travel plans"></textarea></label><button class="btn primary">Submit demo enquiry</button><div class="success" role="status" tabindex="-1" hidden></div></form></section>`;
  const form=document.querySelector('.enquiry');
  if(t){form.elements.destination.value=t.destination;form.elements.message.value=`I’m interested in ${t.name}.`;form.elements.destination.onchange=()=>{const same=form.elements.destination.value===t.destination;document.querySelector('.chosen').hidden=!same;if(!same && form.elements.message.value===`I’m interested in ${t.name}.`)form.elements.message.value='';};}
  const status=form.querySelector('.success');
  form.oninput=e=>{e.target.setCustomValidity('');status.hidden=true;};
  form.onsubmit=e=>{e.preventDefault();for(const key of ['name','message']){const field=form.elements[key];if(!field.value.trim()){field.setCustomValidity('Please complete this field.');field.reportValidity();return;}}
    status.innerHTML=icon('check')+'<span><b>Demo enquiry complete.</b> Your details stayed in this tab.</span>';status.hidden=false;status.focus();};
}
({index:home,destinations:destinationPage,tours:catalog,tour:detail,about,contact})[page]();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');observer.unobserve(e.target);}}));
  document.querySelectorAll('.section-head').forEach(el=>observer.observe(el));
}

// Animate regular page links while preserving native history and modified clicks.
function enablePageTransitions() {
  document.documentElement.classList.add('page-arrival');
  let departure;

  document.addEventListener('click', async event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey ||
        event.metaKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;

    const next = new URL(link.href);
    const current = new URL(location.href);
    if (next.origin !== current.origin || next.protocol !== current.protocol ||
        !next.pathname.endsWith('.html') || next.hash ||
        matchMedia('(prefers-reduced-motion: reduce)').matches || !main.animate) return;

    event.preventDefault();
    departure?.cancel();
    if (menu.getAttribute('aria-expanded') === 'true') toggleMenu(false);
    if (next.href === current.href) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }

    departure = main.animate([{opacity: 1}, {opacity: .72}], {
      duration: 130, easing: 'ease-in', fill: 'forwards'
    });
    try {
      await departure.finished;
      location.assign(next.href);
    } catch {
      // A newer click selected another destination.
    }
  });
  window.addEventListener('pageshow', () => departure?.cancel());
}
enablePageTransitions();
