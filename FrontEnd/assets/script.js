fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        const portfolioSection = document.getElementById('portfolio');
        const gallery = portfolioSection.querySelector('.gallery');

        data.forEach(project => {
            const projectImageUrl = project.imageUrl;
            const projectTitle = project.title;

            const figure = document.createElement('figure');
            const image = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            image.src = projectImageUrl;
            image.alt = projectTitle;
            figcaption.textContent = projectTitle;

            figure.appendChild(image);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });