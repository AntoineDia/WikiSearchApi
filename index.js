document.getElementById('search').addEventListener('keydown', goodcheck);

function goodcheck(key){
  if (key.keyCode === 13) {
    goodboy();
   }
}

// const url = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=terre';

// fetch(url).then(function(resp){
//   return resp.json();
// }).then(function(data) {
//   console.log(data);
// })
