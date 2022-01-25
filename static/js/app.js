document.querySelector('#cars').addEventListener('click', onShowDescription);

function onShowDescription(e) {
    if(e.target.classList.contains('more')) {
        const description = e.target.parentElement.querySelector('.description');
        if(description.style.display == 'none') {
            description.style.display = 'block';
            e.target.textContent = 'Show Less';
        } else {
            description.style.display = 'none';
            e.target.textContent = 'Show More';
        }
    }
}

