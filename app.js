// Настройки подключения к Supabase
const SUPABASE_URL = 'https://ffgnbfqkufaeayryccah.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZ25iZnFrdWZhZWF5cnljY2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwOTE3MzAsImV4cCI6MjA4OTY2NzczMH0.0eG9IHercsmL1gW5cJpI13oiDV2aPY0fklK39b08hqM';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchProjects() {
    console.log("Загрузка проектов из базы...");
    const { data: projects, error } = await _supabase
        .from('projects')
        .select('*');

    if (error) {
        console.error('Ошибка Supabase:', error);
        return;
    }

    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = ''; // Очищаем текст загрузки

    if (projects.length === 0) {
        container.innerHTML = '<div style="color:var(--gray)">Пока нет активных проектов в базе. Добавьте строку в Table Editor в Supabase!</div>';
        return;
    }

    projects.forEach(p => {
        container.innerHTML += `
            <div class="pcard">
                <div class="pcard-img">
                    <img src="${p.image_url}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x300?text=GIVE.GO.DO.'">
                </div>
                <div class="pcard-body">
                    <div class="pcard-country">${p.country || 'Страна'}</div>
                    <div class="pcard-name">${p.title || 'Название проекта'}</div>
                    <div class="pcard-budget">
                        <div class="budget-grid">
                            <div>
                                <div class="blabel">Сбор</div>
                                <div class="bval" style="color:#C9974A">$${p.goal_sum || 0}</div>
                            </div>
                            <div>
                                <div class="blabel">Тур</div>
                                <div class="bval">$${p.price_per_person || 0}</div>
                            </div>
                        </div>
                    </div>
                    <button class="pcard-btn">Подробнее →</button>
                </div>
            </div>
        `;
    });
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', fetchProjects);
