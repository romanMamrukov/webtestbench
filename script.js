function updatePreview() {
    const html = document.getElementById('htmlCode').value;
    const css = document.getElementById('cssCode').value;
    const js = document.getElementById('jsCode').value;

    // Save the code to local storage
    localStorage.setItem('htmlCode', html);
    localStorage.setItem('cssCode', css);
    localStorage.setItem('jsCode', js);

    const previewFrame = document.getElementById('preview');
    const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;

    preview.open();
    preview.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `);
    preview.close();
}

// Load code from local storage if available
document.getElementById('htmlCode').value = localStorage.getItem('htmlCode') || '';
document.getElementById('cssCode').value = localStorage.getItem('cssCode') || '';
document.getElementById('jsCode').value = localStorage.getItem('jsCode') || '';

// Event listeners to update the preview
document.getElementById('htmlCode').addEventListener('input', updatePreview);
document.getElementById('cssCode').addEventListener('input', updatePreview);
document.getElementById('jsCode').addEventListener('input', updatePreview);

// Initialize the preview
updatePreview();

// Save snippet functionality
document.getElementById('saveSnippet').addEventListener('click', function() {
    const html = document.getElementById('htmlCode').value;
    const css = document.getElementById('cssCode').value;
    const js = document.getElementById('jsCode').value;

    const snippets = JSON.parse(localStorage.getItem('codeSnippets')) || [];
    snippets.push({ html, css, js });
    localStorage.setItem('codeSnippets', JSON.stringify(snippets));

    alert('Code Snippet Saved!');
});

// Tab functionality
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        tabs.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(this.dataset.tab + 'Tab').classList.add('active');
    });
});

// Theme toggle
document.getElementById('themeSwitch').addEventListener('change', function() {
    const isDarkTheme = this.checked;
    document.body.classList.toggle('dark-theme', this.checked);

    // Save the theme choice to local storage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
});

// Load the saved theme from local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document.getElementById('themeSwitch').checked = true;
} else {
    document.body.classList.remove('dark-theme');
    document.getElementById('themeSwitch').checked = false;
}