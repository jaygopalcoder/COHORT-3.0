
const body = document.body
const inputBox = document.querySelector("#user-input");
const option = document.querySelector("#category")
const submitBtn = document.querySelector(".submit")
const editForm = document.querySelector("#edit-form")

let form = document.querySelector("form")
let cardContainer = document.querySelector(".card-layout");
const themeButton = document.querySelector(".theme-switch");



let themeStatus = localStorage.getItem("theme") || "light";
if (themeStatus === "dark") {
  body.classList.add("darkmode");
}

localStorage.setItem("theme",themeStatus)
themeButton.addEventListener("click",()=>{
  const isDark = body.classList.toggle("darkmode")
  localStorage.setItem("theme", isDark?"dark":"light")
})


const userData = JSON.parse(localStorage.getItem("myTask"))
let userTask = userData ?? []

function display(){
  cardContainer.innerHTML = ""
  userTask.forEach(({value,category,completed},idx)=>{
      cardContainer.innerHTML += `<div class="user-card"  data-category = "${category}" data-id = "${idx}">
        <div class="card-task-container">
          <h2 class="card-text ${completed? "card-text-completed" : ""}">${value}
          </h2>
          <p>Category: ${category}</p>
        </div>
        <div class="button-container">
          <button class="card-layout-btn delete-btn" >
            Delete
            <i class="ri-delete-bin-5-fill"></i>
            
            
          </button>
          <button class="card-layout-btn edit-btn">
            
            Edit
            <i class="ri-edit-fill"></i>
            
          </button>
          <button class="card-layout-btn done-btn">
           
            Done
             <i class="ri-check-fill"></i>
           
          </button>
        </div>
      </div>`;
  })
}
display()
form.addEventListener("submit", (event)=>{
  event.preventDefault()
  const value = inputBox.value
  const category = option.value

  if(!value || !category){
    alert("Please fill out all fields!");
    return;
  }
  const mode = submitBtn.getAttribute("data-mode")
  if (mode === "edit") {
    const editIdx = submitBtn.getAttribute("data-edit-id");
    userTask[editIdx] = { value, category, completed:false};

    submitBtn.innerText = "Add";
    submitBtn.setAttribute("data-mode", "add");
    submitBtn.setAttribute("data-edit-id", "");
  } else {
    userTask.push({ value, category, completed:false});
  }
  localStorage.setItem("myTask", JSON.stringify(userTask))
  display();
  form.reset()
})
cardContainer.addEventListener("click", (event)=>{
  const targetBtn = event.target.closest(".card-layout-btn");
  if (!targetBtn) return;

  const card = targetBtn.closest(".user-card");
  const taskIdx = card.getAttribute("data-id");

  if (targetBtn.classList.contains("delete-btn")) {
    userTask.splice(taskIdx, 1);
    localStorage.setItem("myTask", JSON.stringify(userTask));
    display();
  } else if (targetBtn.classList.contains("edit-btn")) {
    const taskToEdit = userTask[taskIdx];
    inputBox.value = taskToEdit.value;
    option.value = taskToEdit.category;

    submitBtn.innerText = "Save";
    submitBtn.setAttribute("data-mode", "edit");
    submitBtn.setAttribute("data-edit-id", taskIdx);

    inputBox.focus();
  } 
  else if (targetBtn.classList.contains("done-btn")) {
    userTask[taskIdx].completed = !userTask[taskIdx].completed;
    localStorage.setItem("myTask", JSON.stringify(userTask));
    display(); 
  }


})
