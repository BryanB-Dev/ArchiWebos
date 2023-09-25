// Filter
function filterProjects(category) {
	const gallery = document.querySelector('.gallery');
	const projects = gallery.querySelectorAll('figure');

	projects.forEach(project => {
		const projectCategory = project.dataset.category;

		if (category === 'all' || projectCategory === category) {
            var show = [project];
			showElement(show);
		} else {
            var hide = [project];
            hideElement(hide);
		}
	});
}

// Delete project
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

// Logout user
function logoutUser() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// Hide Element
function hideElement(elements) {
    elements.forEach(el => {
        el.classList.add("display-none");
    });
}

// Show Element
function showElement(elements) {
    elements.forEach(el => {
        el.classList.remove("display-none");
    });
}

// Preview Picture
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

// Remove Preview
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

// Reset Form
function resetForm() {
    document.getElementById('addImgForm').reset();
    removePreviewPicture();
    hideValidationError(titleInput);
    hideValidationError(categorySelect);
    hideValidationError(fileInputDiv);
    disableSubmit();
}

// Show Form Error
function showValidationError(inputElement, submit = true, text = 'Ce champ doit être rempli') {
    const errorElement = inputElement.parentNode.querySelector(`.error-message[data-input="${inputElement.id}"]`);
    if (errorElement) {
        return;
    }

    inputElement.classList.add('error-input');

    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = text;
    errorMessage.dataset.input = inputElement.id;
    inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
    if (submit) {
        disableSubmit();
    }
}

// Hide Form Error
function hideValidationError(inputElement, submit = true) {
    inputElement.classList.remove('error-input');
    const errorElement = inputElement.parentNode.querySelector(`.error-message[data-input="${inputElement.id}"]`);
    if (errorElement) {
        errorElement.parentNode.removeChild(errorElement);
    }
    if (submit) {
        disableSubmit();
    }
}

// Disable/Enable Submit
function disableSubmit() {
    const isTitleValid = titleInput.value.trim() !== '';
    const isCategoryValid = categorySelect.value !== '';
    const isFileValid = fileInput.value !== '';
    const isFormValid = isTitleValid && isCategoryValid && isFileValid;
    if (isFormValid) {
        submitButton.classList.remove('disabled');
    } else {
        submitButton.classList.add('disabled');
    }
}

function checkFormValidity(elements, param = true) {

    elements.forEach(el => {
        if(el.value.trim() === '') {
            if(el.id==='') {
                el = el.parentElement.parentElement;
            }
            showValidationError(el, param);
        } else {
            hideValidationError(el, param);
        }
    });
    if (param) {
        disableSubmit();
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}