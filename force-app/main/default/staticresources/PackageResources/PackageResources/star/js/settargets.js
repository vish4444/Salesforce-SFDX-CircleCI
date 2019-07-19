function inithelpers() {
    //initProgressBar(); //Call Progress bar method
    initNumeralHelpers();
    setFocusOnLoad();
    initDataTables();
    setTablePadding();
    getAreaSelectOption();
    disableTargetPicklist();
    initALJS();
    initPopover();
    scrollToTop(500, 200);
}

function onCompleteRerender() {
    isSubmitLocked();
    initDataTables();
    setTablePadding();
    setFocusOnLoad();
    disableTargetPicklist();
    initALJS();
    initPopover();
    formatNumbersOnLoad();
    showIndicatorsTable();
    scrollToTop(500, 200);
    setScrollToTopIconPosition();
    clearCommentsPopoverArray();
}

function initDataTables() {
    mainDataTable = j$('#indicatorsTable').DataTable( {
        "scrollY": "350px",
        "scrollX": true,
        "paging":   false,
        "ordering": false,
        "info":     false,
        "retrieve" : true,
        "autoWidth": false,
        "sDom": '...t...',
        "oLanguage": {
          "sZeroRecords": NO_INDICATORS_FOUND,
          "sInfoEmpty": NO_INDICATORS_FOUND
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
                            geographyAreaPicklistHtml = geographyAreaPicklistHtml + '<option value="'+result[i].key+'" disabled>'+
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
        var comments = '';

        //Get comments and Result current as of date
        for (var property in result) {
            if (property.includes('Comments__c')) {
                comments = result[property];
            }
        }

        j$('#commentsField').val(comments);

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
    var disaggregationValueId = [];
    var projectIndicatorId = '';
    var projectIndicatorReportingPeriodId = '';
    var projectIndicatorGeographicAreaId = '';

    var commentValue = j$('#commentsField').val();
    var parentRow = j$("[record-id=" +selectedRowIdForComments+"]");
    var selectorRow = parentRow;
    var resultHasLevelTwoDisaggregations = false;

    if (j$('.'+selectedRowIdForComments+'disaggregations').length > 0) {
        resultHasLevelTwoDisaggregations = true;
    }

    if (resultHasLevelTwoDisaggregations) {
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
        resultHasLevelTwoDisaggregations,
        commentValue,
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
                            result[TARGET_COUNT_FIELD],
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