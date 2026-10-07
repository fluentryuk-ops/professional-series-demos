/* Post tracking for the demo site.
   Add these to any link you share:  ?utm_source=instagram&utm_medium=story&post=reel-feedback-1
   The index passes them on to the demo, and the demo's buy buttons pass them to Shopify,
   so Shopify can show which post led to a sale. Nothing is stored on the visitor's device. */
(function(){
  var KEYS=['utm_source','utm_medium','utm_campaign','post'];
  function clean(v){return String(v||'').toLowerCase().replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,60);}
  var q={};
  try{ new URLSearchParams(location.search).forEach(function(v,k){ if(KEYS.indexOf(k)>-1) q[k]=clean(v); }); }catch(e){}
  var tagged=!!(q.utm_source||q.utm_medium||q.post||q.utm_campaign);
  var P={source:q.utm_source||'demo', medium:q.utm_medium||'demo', campaign:q.post||q.utm_campaign||'direct', tagged:tagged};
  function enc(s){return encodeURIComponent(s);}
  function forward(url){
    if(!P.tagged||!url) return url;
    var sep=url.indexOf('?')>-1?'&':'?';
    return url+sep+'utm_source='+enc(P.source)+'&utm_medium='+enc(P.medium)+'&post='+enc(P.campaign);
  }
  function buy(base,toolkit,choice,where){
    var sep=base.indexOf('?')>-1?'&':'?';
    return base+sep+'utm_source='+enc(P.source)+'&utm_medium='+enc(P.medium)+'&utm_campaign='+enc(P.campaign)+
           '&utm_content='+enc([toolkit,choice,where||'button'].join('-'));
  }
  window.FTRACK={params:P,forward:forward,buy:buy};
})();
