//JavaScript code for showing/hiding the create task modal and managing tasks in a table

const createTaskButton = document.getElementById('create-task-button');
const createTaskModal = document.getElementById('create-task-modal');
const closeCreateTaskModal = document.querySelector('.close');
const taskForm = document.getElementById('task-form');
const taskTableBody = document.querySelector('#task-list tbody');
const filterStatusDropdown = document.getElementById('filter-status');

let currentlyEditing = null; // Store the task being edited

// Show the create task modal when the button is clicked
createTaskButton.addEventListener('click', () => {
    createTaskModal.style.display = 'block';
    currentlyEditing = null; // Reset the editing task when creating a new one
});

// Hide the create task modal when the close button is clicked
closeCreateTaskModal.addEventListener('click', () => {
    createTaskModal.style.display = 'none';
});

// Hide the create task modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === createTaskModal) {
        createTaskModal.style.display = 'none';
    }
});

// Handle form submission to create a new task or edit an existing one
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get task title and description from the form
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    
    if (currentlyEditing) {
        // If currentlyEditing is not null, edit the existing task
        editTask(currentlyEditing, title, description);
    } else {
        // Create a new task row and add it to the table
        addTask(title, description);
    }
    
    // Clear form fields
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    
    // Close the create task modal
    createTaskModal.style.display = 'none';
});
// Handle filter status change
filterStatusDropdown.addEventListener('change', () => {
    const selectedStatus = filterStatusDropdown.value;
    filterTasks(selectedStatus);
});
// Handle search button click
document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-task').value.trim().toLowerCase();
    searchTasks(searchQuery);
});

// Function to search for tasks by task name
function searchTasks(query) {
    const rows = taskTableBody.rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const taskTitle = row.cells[0].textContent.toLowerCase();
        
        if (taskTitle.includes(query)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    }
}

// Function to filter tasks based on status
function filterTasks(status) {
    const rows = taskTableBody.rows;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const taskStatus = row.cells[2].querySelector('select').value;
        
        if (status === 'all' || taskStatus === status) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    }
}

// Function to add a new task to the task list table
function addTask(title, description) {
    const newRow = taskTableBody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3); // New cell for status
    
    cell1.textContent = title;
    cell2.textContent = description;
    const statusDropdown = document.createElement('select');
    statusDropdown.innerHTML = `
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
    `;
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    // Add event listener to the edit button
    editButton.addEventListener('click', () => {
        // Set the form fields with the task data for editing
        document.getElementById('task-title').value = cell1.textContent;
        document.getElementById('task-description').value = cell2.textContent;
        
        // Set the currentlyEditing variable to the edited row
        currentlyEditing = newRow;
        
        // Open the create task modal for editing
        createTaskModal.style.display = 'block';
    });
    
    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
        // Delete the task row when the delete button is clicked
        taskTableBody.removeChild(newRow);
    });
    cell3.appendChild(statusDropdown);
    cell4.appendChild(editButton);
    cell4.appendChild(deleteButton);
}

// Function to edit an existing task
function editTask(taskRow, newTitle, newDescription, newStatus) {
    taskRow.cells[0].textContent = newTitle;
    taskRow.cells[1].textContent = newDescription;
    taskRow.cells[2].querySelector('select').value = newStatus;
    
    // Clear the currentlyEditing variable
    currentlyEditing = null;
}





















