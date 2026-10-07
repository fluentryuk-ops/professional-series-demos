/* Adds a second purchase choice to a demo page:
   gold button  = Complete Series
   plain button = just this toolkit
   Loaded by each demo with: <script src="../fluentry-buy.js" data-toolkit="KEY"></script>
   Links and prices come from fluentry-config.js (edit that file, not this one). */
(function(){
  var cs=document.currentScript, key=cs&&cs.getAttribute('data-toolkit');
  var C=window.FLUENTRY_CONFIG;
  if(!C||!key||!C.toolkits||!C.toolkits[key]) return;
  var T=C.toolkits[key], S=C.series;
  function utm(base,medium,content){
    if(window.FTRACK) return window.FTRACK.buy(base,key,medium,content);
    var sep=base.indexOf('?')>-1?'&':'?';
    return base+sep+'utm_source=demo&utm_medium=demo&utm_campaign='+encodeURIComponent(key)+'&utm_content='+encodeURIComponent(medium+'-'+(content||'button'));
  }
  function enhance(a){
    if(a.getAttribute('data-f2')) return;
    a.setAttribute('data-f2','1');
    var where=a.getAttribute('data-buy')||(a.closest('.lockcard,.lockbox,.lock-card')?'locked':'button');
    a._f2=utm(S.url,'series',where);
    a.href=a._f2; a.target='_blank'; a.rel='noopener';
    // some demos re-write their own buy links later, so set the right link again at the moment of use
    ['mousedown','touchstart','focus','click','contextmenu'].forEach(function(ev){a.addEventListener(ev,function(){a.href=a._f2},true)});
    if(a.closest('.pvlock')){ a.textContent='Unlock with the Series'; return; }
    var small=/\bsmall\b/.test(a.className);
    var sec=document.createElement('a');
    sec.href=utm(T.url,'single',where); sec.target='_blank'; sec.rel='noopener';
    if(small){
      a.textContent='Get the Series '+S.price;
      sec.className='f2-link'; sec.textContent='or just this toolkit '+T.price;
      a.insertAdjacentElement('afterend',sec); return;
    }
    a.textContent='Get the '+S.name+', '+S.price;
    sec.className='f2-secondary'; sec.textContent='Or just this toolkit, '+T.price;
    var box=document.createElement('span'); box.className='f2-box';
    a.parentNode.insertBefore(box,a); box.appendChild(a); box.appendChild(sec);
  }
  function scan(){ document.querySelectorAll('a.gold-btn, a.btn.gold').forEach(enhance); }
  var css=document.createElement('style');
  css.textContent='.f2-box{display:flex;flex-direction:column;align-items:center;gap:9px}'+
    '.f2-secondary{display:inline-block;color:#0f3d66 !important;background:#fff;border:1.5px solid #0f3d66;border-radius:999px;padding:9px 18px;font-weight:600;font-size:.9rem;text-decoration:none;font-family:inherit}'+
    '.f2-secondary:hover{background:#eaf2fa}'+
    '.f2-link{color:#5a4710 !important;font-size:12.5px;text-decoration:underline;font-weight:600;white-space:nowrap}';
  document.head.appendChild(css);
  scan();
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
})();
