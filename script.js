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

            addDeleteListener(li);
            addEditListener(li);
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

    function addDeleteListener(li) {
        const deleteButton = li.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(li);
        });
    }

    function addEditListener(li) {
        const editButton = li.querySelector(".edit-button");
        const taskTextElement = li.querySelector(".task-text");
        const taskPriorityElement = li.querySelector(".task-priority");
        const taskDueElement = li.querySelector(".task-due");

        editButton.addEventListener("click", function () {
            const newText = prompt("Edit task:", taskTextElement.textContent);
            if (newText !== null) {
                taskTextElement.textContent = newText;
                const newPriority = prompt("Edit priority:", taskPriorityElement.textContent);
                if (newPriority !== null) {
                    taskPriorityElement.textContent = newPriority;
                    const newDueDate = prompt("Edit due date:", taskDueElement.textContent);
                    if (newDueDate !== null) {
                        taskDueElement.textContent = newDueDate;
                    }
                }
            }
        });
    }
});





