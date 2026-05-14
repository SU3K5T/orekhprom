const MODAL_RESULT_SUCCESS_SELECTOR = '#modal-result-success';
const MODAL_RESULT_ERROR_SELECTOR = '#modal-result-error';

const createOrderModal = new bootstrap.Modal('#createOrderModal');
const getPriceModal = new bootstrap.Modal('#getPriceModal');

const modals = [createOrderModal, getPriceModal];

document.querySelectorAll('.js-form-create-order').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.dataset.productName) {
            const modalForm = createOrderModal._element.querySelector('form');
            modalForm.querySelector('.js-product-name').value = e.target.dataset.productName
        }
        createOrderModal.show();
    });
});

document.querySelectorAll('.js-form-get-price').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        
        getPriceModal.show();
    });
});

document.addEventListener('hidden.bs.modal', (e) => {
    const modalForm = e.target.querySelector('form');
    if (modalForm) {
        modalForm.reset();
    }
})

document.querySelectorAll('input[imask-phone]').forEach(input => {
    let maskOptions = {
        mask: '+{7} (000) 000-00-00',
        RegExp: '(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?'
    };
    IMask(input, maskOptions);
});

document.addEventListener('submit', async (e) => {
    const form = e.target.closest('.js-ajax-from');

    if (!form) return;

    e.preventDefault();

    grecaptcha.ready(function () {
        grecaptcha.execute('6LdAs4QpAAAAAB5e4Ceu1gmtK5xrRTsFyDR4K1n_', {
            action: 'submit'
        }).then(async function (token) {

            let recaptcha_response = e.target.querySelector('input[name="recaptcha_response"]');
            recaptcha_response.value = token;

            if (form.classList.contains('loading')) {
                return;
            }

            form.classList.add('loading');

            const sendFormButton = form.querySelector('button[type="submit"]');

            try {
                sendFormButton.classList.add('disabled');
                sendFormButton.textContent = 'Отправка...';

                form.querySelectorAll(`input`).forEach(e => {
                    e.classList.remove('error');
                });

                const formData = new FormData(form);
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const modalElement = document.querySelector(MODAL_RESULT_SUCCESS_SELECTOR);
                    const modalSuccess = new bootstrap.Modal(modalElement);
                    if (modalSuccess) {
                        modalSuccess.show();
                        setTimeout(() => {
                            modalSuccess.hide();
                        }, 2000);
                    }

                    form.reset();
                } else {
                    throw new Error();
                }
            } catch (error) {
                const modalElement = document.querySelector(MODAL_RESULT_ERROR_SELECTOR);
                const modalError = new bootstrap.Modal(modalElement);

                if (modalError) {
                    modalError.show();
                }
            } finally {
                form.classList.remove('loading');

                modals.forEach(modal => {
                    modal.hide();
                })

                if (sendFormButton) {
                    sendFormButton.classList.remove('disabled');
                    sendFormButton.textContent = 'Отправить запрос';
                }
            }
        })
    });
});