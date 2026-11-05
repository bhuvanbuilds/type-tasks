// ID counter
let nextId = 1;
// Add a new task
export function addTask(tasks, title) {
    const newTask = {
        id: nextId++,
        title: title,
        status: "todo"
    };
    return [...tasks, newTask];
}
// Mark a task as done
export function completeTask(tasks, id) {
    return tasks.map(task => task.id === id
        ? { ...task, status: "done" }
        : task);
}
// Filter tasks by status
export function filterByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}
// ORIGINAL OPERATION: Delete a task
function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}
//# sourceMappingURL=model.js.map