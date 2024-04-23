// ENCONTRAR O BOTÃO "ADICIONAR TAREFA"

function selection(classe){
    return document.querySelector(classe)
}

const btnAddTask = selection('.app__button--add-task')
const btnFormTask = selection('.app__form-add-task')
const textArea = selection('.app__form-textarea')
const ulTasks = selection('.app__section-task-list')

const tasks = JSON.parse(localStorage.getItem('tasks')) || []

function atualizarTarefas(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createTaskElement(task){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = task.description
    paragrafo.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button')
    button.classList.add('app_button-edit')

    button.onclick = () => {
        newTaskValue = prompt('Qual é o novo nome da tarefa?')

        paragrafo.textContent = newTaskValue
        task.description = newTaskValue
        atualizarTarefas()
    }

    const imageButton = document.createElement('img')
    imageButton.setAttribute('src', '/imagens/edit.png')

    button.append(imageButton)

    li.append(svg)
    li.append(paragrafo)
    li.append(button)

    return li
}

btnAddTask.addEventListener('click', () => {
    btnFormTask.classList.toggle('hidden')
})

btnFormTask.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const task = {
        description: textArea.value
    }
    
    tasks.push(task)
    const taskElement = createTaskElement(task)
    ulTasks.append(taskElement)
    atualizarTarefas()
    textArea.value = ''
    btnFormTask.classList.add('hidden')
})

tasks.forEach(task => {
    const taskElement = createTaskElement(task)
    ulTasks.append(taskElement)
});