document.addEventListener("DOMContentLoaded", () => {
  displaySquad(); //this function displays a squad of 11 random players when the DOM loads

  let form = document.getElementById("get-player-form");

  // listens for the submit event for substitution
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    jersey = e.target["get-player"].value;

    // GETs the player matching the jersey number
    fetch("http://localhost:3000/first-11")
      .then((response) => response.json())
      .then((players) => {
        const jerseyNumber = parseInt(jersey, 10); // Parse jersey string to a number
        const matchingPlayer = players.find((player) => player.id === jerseyNumber);
        if (matchingPlayer) {
          console.log("Found player:", matchingPlayer);
          displayPlayer(matchingPlayer);
        } else {
          alert(`Player with jersey number ${jersey} not found`);
        }
      });
  });
});

// function to create the player list
function displayPlayer(matchingPlayer) {
  let btn = document.createElement("button");
  btn.addEventListener("click", handleDelete);
  btn.textContent = "substitute";
  let listItems = document.createElement("li");
  listItems.innerText = matchingPlayer.name;
  listItems.appendChild(btn);
  document.querySelector("#players").appendChild(listItems);
}

// function to fetch random 11 players
function displaySquad() {
  fetch("http://localhost:3000/first-11/")
    .then((response) => response.json())
    .then((players) => {
      players.sort(() => Math.random() - 0.5); //shuffles the order
      const squad = players.slice(0, 11); // slices the first 11 randomized players
      // iterate through the array and append the name to the list selector
      let i = 0;

      while (i < 11 && i < squad.length) {
        // Check both loop condition and array length
        const player = squad[i];
        displayPlayer(player);
        i++;
      }
    });
}

// function to handle deletion a player
function handleDelete(e) {
  e.target.parentNode.remove();
}

// function to handle a POST request
function submitPlayer() {
  const form = document.getElementById("nominate-player-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const playerName = document.getElementById("player-name").value;
    const playerPosition = document.getElementById("player-pos").value;
    const jerseyNumber = document.getElementById("jersey-number").value;

    // Data validation (add checks as needed)
    if (!playerName || !playerPosition || !jerseyNumber) {
      alert("Please fill out all fields!");
      return;
    }

    const data = {
      name: playerName,
      position: playerPosition,
      id: jerseyNumber,
    };
    // this ia POST request to the database
    fetch("http://localhost:3000/first-11", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Success!
        const successMessage = document.createElement("p");
        successMessage.textContent = `Player with ID ${result.id} successfully nominated!`;
        document.body.appendChild(successMessage);
      })
      // error handling
      .catch((error) => {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `Error nominating player: ${error.message}`;
        errorMessage.style.color = "red"; // Add visual distinction for error
        document.body.appendChild(errorMessage);
      });
  });
}

submitPlayer();
