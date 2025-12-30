// Select elements once at the top
const modal = document.querySelector("#project-modal");
const projectListContainer = document.querySelector(".project-list");

// Function to handle showing/hiding the modal
export function initProjectButtons() {
    const addBtn = document.querySelector("#add-project-btn");
    const cancelBtn = document.querySelector("#cancel-btn");

    addBtn.addEventListener("click", () => modal.showModal());
    cancelBtn.addEventListener("click", () => modal.close());
}

// Function to redraw the entire sidebar list
// projectUI.js
export function renderProjects(projects, deleteCallback, selectCallback) {
    projectListContainer.innerHTML = "";

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-item");
        
        // Add a class if this is the active project (for CSS styling)
        // if (project.id === activeId) projectDiv.classList.add("active");

        projectDiv.innerHTML = `
            <span class="project-name-label">${project.name}</span>
            <button class="delete-btn" data-id="${project.id}">X</button>
        `;

        // 1. Handle Selection
        projectDiv.querySelector(".project-name-label").addEventListener("click", () => {
            selectCallback(project.id);
        });

        // 2. Handle Deletion
        projectDiv.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents clicking 'X' from also 'selecting' the project
            deleteCallback(project.id);
        });

        projectListContainer.appendChild(projectDiv);
    });
}

// projectUI.js

export function renderTasks(tasks, deleteBtnCallback, toggleBtnCallback) {
    const taskListContainer = document.querySelector(".task-list");
    if (!taskListContainer) return;

    taskListContainer.innerHTML = ""; // Clear current list

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card", `priority-${task.priority}`);
        if (task.completed) taskCard.classList.add("completed");

        taskCard.innerHTML = `
            <div class="task-info">
                <input type="checkbox" class="toggle-task" ${task.completed ? "checked" : ""}>
                <div class="task-text">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <span class="due-date">Due: ${task.dueDate}</span>
                </div>
            </div>
            <button class="delete-task-btn" data-id="${task.id}">Delete</button>
        `;

        // Event: Mark as complete
        taskCard.querySelector(".toggle-task").addEventListener("change", () => {
            toggleBtnCallback(task.id);
        });

        // Event: Delete task
        taskCard.querySelector(".delete-task-btn").addEventListener("click", () => {
            deleteBtnCallback(task.id);
        });

        taskListContainer.appendChild(taskCard);
    });
}