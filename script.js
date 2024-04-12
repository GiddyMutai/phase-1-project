// listens for the submit event for substitution
document.addEventListener("DOMContentLoaded", () => {
  displaySquad()
  let form = document.querySelector("form");  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    jersey = (e.target["get-player"].value);


    // GETs the player matching the jersey number
    fetch('http://localhost:3000/first-11/')
    .then((response) => response.json())
    .then((players) => {
        const jerseyNumber = parseInt(jersey, 10); // Parse jersey string to a number
        const matchingPlayer = players.find(player => player.id === jerseyNumber);
        if (matchingPlayer) {
        console.log("Found player:", matchingPlayer);
        displayPlayer(matchingPlayer)
        } else {
        console.log("Player with jersey number", jersey, "not found");
        }
    })
  });
});

// function to create the player list
function displayPlayer(matchingPlayer) {
  let btn = document.createElement("button");
  btn.addEventListener("click", handleDelete);
  btn.textContent = "remove";
  let listItems = document.createElement("li");
  listItems.innerText = matchingPlayer.name
  listItems.appendChild(btn);
  document.querySelector("#players").appendChild(listItems);
}


// function to fetch random 11 players 
function displaySquad(){
    fetch("http://localhost:3000/first-11/")
    .then((response) => response.json())
    .then((players) => {
        players.sort(() => Math.random() - 0.5) //shuffles the order
        const squad = players.slice(0,11) // slices the first 11 randomized players
        console.log(squad)
    })
}



// fucntion to handle deletion of the tasks
function handleDelete(e) {
  e.target.parentNode.remove();
}
