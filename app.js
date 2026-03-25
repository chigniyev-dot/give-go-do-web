// Настройки подключения к Supabase
const SUPABASE_URL = 'ВСТАВЬ_СЮДА_URL';
const SUPABASE_KEY = 'ВСТАВЬ_СЮДА_ANON_KEY';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchProjects() {
    console.log("Загрузка проектов...");
    const { data: projects, error } = await _supabase
        .from('projects')
        .select('*');

    if (error) {
        console.error('Ошибка Supabase:', error);
        return;
    }

    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = ''; // Убираем текст "Загрузка..."

    projects.forEach(p => {
        container.innerHTML += `
            <div class="pcard">
                <div class="pcard-img">
                    <img src="${p.image_url}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                </div>
                <div class="pcard-body">
                    <div class="pcard-country">${p.country}</div>
                    <div class="pcard-name">${p.title}</div>
                    <div class="pcard-budget">
                        <div class="budget-grid">
                            <div>
                                <div class="blabel">Сбор</div>
                                <div class="bval" style="color:#C9974A">$${p.goal_sum}</div>
                            </div>
                            <div>
                                <div class="blabel">Тур</div>
                                <div class="bval">$${p.price_per_person}</div>
                            </div>
                        </div>
                    </div>
                    <button class="pcard-btn">Подробнее →</button>
                </div>
            </div>
        `;
    });
}

// Запуск функции при полной загрузке страницы
document.addEventListener('DOMContentLoaded', fetchProjects);
