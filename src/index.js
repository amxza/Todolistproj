import { project } from './projectHandlers/project.js'; // Check uppercase P
import { initProjectButtons, renderProjects, renderTasks } from './projectHandlers/projectUI.js';
import { Task } from './projectHandlers/Task.js';
import "./styles.css";

const taskModal = document.querySelector("#task-modal");
const taskForm = document.querySelector("#task-form");

let projects = [];
let activeProjectId = null; // Move state to the top

// --- 1. Define Logic Functions First ---

// index.js

const renderMainContent = (project) => {
    const mainArea = document.querySelector(".content");
    
    mainArea.innerHTML = `
        <div class="content-header">
            <h2>${project.name}</h2>
            <button id="add-task-btn">+ Add Task</button>
        </div>
        <div class="task-list"></div>
    `;

    // Immediately draw the tasks for this project
    renderTasks(project.tasks, deleteTask, toggleTask);
};

const deleteTask = (taskId) => {
    const activeProject = projects.find(p => p.id === activeProjectId);
    if (activeProject) {
        activeProject.tasks = activeProject.tasks.filter(t => t.id !== taskId);
        saveAndRender();
        renderMainContent(activeProject);
    }
};

const toggleTask = (taskId) => {
    const activeProject = projects.find(p => p.id === activeProjectId);
    if (activeProject) {
        const task = activeProject.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveAndRender();
        }
    }
};

const selectProject = (id) => {
    activeProjectId = id;
    const selectedProject = projects.find(p => p.id === id);
    if (selectedProject) renderMainContent(selectedProject);
};

const deleteProject = (id) => {
    projects = projects.filter(p => p.id !== id);
    // If we delete the project we are currently looking at, clear the main area
    if (activeProjectId === id) {
        document.querySelector(".content").innerHTML = "";
        activeProjectId = null;
    }
    saveAndRender();
};

const saveAndRender = () => {
    localStorage.setItem("myProjects", JSON.stringify(projects));
    renderProjects(projects, deleteProject, selectProject);
};

const loadData = () => {
    const saved = localStorage.getItem("myProjects");
    if (saved) {
        const rawData = JSON.parse(saved);
        projects = rawData.map(d => {
            const p = new project(d.name); // Use uppercase Project
            p.id = d.id;
            p.tasks = d.tasks;
            return p;
        });
    }
};

// --- 2. Run Initialization Last ---

loadData();
initProjectButtons();
renderProjects(projects, deleteProject, selectProject); // Now selectProject exists!

// --- 3. Event Listeners ---

const form = document.querySelector("#project-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#project-name-input");
    
    if (input.value.trim() !== "") {
        const newP = new project(input.value);
        projects.push(newP);
        saveAndRender();
        form.reset();
        document.querySelector("#project-modal").close();
    }
});

document.querySelector(".content").addEventListener("click", (e) => {
    if (e.target.id === "add-task-btn") {
        taskModal.showModal();
    }
});

document.querySelector("#cancel-task-btn").addEventListener("click", () => {
    taskModal.close();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Get values
    const title = document.querySelector("#task-title").value;
    const desc = document.querySelector("#task-desc").value;
    const date = document.querySelector("#task-date").value;
    const priority = document.querySelector("#task-priority").value;

    // 2. Create Task Object
    const newTask = new Task(title, desc, date, priority);

    // 3. Find Active Project and add task
    const activeProject = projects.find(p => p.id === activeProjectId);
    if (activeProject) {
        activeProject.tasks.push(newTask);
        saveAndRender(); // Save to localStorage and re-render
        renderMainContent(activeProject); // Refresh the task list display
    }

    taskForm.reset();
    taskModal.close();
});