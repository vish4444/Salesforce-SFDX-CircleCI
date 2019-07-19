var dateFormat;
var expandedChevrons = [];
var collapsedChevrons = [];

function inithelpers() {
    initNumeralHelpers();
    dateFormat = getDateFormat(userLocale);
    setFocusOnLoad();
    getAreaSelectOption();
    setPageWidth();
    setTablePadding();
    disableTargetPicklist();
    initALJS();
    initPopover();
    isSubmitLocked();
    calculateTotalTargetValues();
    initializeResultHelpers();
    scrollToTop(500, 200);
}

function onCompleteRerender() {
    setPageWidth();
    isSubmitLocked();
    calculateTotalTargetValues();
    setFocusOnLoad();
    initDataTables();
    setTablePadding();
    disableTargetPicklist();
    initALJS();
    initPopover();
    formatNumbersOnLoad();
    initializeResultHelpers();
    //initProgressBar();//Call Progress bar method
    setTableStyle();
    showIndicatorsTable();
    setScrollToTopIconPosition();
    scrollToTop(500, 200);
    clearCommentsPopoverArray();
    disableTabOnLastInputField();
}

function setPageWidth() {
    var widthToReduce = 70;
    //If lighning not enabled, we need to set width for div of the table, or else scroll is
    //added to page. And this width is being set according to different screen sizes.
    if (!isLightningEnabled()) {
        var tableContainerWidth = screen.width - widthToReduce;
        j$('#indicatorsTableDiv').css("width",tableContainerWidth);
    }
}

function initDataTables() {

    var fixedColumns = 0;

    if (j$('[id$="hasGenderDisagg"]')[0].value == 'true') {
        fixedColumns = 2;
    }

    mainDataTable = j$('#indicatorsTable').DataTable( {
        "scrollY": "350px",
        "scrollX": true,
        "paging": false,
        "ordering": false,
        "info": false,
        "retrieve" : true,
        "autoWidth": false,
        "scrollCollapse": true,
        "sDom": '...t.p.',
        "oLanguage": {
          "sZeroRecords": NO_INDICATORS_FOUND,
          "sInfoEmpty": NO_INDICATORS_FOUND
        },
        "fixedColumns": {
            leftColumns: fixedColumns
        }
    });
}

function initializeResultHelpers() {
    initializeDatepicker();
    if (IS_STOP_LIGHT_ENABLED == 'true') {
        initializeStopLights();
    }
}

function initializeDatepicker() {
    j$('#currentAsOfDateValue').datepicker({
        numYearsBefore: 76,
        numYearsAfter: 10,
        onChange: function(datepicker) {
            var selectedDate = datepicker.selectedFullDate._i;
            var selectedInputHiddenVal = moment(selectedDate).format(dateFormat);
            j$('#currentAsOfDateValue').val(selectedInputHiddenVal);
        }
    });
}

function getAreaSelectOption() {
    Visualforce.remoting.Manager.invokeAction (
        GET_GEOGRAPHIC_AREAS,
        SELECTED_PROJECT_ID,
        function(result, event) {
            if (event.status)
            {
                var geographyAreaPicklistHtml;

                if (result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].disabled) {
                            geographyAreaPicklistHtml = geographyAreaPicklistHtml +'<option value="'+result[i].key+'" disabled>'+
                                                     result[i].label
                                                    +'</option>';
                        }
                        else {
                            geographyAreaPicklistHtml = geographyAreaPicklistHtml +
                                                    '<option value="'+result[i].key+'">'+
                                                     result[i].label
                                                    +'</option>';
                        }
                    }
                    geographyAreaPicklistHtml = geographyAreaPicklistHtml + '</select>';
                    j$('#geographyAreaSelect').append(geographyAreaPicklistHtml);
                    var initialGeoAreaId = j$('[id$=selectGeoId]').val();
                    if (initialGeoAreaId != undefined && initialGeoAreaId != '') {
                        j$('#geographyAreaSelect').val(initialGeoAreaId);
                    }
                    j$('#geographyAreaSelect').trigger('change');
                }
                else {
                    hideLoader();
                    showIndicatorsTable();
                }
            }
            else {
                showPageException(event.message);
            }
        },
        {escape: true}
    );
}

function showCommentsPopUp(result, event) {
    if (event.status) {
        var resultComments = result;
        var resultDate = '';
        var comments = '';

         //Get comments and Result current as of date
        for (var property in result) {
            if (property.includes('Comments__c')) {
                comments = result[property];
            }
            if (property.includes('Results_Current_As_Of__c')) {
                resultDate = result[property];
            }
        }

        j$('#commentsField').val(comments);
        var formattedDate = '';
        if (resultDate != undefined && resultDate != '') {
            formattedDate = moment.utc(resultDate).format(dateFormat);
        }
        j$('#currentAsOfDateValue').val(formattedDate);

        hideLoader();
        showPopup('commentsPopUp');
    }
    else {
        hideLoader();
        showPageException(event.message);
    }
}

function upsertResultComment() {
    showLoader();
    var hasChildDisaggregations = false;
    var disaggregationValueId = [];
    var projectIndicatorId = '';
    var projectIndicatorReportingPeriodId = '';
    var projectIndicatorGeographicAreaId = '';

    var commentValue = j$('#commentsField').val();
    var dateValue = j$('#currentAsOfDateValue').val();
    var parentRow = j$("[record-id=" +selectedRowIdForComments+"]");
    var selectorRow = parentRow;

    if (parentRow.attr('has-disaggregations') == 'true') {
        hasChildDisaggregations = true;
        j$('.'+selectedRowIdForComments+'disaggregations').each(function(){
            disaggregationValueId.push(j$(this).attr('disagregation-value-id'));
        });

        selectorRow = j$('.'+selectedRowIdForComments+'disaggregations:first');
    }

    if (j$(selectorRow).attr('project-indicator-id') != undefined) {
        projectIndicatorId = j$(selectorRow).attr('project-indicator-id');
    }
    if (j$(selectorRow).attr('project-indicator-rp-id') != undefined) {
        projectIndicatorReportingPeriodId = j$(selectorRow).attr('project-indicator-rp-id');
    }
    if (j$(selectorRow).attr('project-indicator-ga-id') != undefined) {
        projectIndicatorGeographicAreaId = j$(selectorRow).attr('project-indicator-ga-id');
    }

    Visualforce.remoting.Manager.invokeAction (
        UPSERT_RESULT_COMMENTS,
        projectIndicatorId,
        projectIndicatorReportingPeriodId,
        projectIndicatorGeographicAreaId,
        disaggregationValueId,
        hasChildDisaggregations,
        commentValue,
        dateValue,
        function(result, event) {
            if (event.status) {
                hideLoader();
                closePopup('commentsPopUp');
            }
            else {
                hideLoader();
                addError('commentsHeader');
                addErrorMessage('commentHeaderError', event.message);
            }
        },
        {escape: false}
    );
}

function initializeStopLights() {
    j$('.stopLightsCell').each(function(index){
        showStopLight(j$(this));
    });
}

function showStopLight(element) {
    var percentage;
    var targetValue;
    var resultValue;

    var minThreshold = j$(element).attr('min-threshold');
    var maxThreshold = j$(element).attr('max-threshold');

    if (minThreshold != '' && maxThreshold != '') {
        targetValue = j$(element).find('.targetValue').text();
        if (j$(element).attr('data-type') == INDICATOR_PERCENT_TYPE) {
            targetValue = targetValue.replace('%','');
        }
        else if (j$(element).attr('data-type') == INDICATOR_CURRENCY_TYPE) {
            targetValue = targetValue.replace(j$(element).attr('currency-code'),'');
        }
        targetValue = targetValue.trim();

        if (j$(element).find('.resultValue').is( "input" )) {
            if (j$(element).find('.resultValue').val().trim() != '') {
                resultValue = numeral(j$(element).find('.resultValue').val())["_value"];
            }
        }
        else {
            resultValue = j$(element).find('.resultValue').text();
            if (j$(element).attr('data-type') == INDICATOR_PERCENT_TYPE) {
                resultValue = resultValue.replace('%','');
            }
            else if (j$(element).attr('data-type') == INDICATOR_CURRENCY_TYPE) {
                resultValue = resultValue.replace(j$(element).attr('currency-code'),'');
            }
            resultValue = resultValue.trim();
            if (resultValue.includes('M')|| resultValue.includes('B') || resultValue.includes('T')) {
                resultValue = numeral(j$(element).find('.resultValue').attr('unformatted-value'))["_value"];
            }
            else {
                if (resultValue != '') {
                    resultValue = numeral(resultValue)["_value"];
                }
            }
        }


        if (targetValue != '') {
            if (targetValue.includes('M') || targetValue.includes('B') || targetValue.includes('T')) {
                targetValue = numeral(j$(element).find('.targetValue').attr('unformatted-value'))["_value"];
            }
            else {
                targetValue = numeral(targetValue)["_value"];
            }
        }

        var aim = j$(element).attr('indicator-aim');

        if (resultValue !== '' && resultValue != undefined && targetValue != '' && targetValue != undefined && aim != '') {
            percentage = calculatePercentage(resultValue, targetValue, aim);
            var projectIndicatorId = j$(element).attr('project-indicator-stoplight-id');
            if (percentage < minThreshold) {
                j$('.'+projectIndicatorId+'redStopLight').removeClass('noDisplayElement');
            }
            else if (percentage >= maxThreshold) {
                j$('.'+projectIndicatorId+'greenStopLight').removeClass('noDisplayElement');
            }
            else {
                j$('.'+projectIndicatorId+'yellowStopLight').removeClass('noDisplayElement');
            }
        }
    }
}

function calculatePercentage(resultValue, targetValue, indicatorAim) {
    var percentage;

    if (indicatorAim == INDICATOR_AIM_INCREASE) {
        percentage = calculatePercentageForIncrease(resultValue, targetValue);
    }
    else if (indicatorAim == INDICATOR_AIM_DECREASE) {
        percentage = calculatePercentageForDecrease(resultValue, targetValue);
    }
    return percentage;
}

function calculatePercentageForIncrease(resultValue, targetValue) {
    return (resultValue/targetValue)*100;
}

function calculatePercentageForDecrease(resultValue, targetValue) {
    var percentage = ((targetValue - resultValue)/targetValue)*100;
    percentage = percentage + 100;
    return percentage;
}

function hideAllStopLights(projectIndicatorId) {
    j$('.'+projectIndicatorId+'yellowStopLight').addClass('noDisplayElement');
    j$('.'+projectIndicatorId+'redStopLight').addClass('noDisplayElement');
    j$('.'+projectIndicatorId+'greenStopLight').addClass('noDisplayElement');
}

function updateStopLight(projectIndicatorId) {
    if (IS_STOP_LIGHT_ENABLED == 'true') {
        var element = j$("[project-indicator-stoplight-id=" +projectIndicatorId+"]");
        hideAllStopLights(projectIndicatorId);
        showStopLight(element);
    }
}

function calculateTotalTargetValues() {
    if (IS_REPORTING_PERIOD_LOCKED == 'false') {
        calculateTargetTotalForChildRow();
        calculateTargetTotalForColumns();
    }

}

function calculateTargetTotalForChildRow() {
    j$('.rowTotalOutput').each(function(index) {
        var uniqueRowId = j$(this).attr('unique-row-id').replace('Total','');
        var total = 0;
        var childHasValues = false;
        var decimalPlaces = j$(this).attr('decimalPlaces');

        (j$("[unique-row-id=" +uniqueRowId+"]")).each(function( index ) {
            if (j$(this).text().trim() != '') {
                childHasValues = true;
                total = +total +( +numeral(j$(this).text())["_input"]);
            }
        });
        if (childHasValues) {
            j$(this).html(total);
            j$(this).attr('unformatted-value', total);
            formatOutputNumber(j$(this), decimalPlaces);
        }
    });
}

function calculateTargetTotalForColumns() {
    j$('.columnTotalOutput').each(function(index) {
        var uniqueColumnId = j$(this).attr('unique-column-id').replace('Total','');
        var total = 0;
        var childHasValues = false;
        var decimalPlaces = j$(this).attr('decimalPlaces');

        (j$("[unique-column-id=" +uniqueColumnId+"]")).each(function( index ) {
            if (j$(this).text().trim() != '') {
                childHasValues = true;
                total = +total +( +numeral(j$(this).text())["_input"]);
            }
        });
        if (childHasValues) {
            j$(this).html(total);
            j$(this).attr('unformatted-value', total);
            formatOutputNumber(j$(this), decimalPlaces);
        }
    });
}

function initialisePopover(element) {
    var popoverId = j$(element).find('svg').attr('data-aljs-show');
    if (popoverInitialized.indexOf(popoverId) < 0) {
        popoverInitialized.push(j$(element).find('svg').attr('data-aljs-show'));
    }
    j$(element).find('svg').popover();
}

function clearArray() {
    popoverInitialized = [];
}

function addHover(element, parentChildRow) {
    var selectedRowId = j$(element).parent('tr').attr('hover-id');
    j$("." + parentChildRow + "[hover-id=" +selectedRowId+"]").each(function() {
        j$(this).find("td").each(function() {
            j$(this).css('background-color', '#f4f6f9');
        });
    });
}

function removeHover(element, parentChildRow) {
    var selectedRowId = j$(element).parent('tr').attr('hover-id');
    j$("." + parentChildRow + "[hover-id=" +selectedRowId+"]").each(function() {
        j$(this).find("td").each(function() {
            j$(this).css('background-color', '');
        });
    });
}

function isLightningEnabled() {
    return((typeof sforce != 'undefined') && sforce && (!!sforce.one));
}

function setUserLocaleDateFormat() {
    j$("[id*='dateFormatValue']").html('&nbsp'+getDateFormat(userLocale)+':')
}

//To stop the table mis-alignment
function disableTabOnLastInputField() {
    j$('.resultInput:last').on('keydown', function(event) {
        if (event.keyCode == 9) {   //tab pressed
            event.preventDefault(); // stops its action
        }
    });
}

// Progress bar method
/*function initProgressBar() {
    var reportingPeriodId = j$('#reportingPeriodDiv :selected').val();
    if (reportingPeriodId != null && reportingPeriodId != undefined) {
        Visualforce.remoting.Manager.invokeAction (
            GET_COUNT_VALUES,
            reportingPeriodId,
            function(result, event) {
                if (event.status) {
                    if (result != null) {
                        setProgress(
                            result[PROJECT_INDICATOR_COUNT_FIELD],
                            result[RESULT_COUNT_FIELD],
                            sourcePage
                        );
                    }
                }
                else {
                    showPageException(event.message);
                }
            },
            {escape: false, timeout: 120000}
        );
    }
}*/

function setTableStyle() {

    if (
            j$('[id$="hasGenderDisagg"]')[0].value == 'false' &&
            DISPLAY_TARGETS == 'false'
    ) {
        j$('.resultColumnPadding').css('width', '14rem');
        j$('.infoPopoverIconColumn').addClass('infoPopoverIconColumnWithNoDisaggregation');
        j$('.infoPopoverIconColumnWithNoDisaggregation').removeClass('infoPopoverIconColumn');
        j$('.dataTables_scrollBody').addClass('dataTableScrollBodyWhenNoDisaggregationBySex');
    }
    else if (
            j$('[id$="hasGenderDisagg"]')[0].value == 'false' &&
            DISPLAY_TARGETS == 'true'
    ) {
        j$('.dataTables_scrollBody').addClass('dataTableScrollBodyWhenNoDisaggregationBySex');
        j$('#totalColumnHeaderDiv').css('margin-right', '25%');
        j$('.totalResultColumnHeader').css('padding-left', '52%');
    }
    else if (
            j$('[id$="hasGenderDisagg"]')[0].value == 'true' &&
            DISPLAY_TARGETS == 'true'
    ) {
        j$('#totalColumnHeaderDiv').css('margin-right', '25%');
        j$('.totalResultColumnHeader').css('padding-left', '48%');
    }
    else if (
            j$('[id$="hasGenderDisagg"]')[0].value == 'true' &&
            DISPLAY_TARGETS == 'false'
    ) {
        j$('.totalColumnWithoutTarget .resultColumnPadding').addClass(
            'totalColumnPaddingWhenCrossDisaggregatedBySex'
        );
        j$('.totalColumnPaddingWhenCrossDisaggregatedBySex').removeClass('resultColumnPadding');
    }

    var parentWidth = j$('.DTFC_LeftBodyWrapper').width();
    j$('.DTFC_LeftBodyLiner').css("max-width", parentWidth);
}

function setChevrons(elementId) {
    if (
            j$('[id$="hasGenderDisagg"]')[0].value == 'true' &&
            DISPLAY_TARGETS == 'true'
    ) {
        var chevronType = (elementId).split('~')[1];
        var projectIndicatorId = (elementId).split('~')[0];
        if (chevronType === 'expand') {
            pushToExpandedChevronsArray(projectIndicatorId);
            popFromCollapsedChevronsArray(projectIndicatorId)
        }
        else if (chevronType === 'collapse') {
            pushToCollapsedChevronsArray(projectIndicatorId);
            popFromExpandedChevronsArray(projectIndicatorId)
        }
    }
}

function pushToExpandedChevronsArray(elementId) {
    expandedChevrons.push(elementId);
}

function pushToCollapsedChevronsArray(elementId) {
    collapsedChevrons.push(elementId);
}

function popFromExpandedChevronsArray(elementId) {
    var index = expandedChevrons.indexOf(elementId);
    if (index > -1) {
      expandedChevrons.splice(index, 1);
    }
}

function popFromCollapsedChevronsArray(elementId) {
    var index = collapsedChevrons.indexOf(elementId);
    if (index > -1) {
      collapsedChevrons.splice(index, 1);
    }
}

function displayChevrons() {
    if (
            j$('[id$="hasGenderDisagg"]')[0].value == 'true' &&
            DISPLAY_TARGETS == 'true'
    ) {
        for (var i = 0; i < expandedChevrons.length; i++) {
            j$('[id$="'+expandedChevrons[i]+'~collapse"]').css('display','block');
            j$('[id$="'+expandedChevrons[i]+'~expand"]').css('display','none');
        }

        for (var i = 0; i < collapsedChevrons.length; i++) {
            j$('[id$="'+collapsedChevrons[i]+'~collapse"]').css('display','none');
            j$('[id$="'+collapsedChevrons[i]+'~expand"]').css('display','block');
        }
        expandedChevrons=[];
        collapsedChevrons=[];
    }
}