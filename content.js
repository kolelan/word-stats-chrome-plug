// Список стоп-слов
function globalStopWords() {
    const stopWordsGlobal = new Set(['в',
        'и', 'или', 'но', 'из', 'на', 'а', 'если', 'так', 'это', 'тот',
        'те', 'этот', 'эти', 'все', 'всё', 'нет', 'не', 'без','png','file','page'
    ]); // Глобальные стоп-слова
    return stopWordsGlobal;
}

// Local scope
function localStopWords() {
    const stopWordsLocal = new Set(['...']); // Локальные стоп-слова
    return stopWordsLocal;
}


function countWords() {
    const stopWords = globalStopWords();
    // Получаем чистое содержание страницы (игнорируем HTML-разметку)
    const text = document.body.innerText.trim().toLowerCase();

    // Регулярное выражение для разделения текста на слова
    const words = text.split(/[\s,\.;:\?!]+/).filter(word => !/\d/.test(word));
    console.log(words);

    // Объект для подсчёта уникальных слов
    let wordCounts = {};

    // Перебираем каждое слово, пропуская пустые строки и стоп-слова
    for (let word of words) {
        if (!stopWords.has(word)) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    }

    // Сортируем словарь по количеству вхождений слов
    const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);

    // Создаем HTML для визуализации результата
    let resultHTML = `
<div class="wsp_word-stats">
  <h2>Статистика слов:</h2>
  <button type="button" class="wsp_close-btn">Закрыть</button>
  <ol>
    ${sortedWords.slice(0, 20).map(([word, count]) =>
        `<li><strong>${word}: </strong>${count}</li>`
    ).join('')}
  </ol>
</div>
`;

// Добавляем разметку в документ
    const div = document.createElement('div');
    div.className = 'wsp_word-stats-popup';
    div.innerHTML = resultHTML;
    document.body.appendChild(div);

// Немного стилизации (для примера)
    div.style.position = 'absolute';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.backgroundColor = '#fafafa';
    div.style.padding = '1rem';
    div.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    div.style.zIndex = '9999'; // Над всеми элементами страницы

// находим кнопку закрытия и назначаем ей слушатель событий
    const closeBtn = div.querySelector('.wsp_close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(div); // Удаляет всплывающее окно
        });
    }
}

// Запускаем обработку текста
countWords();