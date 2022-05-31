////////////////////DATA CONTROLLER////////////////////
//store task
import {element} from "mdb-ui-kit/src/js/mdb/util";

const taskStore = []

//constructor for task
class Task {
  constructor(id, desc) {
    this.id = id
    this.desc = desc
  }
}

//add task
function addTask(desc) {
  let ID, newTask
  if (taskStore.length > 0) {
    ID = taskStore[taskStore.length - 1].id + 1
  } else {
    ID = 0
  }

  //create new task
  newTask = new Task(ID, desc)

  //push in to data strukture
  taskStore.push(newTask)

  //return the new element
  return newTask
}

//delete task
function deleteTask(id) {
  let ids, index
  //taskstore[2]
  //[1,2,3,4,5,6] id=5

  //create array for ids
  ids = taskStore.map(function (current) {
    return current.id
  })

  //find ids index
  index = ids.indexOf(parseInt(id))

  //delete task
  if (index !== -1) {
    taskStore.splice(index, 1)
  }
}

////////////////////UI CONTROLLER////////////////////
const DomStrings = {
  addBtn: document.querySelector('button[type="submit"]'),
  taskDescr: document.querySelector('#form1'),
  taskContainer: document.querySelector('tbody')
}

//add task to UI
function addListTask(task) {
  //create html string with placeholder text
  let html = `<tr id=${
    task.id
  } style="vertical-align: middle"><th scope="row">${
    task.id + 1
  }</th><td style="max-width: 210px">${
    task.desc
  }</td><td>В процессе</td><td style="text-align: end"><button class="btn btn-danger" type="submit">Удалить</button><button class="btn btn-success ms-1" type="submit">Готово</button></td></tr>`

  //insert the HTML in to the DOM
  let el = DomStrings.taskContainer
  el.insertAdjacentHTML('beforeend', html)
}

//delete task from UI
function deleteListTask(selectorID) {
  let el
  el = document.getElementById(selectorID)

  //remove html from dom
  el.remove()
}

//done function
function doneListTask(selectorID) {
  let el
  el = document.getElementById(selectorID)

  //add new class for row description
  for (let i = 0; i < el.children.length; i++) {
    el.children[i].classList.toggle('done')
  }
}

////////////////////APP CONTROLLER////////////////////
function ctrlAddTask() {
  //get input data from dom
  let newTask
  const input = DomStrings.taskDescr
  let text = input.value

  //check for text
  if (text) {
    //add the task to the data structure
    newTask = addTask(text)

    //add the task to the UI
    addListTask(newTask)

    //clear the field
    input.value = ''
    input.blur()
  } else {
  }
}

function ctrlDeleteTask(event) {
  let finishedBtn, clickedElement
  finishedBtn = 'btn btn-success ms-1 ripple-surface'
  clickedElement = event.target.className

  //find id
  let taskID = event.target.parentNode.parentNode.id

  //check done button
  if (clickedElement === finishedBtn) {
    //change UI
    doneListTask(taskID)
    //check is there any id
  } else if (taskID) {
    //delete the task from the structure
    deleteTask(taskID)

    //delete the task from the UI
    deleteListTask(taskID)
  }
}

document
  .querySelector('button[type="submit"]')
  .addEventListener('click', function (e) {
    e.preventDefault()
    ctrlAddTask()
  })

document.addEventListener('keypress', function (e) {
  if (event.keyCode === 13 || event.which === 13) {
    ctrlAddTask()
  }

  DomStrings.taskContainer.addEventListener('click', ctrlDeleteTask)
})
