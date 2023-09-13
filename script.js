document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const dueDateInput = document.getElementById("due-date");
    const prioritySelect = document.getElementById("priority");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value.trim();
        const priority = prioritySelect.value;

        if (taskText !== "") {
            const task = {
                text: taskText,
                priority: priority,
                dueDate: dueDate,
            };

            const li = createTaskElement(task);
            taskList.appendChild(li);
            taskInput.value = "";
            dueDateInput.value = "";
        }
    });

    function createTaskElement(task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="task-priority">${task.priority}</span>
            <span class="task-due">${task.dueDate}</span>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        return li;
    }
});



