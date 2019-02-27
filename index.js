//TOINTOIN DIAMBU

//  Juste rendre le logo cliqable
document.querySelector('#searchbar > h1').addEventListener('click', function(){location.reload()});

// {Position: sticky} pour les nuls (genre moi)
window.addEventListener('scroll', dessente);
function dessente(){
  if (window.scrollY > 110){
    document.querySelector('#searchbar > h1').setAttribute('class','youpush');
    document.querySelector('#stick').setAttribute('class','youstick');
    window.addEventListener('scroll', montee);
    window.removeEventListener('scroll', dessente);
  }
};
function montee(){
  if (window.scrollY < 70){
    document.querySelector('#searchbar > h1').removeAttribute('class');
    document.querySelector('#stick').removeAttribute('class');
    window.addEventListener('scroll',dessente);
    window.removeEventListener('scroll', montee);
  }
};

//Ajoute l'événement de recherche
document.querySelector('#stick > span').addEventListener('click', getsearch);
document.getElementById('search').addEventListener('keydown', isEnter);
function isEnter(key){
  if (key.keyCode === 13) {
    getsearch();
   }
}

//  Récupère les données
function getsearch(){
  if(document.getElementById('search').value != ""){
    document.querySelector('main').removeChild(document.querySelector('#resultats'));
    document.querySelector('main').innerHTML += '<div id="resultats"></div>';
    var url = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=20&search=';
    url += document.getElementById('search').value;
    fetch(url).then(function(reponse){
      return reponse.json();
    }).then(function(data) {
      incorpHtml(data);
    });
  } else {
    location.reload();
  }
};

//Affiche les données dans l'html
function incorpHtml(el){
  var r = document.querySelector('#resultats');

  if(el[1].length == 0){
    el[1].push('Nothing here :(');
    el[2].push('Search something that exist<br>THIS IS A 404!! ABORT!!');
    el[3].push('');
  };

  for(i = 0; i < el[1].length; i++){

    let div = document.createElement('div');
    div.setAttribute('class','resultat');
    div.setAttribute('id',`resu${i}`);
    div.setAttribute('url',el[3][i]);

    let h2 = document.createElement('h2');
    h2.innerText = el[1][i];

    let p = document.createElement('p');
    p.innerText = el[2][i];

    let iframe = document.createElement('iframe');
    iframe.setAttribute('class','myiframe');

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(iframe);

    r.appendChild(div);
    document.getElementById(`resu${i}`).addEventListener('click',hellowiki);
  };
};

function hellowiki(divbrut){
  var div = '';
  if(divbrut.path.length<8){
    div = divbrut.path[0];
  } else {
    div = divbrut.path[1];
  }
  ifr = div.getElementsByTagName('iframe')[0];
  ifr.setAttribute('class','newframe');
  ifr.setAttribute('src',div.getAttribute('url'));
  div.removeEventListener('click',hellowiki);
  div.addEventListener('click', byewiki);
  if(document.getElementById('needcol')){
    console.log('hey');
    el = document.getElementById('needcol');
    el.setAttribute('id','');
    byewiki(el);
  }
  div.setAttribute('id','needcol');
}

function byewiki(elcol){
  if(elcol.target){
    if(elcol.path.length<8){
      elcol = elcol.path[0];
    } else {
      elcol = elcol.path[1];
    }
  }
  elcol.removeEventListener('click',byewiki);
  elcol.addEventListener('click', hellowiki);
  elcol.setAttribute('id','');
  let ifr = elcol.getElementsByTagName('iframe')[0];
  ifr.setAttribute('class','byeframe');
}

// let url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=revisions&rvprop=content&format=json&titles=';
//   page = page.replace('https://en.wikipedia.org/wiki/','');
//   page = page.replace(/[\_]+/g,'%20');
//   url+=page;