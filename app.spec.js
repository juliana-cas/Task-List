import { describe, it, expect, beforeEach } from 'vitest';

// Configuración de un entorno de DOM usando jsdom-global
import { JSDOM } from 'jsdom';
let dom;
let document;

beforeEach(() => {
  // Cargar el HTML antes de cada prueba
  dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App de lista de Tareas</title>
      <link rel="stylesheet" href="app.css">
    </head>
    <body>
      <div class="container">
        <h1>Lista de Tareas</h1>
        <div class="input-container">
          <input type="text" id="taskInput" placeholder="Agregar nueva tarea">
          <button id="addTaskBtn">Agregar Tarea</button>
        </div>
        <ul id="taskList"></ul>
      </div>
      <script src="app.js"></script>
    </body>
    </html>
  `);

  document = dom.window.document;

  // Simulación del script `app.js`
  document.getElementById('addTaskBtn').addEventListener('click', addTask);

  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const taskList = document.getElementById('taskList');
      const li = document.createElement('li');

      li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
          <button class="complete-btn">✔</button>
          <button class="edit-btn">✎</button>
          <button class="delete-btn">✖</button>
        </div>
      `;

      taskList.appendChild(li);
      taskInput.value = '';

      li.querySelector('.complete-btn').addEventListener('click', function() {
        li.classList.toggle('completed');
      });

      li.querySelector('.delete-btn').addEventListener('click', function() {
        taskList.removeChild(li);
      });

      li.querySelector('.edit-btn').addEventListener('click', function() {
        const newTaskText = dom.window.prompt("Editar tarea:", taskText);
        if (newTaskText !== null && newTaskText.trim() !== "") {
          li.querySelector('.task-text').textContent = newTaskText;
        }
      });
    } else {
      alert("Por favor ingresa una tarea válida.");
    }
  }
});

describe('App de Lista de Tareas', () => {
  it('debería agregar una tarea de "comprar libro"', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    taskInput.value = 'comprar libro';
    addTaskBtn.click();

    const taskList = document.getElementById('taskList');
    expect(taskList.children.length).toBe(1);
    expect(taskList.children[0].querySelector('.task-text').textContent).toBe('comprar libro');
  });

  it('debería marcar una tarea como completada', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    taskInput.value = 'tarea de prueba';
    addTaskBtn.click();

    const completeBtn = document.querySelector('.complete-btn');
    completeBtn.click();

    const task = document.querySelector('li');
    expect(task.classList.contains('completed')).toBe(true);
  });

  it('debería eliminar una tarea de la lista', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    taskInput.value = 'tarea para eliminar';
    addTaskBtn.click();

    const deleteBtn = document.querySelector('.delete-btn');
    deleteBtn.click();

    const taskList = document.getElementById('taskList');
    expect(taskList.children.length).toBe(0);
  });

  it('debería mostrar las tareas agregadas en la lista', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    
    // Agregar dos tareas
    taskInput.value = 'tarea 1';
    addTaskBtn.click();
    taskInput.value = 'tarea 2';
    addTaskBtn.click();

    const taskList = document.getElementById('taskList');
    expect(taskList.children.length).toBe(2);
    expect(taskList.children[0].querySelector('.task-text').textContent).toBe('tarea 1');
    expect(taskList.children[1].querySelector('.task-text').textContent).toBe('tarea 2');
  });

  it('debería permitir editar una tarea', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    taskInput.value = 'tarea para editar';
    addTaskBtn.click();

    const editBtn = document.querySelector('.edit-btn');
    
    // Simulando prompt para edición
    dom.window.prompt = () => 'tarea editada';
    editBtn.click();

    const taskText = document.querySelector('.task-text').textContent;
    expect(taskText).toBe('tarea editada');
  });
});
