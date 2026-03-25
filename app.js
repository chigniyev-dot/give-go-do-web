const SUPABASE_URL = 'https://ffgnbfqkufaeayryccah.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZ25iZnFrdWZhZWF5cnljY2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTE3MzAsImV4cCI6MjA4OTY2NzczMH0.0eG9IHercsmL1gW5cJpI13oiDV2aPY0fklK39b08hqM';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.currentCategory = 'africa';
window.allProjects = [];

async function fetchProjects() {
    const { data, error } = await _supabase.from('projects').select('*');
    if (error) return console.error(error);
    
    window.allProjects = data;
    renderProjects(data);
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    const filtered = projects.filter(p => p.category === window.currentCategory);
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="loading-view">В этой категории пока нет активных туров</div>';
        return;
    }

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="pcard" onclick="openModal('${p.id}')">
                <div class="pcard-img">
                    <img src="${p.image_url}" alt="${p.title}">
                    <div class="pcard-img-overlay"></div>
                </div>
                <div class="pcard-body">
                    <div class="pcard-country">${p.country}</div>
                    <div class="pcard-name">${p.title}</div>
                    <div class="pcard-budget">
                        <div class="budget-grid">
                            <div><div class="blabel">Сбор</div><div class="bval golv">$${p.goal_sum}</div></div>
                            <div><div class="blabel">Тур</div><div class="bval">$${p.price_per_person}</div></div>
                        </div>
                    </div>
                    <button class="pcard-btn">ПОДРОБНЕЕ →</button>
                </div>
            </div>
        `;
    });
}

function openModal(id) {
    const p = window.allProjects.find(item => item.id == id);
    if (!p) return;

    document.getElementById('modal-img').src = p.image_url;
    document.getElementById('modal-title').innerText = p.title;
    document.getElementById('modal-country').innerText = p.country;
    document.getElementById('modal-goal').innerText = '$' + p.goal_sum;
    document.getElementById('modal-price').innerText = '$' + p.price_per_person;
    document.getElementById('modal-desc').innerText = p.description || "Описание готовится...";
    
    document.getElementById('modal-overlay').classList.add('on');
}

document.addEventListener('DOMContentLoaded', fetchProjects);
