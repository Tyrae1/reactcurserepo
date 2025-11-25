`strict mode`;
import {tasks} from "./tasks.js";

const content = document.getElementById("task-content");
const backBtn = document.getElementById("backBtn");

const url = new URL(window.location.href);
const id = Number(url.searchParams.get("id"));
const task = tasks.find(t => t.id === id);
if (task) {
    content.innerHTML = `
    <h2 class="h5 mb-3">${task.title}</h2>
    <p><strong>Status:</strong> ${task.status === 'done' ? "Completed" : "Incompleted"}</p>
`;
} else {
    content.innerHTML = `
    <div class="text-danger">Task not found.</div>`;
}
backBtn.addEventListener("click", () => {
    if (history.length > 1) {
        history.back ();
    } else {
        window.location.href = "index.html";
    }
} );