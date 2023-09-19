fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        const portfolioSection = document.getElementById('portfolio');
        const gallery = portfolioSection.querySelector('.gallery');

        data.forEach(project => {
            const projectID = project.id;
            const projectTitle = project.title;
            const projectImageUrl = project.imageUrl;
            const projectCategoryID = project.categoryId;
            const projectUserID = project.userId;


            const figure = document.createElement('figure');
            const image = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            figure.dataset.category = projectCategoryID;

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

fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        const filterLinksContainer = document.querySelector('.filter-links');

        data.forEach(category => {
            const categoryID = category.id;
            const categoryName = category.name;

            const link = document.createElement('a');
            link.classList.add('filter-link');
            link.textContent = categoryName;
            link.href = '#';
            link.dataset.category = categoryID;

            filterLinksContainer.appendChild(link);
        });

        const filterLinks = filterLinksContainer.querySelectorAll('.filter-link');

        filterLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                filterLinks.forEach(lnk => lnk.classList.remove('active'));
                this.classList.add('active');
                const selectedCategory = this.dataset.category;
                filterProjects(selectedCategory);
            });
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });

function filterProjects(category) {
    const gallery = document.querySelector('.gallery');
    const projects = gallery.querySelectorAll('figure');

    projects.forEach(project => {
        const projectCategory = project.dataset.category;

        console.log(category);

        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}