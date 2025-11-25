'use strict';
import { tasks } from './tasks.js';

const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('searchInput');
const statusSelect = document.getElementById('statusSelect');

function renderTasks(list) {
    taskList.innerHTML = '';
    list.forEach(task => {
        const card = document.createElement('div');
        card.className = "p-3 border rounded d-flex justify-content-between align-items-center";

        const infoDiv = document.createElement('div');

        const titleDiv = document.createElement('div');
        titleDiv.className = 'fw-bold';
        titleDiv.textContent = task.title;

        const statusDiv = document.createElement('div');
        statusDiv.className = 'text-muted small';
        statusDiv.textContent = task.status === 'done' ? 'Completed' : 'Incompleted';

        infoDiv.appendChild(titleDiv);
        infoDiv.appendChild(statusDiv);

        const detailsBtn = document.createElement('a');
        detailsBtn.className = 'btn btn-sm btn-outline-primary';
        detailsBtn.textContent = "Details";
        detailsBtn.href = `task.html?id=${task.id}`;

        card.appendChild(infoDiv);
        card.appendChild(detailsBtn);

        taskList.appendChild(card);
        });
}

function applyFilters() {
    const search = searchInput.value.toLowerCase().trim();
    const status = statusSelect.value;
    let filtered = getFilteredTasks(status, search);

    const url = new URL(window.location.href);
    url.searchParams.set('status', status);
    url.searchParams.set('search', search);
    history.pushState({status, search}, '', url);

    renderTasks(filtered);
}

function getFilteredTasks(status, search) {
    let filtered = tasks;
    if (status !== "all") {
        filtered = filtered.filter(task => task.status === status);
    }
    if (search) {
        filtered = filtered.filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase())
            );
    }
    return filtered;
}

function initFromUrl() {
    const url = new URL(window.location.href);
    const status = url.searchParams.get('status') || 'all';
    const search = url.searchParams.get('search') || "";
    statusSelect.value = status;
    searchInput.value = search;
    const filtered = getFilteredTasks(status, search);
    renderTasks(filtered);
    history.replaceState({status, search}, '', url);
}
searchInput.addEventListener('input', applyFilters);
statusSelect.addEventListener('change', applyFilters);
initFromUrl();
/* renderTasks(tasks);
 */
window.addEventListener('popstate', (event) => {
    let status = 'all';
    let search = '';
    if (event.state) {
        status = event.state.status || 'all';
        search = event.state.search || '';
    } else {
        const url = new URL(window.location.href);
        status = url.searchParams.get('status') || 'all';
        search = url.searchParams.get('search') || '';
    }
    statusSelect.value = status;
    searchInput.value = search;
    const filtered = getFilteredTasks(status, search);
    renderTasks(filtered);
});
