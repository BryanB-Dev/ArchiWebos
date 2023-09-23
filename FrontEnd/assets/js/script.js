// Fetch Works
fetch('http://localhost:5678/api/works')
	.then(response => response.json())
	.then(data => {
		const portfolioSection = document.getElementById('portfolio');
		const gallery = portfolioSection.querySelector('.gallery');
		const modalOverlay = document.querySelector('.modal-overlay');
		const modalGallery = modalOverlay.querySelector('.modal-gallery');

		data.forEach(project => {
			const projectID = project.id;
			const projectTitle = project.title;
			const projectImageUrl = project.imageUrl;
			const projectCategoryID = project.categoryId;

			// Portfolio Gallery
			const figure = document.createElement('figure');
			const image = document.createElement('img');
			const figcaption = document.createElement('figcaption');

			figure.dataset.category = projectCategoryID;
			figure.dataset.projectId = projectID;

			image.src = projectImageUrl;
			image.alt = projectTitle;
			figcaption.textContent = projectTitle;

			figure.appendChild(image);
			figure.appendChild(figcaption);
			gallery.appendChild(figure);

			// Modal Gallery
			const modalGalleryDiv = document.createElement('div');
			const modalGalleryImg = document.createElement('img');
			const trashButton = document.createElement('a');
			const trashIcon = document.createElement('i');

			modalGalleryDiv.style.position = "relative";

			trashButton.classList.add('delete-icon');
			trashButton.dataset.projectId = projectID;

			modalGalleryImg.src = projectImageUrl;
			modalGalleryImg.alt = projectTitle;

			trashIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-2xs');

			modalGalleryDiv.appendChild(modalGalleryImg);
			trashButton.appendChild(trashIcon);
			modalGalleryDiv.appendChild(trashButton);
			modalGallery.appendChild(modalGalleryDiv)
		});

		const deleteIcons = document.querySelectorAll('.modal-gallery a.delete-icon');

		deleteIcons.forEach(deleteIcon => {
			deleteIcon.addEventListener('click', () => {
				const projectId = deleteIcon.dataset.projectId;

				deleteProject(projectId);
			});
		});
	})
	.catch(error => {
		console.error('Erreur lors de la récupération des données:', error);
	});

// Fetch Categories
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

			const selectUpload = document.querySelector('#category');
			const option = document.createElement('option');
			option.value = categoryID;
			option.textContent = categoryName;

			selectUpload.appendChild(option);
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
