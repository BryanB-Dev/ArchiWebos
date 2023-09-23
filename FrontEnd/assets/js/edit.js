// Edit Overlay
const header = document.querySelector('header');
const editOverlay = document.querySelector('.edit-mode-overlay');
const editButton = document.querySelector('.edit-button');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModalButton = document.querySelector('.close-modal-button');
const logoutButton = document.querySelector('.logout-button');
const loginButton = document.querySelector('.login-button');

// Upload Page
const nextPage = document.querySelector('#nextPage');
const modalGalleryTitle = document.querySelector('.modal-gallery-title');
const modalGallery = document.querySelector('.modal-gallery');
const hrModalGallery = document.querySelector('#hrModalGallery');
const modalUploadTitle = document.querySelector('.modal-upload-title');
const addImgForm = document.querySelector('#addImgForm');
const previousButton = document.querySelector('.previous-modal-button');

// Upload Form
const fileInput = document.querySelector('.img-upload input[type="file"]');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');
const token = localStorage.getItem("token");
const submitButton = document.querySelector('.modal-img-button');
const fileInputDiv = document.querySelector('.img-upload');

if (localStorage.getItem("token")) {

    // Edit Overlay
    var show = [editOverlay, editButton, logoutButton];
    showElement(show);

    var hide = [loginButton];
    hideElement(hide);

    header.style.marginTop = '109px';

    logoutButton.addEventListener('click', function () {
        logoutUser();
    });

    // Open/Close Modal
    editButton.addEventListener('click', function () {
        var show = [modalOverlay, modalGalleryTitle, modalGallery, hrModalGallery, nextPage];
        showElement(show);
        resetForm();
    });

    closeModalButton.addEventListener('click', function () {
        var hide = [modalOverlay, modalGalleryTitle, modalGallery, hrModalGallery, nextPage];
        hideElement(hide);
        resetForm();
    });

    modalOverlay.addEventListener('click', function (event) {
        if (event.target === modalOverlay) {
            var hide = [modalOverlay, modalGalleryTitle, modalGallery, hrModalGallery, nextPage, modalUploadTitle, addImgForm, previousButton];
            hideElement(hide);
            resetForm();
        }
    });

    // Upload Page
    nextPage.addEventListener('click', function () {
        var hide = [modalGalleryTitle, modalGallery, hrModalGallery, nextPage];
        hideElement(hide);

        var show = [modalUploadTitle, addImgForm, previousButton];
        showElement(show);
    });

    previousButton.addEventListener('click', function () {
        var show = [modalGalleryTitle, modalGallery, hrModalGallery, nextPage];
        showElement(show);

        var hide = [modalUploadTitle, addImgForm, previousButton];
        hideElement(hide);
    });

    // Upload Image
    fileInput.addEventListener('change', (e) => {

        const types = ['image/jpeg', 'image/png'];

        if (!types.includes(e.target.files[0].type)) {
            const errorText = "Format non autorisé";
            showValidationError(fileInput, errorText);
            // alert('Format non autorisé');
            return;
        } else {
            previewPicture(e.target);
            hideValidationError(fileInput);
        }
    });

    titleInput.addEventListener('input', function () {
        if (titleInput.value.trim() === '') {
            showValidationError(titleInput);
        } else {
            hideValidationError(titleInput);
        }
    });

    categorySelect.addEventListener('change', function () {
        if (categorySelect.value === '') {
            showValidationError(categorySelect);
        } else {
            hideValidationError(categorySelect);
        }
    });

    fileInput.addEventListener('change', function () {
        if (fileInput.value === '') {
            showValidationError(fileInputDiv);
        } else {
            hideValidationError(fileInputDiv);
        }
    });

    submitButton.addEventListener('click', async (e) => {
        checkFormValidity();

        if (!submitButton.classList.contains('disabled')) {

            e.preventDefault();
            const formData = new FormData();

            formData.append('image', fileInput.files[0]);
            formData.append('title', titleInput.value);
            formData.append('category', categorySelect.value);

            fetch('http://localhost:5678/api/works', {

                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData

            })
                .then(response => response.json())
                .then(data => {
                    const portfolioSection = document.getElementById('portfolio');
                    const gallery = portfolioSection.querySelector('.gallery');
                    const modalOverlay = document.querySelector('.modal-overlay');
                    const modalGallery = modalOverlay.querySelector('.modal-gallery');

                    var hide = [modalOverlay, modalGalleryTitle, modalGallery, hrModalGallery, nextPage];
                    hideElement(hide);

                    const figure = document.createElement('figure');
                    const image = document.createElement('img');
                    const figcaption = document.createElement('figcaption');

                    figure.dataset.category = categorySelect.value;

                    image.src = URL.createObjectURL(fileInput.files[0]);
                    image.alt = titleInput.value;
                    figcaption.textContent = titleInput.value;

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

                    modalGalleryImg.src = URL.createObjectURL(fileInput.files[0]);
                    modalGalleryImg.alt = titleInput.value;

                    trashIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-2xs');

                    modalGalleryDiv.appendChild(modalGalleryImg);
                    trashButton.appendChild(trashIcon);
                    modalGalleryDiv.appendChild(trashButton);
                    modalGallery.appendChild(modalGalleryDiv)

                    console.log(data);
                    resetForm();
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            e.preventDefault();
            if (titleInput.value.trim() === '') {
                showValidationError(titleInput);
            }
            if (categorySelect.value === '') {
                showValidationError(categorySelect);
            }
            if (fileInput.value === '') {
                showValidationError(fileInputDiv);
            }
        }
    });
}