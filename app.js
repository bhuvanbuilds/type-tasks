import { addTask, completeTask, filterByStatus } from "./model.js";
// Application state
let tasks = [];
let filter = "all";
// DOM elements
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const filterButtons = document.querySelectorAll(".filter");
// Render tasks
function render() {
    listEl.innerHTML = "";
    const visibleTasks = filter === "all"
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
    visibleTasks.forEach((task) => {
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
    if (!title)
        return;
    tasks = addTask(tasks, title);
    titleInput.value = "";
    render();
};
// Add task using Enter
titleInput.onkeydown = (event) => {
    if (event.key === "Enter") {
        addBtn.click();
    }
};
// Filter tasks
filterButtons.forEach((button) => {
    button.onclick = () => {
        filter = button.dataset.status;
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        render();
    };
});
// Initial render
render();
//# sourceMappingURL=app.js.map