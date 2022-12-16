const form = document.querySelector('.form-add-todo')
const todoContainer = document.querySelector('.todos-container')
const formSearchInput = document.querySelector('.form-search input')

const addTodo = inputValue => {
  if (inputValue.length) {
    todoContainer.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
      </li>
    `
    event.target.reset()
  }
}

const removeTodo = clickedElement => {
  const dataTrashValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${dataTrashValue}"]`)

  if(dataTrashValue) {
    todo.remove()
  }
}

const filterTodo = (inputValue, todos, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodo = todo.textContent.trim().toLowerCase().includes(inputValue)
    return returnMatchedTodos ? matchedTodo : !matchedTodo
  })

const manipulatedClasses = (todos, classAdd, classRemove) => todos
 .forEach(todo => {
    todo.classList.add(classAdd)
    todo.classList.remove(classRemove)
 })

const hideTodo = (inputValue, todos) => {
  const todoHide = filterTodo(inputValue, todos, false)
  manipulatedClasses(todoHide, 'hidden', 'd-flex')
}

const showTodo = (inputValue, todos) => {
  const todoShow = filterTodo(inputValue, todos, true)
  manipulatedClasses(todoShow, 'd-flex', 'hidden' )
}


form.addEventListener('submit', event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()
  addTodo(inputValue)  
})

todoContainer.addEventListener('click', event => {
  const clickedElement = event.target
  removeTodo(clickedElement)
})

formSearchInput.addEventListener('input', event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos =  Array.from(todoContainer.children)
  hideTodo(inputValue, todos)
  showTodo(inputValue, todos)
})