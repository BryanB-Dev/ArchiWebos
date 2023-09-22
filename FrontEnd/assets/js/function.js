function deleteProject(projectId) {
    const token = localStorage.getItem("token");
    const elementDeleted = document.querySelector(`.delete-icon[data-project-id="${projectId}"]`);
    const portfolioDeleted = document.querySelector(`figure[data-project-id="${projectId}"]`);
    const galleryDeleted = elementDeleted.parentElement;

    fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                portfolioDeleted.remove();
                galleryDeleted.remove();
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
    var hide = [modalGalleryTitle, modalGallery, hrModalGallery, nextPage];
    hideElement(hide);

    var show = [modalUploadTitle, addImgForm, previousButton];
    showElement(show);
}

function hideUploadPage() {
    var show = [modalGalleryTitle, modalGallery, hrModalGallery, nextPage];
    showElement(show);

    var hide = [modalUploadTitle, addImgForm, previousButton];
    hideElement(hide);
}

function hideElement(elements) {
    elements.forEach(el => {
        el.classList.add("display-none");
    });
}

function showElement(elements) {
    elements.forEach(el => {
        el.classList.remove("display-none");
    });
}

function previewPicture(file) {
    const previewImg = document.getElementById('preview');
    const btnUpload = document.querySelector('.btn-upload');
    const uploadText = document.querySelector('.upload-text');
    const imgIcon = document.querySelector('.imgIcon');
    const errorText = document.querySelector('.error');

    var hide = [btnUpload, uploadText, imgIcon, errorText];
    hideElement(hide);

    var show = [previewImg];
    showElement(show);

    const picture = file.files[0];

    const preview = document.getElementById('preview');
    preview.src = URL.createObjectURL(picture);
}

function removePreviewPicture() {
    const previewImg = document.getElementById('preview');
    const btnUpload = document.querySelector('.btn-upload');
    const uploadText = document.querySelector('.upload-text');
    const imgIcon = document.querySelector('.imgIcon');
    const errorText = document.querySelector('.error');

    var show = [btnUpload, uploadText, imgIcon, errorText];
    showElement(show);

    var hide = [previewImg];
    hideElement(hide);

    errorText.textContent = "";

    const preview = document.getElementById('preview');
    preview.src = "";
}

function resetForm() {
    document.getElementById('addImgForm').reset();
    removePreviewPicture()
}