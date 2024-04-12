// listens for the submit event
document.addEventListener("DOMContentLoaded", () => {
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
        // You can further process the matching player data here
        } else {
        console.log("Player with jersey number", jersey, "not found");
        }
    })
  });
});

// function to create the todo list
function createToDo(matchingPlayer) {
  let btn = document.createElement("button");
  btn.addEventListener("click", handleDelete);
  btn.textContent = "remove";
  let listItems = document.createElement("li");
  listItems.innerHTML = description;
  listItems.appendChild(btn);
  document.querySelector("#tasks").appendChild(listItems);
}




// fucntion to handle deletion of the tasks
function handleDelete(e) {
  e.target.parentNode.remove();
}
