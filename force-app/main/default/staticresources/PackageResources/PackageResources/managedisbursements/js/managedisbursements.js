    var dateChangedManually = false;

    function init() {
        showLoader();
        initNumeralHelpers();
        displayDisbursementTable();
        hideLoader();
        setColspanValue();
        checkForErrorsOnLoad();
        initializeALJSComponents();
    }

    function initNumeralHelpers() {
        if (numeral.locales[userLocale.toLowerCase()] == undefined) {
            numeral.locale('en_us');
        }
        else {
            numeral.locale(userLocale.toLowerCase());
        }
        formatPercentAccordingToUserLocale();
    }

    function formatPercentAccordingToUserLocale(element, decimalPlaces) {
        var decimalPlaces = 2;
        var element = j$('#totalPercent');

        if (jQuery.trim(j$(element).html()) != '' && j$(element).html() != undefined) {

            var value = numeral(jQuery.trim(j$(element).html()))["_input"];

            if (value != undefined && value != '') {
                formattedValue = defaultOutputNumberFormatting(
                    value,
                    decimalPlaces
                );
            }
            j$(element).html(formattedValue + '%');
        }
    }

    function defaultOutputNumberFormatting(value, decimalPlaces) {
        var formattedValue = '';
        var number = numeral(value.toString())["_input"];
        formattedValue = decimalValue(number, decimalPlaces);
        return formattedValue;
    }

    function decimalValue(value, decimalPlaces) {
        var decimalFormat = '0,0.';
        for (i = 1; i <= decimalPlaces; i++) {
            decimalFormat = decimalFormat + '0';
        }
        return numeral(+value).format(decimalFormat);
    }

    function setColspanValue() {
        j$('#dynamicColumn').attr(
            'colspan' ,
            DISBURSEMENT_TABLE_FIELDSET_COUNT.split(',').length+1
        );
    }

    function initializeALJSComponents() {
        initALJS();
        initializeLookup();
        initializeDatepicker();
        setColspanValue();
    }

        /**
    Initialize ALJS
    */
    function initALJS() {
        j$.aljsInit({
            assetsLocation: ASSETS_LOCATION,
            scoped: true
        });
    }

    function onEdit() {
        initializeALJSComponents();
        setDate();
        getSavedValues();
    }

    function checkForErrorsOnLoad(errorPanel, errorPanelText) {
        if(j$('[id$=hasErrorOccurred]').val() == 'true') {
            j$('#errorPanelText').text(j$('[id$=exceptionMessage]').val());
            j$('#errorPanel').show();
        }
        else {
            j$('#errorPanelText').val('');
            j$('#errorPanel').hide();
        }
    }

    function checkForErrorsOnSaveAndEdit(errorPanel, editModalToast, errorPanelText) {
        if(j$('[id$=hasErrorOccurred]').val() == 'true') {
            j$('#'+errorPanelText).text(j$('[id$=exceptionMessage]').val());
            j$('#'+editModalToast).show();
            j$('#'+errorPanel).show();
        }
        else {
            j$('#'+errorPanelText).val('');
            j$('#'+editModalToast).hide();
            j$('#'+errorPanel).hide();
        }
    }

    function setDisbursementIndex(disbursementIndex, elementId) {
        j$('[id$='+elementId+']').val(disbursementIndex);
    }

    function hideToast(toastId) {
        j$('#'+toastId).hide();
    }

    function hideModal(containerId) {
        j$('[id$=' + containerId + ']').hide();
        j$('#' + containerId + '').hide();
    }

    function showModal(containerId) {
        j$('[id$=' + containerId + ']').show();
        j$('#' + containerId + '').show();
    }

    function showStatus() {
        j$('#statusDivProcessing').show();
    }

    function hideStatus() {
        j$('#statusDivProcessing').hide();
    }

    function deleteRecord() {
        deleteDisbursement(j$('input[id$=indexToDelete]').val());
    }

    function removeComma(value) {
        return value.replace(/,/g, '');
    }

    function addErrorMessage(errorPanelId, errorMessageHolder, message) {
        j$('#'+errorMessageHolder).text(message);
        j$('#'+errorPanelId).show();
    }

    function removeErrorMessage(errorPanelId, errorMessageHolder) {
        j$('#'+errorMessageHolder).text('');
        j$('#'+errorPanelId).hide();
    }

    function moveToSelected(element) {
        var selectedLi = j$(element).parent().prev().find('.unselectedOptions').children('.activeLI');
        var selectedULElement = j$(element).parent().next().find('.selectedOptions');
        j$(selectedLi).each(function(index){
            toggleActiveLiClass(j$(this));
            j$(selectedULElement).append(j$(this));
        });
    }

    function moveToAvailable(element) {
        var selectedLi = j$(element).parent().next().find('.selectedOptions').children('.activeLI');
        var availableULElement = j$(element).parent().prev().find('.unselectedOptions');
        j$(selectedLi).each(function(index){
            toggleActiveLiClass(j$(this));
            j$(availableULElement).append(j$(this));
        });
    }

    function toggleActiveLiClass(element) {
        j$(element).toggleClass('activeLI');
    }

    function setSelectedValues(elementId) {
        var selectedValues = '';
        j$('ul[id="' + elementId + '"]').find('li').each(function() {
            var liText = j$(this).prop('id');
            selectedValues += (selectedValues == '' ? liText.trim() : ';' + liText.trim());
        });
        j$('input[hiddenid=' + elementId + ']').val(selectedValues);
    }

    function getSavedValues() {
        j$('.MSPL').each(function(){
            var ul = j$(this).find('.unselectedOptions');
            var targetElement = j$(this).find('.selectedOptions');
            var seletedValues = j$(this).find('.MSPL-Values').val().split(';');
            j$.each(seletedValues, function(index, value) {
                var li = j$(ul).find('li[id="' + value + '"]');
                j$(targetElement).append(li);
            });
        });
    }

/**
    Lookup
    */
    function initializeLookup() {
        j$('.sobjectLookup').each(function() {
            var objectApi = j$(this).attr('field-Api');
            var lookupId = j$(this).attr('id');
            var hiddenValue = j$('input[related-data=' + lookupId + ']').val();
            var hiddenLabel = j$('input[related-data=' + lookupId + ']').attr('text-label');
            j$('input[related-data=' + lookupId + ']').val(hiddenValue);
            var defaultSelection = getDefaultSelectedLookupValue(
                hiddenValue + '#' + hiddenLabel
            );
            j$(this).lookup({
                initialSelection: defaultSelection,
                objectIconUrl : '',
                objectIconClass : '',
                emptySearchTermQuery: function(callback) {
                    remotingForLookup('' , callback , true, objectApi)
                },
                filledSearchTermQuery: function(searchTerm, callback) {
                    remotingForLookup(searchTerm, callback , false, objectApi);
                },
                onChange: function(rec) {
                    onChangeOfLookupInput(lookupId, rec);
                }
            });
        });
    }

    function remotingForLookup(searchTerm, callback, isEmptySearch, sObjectApi) {
        Visualforce.remoting.Manager.invokeAction(
            SOBJECTLOOKUP,
            searchTerm,
            sObjectApi,
            function(result, event){
                if (event.status) {
                    entityLookupCollection = JSON.parse(result);
                    if(isEmptySearch){
                        setCallBackForEmptySearch(callback);
                    }
                    else{
                        setCallBackForfilledSearch(searchTerm, callback);
                    }
                }
            },
            {escape: false}
        );
    }

    function setCallBackForEmptySearch(callback){
        callback(entityLookupCollection);
    }

    function setCallBackForfilledSearch(searchTerm, callback){
        callback(
            entityLookupCollection.filter(
                function(entityLookupCollectionItem) {
                    var re = new RegExp(searchTerm, 'i');
                    return entityLookupCollectionItem.label.match(re) !== null;
                }
            )
        );
    }

    function getDefaultSelectedLookupValue(hiddenValue) {
        var defaultSelectedValue;
        if(hiddenValue !== undefined && hiddenValue != '') {
            var arr = hiddenValue.split('#');
            if (
                (arr[1] !== undefined && arr[1] !== '') &&
                (arr[0] !== undefined && arr[0] !== '')
            ){
                defaultSelectedValue = [
                    {
                        label: arr[1],
                        id: arr[0]
                    }
                ];
            }
        }
        return defaultSelectedValue;
    }

    function onChangeOfLookupInput(hiddenlookupElementId, record){
        if(record != null) {
            j$('input[related-data=' + hiddenlookupElementId + ']').val(record.id);
            j$('#' + hiddenlookupElementId).val(record.label);
        }
        else {
            j$('input[related-data=' + hiddenlookupElementId + ']').val('');
        }
    }

    /*date picker*/
    function initializeDatepicker() {
        var dateFormat = getDateFormat(userLocale);
        j$('.DatePicker').datepicker({
            numYearsBefore: 76,
            numYearsAfter: 10,
            format: dateFormat,
            onChange: function(datepicker) {
                if (dateChangedManually != true) {
                    var selectedDate = datepicker.selectedFullDate._i;
                    var selectedInputHidden = datepicker.$selectedInput[0].id;
                    var selectedInputHiddenVal = moment(selectedDate).format(dateFormat);
                    j$('input[related-data=' + selectedInputHidden + ']').val(selectedInputHiddenVal);
                    j$('input[id=' + selectedInputHidden + ']').val(selectedInputHiddenVal);
                }
                else {
                    dateChangedManually = false;
                }
            }
        });
    }

    function onDateChange(dateElement) {
        dateChangedManually = true;
        var dateValue = j$(dateElement).val();
        var hiddenElementId = j$(dateElement).attr('Id');
        j$('input[related-data=' + hiddenElementId + ']').val(dateValue);
        j$(dateElement).val(dateValue);
    }

    function setDate() {
        j$('.DatePicker').each(function(){
            var id = j$(this).attr('id');
            var val = j$('input[related-data=' + id + ']').val();
            if (val !== undefined && val !== '') {
                j$(this).val(val);
            }
        });
    }


    // Validating required field
    function validateRequiredInputFields(element) {
        var validationSuccess = true;
        j$('[id$="' + element + '"]').find('.requiredField').each(function() {
            var field = j$(this);
            var fieldValue = j$(this).val();
            if (fieldValue == '' || fieldValue == null) {
                j$(field).addClass('error-occured');
                validationSuccess = false;
            }
            else if (j$(field).hasClass('error-occured')) {
                j$(field).removeClass('error-occured');
                validationSuccess = true;
            }
            if (!validateRequiredMSPL(element)) {
                validationSuccess = false;
            }
            j$('[id$="' + element + '"]').find('.error-pill').hide();
            if (validationSuccess == false) {
                j$('[id$="' + element + '"]').find('.error-pill').show();
            }
        });
        return validationSuccess;
    }

    //validating required MSPL fields
    function validateRequiredMSPL(element) {
        var validationSuccess = true;
        j$('[id$="' + element + '"]').find('.slds-picklist--draggable').each(function() {
            var field = j$(this).find('.MSPLInput');
            if (j$(field).hasClass('requiredMSPLField')) {
                var fieldValue = j$(this).find('.requiredMSPLField').val();
                var ul = j$(this).find('.errorNotify');
                if (fieldValue == '' || fieldValue == undefined) {
                    j$(ul).addClass('error-occured');
                    validationSuccess = false;
                }
                else if (j$(ul).hasClass('error-occured')) {
                    j$(ul).removeClass('error-occured');
                    validationSuccess = true;
                }
            }
        });
        return validationSuccess;
    }

    function showLoader() {
        j$('#statusDivProcessing').css('display', 'block');
    }


    function hideLoader() {
        j$('#statusDivProcessing').css('display', 'none');
    }

    function displayDisbursementTable() {
        j$('#disbursementTable').removeClass('displayNone');
    }

    function clearInputValues(elementId) {
        j$('#'+elementId+' input:text').val('');
        j$('#'+elementId+' select').val('');
    }