var validNoOfDigits = 16;
var mainDataTable;
var qualitativeIconId;
var qualitativeValue = '';
var decimalDelimiter;
var thousandDelimiter;
var decimalDelimiterCharCode;
var inputElementsInQueue = [];
var areResultsDisaggregatedForTargets = false;

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

function initALJS() {
    j$.aljsInit({
        assetsLocation: ASSETS_LOCATION,
        scoped: true
    });
}

function initPopover() {
    j$('.enablePopover [data-aljs="popover"]').popover();
}

//Number Formatting an Validation Methods Start
function formatNumbersOnLoad() {
    formatInpuNumbers();
    calculateTotalValues();
    formatAllOutputNumbers();
}

function formatInpuNumbers() {
    if(j$('.inputValues')[0] == undefined) {
        hideErrorMessagePanel();
        SHOW_ERROR_PANEL = true;
    }
    else {
        j$('.inputValues').each(function(index) {
            formatInputNumber(j$(this), 'onLoad');
        });
    }
}

function calculateOutputValues() {
     j$('.inputValues').each(function(index) {
        if (j$(this).val() != '') {
            j$(this).trigger('change');
        }
    });
}

function calculateTotalValues() {
    calculateTotalForChildRow();
    calculateTotalForColumns();
    calculateMainTotal();
}

function calculateTotalForChildRow() {
    j$('.rowTotalOutput').each(function(index) {
        var uniqueRowId = j$(this).attr('unique-row-id').replace('Total','');
        var total = null;
        var childHasValues = false;
        var decimalPlaces = j$(this).attr('decimalPlaces');

        (j$("[unique-row-id=" +uniqueRowId+"]")).each(function( index ) {
            if (IS_REPORTING_PERIOD_LOCKED == 'true') {
                if (j$(this).text().trim() != '') {
                    if (total == null) {
                        total = +numeral(j$(this).text())["_input"];
                    }
                    else {
                        total = +total +(+numeral(j$(this).text())["_input"]);
                    }
                    childHasValues = true;
                }
            }
            else {
                if (j$(this).val() != '') {
                    childHasValues = true;
                    total = +total +(+numeral(j$(this).val())["_value"]);
                }
            }
        });
        if (childHasValues) {
            j$(this).html(total);

            j$(this).attr('unformatted-value', total);
            formatOutputNumber(j$(this), decimalPlaces);
        }
    });
}

function calculateTotalForColumns() {
    j$('.columnTotalOutput').each(function(index) {
        var uniqueColumnId = j$(this).attr('unique-column-id').replace('Total','');
        var total = null;
        var childHasValues = false;
        var decimalPlaces = j$(this).attr('decimalPlaces');

        (j$("[unique-column-id=" +uniqueColumnId+"]")).each(function( index ) {
            if (IS_REPORTING_PERIOD_LOCKED == 'true') {
                if (j$(this).text().trim() != '') {
                    if (total == null) {
                        total = +numeral(j$(this).text())["_input"];
                    }
                    else {
                        total = +total +(+numeral(j$(this).text())["_input"]);
                    }
                    childHasValues = true;
                }
            }
            else {
                if (j$(this).val() != '') {
                    childHasValues = true;
                    total = +total +(+numeral(j$(this).val())["_value"]);
                }
            }
        });
        if (childHasValues) {
            j$(this).html(total);
            j$(this).attr('unformatted-value', total);
            formatOutputNumber(j$(this), decimalPlaces);
        }
    });
}

function calculateMainTotal() {
    j$('.mainTotal').each(function(index) {
        var uniqueRowId = j$(this).attr('unique-row-id').replace('Total','');
        var total = null;
        var childHasValues = false;
        var decimalPlaces = j$(this).attr('decimalPlaces');
        (j$("[unique-row-id=" +uniqueRowId+"]")).each(function( index ) {
            if (j$(this).text().trim() != '') {
                if (total == null) {
                    total = +numeral(j$(this).attr('unformatted-value'))["_input"];
                }
                else {
                    total = +total +(+numeral(j$(this).attr('unformatted-value'))["_input"]);
                }
                childHasValues = true;
            }
        });

        if (childHasValues) {
            j$(this).html(total);
            j$(this).attr('unformatted-value', total);
            formatOutputNumber(j$(this), decimalPlaces);
        }
    });
}



function formatAllOutputNumbers() {
    j$('.outputValue').each(function() {
        var decimalPlaces = j$(this).attr('decimalPlaces');
        formatOutputNumber(j$(this), decimalPlaces);
    });
}

function formatInputNumber(element, event) {
    var value = '';
    if (value != null) {
        if (event == 'onLoad') {
            value = j$(element).val();
        }
        else if (event == 'onChange') {
            value = numeral(j$(element).val())["_value"];
        }
    }
    var minValue = j$(element).attr('min-value');
    var maxValue = j$(element).attr('max-value');

    var formattedValue = '';
    var dataType = j$(element).attr('data-type');
    if (value !== '' && value != null) {
        var decimalPlaces = j$(element).attr('decimalPlaces');
        if (parseInt(decimalPlaces) > 0) {
            formattedValue = decimalValue(value, parseInt(decimalPlaces));
        }
        else {
            formattedValue = decimalValue(value, parseInt(decimalPlaces));
        }

        //Highlight if number not in range
        if (IS_VALIDATION_ENABLED == 'true') {
            if (
                ((minValue != '') && (numeral(value)["_input"] < numeral(+minValue)["_input"]))
                ||
                ((maxValue != '') && (numeral(value)["_input"] > numeral(+maxValue)["_input"]))
            ) {
                j$(element).addClass('minMaxError');
            }
            else {
                j$(element).removeClass('minMaxError');
            }
        }
    }
    else {
        j$(element).removeClass('minMaxError');
    }
    j$(element).val(formattedValue);
    if (SHOW_ERROR_PANEL && IS_VALIDATION_ENABLED == 'true') {
        displayErrorPanel();
    }
}

function displayErrorPanel() {
    var errorCount = j$('.minMaxError').length;
    if (errorCount > 0) {
        j$("[id$=minMaxValidationErrorPanel]").removeClass('noDisplayElement');
    }
    else if (errorCount == 0) {
        j$("[id$=minMaxValidationErrorPanel]").addClass('noDisplayElement');
    }
}

function integerValue(value) {
    return numeral(+value).format('0,0');
}

function decimalValue(value, decimalPlaces) {
    var decimalFormat = '0,0.';
    for (i = 1; i <= decimalPlaces; i++) {
        decimalFormat = decimalFormat + '0';
    }
    return numeral(+value).format(decimalFormat);
}

function isNumberValid(evt,element) {
    var isValid = false;
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var dataType = j$(element).attr('data-type');
    //User should be able to put negative sign but at cursor position = 0 only.
    var cursorPosition = charCode == 45 ? j$(element).prop("selectionStart") : getCursorPostion(element);
    var decimalPlaces = j$(element).attr('decimalPlaces');

    if (parseInt(decimalPlaces) > 0) {
        isValid = isDecimal(element, charCode, cursorPosition, parseInt(decimalPlaces));
    }
    else {
        isValid = isInteger(element, charCode, cursorPosition);
    }
    return isValid;
}

/*
* This method removes thousand delimiters to let user put 16 digits and put digits
* upto cursor postion 15 if there are not 16 digits in input field
*/
function getCursorPostion (element) {
    var selectionStart = j$(element).prop("selectionStart");
    var value = j$(element).val().substring(0,(selectionStart-1));
    var regex = thousandDelimiter.replace('///g','');
    value = value.replace(new RegExp(regex,'g'),'');
    return value.length +1;
}

function isInteger(element, charCode, cursorPosition) {
    return validateIntegerFields(element, charCode, cursorPosition)
}

function validateIntegerFields(element, charCode, cursorPosition) {
    var isValidInteger = false;
    if (validateNegativeSign(cursorPosition, element, charCode)) {
        if (hasAllNumbers(element, charCode)) {
            if (hasValidNumberOfDigits(element)) {
                isValidInteger = true;
            }
        }
    }
    return isValidInteger;
}

function hasAllNumbers(element, charCode) {
    var isNumberKey = true;
    if ((charCode > 31 || charCode == 13) && (charCode < 48 || charCode > 57) && charCode != 45
    ) {
        isNumberKey = false;
    }
    return isNumberKey;
}

function hasDecimal(element, charCode) {
    var isDecimalKey = false;
    if (charCode == decimalDelimiterCharCode && element.value.indexOf(decimalDelimiter) <= 0) {
        isDecimalKey = true;
    }
    return isDecimalKey;
}

function hasValidNumberOfDigits(element) {
    var hasValidDigits = true;
    if (element.value.replace(/\D/g, '').length + 1 > validNoOfDigits) {
        hasValidDigits = false;
    }
    /*
    * If length of number is 16 then above if condition refrains to add another digit to number
    * even if it is a new digit added to field replacing whole number. Hence, below logic
    */
    if (
            element.value.replace(/\D/g, '').length == validNoOfDigits &&
            element.selectionStart == 0 && element.selectionEnd == element.value.length
    ) {
        element.value = '';
        hasValidDigits = true;
    }
    return hasValidDigits;
}

function isDecimal(element, charCode, cursorPosition, noOfDecimalPlaces) {
    return validateDecimalFields(cursorPosition, element, charCode, noOfDecimalPlaces)
}

function validateDecimalFields(cursorPosition, element, charCode, noOfDecimalPlaces) {
    var isValidDecimal = false;
    if (validateNegativeSign(cursorPosition, element, charCode)) {
        if (hasAllNumbers(element, charCode) || hasDecimal(element, charCode)) {
            if (validateNumberOfDigitsForDecimal(cursorPosition, element, charCode, noOfDecimalPlaces)) {
                isValidDecimal = true;
            }
        }
    }
    return isValidDecimal;
}

function validateNumberOfDigitsForDecimal(cursorPosition,element,charCode,noOfDecimalPlaces) {
    var noOfDigitsBeforeDecimal = 16;
    var regex = thousandDelimiter.replace('///g','');
    var value = element.value.replace(new RegExp(regex,'g'),'');
    var beforeDecimal = value.substr(0,value.indexOf(decimalDelimiter)).length;
    var afterDecimal = value.substring(value.indexOf(decimalDelimiter)+1).length;
    var decimalIndex = value.indexOf(decimalDelimiter);
    var validDigits = true;

    if(decimalIndex >= 0) {
        if(beforeDecimal >= noOfDigitsBeforeDecimal && cursorPosition <= decimalIndex && charCode != 8) {
            validDigits = false;
        }
        else if(afterDecimal >= noOfDecimalPlaces && cursorPosition > decimalIndex  && charCode != 8) {
            validDigits = false;
        }
        else {
            validDigits = true;
        }
    }
    else if(decimalIndex < 0) {

        if(value.length >= noOfDigitsBeforeDecimal && charCode != decimalDelimiterCharCode && charCode != 8) {
            validDigits = false;
        }
        else {
            validDigits = true;
        }
    }

    //If whole value is selected
    if (element.selectionStart == 0 && element.selectionEnd == element.value.length && !validDigits) {
        element.value = '';
        validDigits = true;
    }
    return validDigits;
}

function validateNegativeSign(cursorPosition, element, charCode) {
    var isNegativeKey = false;
    if (
        (
            charCode == 45
            &&
            cursorPosition == 0
            &&
            element.value.indexOf('-') <= 1
        )
        ||
        (
            charCode != 45
        )
    ) {
        isNegativeKey = true;
    }
    return isNegativeKey;
}

function formatNumberAndCalucateTotal(element) {
    formatInputNumber(element, 'onChange');
    calculateTotalForColumn(element);
    calculateTotalForRow(element);
}

function formatNumberAndCalculateTotalForRow(element) {
    formatInputNumber(element, 'onChange');
    calculateTotalForRow(element);
}

function calculateTotalForColumn(element) {
    var uniqueColumnId = j$(element).attr('unique-column-id');
    var decimalPlaces = j$(element).attr('decimalPlaces');
    var total = null;
    (j$("[unique-column-id=" +uniqueColumnId+"]")).each(function( index ) {
        if (j$(this).val() != '') {
            if (total == null) {
                total = +numeral(j$(this).val())["_value"];
            }
            else {
                total = +total +(+numeral(j$(this).val())["_value"]);
            }
        }
    });

    j$("[unique-column-id="+uniqueColumnId+"Total]").html(total);

    j$("[unique-column-id="+uniqueColumnId+"Total]").attr('unformatted-value', total);

    formatOutputNumber(j$("[unique-column-id="+uniqueColumnId+"Total]"), decimalPlaces);

    if (uniqueColumnId.indexOf('Total') <= 0) {
        calculateTotalForOutputRow(j$("[unique-column-id="+uniqueColumnId+"Total]"));
    }
}

function calculateTotalForRow(element) {

    if (j$(element).attr('unique-row-id') != undefined) {
        var uniqueRowId = j$(element).attr('unique-row-id');
        var decimalPlaces = j$(element).attr('decimalPlaces');
        var total = null;
        (j$("[unique-row-id=" +uniqueRowId+"]")).each(function( index ) {
            if (j$(this).val() != '') {
                if (total == null) {
                    total = +numeral(j$(this).val())["_value"];
                }
                else {
                    total = +total +(+numeral(j$(this).val())["_value"]);
                }
            }
        });
        j$("[unique-row-id="+uniqueRowId+"Total]").html(total);
        j$("[unique-row-id="+uniqueRowId+"Total]").attr('unformatted-value', total);
        formatOutputNumber(j$("[unique-row-id="+uniqueRowId+"Total]"), decimalPlaces);
    }
}

function calculateTotalForOutputRow(element) {
    var uniqueRowId = j$(element).attr('unique-row-id');
    var decimalPlaces = j$(element).attr('decimalPlaces');
    var total = null;
    (j$("[unique-row-id=" +uniqueRowId+"]")).each(function( index ) {

        if (j$(this).text() != '') {
            if (total == null) {
                total = +numeral(j$(this).attr('unformatted-value'))["_input"];
            }
            else {
                total = +total +(+numeral(j$(this).attr('unformatted-value'))["_input"]);
            }
        }
    });
    j$("[unique-row-id="+uniqueRowId+"Total]").html(total);
    j$("[unique-row-id="+uniqueRowId+"Total]").attr('unformatted-value', total);
    formatOutputNumber(j$("[unique-row-id="+uniqueRowId+"Total]"), decimalPlaces);
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

            //if negative value is greater then trillion
            else if (-value >= oneTrillion) {
                formattedValue = formatTrillionValue(value, decimalPlaces);
            }

            //if value is greater then billion
            else if (+value >= oneBillion) {
                formattedValue = formatBillionValue(value, decimalPlaces);
            }

            //if negative value is greater then billion
            else if (-value >= oneBillion) {
                formattedValue = formatBillionValue(value, decimalPlaces);
            }

            //if value is greater then million
            else if (+value >= oneMillion) {
                formattedValue = formatMillionValue(value, decimalPlaces);
            }

            //if neagative value is greater then million
            else if (-value >= oneMillion) {
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
        if (formattedValue != value.toString() && defaultFormatting == false) {
            var decimalFormat = getDecimalFormat(decimalPlaces);
            var formattedHoverValue = numeral(+value).format(decimalFormat);
            j$(element).attr('unformatted-value', +value);
            j$(element).attr('data-aljs-title', formattedHoverValue);
            j$(element).popover();
        }
        else {
            j$(element).attr('data-aljs-title', '');
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

//Number Formatting an Validation Methods End

/*Expand and Collapse functionality*/
function hideDisaggregations(currentElement) {

    var buttonId = currentElement.id;

    var projectIndicatorId = buttonId.substring(
        0, buttonId.indexOf("~")
    );

    var childDisaggregationElements = j$('.'+projectIndicatorId+'disaggregations');

    childDisaggregationElements.each(function(index) {
        j$(this).hide();
    });

    j$(currentElement).hide();
    var expandButton = j$("[id$='" + projectIndicatorId + "~expand']");
    j$(expandButton).toggle();
    return false;
}

function showDisaggregations(currentElement) {

    var buttonId = currentElement.id;

    var projectIndicatorId = buttonId.substring(
        0, buttonId.indexOf("~")
    );

    var childDisaggregationElements = j$('.'+projectIndicatorId+'disaggregations');

    childDisaggregationElements.each(function(index) {
        j$(this).show();
    });

    j$(currentElement).hide();
    var collapseButton = j$("[id$='" + projectIndicatorId + "~collapse']");
    j$(collapseButton).toggle();

    if (
            j$('[id$="hasGenderDisagg"]')[0].value == 'true' &&
            sourcePage.toUpperCase() === FILE_NAME_RESULTS.toUpperCase() &&
            DISPLAY_TARGETS == 'true'
    ) {
        childDisaggregationElements.each(function(index) {
            j$(this).css('height','54px');
        });
    }
    return false;
}

//Multiselect methods
function toggleActiveLiClass(element) {
    j$(element).toggleClass('activeLI');
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

//Search filters
function searchDatatableByFilters(searchString, columnNo) {
    mainDataTable.columns(columnNo).search( searchString ,false,true, true).draw();
}


function loadCommentsPopup(hasChildRows, element) {
    showLoader();
    getCommentsAndShowPopup(hasChildRows, element);
}

function getCommentsAndShowPopup(hasChildRows, element) {
    var commentsData = getDataForComments(hasChildRows, element);

    Visualforce.remoting.Manager.invokeAction (
        GET_RESULT_COMMENTS,
        commentsData.projectIndicatorId,
        commentsData.projectIndicatorReportingPeriodId,
        commentsData.projectIndicatorGeographicAreaId,
        commentsData.disaggregationValueId,
        showCommentsPopUp,
        {escape: false}
    );
}

function upsertResult(element, columnHeader, indicatorDataType, sourcePage) {
    var columnProcessed;
    var parentRow = j$(element).closest('.targetResultTable').closest('tr');
    var fieldValue = j$(element).val();
    var projectIndicatorId = j$(parentRow).attr('project-indicator-id');
    var projectIndicatorReportingPeriodId = j$(parentRow).attr('project-indicator-rp-id');
    var projectIndicatorGeographicAreaId = j$(parentRow).attr('project-indicator-ga-id');
    var disaggregationValueId = j$(parentRow).attr('disagregation-value-id');
    var resultHasLevelTwoDisaggregations = false;

    if (sourcePage.toUpperCase() === FILE_NAME_TARGETS.toUpperCase()) {
        resultHasLevelTwoDisaggregations = j$(parentRow).attr('result-has-disaggregations');
    }
    var rowId = projectIndicatorId;

    if (disaggregationValueId != null) {
        rowId = projectIndicatorId + disaggregationValueId;
    }

    if (inputElementsInQueue[rowId] != undefined && inputElementsInQueue[rowId].length != 0 && inputElementsInQueue[rowId].indexOf(columnHeader) != 0) {
        var currentColumnHeaderIndex = inputElementsInQueue[rowId].indexOf(columnHeader);
        if (currentColumnHeaderIndex < 0) {
            inputElementsInQueue[rowId].push(columnHeader);
        }
    }
    else if(inputElementsInQueue[rowId] == undefined || inputElementsInQueue[rowId].length == 0 || inputElementsInQueue[rowId].indexOf(columnHeader) == 0) {
        inputElementsInQueue[rowId] = [columnHeader];
        columnProcessed = columnHeader;
        if (
            indicatorDataType == INDICATOR_NUMBER_TYPE
            ||
            indicatorDataType == INDICATOR_PERCENT_TYPE
            ||
            indicatorDataType == INDICATOR_CURRENCY_TYPE
        ) {
            if (fieldValue != '') {
                fieldValue = numeral(j$(element).val())["_value"];
            }
        }

        Visualforce.remoting.Manager.invokeAction (
            UPSERT_RESULT,
            projectIndicatorId,
            projectIndicatorReportingPeriodId,
            projectIndicatorGeographicAreaId,
            disaggregationValueId,
            resultHasLevelTwoDisaggregations,
            columnHeader,
            indicatorDataType,
            fieldValue,
            function(result, event) {
                if (event.status) {
                    var elementToRemoveIndex = inputElementsInQueue[rowId].indexOf(columnProcessed);
                    inputElementsInQueue[rowId].splice(elementToRemoveIndex, 1);
                    inputElementsInQueue[rowId].forEach(function(element) {
                        var elementToProcessId = rowId+element;
                        var elementToProcess = j$("[input-id$=" +elementToProcessId+"]");
                        j$(elementToProcess).trigger('change');
                    });
                }
            },
            {escape: true, buffer: true}
        );
    }
}

function showPopup(popupId) {
    j$("[id$='" + popupId + "']").removeClass('noDisplayElement');
}

function showRTFPopUp(element, columnHeader, source) {
    selectedColumnForQualitativeField = columnHeader;
    showPopup('rtfPopUp'+source);
    getRichTextComments(element, columnHeader, source);
}


function getDataTypeSearchString() {
    return j$("[id$=projectIndicatorDataTypeSelected]").val();
}

function getMSPLSearchString(elementId) {
    var selectedLi = j$('#'+elementId).children();
    var searchString = '';
    j$(selectedLi).each(function(index){
        searchString = searchString + j$(this).attr('id') + '|';
    });
    return searchString;
}

function clearFilters() {
    clearDataTypePicklist();
    clearIndicatorTypePicklist();
    clearMSPLFilters('selectedThematicAreas', 'availableThematicAreas');
    clearMSPLFilters('selectedObjectives', 'availableObjectives');
}

function clearDataTypePicklist() {
    j$("[id$=projectIndicatorDataTypeSelected]").val('');
}

function clearIndicatorTypePicklist() {
    j$("[id$=indicatorDataTypeSelected]").val('');
}

function clearMSPLFilters(selectedElementId, availableElementId) {
    var selectedLi = j$('#'+selectedElementId).children();
    var availableULElement = j$('#'+availableElementId);

    j$(selectedLi).each(function(index) {
        j$(availableULElement).append(j$(this));
    });

    searchDatatableByFilters(' ', 2);
}
/*Search Panel*/
function showSearchPanel(elementId, element) {
    j$('#' + elementId).toggle();
    if (j$('#' + elementId).is(':visible')) {
        j$('#' + element).text(HIDE_FILTER);
    }
    else {
        j$('#' + element).text(SHOW_FILTER);
    }
}

function toggleDisplayClass(elementId) {
    j$('#'+elementId).toggleClass('noDisplayElement');
}

/*Needed to add if fixed columns added*/
function setTableContainerWidth() {
    var tableContainerWidth = screen.width - 70;
    j$('#indicatorsTableDiv').css("width",tableContainerWidth);
}

function onChangeArea() {
    var selectedGeoAreaId = j$('#geographyAreaSelect').find(":selected").val();
    j$('[id$=selectGeoId]').val(selectedGeoAreaId);
    onChangeProjectAreaAF();
}

function setTablePadding() {
    j$('.dataTables_scrollHeadInner').css(
        "padding-right", parseInt(j$('.dataTables_scrollHeadInner').css("padding-right"))+1
    );
}

function disableTargetPicklist() {
    j$('.disabledPL').each(function(){
        j$(this).attr('disabled', true);
    });
}

function onSaveRTF(element) {
    qualitativeValue = CKEDITOR.instances['mainPage:mainFrame:editor1'].getData();
    var count = j$(element)[0].dataset.count;

    /*
    * For ST page
    * Variable is used to set value of data tracked on Target type result__c records
    */
    if (areResultsDisaggregatedForTargets) {
        saveRichTextAF(qualitativeValue, count, areResultsDisaggregatedForTargets == "false" ? false : true);
    }
    //For AR page
    else {
        saveRichTextAF(qualitativeValue, count);
    }
}

function hideErrorPanel(errorPanelId) {
    j$('[id$=' + errorPanelId + ']').hide();
}

function initializeCommentsValue() {
    j$('#commentsField').val('');
}

function showLoader() {
    j$('#divProcessing').css('display', 'block');
}


function hideLoader() {
    j$('#divProcessing').css('display', 'none');
}

function showIndicatorsTable() {
    j$('#indicatorsTableDiv').css('visibility','visible');
}

function hideErrorMessagePanel() {
    j$("[id$=minMaxValidationErrorPanel]").addClass('noDisplayElement');
    SHOW_ERROR_PANEL = false;
}

function showPageException(exceptionMsg) {
    j$("[id$=exceptionMsg]").text(GENERIC_EXCEPTION_MSG + ' ' + exceptionMsg);
    j$("[id$=exceptionPanel]").removeClass('noDisplayElement');
}

function addError(headerId) {
    j$('[id$=' + headerId + ']').addClass('slds-theme--error slds-theme--alert-texture');
}

function addErrorMessage(errorMessageHolder, message) {
    j$('[id$=' + errorMessageHolder + ']').text(GENERIC_EXCEPTION_MSG + ' ' + message);
}

function addNotification(errorMessageHolder, message) {
    j$('[id$=' + errorMessageHolder + ']').text(message);
}

function removePopupException(headerId, errorMessageHolderId) {
    j$('[id$=' + headerId + ']').removeClass('slds-theme--error slds-theme--alert-texture');
    j$('[id$=' + errorMessageHolderId + ']').text(' ');
}

function formRegexSearchString() {
    var inputSearchString = j$('[id$=filterSearchInput]').val();
    var indicatorDataType = j$('[id$=projectIndicatorDataTypeSelected]').val();
    var indicatorType = j$('[id$=indicatorDataTypeSelected]').val();
    var thematicMSPLSearchString = getMSPLSearchString('selectedThematicAreas');
    var objectivesMSPLSearchString = getMSPLSearchString('selectedObjectives');

    var regexString = '';
    if (inputSearchString != '') {
        regexString = regexString + '(?=.*'+inputSearchString+')';
    }
    if (indicatorDataType != '') {
        regexString = regexString + '(?=.*DT!'+indicatorDataType+')';
    }
    if (indicatorType != '') {
        regexString = regexString + '(?=.*TY!'+indicatorType+')';
    }
    if (thematicMSPLSearchString != '') {
        thematicMSPLSearchString = thematicMSPLSearchString.replace(/.$/,'');
        regexString = regexString + '(?=.*('+thematicMSPLSearchString+'))';
    }
    if (objectivesMSPLSearchString != '') {
        objectivesMSPLSearchString = objectivesMSPLSearchString.replace(/.$/,'');
        regexString = regexString + '(?=.*('+objectivesMSPLSearchString+'))';
    }
    return regexString;
}

function applySearchFilters() {
    var regexString = formRegexSearchString();
    mainDataTable.columns(2).search(regexString , true, false, true).draw();
}

function generateFileData(fileFormat,projectId,projectName,reportingPeriodId,geographicAreaId) {
    var filteredProjectIndicators = [];
    j$('.parentRow').each(function(index) {
        filteredProjectIndicators.push(j$(this).attr('record-id'));
    });
    showLoader();
    Visualforce.remoting.Manager.invokeAction (
        GENERATE_FILE_DATA,
        fileFormat,
        projectId,
        projectName,
        reportingPeriodId,
        geographicAreaId,
        filteredProjectIndicators,
        function(result, event) {
            if (event.status) {
                if (result.showNotification) {
                    hideLoader();
                    addError('generateExcelHeader');
                    addNotification('generateExcelError', EXCEL_ERROR);
                }
                else {
                    downloadFile(result, fileFormat);
                }
            }
            else {
                hideLoader();
                addError('generateExcelHeader');
                addErrorMessage('generateExcelError', event.message);
            }
        },
        {escape: false, timeout: 120000}
    );
}

function clearCommentsPopoverArray() {
    projectIndicatorCommentId = [];
}

function getDataForComments(hasChildRows, element) {
    var selectedRow;
    var disaggregationValueId = '';
    var projectIndicatorId = '';
    var projectIndicatorReportingPeriodId = '';
    var projectIndicatorGeographicAreaId = '';
    var resultComments = '';

    selectedRowIdForComments = j$(element).closest('.targetResultTable').closest('tr').attr('record-id');
    if (hasChildRows == 'false') {
        selectedRow = j$(element).closest('.targetResultTable').closest('tr');
    }
    else {
        selectedRow = j$('.'+selectedRowIdForComments+'disaggregations:first');
        disaggregationValueId = j$(selectedRow).attr('disagregation-value-id');
    }

    if (j$(selectedRow).attr('project-indicator-id') != undefined) {
        projectIndicatorId = j$(selectedRow).attr('project-indicator-id');
    }
    if (j$(selectedRow).attr('project-indicator-rp-id') != undefined) {
        projectIndicatorReportingPeriodId = j$(selectedRow).attr('project-indicator-rp-id');
    }
    if (j$(selectedRow).attr('project-indicator-ga-id') != undefined) {
        projectIndicatorGeographicAreaId = j$(selectedRow).attr('project-indicator-ga-id');
    }

    var commentsData = {
        selectedRow : selectedRow,
        disaggregationValueId : disaggregationValueId,
        projectIndicatorId : projectIndicatorId,
        projectIndicatorReportingPeriodId : projectIndicatorReportingPeriodId,
        projectIndicatorGeographicAreaId : projectIndicatorGeographicAreaId
    };

    return commentsData;
}

function onSubmit(hasReportingPeriod, hasGeographicArea) {
    if ((hasReportingPeriod == 'true') && (hasGeographicArea == 'true')) {
        submitForReview();
    }
    else {
        addError('submitErrorHeader');
        addErrorMessage('submitErrorText', NO_RP_AND_GA_FOR_SUBMIT);
    }
    return false;
}

function showUploadDocumentsPopup(hasReportingPeriod, hasGeographicArea) {
    showPopup('chatterFeedPopup');
    if ((hasReportingPeriod != 'true') || (hasGeographicArea != 'true')) {
        addError('uploadHeaderError');
        addErrorMessage('uploadErrorText', NO_RP_AND_GA_FOR_UPLOAD);
    }
}

function setQualitativeIconId(element) {
    qualitativeIconId = j$(element).attr('icon-id');
}

function toggleNewAndEditIcons() {
    if (qualitativeValue == '') {
        j$('#'+qualitativeIconId+'new').removeClass('noDisplayElement');
        j$('#'+qualitativeIconId+'edit').addClass('noDisplayElement');
    }
    else if (qualitativeValue != '') {
        j$('#'+qualitativeIconId+'new').addClass('noDisplayElement');
        j$('#'+qualitativeIconId+'edit').removeClass('noDisplayElement');
    }
}

function setHeaderValue(elementId, element) {
    var parentRow = j$(element).parents('tr')[1];
    var projectIndicatorDescription = j$(parentRow).attr('projectIndicator-description');
    j$('#'+elementId).text(projectIndicatorDescription);
    j$('#'+elementId).attr('title', projectIndicatorDescription);
}

function setResultDisaggregationValue(element) {
    var parentRow = j$(element).parents('tr')[1];
    areResultsDisaggregatedForTargets = j$(parentRow).attr('result-has-disaggregations');
}

function unformatAllValues() {
    j$('.inputValues').each(function(){
        if (j$(this).val() != '') {
            j$(this).val(+numeral(j$(this).val())["_value"]);
        }
    });
}

function showUploadModalOnReportPeriodUnlocked() {
    var response = false;
    if(IS_REPORTING_PERIOD_LOCKED == 'true') {
        response = false;
    }
    else {
        resetUploadExcelPopup();
        showPopup('uploadExcelPopup');
        response = true;
    }
    return response;
}

function setCountValue(elementId, element) {
    var parentRow = j$(element).parents('tr')[1];
    var count = j$(parentRow).attr('indicatorRowId');
    count = count.substring(4, count.length);
    j$('#'+elementId).attr('data-count', count);
}

function setScrollToTopIconPosition() {
    j$('#filterListButton').click(function () {
        var val = j$('.dataTables_scrollBody').offset().top+270;
        j$('#return-to-top').css('top' , val);
    });

    j$('#hideFeedLink').click(function () {
        resetScrollTopIconPositionOnChatterToggle(270);
    });

    j$('#showFeedLink').click(function () {
        if (isTargetPage) {
            resetScrollTopIconPositionOnChatterToggle(100);
        }
        else {
            resetScrollTopIconPositionOnChatterToggle(50);
        }
    });
}

function resetScrollTopIconPositionOnChatterToggle(extraHeight) {
    j$('#return-to-top').css('display', 'none');
    setTimeout ( function () {
        var totalTop =
            j$('.dataTables_scrollBody').offset().top+j$('#chatterfeedshell').height()+extraHeight;
        j$('#return-to-top').css('top' , totalTop);
        j$('#return-to-top').css('display', 'block');;
    }, 2000);
}


/*function setProgress(projectIndicatorCount, valueCount, page) {
    if (
            projectIndicatorCount != null && valueCount != null &&
            projectIndicatorCount != 0 && valueCount != 0
    ) {
        var percent = ((valueCount/projectIndicatorCount)*100)+'%';
        j$('#progressBarTotalValue').prop(
            'title',
            PROJECT_INDICATOR_COUNT+': '+projectIndicatorCount
        );
        j$('#progressBarValue').css('width', percent);
        if(page == FILE_NAME_RESULTS) {
            j$('#progressBarValue').prop('title', RESULT_COUNT+': '+valueCount);
        }else {
            j$('#progressBarValue').prop('title', TARGET_COUNT+': '+valueCount);
        }
        j$('#progressBarDiv').removeClass('displayNone');
    }
    else if (
            (valueCount == null || valueCount == 0) &&
            (projectIndicatorCount != null && projectIndicatorCount != 0)
    ) {
        j$('#progressBarValue').css('width', '0');
        j$('#progressBarTotalValue').prop(
            'title',
            PROJECT_INDICATOR_COUNT+': '+projectIndicatorCount
        );
        j$('#progressBarDiv').removeClass('displayNone');
    }
}*/