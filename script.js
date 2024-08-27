function updatePreview() {
    const html = document.getElementById('htmlCode').value;
    const css = document.getElementById('cssCode').value;
    const js = document.getElementById('jsCode').value;
    const previewFrame = document.getElementById('preview');
    const preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;

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

document.getElementById('htmlCode').addEventListener('input', updatePreview);
document.getElementById('cssCode').addEventListener('input', updatePreview);
document.getElementById('jsCode').addEventListener('input', updatePreview);

// Initialize the preview
updatePreview();
