const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

$(document).ready(function(){
  SetSeats();
  populationUI();
  // Initial count and total set
  updateSelectedCount();
  ContainerSeatsClick();
  MovieSelectChange();
});

function SetSeats() {
  const rowscount = 5;
  const seatscount = 8;

  let htmlStr = '<div class="screen"></div>';
  for(let i=0; i < rowscount; i++){
    htmlStr += '<div class="row">'
    for(let j=0; j < seatscount; j++){
      htmlStr += '<div class="seat"></div>'
    }
    htmlStr += '</div>'
  }
  $('.container').append(htmlStr);
}

let ticketPrice = movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  console.log('selectedSeats' + selectedSeats);
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  console.log('seatsIndex' + seatsIndex);
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

function populationUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function MovieSelectChange() {
  // Movie select event
  movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });
}

function ContainerSeatsClick(){
  // Seat click event
  container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');

      updateSelectedCount();
    }
  });
}


