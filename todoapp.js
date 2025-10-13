
let todo = []
let progress = []
let done = []

const renderList = (array, elementId, buttonName) => {
    const container = document.getElementById(elementId)
    container.innerHTML = `<h3>${elementId.charAt(0).toUpperCase() + elementId.slice(1)}</h3>`

    array.forEach((task, i) => {
        const div = document.createElement('div')
        div.className = 'task'

        let buttonHTML = ''
        if (buttonName) {
            buttonHTML = `<button onclick='${buttonName}(${i})'> > </button>`
        }

        if (elementId === 'done') {
            buttonHTML += `<button class="delete-btn" onclick="deleteTask(${i})">Delete</button>`
        }

        div.innerHTML = `<p>${task}</p> ${buttonHTML}`
        container.appendChild(div)
    })
}

const addTask = (event) => {
    event.preventDefault()
    const task = event.target[0].value.trim()
    if (!task) return
    todo.push(task)
    localStorage.setItem('todo', JSON.stringify(todo))
    event.target[0].value = ''
    renderAll()
}

const moveToProgress = (id) => {
    progress.push(todo[id])
    todo.splice(id, 1)
    localStorage.setItem('todo', JSON.stringify(todo))
    localStorage.setItem('progress', JSON.stringify(progress))
    renderAll()
}

const moveToDone = (id) => {
    done.push(progress[id])
    progress.splice(id, 1)
    localStorage.setItem('progress', JSON.stringify(progress))
    localStorage.setItem('done', JSON.stringify(done))
    renderAll()
}

const deleteTask = (id) => {
    done.splice(id, 1)
    localStorage.setItem('done', JSON.stringify(done))
    renderAll()
}

const renderAll = () => {
    renderList(todo, 'todo', 'moveToProgress')
    renderList(progress, 'progress', 'moveToDone')
    renderList(done, 'done', null)
}

const init = () => {
    todo = JSON.parse(localStorage.getItem('todo')) || []
    progress = JSON.parse(localStorage.getItem('progress')) || []
    done = JSON.parse(localStorage.getItem('done')) || []
    renderAll()
}

window.onload = init
document.getElementById('taskForm').addEventListener('submit', addTask)
