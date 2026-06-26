let form = document.getElementById("form")
let msg = document.getElementById("msg")
let list = document.getElementById("list")
let participants = document.getElementById("participantsH2")
let arr = JSON.parse(localStorage.getItem("users")) || []


function showUsers(){
    list.innerHTML = ""

    for(let i=0;i<arr.length;i++){
        let li = document.createElement("li")
        li.innerHTML = arr[i].name + " - " + arr[i].track +
            ` <button onclick="del(${i})">Delete</button>`
        list.appendChild(li)
    }

    participants.innerHTML = `Participants (${arr.length})`

}

function del(i){
    arr.splice(i,1)
    localStorage.setItem("users", JSON.stringify(arr))
    showUsers()
    msg.innerHTML = "Delete successfully"
    msg.classList.add("success")
}

showUsers()



form.addEventListener("submit", function(e){
    e.preventDefault()

    let name = document.getElementById("name").value.trim()
    let email = document.getElementById("email").value.trim()
    let age = Number(document.getElementById("age").value)
    let track = document.getElementById("track").value
    let terms = document.getElementById("terms").checked

    msg.className = ""

    if(name == ""){
        msg.innerHTML = "Full name required"
        msg.classList.add("error")
        return
    }

    if(email.indexOf("@") == -1){
        msg.innerHTML = "Invalid email"
        msg.classList.add("error")
        return
    }

    if(age < 18){
        msg.innerHTML = "Age must be 18+"
        msg.classList.add("error")
        return
    }

    if(track == ""){
        msg.innerHTML = "Choose track"
        msg.classList.add("error")
        return
    }

    if(!terms){
        msg.innerHTML = "Accept terms"
        msg.classList.add("error")
        return
    }

    let user = {
        name:name,
        email:email,
        age:age,
        track:track
    }

    arr.push(user)

    localStorage.setItem("users", JSON.stringify(arr))

    msg.innerHTML = "Registered successfully"
    msg.classList.add("success")

    form.reset()
    showUsers()
})

