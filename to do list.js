let tasks = []; // Array to store tasks

document.getElementById('add-task-btn').addEventListener('click', function () {
  const taskDate = document.getElementById('task-date').value;
  const taskName = document.getElementById('task-name').value;

  if (taskDate && taskName) {
    // Add new task to the array
    tasks.push({ date: taskDate, name: taskName });
    // Sort tasks by date
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Render the updated task list
    renderTasks();
    // Clear input fields
    document.getElementById('task-date').value = '';
    document.getElementById('task-name').value = '';
  } else {
    alert('Please enter a valid date and task name.');
  }
});

// Function to format date as DD/MM/YYYY
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Render Task List
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear the current task list

  tasks.forEach((task, index) => {
    // Create task container
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    // Task details
    const taskDetails = document.createElement('span');
    taskDetails.textContent = `${formatDate(task.date)}: ${task.name}`;
    taskDiv.appendChild(taskDetails);

    // Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
      taskDiv.classList.toggle('completed');
    });

    // Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => {
      tasks.splice(index, 1); // Remove task from the array
      renderTasks(); // Re-render the task list
    });

    // Append buttons to task
    taskDiv.appendChild(completeBtn);
    taskDiv.appendChild(removeBtn);

    // Append task to the list
    taskList.appendChild(taskDiv);
  });
}
