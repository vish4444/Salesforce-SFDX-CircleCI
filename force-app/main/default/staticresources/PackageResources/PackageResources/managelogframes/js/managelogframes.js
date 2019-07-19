var collapseIcon;
var expandIcon;
var dateFormat;
var dateChangedManually = false;
var decimalDelimiter;
var thousandDelimiter;
var decimalDelimiterCharCode;

function init() {
    dateFormat = getDateFormat(userLocale);
    initializeExpandCollapseVariables();
    loadTreeTable();
    buildNodeHierarchy();
    initializeALJSComponents();
    hideLoader();
    setTableContainerWidth();
    showMainTableContainer();
    setIconHeight();
    initNumeralHelpers();
    initValueFormatting();
}

function setIconHeight() {
    j$('.descriptionSelector').each(function(){
        j$(this).siblings('.indenter').height(j$(this).height());
    });
}

function initializeExpandCollapseVariables() {
    collapseIcon = '<svg class="slds-button__icon slds-button__icon--small" aria-hidden="true">'+
        '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + COLLAPSE_ICON_URL + '">' +
        '</use></svg>';
    expandIcon = '<svg class="slds-button slds-button__icon slds-button__icon--small" aria-hidden="true">'+
        '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + EXPAND_ICON_URL + '">'+
        '</use></svg>';
}

function setTableContainerWidth() {
    //If lighning not enabled, we need to set width for div of the table, or else scroll is
    //added to page. And this width is being set according to different screen sizes.
    if (!isLightningEnabled()) {
        var tableContainerWidth = screen.width - 60;
        j$('#mainTableContainer').css("width",tableContainerWidth);
    }
}

function initNumeralHelpers() {
    if (numeral.locales[userLocale.toLowerCase()] == undefined) {
        numeral.locale('en_us');
    }
    else {
        numeral.locale(userLocale.toLowerCase());
    }
    decimalDelimiter = numeral.localeData(numeral.locale()).delimiters["decimal"];
    thousandDelimiter = numeral.localeData(numeral.locale()).delimiters["thousands"];
    if (decimalDelimiter == '.') {
        decimalDelimiterCharCode = 46;
    }
    else if (decimalDelimiter == ',') {
        decimalDelimiterCharCode = 44;
    }
}

/**
* This method initialises the jquery treetable with initial state as expanded and expander template
* to include expand and collapse icons.
*/
function loadTreeTable() {
    j$("#logFramesTable").treetable(
        {
            expandable: true,
            initialState: 'expanded',
            indenterTemplate: '<div class="indenter"></div>',
            expanderTemplate: '<a href="#" class="collapseIcon chevronIcon slds-button slds-button--icon slds-m-down--x-small" onclick="toggleIcons(this);">'+collapseIcon+'</a>'
        }
    );
}

function showModal(elementId, childElementId) {
    j$('[id$=' + elementId + ']').show();
    j$('[id$=' + childElementId + ']').show();
}

function hideModal(elementId, childElementId) {
    j$('[id$=' + elementId + ']').hide();
    j$('[id$=' + childElementId + ']').hide();
}

function expandAndCollapseNodes() {
    if (j$('[id$=expandCollapseLink]').text() == EXPAND_ALL) {
        expandAll();
        j$('[id$=expandCollapseLink]').text(COLLAPSE_ALL);
    }
    else if (j$('[id$=expandCollapseLink]').text() == COLLAPSE_ALL) {
        collapseAll();
        j$('[id$=expandCollapseLink]').text(EXPAND_ALL);
    }
}

/**
* This method will expand all the nodes using starndard treetable method and will add the collapse
* nodes for all the parent nodes.
*/
function expandAll() {
    showLoader();
    j$("#logFramesTable").treetable('expandAll');
    var svgElement;
    j$('.chevronIcon').each(function(){
        svgElement = j$(this).find('svg:first');
        j$(this).removeClass('expandIcon');
        j$(this).addClass('collapseIcon');
        svgElement.replaceWith(collapseIcon);
    });
    hideLoader();
    return false;
}

/**
* This method will collapse all the nodes using starndard treetable method and will add the expand
* nodes for all the parent nodes.
*/
function collapseAll() {
    showLoader();
    j$("#logFramesTable").treetable('collapseAll');
    var svgElement;
    j$('.chevronIcon').each(function(){
        svgElement = j$(this).find('svg:first');
        j$(this).removeClass('collapseIcon');
        j$(this).addClass('expandIcon');
        svgElement.replaceWith(expandIcon);
    });
    hideLoader();
    return false;
}

/**
* This method generates the parent child tree structure using standard treetable move method.
*/
function buildNodeHierarchy() {
    j$( "#logFramesTable" ).find(".objectiveLeaf").each(function( index ) {
        var nodeID = j$( this ).attr("data-tt-id");
        var destinationNodeId = j$(this).attr("parent-id");
        var destinationNode = j$("#logFramesTable").treetable("node", destinationNodeId);

        if(destinationNodeId !== '' && destinationNode != undefined) {
            j$("#logFramesTable").treetable("move", nodeID, destinationNodeId);
        }
    });
    sortChildNodes();
}

/**
* This method is called on click of expand/collapse icon and this method is use to toggle icons.
*/
function toggleIcons(element) {
    var svgElement = j$(element).find('svg:first');

    if (j$(element).hasClass('collapseIcon') == true) {
        j$(element).removeClass('collapseIcon');
        j$(element).addClass('expandIcon');
        svgElement.replaceWith(expandIcon);
    }
    else {
        j$(element).removeClass('expandIcon');
        j$(element).addClass('collapseIcon');
        svgElement.replaceWith(collapseIcon);
    }
}

/**
* This method sort the child nodes in alphabetical order.
*/
function sortChildNodes() {
    j$('.objectiveLeaf').each(function(){
        var node = '';
        if (j$(this).attr("parent-id") == '') {
            node = j$("#logFramesTable").treetable("node", j$(this).attr('data-tt-id'));
            j$("#logFramesTable").treetable("sortBranch", node);
        }
    });
}

/*
    ALJS Functions
*/
function initializeALJSComponents() {
    initALJS();
    initializeLookup();
    initializeDatepicker();
}

/**
* Initialize ALJS
*/
function initALJS() {
    j$.aljsInit({
        assetsLocation: ASSETS_LOCATION,
        scoped: true
    });
}

function initializeDatepicker() {
    j$('.DatePicker').datepicker({
        numYearsBefore: 76,
        numYearsAfter: 10,
        format: dateFormat,
        onChange: function(datepicker) {
            if (dateChangedManually == false) {
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

function initializeLookup() {
    j$('.sobjectLookup').each(function() {
        var objectApi = j$(this).attr('field-Api');
        var lookupId = j$(this).attr('id');
        var hiddenValue = j$('input[related-data=' + lookupId + ']').val();
        var hiddenLabel = j$('input[related-data=' + lookupId + ']').attr('text-label');
        j$('input[related-data=' + lookupId + ']').val(hiddenValue);
        var defaultSelection = getDefaultSelectedLookupValue(
            hiddenValue, hiddenLabel
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
        PROJECT_ID,
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

function getDefaultSelectedLookupValue(hiddenValue, hiddenLabel) {
    var defaultSelectedValue;
    if (
        (hiddenValue !== undefined && hiddenValue !== '') &&
        (hiddenLabel !== undefined && hiddenLabel !== '')
    ) {
        defaultSelectedValue = [
            {
                label: hiddenLabel,
                id: hiddenValue
            }
        ];
    }
    return defaultSelectedValue;
}

function initValueFormatting() {
    formatCurrencyValue();
    formatNumberValue();
    formatPercentValue();
}

function formatCurrencyValue() {
    j$(".currencyValue").each(function() {
         if(j$(this).attr('unformatted-value') != undefined ||
            j$(this).attr('unformatted-value') != ''
        ) {
            formatOutputNumber(this, j$(this).attr('decimalPlaces'));
         }
    });
}

function formatNumberValue() {
    j$(".numberValue").each(function() {
         if(j$(this).attr('unformatted-value') != undefined ||
            j$(this).attr('unformatted-value') != ''
        ) {
            formatOutputNumber(this, j$(this).attr('decimalPlaces'));
         }
    });
}

function formatPercentValue() {

    j$(".percentValue").each(function() {
        if(j$(this).attr('unformatted-value') != undefined ||
            j$(this).attr('unformatted-value') != ''
        ) {
            formatOutputNumber(this, j$(this).attr('decimalPlaces'));
        }
    });
}

function formatOutputNumber(element, decimalPlaces) {

    if (jQuery.trim(j$(element).html()) != '' && j$(element).html() != undefined) {

        var value = numeral(j$(element).html())["_input"];
        var oneMillion = 1000000;
        var oneBillion = 1000000000;
        var oneTrillion = 1000000000000;
        var formattedValue = value;
        var defaultFormatting = false;

        if (value != undefined && value != '') {
            //if value is greater then trillion
            if (+value >= oneTrillion) {
                formattedValue = formatTrillionValue(value, decimalPlaces);
            }

            //if value is greater then billion
            else if (+value >= oneBillion) {
                formattedValue = formatBillionValue(value, decimalPlaces);
            }

            //if value is greater then million
            else if (+value >= oneMillion) {
                formattedValue = formatMillionValue(value, decimalPlaces);
            }

            else {
                defaultFormatting = true;
                formattedValue = defaultOutputNumberFormatting(
                    value,
                    j$(element).attr('data-type'),
                    decimalPlaces
                );
            }
        }
        if (j$(element).attr('data-type') == INDICATOR_CURRENCY_TYPE) {
            j$(element).html(formattedValue + ' ' + j$(element).attr('currency-code'));
        }
        else if (j$(element).attr('data-type') == INDICATOR_PERCENT_TYPE) {
             j$(element).html(formattedValue + ' %');
        }
        else if (j$(element).attr('data-type') == INDICATOR_NUMBER_TYPE) {
            j$(element).html(formattedValue);
        }
    }
}

function defaultOutputNumberFormatting(value, dataType, decimalPlaces) {
    var formattedValue = '';
    var number = numeral(value.toString())["_input"];
    if (decimalPlaces > 0) {
        formattedValue = decimalValue(number, decimalPlaces);
    }
    else {
        formattedValue = integerValue(number);
    }
    return formattedValue;
}

function getDecimalFormat(decimalPlaces) {
    var decimalFormat = '0,0';
    if (decimalPlaces > 0) {
        decimalFormat = decimalFormat + '.';
        for (i = 1; i <= decimalPlaces; i++) {
            decimalFormat = decimalFormat + '0';
        }
    }
    return decimalFormat;
}

function formatTrillionValue(value, decimalPlaces) {
    var decimalFormat = getDecimalFormat(decimalPlaces);
    value = value/1000000000000;
    value = numeral(value).format(decimalFormat);
    value = value + 'T';
    return value;
}

function decimalValue(value, decimalPlaces) {
    var decimalFormat = '0,0.';
    for (i = 1; i <= decimalPlaces; i++) {
        decimalFormat = decimalFormat + '0';
    }
    return numeral(+value).format(decimalFormat);
}

function integerValue(value) {
    return numeral(+value).format('0,0');
}

function formatBillionValue(value, decimalPlaces) {
    var decimalFormat = getDecimalFormat(decimalPlaces);
    value = value/1000000000;
    value = numeral(value).format(decimalFormat);
    value = value + 'B';
    return value;
}

function formatMillionValue(value, decimalPlaces) {
    var decimalFormat = getDecimalFormat(decimalPlaces);
    value = value/1000000;
    value = numeral(value).format(decimalFormat);
    value = value + 'M';
    return value;
}

function onChangeOfLookupInput(hiddenlookupElementId, record){
    if(record != null) {
        j$('input[related-data=' + hiddenlookupElementId + ']').val(record.id);
    }
    else {
        j$('input[related-data=' + hiddenlookupElementId + ']').val('');
    }
}

/**
* This method will validate the required fields and show the error header and add the border color
* red to the input fields with error.
*/
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

/**
* This method will show the Add new objective pop up in case of any validation errors due to
* required fields.
*/
function checkForError(elementId, childElementId, headerId) {
    var hasErrorOccured = j$('input[id$=popUpError]').val();
    if (hasErrorOccured == 'true') {
        addError(headerId);
        showModal(elementId, childElementId);
    }
    else if (hasErrorOccured == 'false') {
        removeError(headerId);
        hideModal(elementId, childElementId);
    }
}

function addError(headerId) {
    j$('#' + headerId).addClass('slds-theme--error slds-theme--alert-texture');
}

function removeError(headerId) {
    j$('#' + headerId).removeClass('slds-theme--error slds-theme--alert-texture');
}

// Adding Error message to Popup header when error occures
function addErrorMessage(errorMessageHolder, message) {
    j$('[id$=' + errorMessageHolder + ']').text(message);
}

function removeErrorMessage(errorMessageHolder) {
    j$('[id$=' + errorMessageHolder + ']').text('');
}

function removeRequiredFieldError(element) {
    j$('[id$="' + element + '"]').find('.error-occured').each(function() {
        j$(this).removeClass('error-occured');
    });
    j$('[id$="' + element + '"]').find('.error-pill').hide();
}

function showLoader() {
    j$('#divProcessing').show();
}

function hideLoader() {
    j$('#divProcessing').hide();
}

function showMainTableContainer() {
    j$('#mainTableContainer').show();
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

function setSelectedValues(elementId) {
    var selectedValues = '';
    j$('ul[id="' + elementId + '"]').find('li').each(function() {
        var liText = j$(this).prop('id');
        selectedValues += (selectedValues == '' ? liText.trim() : ';' + liText.trim());
    });
    j$('input[hiddenid=' + elementId + ']').val(selectedValues);
}

function toggleActiveLiClass(element) {
    j$(element).toggleClass('activeLI');
}

function isLightningEnabled() {
    return((typeof sforce != 'undefined') && sforce && (!!sforce.one));
}

function hideErrorPanel(errorPanelId) {
    j$('[id$=' + errorPanelId + ']').hide();
}

function getProjectObjectiveToEdit(projectObjectiveId) {
    j$("input[id$='selectedProjectObjectiveId']").val(projectObjectiveId);
    fetchProjectObjectiveToEditAF(projectObjectiveId);
}

function displayEditPopup() {
    showModal('editLogframePanel', 'editLogframeModal');
}

function removeLogFrameItem(projectObjectiveId) {
    j$("input[id$='selectedProjectObjectiveId']").val(projectObjectiveId);
    showModal('deleteLogframePanel', 'deleteLogframeModal');
}

/**
* This method is not used currently. But this would need to be added if we need to show error
* message on pop up in case of VF page message.
*/
/*function ifPageMessageOccured() {
    if(j$('[id$="addNewObjectivePanel"]').find('.errorMsg').length > 0) {
        j$('[id$="addNewObjectivePanel"]').show();
        j$('#addNewModal').show();
    }
}*/