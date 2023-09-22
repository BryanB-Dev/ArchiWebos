function deleteProject(projectId) {
	const token = localStorage.getItem("token");
	const elementDeleted = document.querySelector(`.delete-icon[data-project-id="${projectId}"]`);
	const divDeleted = elementDeleted.parentElement;

	fetch(`http://localhost:5678/api/works/${projectId}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
		.then(response => {
			if (response.ok) {
				divDeleted.remove();
				console.log(`Le projet avec l'ID ${projectId} a été supprimé.`);
			} else {
				console.log(`Une erreur s'est produite lors de la suppression du projet avec l'ID ${projectId}.`);
			}
		})
		.catch(error => {
			console.log('Une erreur s\'est produite lors de la communication avec l\'API :', error);
		});
}

function logoutUser() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

const nextPage = document.querySelector('#nextPage');
const modalGalleryTitle = document.querySelector('.modal-gallery-title');
const modalGallery = document.querySelector('.modal-gallery');
const hrModalGallery = document.querySelector('#hrModalGallery');
const modalUploadTitle = document.querySelector('.modal-upload-title');
const addImgForm = document.querySelector('#addImgForm');
const previousButton = document.querySelector('.previous-modal-button');

function displayUploadPage() {
    modalGalleryTitle.style.display = 'none';
    modalGallery.style.display = 'none';
    hrModalGallery.style.display = 'none';
    nextPage.style.display = 'none';

    modalUploadTitle.style.display = 'block';
    addImgForm.style.display = 'block';
    previousButton.style.display = 'flex';
}
function hideUploadPage() {
    modalGalleryTitle.style.display = 'block';
    modalGallery.style.display = 'grid';
    hrModalGallery.style.display = 'block';
    nextPage.style.display = 'inline';

    modalUploadTitle.style.display = 'none';
    addImgForm.style.display = 'none';
    previousButton.style.display = 'none';
}