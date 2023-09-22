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
			const projectUserID = project.userId;

			// Portfolio Gallery
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

// Filter
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

// Edit Mode
if (localStorage.getItem("token")) {

	// Edit Overlay
	const header = document.querySelector('header');
	header.style.marginTop = '109px';

	const editOverlay = document.querySelector('.edit-mode-overlay');
	editOverlay.style.display = "inline-flex";

	// Edit Button
	const editButton = document.querySelector('.edit-button');
	editButton.style.display = "flex";

	const modalOverlay = document.querySelector('.modal-overlay');
	const closeModalButton = document.querySelector('.close-modal-button');

	// Logout Button
	const logoutButton = document.querySelector('.logout-button');
	const loginButton = document.querySelector('.login-button');
	logoutButton.style.display = "block";
	loginButton.style.display = "none";

	logoutButton.addEventListener('click', function () {
		logoutUser();
	});

	// Open/Close Modal
	editButton.addEventListener('click', function () {
		modalOverlay.style.display = 'block';
	});

	closeModalButton.addEventListener('click', function () {
		modalOverlay.style.display = 'none';
		hideUploadPage();
	});

	modalOverlay.addEventListener('click', function (event) {
		if (event.target === modalOverlay) {
			modalOverlay.style.display = 'none';
			hideUploadPage();
		}
	});

	// Upload Page
	const nextPage = document.querySelector('#nextPage');
	const previousButton = document.querySelector('.previous-modal-button');

	nextPage.addEventListener('click', function (event) {
		displayUploadPage();
	});

	previousButton.addEventListener('click', function () {
		hideUploadPage();
	});

}