
document.addEventListener('DOMContentLoaded', () => {
    // --- FUNÇÕES AUXILIARES ---
    const populateList = (elementId, items) => {
        const listElement = document.getElementById(elementId);
        if (listElement && items) {
            listElement.innerHTML = '';
            items.forEach(itemText => {
                const listItem = document.createElement('li');
                listItem.innerText = itemText;
                listElement.appendChild(listItem);
            });
        }
    };

    const populateGiftGrid = (elementId, items) => {
        const gridContainer = document.getElementById(elementId);
        if (gridContainer && items) {
            gridContainer.innerHTML = '';
            items.forEach(itemData => {
                const card = document.createElement('div');
                card.className = 'gift-card';

                const name = document.createElement('p');
                name.className = 'gift-name';
                name.innerText = itemData.name;

                const price = document.createElement('p');
                price.className = 'gift-price';
                price.innerText = itemData.price;

                card.appendChild(name);
                card.appendChild(price);
                gridContainer.appendChild(card);
            });
        }
    };

    // --- LÓGICA PRINCIPAL ---
    fetch('data/config.json')
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar o arquivo de configuração.");
            return response.json();
        })
        .then(data => {
            const { casal, data: dataCasamento, local, dress_code, gifts } = data;

            // Popula Cabeçalho
            document.getElementById('casal-nomes').innerText = `${casal.noiva} & ${casal.noivo}`;
            const [ano, mes, dia] = dataCasamento.split('-');
            document.getElementById('casamento-data').innerText = new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('casamento-local').innerText = local.cerimonia;

            // Popula Dress Code
            if (dress_code) {
                document.getElementById('dress-code-paragraph').innerText = dress_code.paragraph;
                populateList('recommended-list', dress_code.recommended);
                populateList('not-recommended-list', dress_code.not_recommended);
            }

            // Popula Presentes
            if (gifts) {
                document.getElementById('gifts-paragraph').innerText = gifts.paragraph;
                populateGiftGrid('gift-grid-container', gifts.items);
            }
        })
        .catch(error => console.error('Houve um problema com o config.json:', error));

    // Lógica do Formulário de RSVP
    const rsvpForm = document.getElementById('rsvp-form');
    const formResponseEl = document.getElementById('form-response');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(rsvpForm);
            const guestData = {
                name: formData.get('name'),
                email: formData.get('email'),
                attending: formData.get('attending') === 'true',
                dietary_restrictions: formData.get('dietary_restrictions'),
                plus_one_name: formData.get('plus_one_name'),
                children_info: null
            };

            formResponseEl.innerText = 'Enviando...';
            formResponseEl.style.color = '#555';

            // fetch('http://127.0.0.1:8000/api/rsvp', {
            fetch('https://marifer-api.onrender.com/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guestData),
            })
            .then(async response => {
                if (response.ok) return response.json();
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Ocorreu um erro.');
            })
            .then(data => {
                rsvpForm.style.display = 'none';
                formResponseEl.style.color = 'green';
                formResponseEl.innerHTML = `<h2>Obrigado por confirmar, ${data.name}!</h2><p>Sua presença foi registrada com sucesso.</p>`;
            })
            .catch(error => {
                formResponseEl.style.color = 'red';
                formResponseEl.innerText = `Erro: ${error.message}`;
            });
        });
    }
});
