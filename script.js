const API_KEY = 'api_key=31d362638d8091422fd6cc6d9503d706';
const BASIC_URL = 'https://api.themoviedb.org/3';
const API_URL = BASIC_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
const SRCH_URL = BASIC_URL + '/search/movie?'+API_KEY;

const container = document.querySelector(".container");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

// sidebar

const tagEle= document.querySelector("#tag");

const genres=[
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

let result;

getMovies(API_URL)
function getMovies(url){
    fetch(url)
    .then(res => res.json())

    .then(data => {
       // console.log(data);  
        showMovies(data.results);
        result=data.results;
    })
}

function showMovies(data){

    container.innerHTML = '';

    //data.sort((a, b) => b.vote_average - a.vote_average);

    data.forEach(movie => {

        const {title, poster_path, overview, original_language, vote_average,id} = movie;

        const cardholder = document.createElement('div');
        cardholder.classList.add('card');
        //First letter capital 
        const language=original_language.charAt(0).toUpperCase() + original_language.slice(1);
        cardholder.innerHTML=  `
        <div class="img-container">
             <img class="card-img" src="${IMG_URL+poster_path}" alt="${title}" onclick="makeMove(this,${id})">
         </div>
         <div class="title">
            <h2 class="mov-title">${title}</h2>
         </div>
         <div class="lan-rating">
             <p class="language">${language}</p>
             <p class="rating ${ratingColor(vote_average)}">${vote_average}</p>
         </div>
        `

        container.appendChild(cardholder);
    });
}

function ratingColor(vote){
    if(vote >= 8){
        return "green";
    }
    else if(vote >= 5){
        return "orange";
    }
    else{
        return "red"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searTerm = search.value;

    console.log(searTerm);

    if(searTerm){
        getMovies(SRCH_URL+'&query='+searTerm)
    }
})

// genre setting code

// setGenre();
// var selGenre=[];
// function setGenre(){
//     tagEle.innerHTML="";
//     genres.forEach(genre=>{
//         const t=document.createElement('div');
//         t.classList.add('tag');
//         t.id=genre.id;
//         t.innerText=genre.name;
//         t.addEventListener('click', ()=>{
//           if(selGenre.length==0){
//             selGenre.push(genre.id);
//         }else{
//             if(selGenre.includes(genre.id)){
//                 selGenre.forEach((id,idx)=>{
//                     if(id==genre.id){
//                         selGenre.splice(idx,1);
//                     }

//                 })
//             }else{
//                 selGenre.push(genre.id);
//             }
//         }
//       console.log(selGenre)
//       getMovies(API_URL+'&with_genres='+encodeURI(selGenre.join(',')));
//       highlightGenre();

//         //   selGenre=genre.id;
       
//         //  //getMovies(API_URL+'&with_genres='+encodeURI(selGenre));
//         //   highlightGenre();
//         })
//         tagEle.append(t);
//     });
// }

// //sectect genre 
// function highlightGenre(){
//   const tags=document.querySelectorAll('.tag');
//   tags.forEach(tag => {
//       tag.classList.remove('highlighted');
//   })
//   if(selGenre.lenght!=0){
//       selGenre.forEach(id =>{
//           const highlightedTag=document.getElementById(id);
//           highlightedTag.classList.add('highlighted');
//       })
//   }

//   // const tags=document.querySelectorAll('.tag');
//   // tags.forEach(tag => {
//   //     tag.classList.remove('highlighted');
//   // })
//   //    console.log(selGenre)
//   //       document.getElementById(selGenre).classList.add('highlighted');
// }

// modal script

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function makeMove(url,id){
    modal.style.display="block";
    console.log(result)
    for(let item of result){
        if(item.id===id){
            document.getElementById('image').src=IMG_URL + item.poster_path;
            
           document.getElementById('title').innerText=item.title;
           document.getElementById('rating').innerText=item.vote_average+"/10";
           document.getElementById('language').innerText=item.original_language;
           
           document.getElementById('description').innerText=item.overview;
           let price = Math.floor(Math.random() * (300 - 250+1) + 250);
           document.querySelector("#booking").innerHTML = `
           <div id="ticket-container">
                    <p id="ticket-price"><span id="price">₹ &nbsp${price}</span></p>
                    <button id="buy-button"><span>Buy Ticket</span></button>
                </div>
                </div>`;
        //    document.getElementById('price').innerText=price;
           var genre=item.genre_ids;
        //    document.getElementById('genre').innerText=item.title;
        console.log(title.innerHTML);
            document.getElementById("buy-button").addEventListener("click", function() {
              
            window.location.href=`checkout.html?price=${price}&title=${title.innerHTML}`;
          });

        }
        
    }

}
// When the user clicks on <span> (x), close the modal
function makeOut() {
  modal.style.display = "none";
}



// ...

setGenre();
var selGenres = []; // Array to store selected genres
var multiSelectCheckbox = document.querySelector('.toggle input');

function setGenre() {
  tagEle.innerHTML = "";
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (multiSelectCheckbox.checked) {
        if (selGenres.includes(genre.id)) {
          // If genre is already selected, remove it from the array
          selGenres = selGenres.filter(id => id !== genre.id);
        } else {
          // Otherwise, add the genre to the array
          selGenres.push(genre.id);
        }
        getMovies(API_URL + '&with_genres=' + encodeURI(selGenres.join(',')));
        highlightGenre();
      } else {
        // If checkbox is not checked, allow only single genre selection
        selGenres = [genre.id];
        getMovies(API_URL + '&with_genres=' + encodeURI(selGenres.join(',')));
        highlightGenre();
      }
    });
    tagEle.append(t);
  });
}

function highlightGenre() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlighted');
  });
  selGenres.forEach(id => {
    const highlightedTag = document.getElementById(id);
    highlightedTag.classList.add('highlighted');
  });
}

multiSelectCheckbox.addEventListener('change', () => {
  if (!multiSelectCheckbox.checked && selGenres.length > 1) {
    // If checkbox is unchecked and multiple genres are selected, keep only the first selected genre
    selGenres = [selGenres[0]];
    getMovies(API_URL + '&with_genres=' + encodeURI(selGenres.join(',')));
    highlightGenre();
  }
});