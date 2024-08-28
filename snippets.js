// Load the saved theme from local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document.getElementById('themeSwitch').checked = true;
} else {
    document.body.classList.remove('dark-theme');
    document.getElementById('themeSwitch').checked = false;
}

// Theme toggle
document.getElementById('themeSwitch').addEventListener('change', function() {
    const isDarkTheme = this.checked;
    document.body.classList.toggle('dark-theme', this.checked);

    // Save the theme choice to local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});

// Load code snippets from local storage
const snippetContainer = document.getElementById('snippetContainer');
const snippets = JSON.parse(localStorage.getItem('codeSnippets')) || [];

snippets.forEach((snippet, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>Snippet ${index + 1}</h3>
        <button onclick="loadSnippet(${index})">Load Snippet</button>
    `;
    snippetContainer.appendChild(card);
});

function loadSnippet(index) {
    const snippet = snippets[index];

    localStorage.setItem('htmlCode', snippet.html);
    localStorage.setItem('cssCode', snippet.css);
    localStorage.setItem('jsCode', snippet.js);

    alert('Snippet Loaded! Go to the Live Code editor to see it.');
}
