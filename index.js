// TOINTOIN DIAMBU

// index variables
d = document;
w = window;

//  Juste rendre le logo cliquable
d.querySelector('#searchbar > h1').addEventListener('click', retour => location.reload());

w.addEventListener('scroll', descente);

function descente() {
  if (w.scrollY > 110){
    d.querySelector('#searchbar > h1').setAttribute('class','youpush');
    d.querySelector('#stick').setAttribute('class','youstick');
    w.addEventListener('scroll', montee);
    w.removeEventListener('scroll', descente);
  }
};
function montee() {
  if (w.scrollY < 70){
    d.querySelector('#searchbar > h1').removeAttribute('class');
    d.querySelector('#stick').removeAttribute('class');
    w.addEventListener('scroll',descente);
    w.removeEventListener('scroll', montee);
  }
};
d.querySelector('#stick > span').addEventListener('click', getsearch);
d.getElementById('search').addEventListener('keydown', isEnter);
function isEnter(key) {
  if (key.keyCode === 13) {
    getsearch();
  }
}


d.getElementById('search').addEventListener('input',getautocompl);
//autocompletion
function getautocompl(key){
  mot = d.getElementById('search').value;
  if (mot != ""){
    var url =
    'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=5&search=';
    url += d.getElementById('search').value;
    fetch(url)
    .then(function(reponse){
      return reponse.json();
    })
    .then(function(words){
      d.querySelector('#stick').removeChild(d.querySelector('#stick > ul'));
      d.querySelector('#stick').appendChild(d.createElement('ul'));
      d.addEventListener('click', function(){
        d.querySelector('#stick').removeChild(d.querySelector('#stick > ul'));
        d.querySelector('#stick').appendChild(d.createElement('ul'));
      })
      words[1].forEach(word =>{
        let li = d.createElement('li');
        li.setAttribute('class','autocomplete');
        li.innerText = word;
        d.querySelector('#stick > ul').appendChild(li);
        li.addEventListener('click', function(leclic){
          d.getElementById('search').value = leclic.path[0].innerText;
          getsearch();
        })
      });
    });
  } else {
    d.querySelector('#stick').removeChild(d.querySelector('#stick > ul'));
    d.querySelector('#stick').appendChild(d.createElement('ul'));
  }
}

// Récupère les données depuis wikipedia
function getsearch(){
  if(!d.getElementById('search').value != ""){
    location.reload();
  } else {
    d.querySelector('#stick').removeChild(d.querySelector('#stick > ul'));
    d.querySelector('#stick').appendChild(d.createElement('ul'));
    d.querySelector('main').removeChild(d.querySelector('#resultats'));
    d.querySelector('main').innerHTML += '<div id="resultats"></div>';
    var url =
    'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=20&search=';
    url += d.getElementById('search').value;
    fetch(url).then(function(reponse){
      return reponse.json();
    }).then(function(data) {
      incorpHtml(data);
    });
  }
};

//Affiche les données dans l'html
function mC(theparent,thechilds){
  thechilds.forEach(child => {
    theparent.appendChild(child);
  });
}
function incorpHtml(el){
  var r = d.querySelector('#resultats');
  if(el[1].length == 0){
    el[1].push('Nothing here :(');
    el[2].push('Search something that exist. THIS IS A 404!! ABORT!!');
    el[3].push('');
  };
  for(i = 0; i < el[1].length; i++){
    let div = d.createElement('div');
    div.setAttribute('class','resultat');
    div.setAttribute('url',el[3][i]);
    let h2 = d.createElement('h2');
    h2.innerText = el[1][i];
    let p = d.createElement('p');
    p.innerText = el[2][i];
    let iframe = d.createElement('iframe');
    iframe.setAttribute('class','myiframe');
    mC(div,[h2,p,iframe]);
    r.appendChild(div);
    div.addEventListener('click',hellowiki);
  };
};
//afiche l'iframe
function hellowiki(mouseevent){
  var div = '';
  if(mouseevent.path.length<8){
    div = mouseevent.path[0];
  } else {
    div = mouseevent.path[1];
  }
  p = div.getElementsByTagName('p')[0];
  p.setAttribute('class','colapse');
  ifr = div.getElementsByTagName('iframe')[0];
  ifr.setAttribute('class','newframe');
  ifr.setAttribute('src',div.getAttribute('url'));
  div.removeEventListener('click',hellowiki);
  div.addEventListener('click', byewiki);
  if(d.getElementById('needcol')){
    el = d.getElementById('needcol');
    el.removeAttribute('id');
    byewiki(el);
  }
  div.setAttribute('id','needcol');
}
//cache l'iframe
function byewiki(elcol){
  if(elcol.target){
    if(elcol.path.length<8){
      elcol = elcol.path[0];
    } else {
      elcol = elcol.path[1];
    }
  }
  elcol.removeEventListener('click',byewiki);
  elcol.removeAttribute('id');
  p = elcol.getElementsByTagName('p')[0];
  p.setAttribute('class','expand');
  ifr = elcol.getElementsByTagName('iframe')[0];
  ifr.setAttribute('class','byeframe');
  setTimeout(function(){
    ifr.removeAttribute('src');
    elcol.addEventListener('click', hellowiki);
  }, 450);
}

// let url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=revisions&rvprop=content&format=json&titles=';
//   page = page.replace('https://en.wikipedia.org/wiki/','');
//   page = page.replace(/[\_]+/g,'%20');
//   url+=page;