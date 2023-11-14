const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGFjOGNiYTlhMzkzN2E1ZjAyY2Q2YmMyMGRiMTg1YSIsInN1YiI6IjY1NDJkOGEzNmJlYWVhMDBhYzFlM2UzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pHgRUD1xVwRqdk8HrKBexKsflMo-JYHm6TaLm3_NquQ'
    }
  };

  const genre_dict = {
    "action": 28,
    "adventure": 12,
    "animation": 16,
    "comedy": 35,
    "crime": 80,
    "documentary": 99,
    "drama": 18,
    "family": 10751,
    "fantasy": 14,
    "history": 36,
    "horror": 27,
    "music": 10402,
    "mystery": 9648,
    "romance": 10749,
    "science fiction": 878,
    "tv movie": 10770,
    "thriller": 53,
    "war": 10752,
    "western": 37,
    "n/a": 0
}

document.querySelector('.submit').addEventListener('click', getFetch)


//Page stuff >:( 
// let page = 1;
//   document.querySelector('#next').addEventListener('click', fetch => {
//     console.log(page)
//     page++
//   })

  //Get form element
const form=document.getElementById("form-main");
function submitForm(event){

   //Preventing page refresh
   event.preventDefault();
}

//Calling a function during form submission.
form.addEventListener('submit', submitForm);

  function getFetch(){
    const choice = genre_dict[document.querySelector('#genre').value]
    const langChoice = document.querySelector('#language').value
    const userScore = document.querySelector('#user-score').value
    const releaseMin = document.querySelector('#release-min').value
    const releaseMax = document.querySelector('#release-max').value
    const releaseMinFinal = releaseMin + "-01-01"
    const releaseMaxFinal = releaseMax + "-12-31"
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const current = document.getElementById('current');

    console.log(choice)
    console.log(langChoice)
    console.log(userScore)
    console.log(releaseMin)
    console.log(releaseMax)
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&with_original_language=${langChoice}&sort_by=popularity.desc&with_genres=${choice}&primary_release_date.gte=${releaseMin}-01-01&primary_release_date.lte=${releaseMax}-12-31`

    fetch(url, options)
    
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response['results'].forEach(obj => {
                if(obj.vote_average >= userScore &&
                   (obj.release_date >= releaseMinFinal &&
                   obj.release_date <= releaseMaxFinal)){
                    console.log(obj.original_title)
                    console.log(obj.original_language)
                    console.log(obj.vote_average)
                    console.log(obj.release_date)
                document.querySelector('h2').innerText = response['results'][0].original_title
                document.querySelector('img').src = "https://image.tmdb.org/t/p/original/" + response['results'][0].poster_path
                document.querySelector('p').innerText = response['results'][0].overview
                //create an li
                const li = document.createElement('li')
                const span = document.createElement('span')
                span.textContent = obj.original_title;
                li.appendChild(span)
                li.appendChild(document.createTextNode(" || " + obj.vote_average + " || " + obj.overview + " || " + obj.release_date));
                
                document.querySelector('ul').appendChild(li);

                
            }
            
        
             
            })
          
        })
        .catch(err => console.error(err));

        
    
        
          }

          
        

             



      
                