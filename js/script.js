// お裁縫型紙のデータをGoogle Spreadsheet APIから取得
async function fetchSpreadsheetData() {
    try {
        const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=fdSn7Q9UVd8UNeyNc7y7pso7-md5ZxZ42IY2yUW81RbEv-EkysG7l7PbNcySVVij6Agg-RopisfBHaAH47QrZckh62vdQ8ugm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLCTKFDQTBx6wABp-t4roZcwxdxi0JUhaKeftkt8EFdnPFo2w3IzS07EaZ5cj2PimzUVrUqNYAe7h9DNAGH-le-xz8-ugJsgTQ&lib=MGHqFZwTLfigeD9bZZwjgdscsi1E5Ab0i';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// お裁縫パターンをカードに整形
function createCards(patterns) {
    const container = document.querySelector('.container');
    patterns.forEach(pattern => {

        const cardLink = document.createElement('a');
        cardLink.href = pattern.url;
        cardLink.className = 'card-link';

        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${pattern.drawing}" alt="${pattern.name}">
            <div class="card-content">
                <h2 class="card-title">${pattern.name.trim()}</h2>
                <p class="card-text">${pattern.maker}</p>
                <p class="card-text">Skill Level: ${pattern.skillLevel}</p>
                <p class="card-text">Hashtag: ${pattern.hashtag}</p>
                <p class="card-text">No. of Posts: [TBD] </p>
                <p class="card-text">No. of ❤️: [TBD] </p>
            </div>
        `;

        cardLink.appendChild(card);
        container.appendChild(cardLink);
    });
}

//ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', async function() {
    const data = await fetchSpreadsheetData();
    if (data) {
        createCards(data);
    }
});