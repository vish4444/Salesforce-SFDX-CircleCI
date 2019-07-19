    var dateChangedManually = false;
    var dateFormat;
    var table;
    function onEdit() {
        initializeLookup();
        initializeDatepicker();
        setDate();
        getSavedValues();
    }

    function initializeDateFormat() {
        dateFormat = getDateFormat(userLocale);
    }
    function initialize() {
        console.log('========');
        initializeSorting();
        initializeALJSComponents();
    }

    function initializeALJSComponents() {
        initALJS();
        initializeLookup();
        initializeDatepicker();
    }

    /**
    Initialize ALJS
    */
    function initALJS() {
        j$.aljsInit({
            assetsLocation: assetsLocation,
            scoped: true
        });
    }

    /*
        Functions for Tabs
    */
    function selectTab(element) {
        deactivateAllTabs();
        hideAllContents();
        activateSelectedTab(element);
        showContent(element);
    }

    //Deactivating all tabs by removing active class
    function deactivateAllTabs() {
        j$('.slds-tabs--scoped').find('li').each(function() {
            j$(this).removeClass('slds-active');
        });
    }

    // Hiding contents of tabs
    function hideAllContents() {
        j$('.slds-tabs--scoped').find('div[role=tabpanel]').each(function() {
            j$(this).removeClass('slds-show');
            j$(this).addClass('slds-hide');
        });
    }

    //Activating the selected tab
    function activateSelectedTab(element) {
        var tabToActivate = j$(element).attr('aria-controls');
        j$("li[tabId='" + tabToActivate + "']").addClass('slds-active');
    }

    //Showing content of the selected tab
    function showContent(element) {
        var tabToActivate = j$(element).attr('aria-controls');
        j$('#' + tabToActivate).addClass('slds-show');
    }

    //Checking if Error Occurred in Apex and flagging it on Pop up
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

    /*
        Function for Popups
    */
    function hideModal(elementId, childElementId) {
        j$('[id$=' + elementId + ']').hide();
        j$('[id$=' + childElementId + ']').hide();
    }

    function showModal(elementId, childElementId) {
        j$('[id$=' + elementId + ']').show();
        j$('[id$=' + childElementId + ']').show();
    }

    // Adding commment to the Text area for a Project Indicator
    function addComment(elementId, childElementId, recordId) {
        var comment = j$('#' + recordId + 'comment').text().trim();
        var textArea = j$('[id$=' + elementId + ']').find('[id$=' + childElementId + ']').find('.commentBox');
        j$(textArea).attr('comment-id', recordId + 'comment');
        j$(textArea).attr('record-id', recordId);
        j$(textArea).val(comment);
        removeError('commentHeader');
        removeErrorMessage('commentHeaderError');
    }

    // Removing unsaved comment
    function cancelComment(elementId, childElementId) {
        var textArea = j$('[id$=' + elementId + ']').find('[id$=' + childElementId + ']').find('.commentBox');
        var commentSource = j$(textArea).attr('comment-id');
        var comment = j$('#' + commentSource).text().trim();
        j$('input[comment-id=' + commentSource + ']').val(comment);
        removeErrorMessage('commentHeaderError');
        clearProjectIndicatorId(textArea);
    }

    // Saving comment to Project Indicator
    function saveComment(elementId, childElementId) {
        var textArea = j$('[id$=' + elementId + ']').find('[id$=' + childElementId + ']').find('.commentBox');
        var commentSource = j$(textArea).attr('comment-id');
        var recordId = j$(textArea).attr('record-id');
        var comment = j$(textArea).val();
        saveCommentToIndicator(comment, recordId, commentSource);
        clearProjectIndicatorId(textArea);
    }

    // Method called from saveComment
    function saveCommentToIndicator(notes, recordId, commentSource) {
        Visualforce.remoting.Manager.invokeAction(
            SAVE_COMMENTS,
            recordId,
            notes,
            function(result, event){
                if (event.status) {
                    isSuccess = event.status;
                    j$('#' + commentSource).text(notes);
                    hideModal('commentModalContainer', 'commentModal');
                }
                else {
                    addError('commentHeader');
                    addErrorMessage('commentHeaderError', ERRORMESSAGEEXCEPTION + event.message);
                }
            },
            {escape: false}
        );
    }


    // Method called from saveComment
    function clearProjectIndicatorId(textArea) {
        j$(textArea).attr('record-id', '');
    }


    function addProjectIndicatorId(deletePanelId, triggerDelete, recordId) {
        var button = j$('#' + deletePanelId).find('.' + triggerDelete);
        j$(button).attr('record-id', recordId);
    }

    // Delete a Project Indicator record
    function deleteProjectIndicator(element) {
        var button = j$(element);
        var recordId = j$(button).attr('record-id');
        Visualforce.remoting.Manager.invokeAction(
            DELETE_INDICATOR,
            recordId,
            function(result, event){
                if (event.status) {
                    afterSuccessfulDelete();
                }
                else {
                    addError('deleteHeader');
                    addErrorMessage('deleteHeaderError', ERRORMESSAGEEXCEPTION + event.message);
                }
            },
            {escape: false}
        );
    }


    // Adding Error class to Popup header when error occures
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

    /*Search Panel*/
    function showSearchPanel(elementId, element) {
        j$('#' + elementId).toggle();
        if (j$('#' + elementId).is(':visible')) {
            j$(element).find('span').text(HIDE_FILTER);
        }
        else {
            j$(element).find('span').text(SHOW_FILTER);
        }
    }

    /*
    function to select all indicators
    */
    function toggleCheckBoxes(elementState, className) {
        var status = j$(elementState).prop('checked');
        j$('.' + className).each(function(){
            j$(this).prop('checked', status);
        });
    }

    /*
        Table Sorter
    */
    function initializeSorting() {
        j$.fn.dataTableExt.oStdClasses['sPageButton'] = 'slds-button slds-button--neutral';
        j$.fn.dataTableExt.oStdClasses['sPageButtonActive'] = 'selectedButtonPagination';
        table = j$('.addSorter').dataTable({
            'order' : [],
            'paging' : true,
            'pagingType' : 'full_numbers',
            'info' : false,
            'retrieve' : true,
            'autoWidth': false,
            'pageLength' : 10,
            'sDom' : '...t.p.',
            'columnDefs' : [{
                'targets'  : 'sorter-false',
                'orderable' : false,
            }],
            'stateSave': true,
            "oLanguage": {
                "sEmptyTable": NO_DATA_AVAILABLE
            }
        }).api();
    }

    function hotSearch(tableId, element) {
        var searchContent = j$(element).val();
        drawTable(tableId, searchContent.trim());
    }

    function searchRecordsByFilter(tableId, mspl, dataType, area, inputElement) {
        var searchString = '';
        var searchInput = getInputSearchString(inputElement);
        var type = getDataTypeSearchstring(dataType);
        var geoArea = getGeoAreaSearchString(area);
        var msplValue = getMSPLSearchString(mspl);
        if (searchInput != '') {
            searchString += '(?=.*' + searchInput + ')';
        }
        if (type != '') {
            searchString += '(?=.*DT!' + type + ')';
        }
        if (geoArea != '') {
            searchString += '(?=.*GD!' + geoArea + ')';
        }
        if (msplValue != '') {
            searchString += '(?=.*(' + msplValue + '))';
        }
        drawTable(tableId, searchString.trim());
    }

    function getMSPLSearchString(mspl) {
        var searchString = '';
        var msplArray = j$('input[hiddenid=' + mspl + ']').val().split(';');
        j$.each(msplArray, function(index, value) {
            searchString += (searchString == '' ? '' : '|') + value;
        });
        return searchString;
    }

    function getDataTypeSearchstring(dataType) {
        var typeValue = j$('[id$=' + dataType + ']').val();
        return typeValue;
    }

    function getGeoAreaSearchString(area) {
        var geoArea = j$('[id$=' + area + ']').val();
        return geoArea;
    }

    function getInputSearchString(inputElement) {
        var searchContent = j$('input[id$=' + inputElement + ']').val();
        return searchContent;
    }

    function clearFilters(tableId, dataType, area, selectedElementId, availableElementId) {
        clearPicklist(dataType);
        clearPicklist(area);
        clearMSPLFilters(selectedElementId, availableElementId);
        drawTable(tableId, '');
    }

    function drawTable(tableId, searchContent) {
        j$('#' + tableId).DataTable().columns([0]).search(searchContent, true, false, true).draw();
    }

    function clearPicklist(picklist) {
        j$('[id$=' + picklist + ']').val('');
    }

    function clearMSPLFilters(selectedElementId, availableElementId) {
        var selectedLi = j$('#'+selectedElementId).children();
        var availableULElement = j$('#'+availableElementId);
        j$(selectedLi).each(function(index) {
            j$(availableULElement).append(j$(this));
        });
        j$('input[hiddenid=' + selectedElementId + ']').val('');
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
        }
        else {
            j$('input[related-data=' + hiddenlookupElementId + ']').val('');
        }
    }

    /*date picker*/
    function initializeDatepicker() {
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

    function disableRunBatchIcon(elementId) {
        j$('#' + elementId).find('a').addClass('disableCursor');
        j$('#' + elementId).find('a').find('.slds-icon').attr('class', 'slds-icon slds-icon-text-default iconSize disableIcon');
        j$('#' + elementId).prop('title', IN_PROGRESS);
    }

    //Streaming API
    function loadCometD() {
        j$.cometd.init({
            url: URL,
            requestHeaders: {Authorization: 'OAuth ' + SESSION_ID},
            appendMessageTypeToURL : false
        });
        // Subscribe to a topic. JSON-encoded update will be returned in the callback
        j$.cometd.subscribe('/topic/AggregateCalculateUpdate', function(message) {
            j$('#' + message.data.sobject.Id).find('a').removeClass('disableCursor');
            j$('#' + message.data.sobject.Id).find('a').find('.slds-icon').attr('class', 'slds-icon slds-icon-text-default iconSize');
            j$('#' + message.data.sobject.Id).prop('title', REFRESH);
        });
    }

    function loadCurrentURL() {
        if ('{!$User.UIThemeDisplayed}' === 'Theme4d') {
            URL = '/cometd/42.0';
        }
        else {
            URL = window.location.protocol + '//' + window.location.hostname +'/cometd/42.0/';
        }
    }

    function onBeforeUnload() {
        j$(window).on('beforeunload', function(){
            disconnect();
            clearTable();
        });
    }

    function disconnect() {
       j$.cometd.disconnect();
    }

    function clearTable() {
        table.clear();
        table.state.clear();
    }