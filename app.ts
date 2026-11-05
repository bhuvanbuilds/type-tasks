
import {
    addTask,
    completeTask,
    filterByStatus
} from "./model.js";

import type { Task, TaskStatus } from "./model.js";

// Application state
let tasks: Task[] = [];
let filter: "all" | TaskStatus = "all";

// DOM elements
const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const listEl = document.getElementById("list") as HTMLUListElement;
const countEl = document.getElementById("count") as HTMLSpanElement;

const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter");

// Render tasks
function render(): void {
    listEl.innerHTML = "";

    const visibleTasks =
        filter === "all"
            ? tasks
            : filterByStatus(tasks, filter);

    countEl.textContent = `${visibleTasks.length} tasks`;

    if (visibleTasks.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No tasks here. Add something to get started.";
        listEl.appendChild(empty);
        return;
    }

    visibleTasks.forEach((task: Task) => {
        const li = document.createElement("li");
        li.className = "task";

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        const status = document.createElement("span");
        status.className = "task-status";
        status.textContent = task.status;

        const advanceBtn = document.createElement("button");
        advanceBtn.className = "advance";

        advanceBtn.textContent =
            task.status === "done" ? "Completed ✓" : "Complete →";

        advanceBtn.disabled = task.status === "done";

        advanceBtn.onclick = () => {
            tasks = completeTask(tasks, task.id);
            render();
        };

        li.appendChild(title);
        li.appendChild(status);
        li.appendChild(advanceBtn);

        listEl.appendChild(li);
    });
}

// Add task
addBtn.onclick = () => {
    const title = titleInput.value.trim();

    if (!title) return;

    tasks = addTask(tasks, title);

    titleInput.value = "";

    render();
};

// Add task using Enter
titleInput.onkeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        addBtn.click();
    }
};

// Filter tasks
filterButtons.forEach((button) => {
    button.onclick = () => {
        filter = button.dataset.status as "all" | TaskStatus;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        render();
    };
});

// Initial render
render();
