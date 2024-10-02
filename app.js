// Cuando el usuario haga clic en el botón "Agregar Tarea", ejecuta la función addTask
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
  // Obtener el valor ingresado en el input
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim(); // trim() elimina espacios en blanco al inicio y final

  // Solo agregar la tarea si el input no está vacío
  if (taskText !== "") {
    const taskList = document.getElementById('taskList');
    
    // Crear un nuevo elemento de tarea (li)
    const li = document.createElement('li');
    
    // Añadir el HTML de la tarea, incluyendo los botones para editar, completar y eliminar
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <div class="task-buttons">
        <button class="complete-btn">✔</button>
        <button class="edit-btn">✎</button>
        <button class="delete-btn">✖</button>
      </div>
    `;
    
    // Agregar el nuevo elemento li a la lista de tareas
    taskList.appendChild(li);
    taskInput.value = ''; // Limpiar el input después de agregar la tarea

    // Funcionalidad del botón "Completar" para marcar la tarea como completada o descompletada
    li.querySelector('.complete-btn').addEventListener('click', function() {
      li.classList.toggle('completed'); // Alterna entre completado/no completado
    });

    // Funcionalidad del botón "Eliminar" para eliminar la tarea de la lista
    li.querySelector('.delete-btn').addEventListener('click', function() {
      taskList.removeChild(li); // Elimina el elemento li de la lista
    });

    // Funcionalidad del botón "Editar" para cambiar el texto de la tarea
    li.querySelector('.edit-btn').addEventListener('click', function() {
      const newTaskText = prompt("Editar tarea:", taskText); // Muestra un cuadro para editar
      if (newTaskText !== null && newTaskText.trim() !== "") { // Verifica si el nuevo texto no está vacío
        li.querySelector('.task-text').textContent = newTaskText; // Cambia el texto de la tarea
      }
    });
  } else {
    // Si el input está vacío, muestra una alerta
    alert("Por favor ingresa una tarea válida.");
  }
}
