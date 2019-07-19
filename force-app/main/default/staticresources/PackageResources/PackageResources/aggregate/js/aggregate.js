    function toggleMenu(elementId) {
        j$('#' + elementId).toggle();
    }

    function setSelectedOption(elementId, menuId, value, label, rowCount, isFilter) {
        j$('#' + elementId).text(label);
        j$('#' + elementId).prop('html-data-val', value);
        j$('input[id$=' + elementId + ']').val(value);
        j$('input[id$=' + elementId + '-label]').val(label);
        if (isFilter) {
            j$('#' + rowCount).find('.' + elementId).val(value);
            j$('#' + rowCount).find('.' + elementId + '-label').val(label);
        }
        j$('#' + menuId).hide();
    }

    function setRadioButtonStatus(elementId, status) {
        j$('input[id$=' + elementId + ']').val(status);
    }

    function showTableRow(rowId) {
        j$('#' + rowId).show();
    }

    function hideTableRow(rowId) {
        j$('#' + rowId).hide();
    }

    function initializePopUp() {
        setRadioButtons('display-option', 'radio-306', 'radio-307');
        setRadioButtons('deduplicate-option', 'radio-308', 'radio-309');
        toggleModalClass();
    }

    function setRadioButtons(elementId, radioButton1, radioButton2) {
        var status = j$('input[id$=' + elementId + ']').val();
        if (status == 'true') {
            j$('#' + radioButton1).prop('checked', true);
            showTableRow('deduplicate-field-row');
        }
        else {
            j$('#' + radioButton2).prop('checked', true);
            hideTableRow('deduplicate-field-row');
        }
    }

    function onRadioButtonChange() {
        toggleFilters();
    }

    function toggleModalClass() {
        var isFiltered = j$('input[id$=display-option]').val();
        if (isFiltered == 'false') {
            j$('#aggregatedIndicatorModal').addClass('slds-modal--large');
            j$('#aggregatedIndicatorModal').removeClass('slds-modal--medium');
        }
        else {
            j$('#aggregatedIndicatorModal').removeClass('slds-modal--large');
            j$('#aggregatedIndicatorModal').addClass('slds-modal--medium');
        }
    }

    function showToast(errorFlag, elementId) {
        if (errorFlag == false) {
            showModal(elementId, elementId);
            setTimeout(
                function() {
                    j$('#aggregate-success-toast').hide();
                },
                3000
            );
        }
    }

    function validateRequiredFields() {
        var isValid = true;
        j$('#aggregatedIndicatorModal').find('input[data-class="requiredField"]').each(function() {
            var val = j$(this).val();
            if (val == '' || val == undefined) {
                j$(this).parent('a').addClass('error-occured');
                j$(this).addClass('error-occured');
                isValid = false;
            }
            else {
                j$(this).parent('a').removeClass('error-occured');
                j$(this).removeClass('error-occured');
            }
        });
        if (isValid == false) {
            displayModal('aggregate-required-field-errorpill');
        }
        return isValid;
    }

    function closeModal(elementId) {
        j$('#' + elementId).hide();
    }

    function displayModal(elementId) {
        j$('#' + elementId).show();
    }