document.getElementById('load-html-button').addEventListener('click', function() {
    fetch('../../templates/todo/delete.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('html-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading HTML:', error);
        });
});
