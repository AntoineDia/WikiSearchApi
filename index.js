//TOINTOIN DIAMBU

window.addEventListener('scroll', dessente); 
function dessente(){
  if (window.scrollY > 100){
    document.querySelector('#stick').setAttribute('class','youstick');
    window.addEventListener('scroll', montee); 
    window.removeEventListener('scroll', dessente);
  }
};
function montee(){
  if (window.scrollY < 70){
    document.querySelector('#stick').removeAttribute('class');
    window.addEventListener('scroll',dessente);
    window.removeEventListener('scroll', montee);
  }
};

document.querySelector('#stick > span').addEventListener('click', getsearch);
document.getElementById('search').addEventListener('keydown', isEnter);

function isEnter(key){
  if (key.keyCode === 13) {
    getsearch();
   }
}

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
  }
};

function incorpHtml(el){
  var r = document.querySelector('#resultats');
  for(i = 0; i < el[1].length; i++){
    r.innerHTML += `
    <div class="resultat">
      <h2>${el[1][i]}</h2>
      <p value="${el[3][i]}">${el[2][i]}</p>
    </div>
    `;
  }
};


