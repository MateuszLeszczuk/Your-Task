let todoInput
let errorInfo
let addBtn 
let ulList

 let popup
 let popupInfo
 let todoToEdit
 let popupInput
 let popupAddBtn
 let popupCloseBtn

const main = () => {
    prepareDOMElements()
    preperareDOMEvents()
}


const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const preperareDOMEvents = () => {
    addBtn.addEventListener('click',addNewTask)
    ulList.addEventListener('click',checkClick)
    popupCloseBtn.addEventListener('click',closePopup)
    popupAddBtn.addEventListener('click',changeTodoText)
    todoInput.addEventListener('keyup',enterKeyCheck)
}

const addNewTask = () =>{
    if (todoInput.value != ''){
        const newTodo = document.createElement('li')
        newTodo.textContent = todoInput.value
        
        createToolsArea(newTodo)

        ulList.append(newTodo)


        todoInput.value = ''
        errorInfo.textContent = ''
    }
    else{
        errorInfo.textContent = 'Type your task!!!'
    }
}


const createToolsArea = (newTodo) =>{
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTodo.append(toolsPanel)

    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete')
    completeBtn.innerHTML ='<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const removeBtn = document.createElement('button')
    removeBtn.classList.add('delete')
    removeBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(completeBtn,editBtn,removeBtn)
}

const checkClick = e =>{
    if (e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    } else if (e.target.matches('.edit')){
        editTodo(e)
    } else if (e.target.matches('.delete')){
        deleteTodo(e)
    }
}

const editTodo = (e) =>{
    todoToEdit = e.target.closest('li')
    
    popupInput.value = todoToEdit.firstChild.textContent
    popup.style.display = 'flex'
}

const closePopup =  () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const changeTodoText = () =>{
    if (popupInput.value != ''){
        todoToEdit.firstChild.textContent = popupInput.value
        closePopup()
        
    }else{
        popupInfo.textContent = 'Task can not be empty'
    }
}

const deleteTodo = (e) => {
    
    e.target.closest('li').remove()

    const allTodos = document.querySelectorAll('li')

    if (allTodos.length == 0){
        errorInfo.textContent = 'List is empty'
    }
}

const enterKeyCheck = e =>{
    if(e.key==='Enter'){
        addNewTask()
    }
}


document.addEventListener('DOMContentLoaded', main)