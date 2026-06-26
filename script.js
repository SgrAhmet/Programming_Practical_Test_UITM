let form = document.getElementById("form");
let msg = document.getElementById("msg");
let msgArea = document.getElementById("msgArea");
let list = document.getElementById("list");
let participants = document.getElementById("participantsH2");
let arr = JSON.parse(localStorage.getItem("users")) || [];

function showMessageArea() {
  msgArea.classList.add("show");

  setTimeout(() => {
    msgArea.classList.remove("show");
  }, 3000);
}

function showUsers() {
  list.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement("li");
    li.innerHTML =
      arr[i].name +
      " - " +
      arr[i].track +
      ` <button onclick="del(${i})">Delete</button>`;
    list.appendChild(li);
  }

  participants.innerHTML = `Participants (${arr.length})`;
}

function del(i) {
  arr.splice(i, 1);
  localStorage.setItem("users", JSON.stringify(arr));
  showUsers();
  msgArea.classList.remove("errorArea", "successArea");

  msg.innerHTML = "Detele successfully";
  msg.classList.add("success");
  msgArea.classList.add("successArea");
  showMessageArea();
}

showUsers();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let age = Number(document.getElementById("age").value);
  let track = document.getElementById("track").value;
  let terms = document.getElementById("terms").checked;

  msg.className = "";

  if (name == "") {
    msgArea.classList.remove("errorArea", "successArea");

    msg.innerHTML = "Full name required";
    msg.classList.add("error");
    msgArea.classList.add("errorArea");
    showMessageArea();

    return;
  }

  if (email.indexOf("@") == -1) {
    msgArea.classList.remove("errorArea", "successArea");

    msg.innerHTML = "Invalid email";
    msgArea.classList.add("errorArea");
    msg.classList.add("error");
    showMessageArea();

    return;
  }

  if (age < 18) {
    msgArea.classList.remove("errorArea", "successArea");

    msg.innerHTML = "Age must be 18+";
    msgArea.classList.add("errorArea");
    msg.classList.add("error");
    showMessageArea();

    return;
  }

  if (track == "") {
    msgArea.classList.remove("errorArea", "successArea");

    msg.innerHTML = "Choose track";
    msgArea.classList.add("errorArea");
    msg.classList.add("error");
    showMessageArea();

    return;
  }

  if (!terms) {
    msgArea.classList.remove("errorArea", "successArea");

    msg.innerHTML = "Accept terms";
    msgArea.classList.add("errorArea");
    msg.classList.add("error");
    showMessageArea();

    return;
  }

  let user = {
    name: name,
    email: email,
    age: age,
    track: track,
  };

  arr.push(user);

  localStorage.setItem("users", JSON.stringify(arr));

  msg.innerHTML = `
  ${user.name} has been signed up for the<br>
  workshop.<br>
  Track: ${user.track}<br>
  Age: ${user.age}
`;
  msgArea.classList.remove("errorArea", "successArea");
  msg.classList.add("success");
  msgArea.classList.add("successArea");
  showMessageArea();

  form.reset();
  showUsers();
});
