var targetResultFieldHeaders;
var targetResultFieldStartIndex;
var targetResultFieldEndIndex;
var rowStartIndex;
var attachedFileName;
var file;
var resultsSheetArray = [];
var validTabIndex;
var progressMessage = '';
var hasValidHeader = false;
var hasValidColumns = false;
var fieldsetFields = new Array();
var hasGenderDisaggregations = false;
var columnHeaders = new Array();
var indicatorIndex;
var projectIndicatorIndexToNoOfDisaggregations = new Object();
var uploadedFileData;
var successCount;
var errorCount;
var uploadResponse;
var selectedRPName;
var selectedGAName;

function attachFile() {
    var fileInput = j$('#excelFileInput');
    file = fileInput[0].files[0];

    if (file != undefined) {
        attachedFileName = file.name;
        if (isValidFileType(attachedFileName)) {
            closePopup('uploadExcelPopup');
            removePopupException('uploadExcelHeader','uploadExcelHeaderError');
            j$('#uploadFileName').text(attachedFileName);
            showPopup('uploadExcelConfirmation');
        }
        else {
            j$('#invalidFileTypeContainer').text(INVALID_FILE_TYPE);
            j$('#invalidFileTypeContainer').show();
        }
    }
    else {
        j$('#invalidFileTypeContainer').text(NO_FILE_SELECTED);
        j$('#invalidFileTypeContainer').show();
    }
}

function initHelperVariables() {
    if (popoverFields != '[]') {
        fieldsetFields = (popoverFields.substr(1,popoverFields.length-2)).split(',');
    }
    hasGenderDisaggregations = j$('input[id$="hasGenderDisagg"]').val();
    selectedRPName = j$("[id$=reportingPeriodSL] option:selected").text();
    selectedGAName = j$("[id$=geographyAreaSelect] option:selected").text().trim();
}

function editFile() {
    hideInvalidTypeErrorMessage('invalidEditInputFile');
    openFileBrowser();
}

function openFileBrowser() {
    j$('#editFileInput').trigger('click');
}

function setFileName() {
    var fileInput = j$('#editFileInput');
    file = fileInput[0].files[0];
    j$('#uploadFileName').text(file.name);
}

function uploadFile() {
    initHelperVariables();

    if (isValidFileType(file.name)) {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            var filename = file.name;
            var binary = "";
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            // call 'xlsx' to read the file
            var oFile = XLSX.read(binary, {type: 'binary', cellDates:true, cellStyles:true, raw: true});

            if (validateTabName(oFile.SheetNames)) {
                //Show progess pop up - preparing records to process message
                progressMessage = 'Preparing records to process';
                j$('#progressMessage').text(progressMessage);
                closePopup('uploadExcelConfirmation');
                showPopup('uploadProgress');

                var sheet = oFile.Sheets[oFile.SheetNames[validTabIndex]];
                //Genearte array iterating though each cell of each row
                resultsSheetArray = generateArray(sheet);
                generateTargetResultFieldsHeaderAndSetRowIndex();
                //get columns to iterate for result cells
                setTargetResultFieldIndex();
                setColumnHeaders();
                setIndicatorColumnIndex();
                getStartIndexToEndIndexForDisaggregatedPI(sheet['!merges']);
                validateHeaderText();
                validateColumnHeaders();
                var fileInfo = getFileData();
                var indicatorAndResultData = generateResultList(fileInfo);

            }
            else {
                j$('#invalidEditInputFile').text(NO_VALID_TAB);
                j$('#invalidEditInputFile').show();
            }
        };
        fileReader.readAsArrayBuffer(file);
    }
    else {
        j$('#invalidEditInputFile').text(INVALID_FILE_TYPE);
        j$('#invalidEditInputFile').show();
    }
}

function isValidFileType(fileName) {

    var isValidFileType = false;
    var regex = new RegExp("(.*?)\.(xlsx)$");
    if ((regex.test(fileName.toLowerCase()))) {
        isValidFileType = true;
    }
    return isValidFileType;
}


function getStartIndexToEndIndexForDisaggregatedPI(mergedCells) {
    for (var i = 0; i < mergedCells.length; i++) {
        if (mergedCells[i].s.r >= rowStartIndex) {
            if (mergedCells[i].s.c == indicatorIndex && mergedCells[i].s.c == mergedCells[i].e.c) {
                projectIndicatorIndexToNoOfDisaggregations[mergedCells[i].s.r] =  mergedCells[i].e.r;
            }
        }
    }
}


function generateArray(dataWorksheet) {
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = XLSX.utils.decode_range(dataWorksheet['!ref']);
   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row = [];
       for(colNum= range.s.c; colNum<=range.e.c; colNum++){
          var nextCell = dataWorksheet[
             XLSX.utils.encode_cell({r: rowNum, c: colNum})
          ];
          if( typeof nextCell === 'undefined' ){
             row.push(void 0);
          } else row.push(nextCell);
       }
       result.push(row);
   }
   return result;
}

function generateTargetResultFieldsHeaderAndSetRowIndex() {
    targetResultFieldHeaders = [];
    rowStartIndex = 4;

    if (sourcePage == FILE_NAME_TARGETS) {
        if (hasGenderDisaggregations == 'false') {
            targetResultFieldHeaders.push('totalTarget');
        }
        if (hasGenderDisaggregations == 'true') {
            targetResultFieldHeaders.push(
                'totalTarget', 'maleTarget', 'femaleTarget', 'otherTarget'
            );
        }
    }
    if (sourcePage == FILE_NAME_RESULTS) {
        if (hasGenderDisaggregations == 'false' && SHOW_TARGETS_ON_RESULTS == 'false') {
            targetResultFieldHeaders.push('totalResult');
        }

        if (hasGenderDisaggregations == 'true' && SHOW_TARGETS_ON_RESULTS == 'true') {
            rowStartIndex = 5;
            targetResultFieldHeaders.push(
                'totalTarget',
                'totalResult',
                'maleTarget',
                'maleResult',
                'femaleTarget',
                'femaleResult',
                'otherTarget',
                'otherResult'
            );
        }

        if (hasGenderDisaggregations == 'true' && SHOW_TARGETS_ON_RESULTS == 'false') {
            targetResultFieldHeaders.push(
                'totalResult',
                'maleResult',
                'femaleResult',
                'otherResult'
            );
        }

        if (hasGenderDisaggregations == 'false' && SHOW_TARGETS_ON_RESULTS == 'true') {
            rowStartIndex = 5;
            targetResultFieldHeaders.push(
                'totalTarget',
                'totalResult'
            );
        }
    }
}

function setTargetResultFieldIndex() {
    targetResultFieldStartIndex = (fieldsetFields.length + 2);
    targetResultFieldEndIndex = (fieldsetFields.length + 2 + targetResultFieldHeaders.length - 1);
}

function setColumnHeaders() {
    for (var j = 0; j < resultsSheetArray[3].length; j++) {
        columnHeaders.push(resultsSheetArray[3][j].h);
    }

    if (SHOW_TARGETS_ON_RESULTS == 'true' && sourcePage == FILE_NAME_RESULTS) {
        for (var j = 0; j < resultsSheetArray[4].length; j++) {
            columnHeaders.push(resultsSheetArray[4][j].h);
        }
    }
}

function setIndicatorColumnIndex() {
    if (columnHeaders.indexOf(EXCEL_INDICATOR_COLUMN_HEADER) >= 0) {
        indicatorIndex = columnHeaders.indexOf(EXCEL_INDICATOR_COLUMN_HEADER);
    }
    else {
        indicatorIndex = fieldsetFields.length;
    }
}

function getFileData() {
    fileData = {
        sourcePage: sourcePage,
        projectName: projectName,
        reportingPeriodName: selectedRPName,
        geographicAreaName: selectedGAName,
        hasValidHeaders: hasValidHeader,
        hasValidColumnHeaders: hasValidColumns,
        hasTargets: SHOW_TARGETS_ON_RESULTS,
        hasGenderDisaggregations: hasGenderDisaggregations,
        reportingPeriodId: j$("[id$=reportingPeriodSL]").val(),
        geographicAreaId: j$("[id$=geographyAreaSelect]").val(),
        projectId: SELECTED_PROJECT_ID
    }
    return fileData;
}


function generateResultList(fileInfo) {
    var totalRecordsToProcess = (resultsSheetArray.length - rowStartIndex);
    var noOfRecordsProcessed = 0;
    var disaggregationIndex = columnHeaders.indexOf(EXCEL_DISAGGREGATION_COLUMN_HEADER);
    if (disaggregationIndex == -1) {
        disaggregationIndex = fieldsetFields.length + 1;
    }
    var count;
    var startIndex;
    var endIndex;
    var isDisaggregatedRow;
    //Project Indicator data - Name and Type
    var projectIndictor;
    //Disaggregation value name
    var disaggregationInfo;
    //Result Info - target,result values and disaggregtaion Id.
    var resultInfo;

    //Collection of Project Indicator, Disaggregation and Result data.
    var projectIndicatorAndResultInfo;

    //Array of projectIndicatorAndResultInfo
    var dataList = new Object();
    var resultNotNull;
    var comment = '';

    for (var i = rowStartIndex; i < resultsSheetArray.length; i++) {
        resultNotNull = false;
        projectIndicatorAndResultInfo = {
            projectIndicatorData : null,
            disaggregations : [],
            resultData : []
        };

        var result = {
            recordId : '',
            projectIndicatorId : '',
            projectIndicatorReportingPeriodId : '',
            projectIndicatorGeographicAreaId : '',
            disaggregationValueId : '',
            totalTarget : '',
            maleTarget : '',
            femaleTarget : '',
            otherTarget : '',
            totalResult : '',
            maleResult : '',
            femaleResult : '',
            otherResult : '',
            resultHasValue : false,
            dataTrackedLevel : '',
            comment : ''
        };

        count = 0;
        isDisaggregatedRow = false;

        //If its not the row of disaggregation value
        if (i != rowStartIndex && i > startIndex && i <= endIndex) {
            isDisaggregatedRow = true;
        }
        else {
            startIndex = i;

            if (projectIndicatorIndexToNoOfDisaggregations[startIndex] != undefined) {
                endIndex = projectIndicatorIndexToNoOfDisaggregations[startIndex];
            }

            else {
                endIndex = i;
            }
            comment = resultsSheetArray[i][resultsSheetArray[i].length - 2].w;
        }

        var lastColumnIndex = resultsSheetArray[i].length - 1;
        var uploadKey;
        if (resultsSheetArray[i][lastColumnIndex] != undefined) {
            uploadKey = resultsSheetArray[i][lastColumnIndex].h
        }
        //var uploadKey = resultsSheetArray[i][lastColumnIndex].h;
        if (uploadKey != undefined && uploadKey != '') {
            var piData = uploadKey.split('~')[0].split('#');
            //Add project indicator and disaggregation data
            if (isDisaggregatedRow == false) {
                disaggregationInfo = [];
                resultInfo = [];
                projectIndictor = {
                    description : '',
                    dataType : '',
                    isDisaggregatedBySex : false,
                    isTargetDisaggregated : false
                };
                projectIndictor.description = resultsSheetArray[i][indicatorIndex].h;
                projectIndictor.dataType = piData[1];
                projectIndictor.isDisaggregatedBySex = piData[2];
                projectIndictor.isTargetDisaggregated = piData[3];

                //If PI is disaggregated, but had only one disaggregation value
                if (
                    resultsSheetArray[i][disaggregationIndex].h != '' &&
                    resultsSheetArray[i][disaggregationIndex].h != null
                ) {
                    disaggregationInfo.push(resultsSheetArray[i][disaggregationIndex].h);
                }
            }
            else {
                disaggregationInfo.push(resultsSheetArray[i][disaggregationIndex].h);
            }

            //loop for result cells
            for (var j = targetResultFieldStartIndex; j <= targetResultFieldEndIndex; j++) {
                if (
                    resultsSheetArray[i][j].s.fill != undefined
                    &&
                    resultsSheetArray[i][j].s.fill.fgColor != undefined
                    &&
                    resultsSheetArray[i][j].s.fill.fgColor['rgb'].toLowerCase() == 'ffc5d9f1'
                ) {
                    //If w = "formatted result value" has a value
                    if (resultsSheetArray[i][j].w != '' && resultsSheetArray[i][j].w != undefined) {
                        resultNotNull = true;
                    }
                }
                if (resultsSheetArray[i][j].w != null && resultsSheetArray[i][j].w != undefined) {
                    result[targetResultFieldHeaders[count]] = resultsSheetArray[i][j].v.toString();
                }
                count++;
            }

            result['resultHasValue'] = resultNotNull;
            result['projectIndicatorId'] = piData[0];
            result.comment = comment;

            var resultDisaggregations = uploadKey.split('~')[1];

            if (resultDisaggregations.includes('#')) {
                var piDisaggregations = [];
                piDisaggregations = resultDisaggregations.split('#');
                result['projectIndicatorReportingPeriodId'] = piDisaggregations[1];
                result['projectIndicatorGeographicAreaId'] = piDisaggregations[2];
                result['dataTrackedLevel'] = piDisaggregations[3];
                if (piDisaggregations.length == 5) {
                    result['disaggregationValueId'] = piDisaggregations[4];
                }
            }
            else {
                result['recordId'] = resultDisaggregations;
            }

            resultInfo.push(result);
        }

        if (
            (startIndex == endIndex) ||
            (isDisaggregatedRow && i == endIndex)
        ) {
            projectIndicatorAndResultInfo.projectIndicator = projectIndictor;
            projectIndicatorAndResultInfo.disaggregations = disaggregationInfo;
            projectIndicatorAndResultInfo.resultData = resultInfo;
            dataList[piData[0]] = projectIndicatorAndResultInfo;
        }

        noOfRecordsProcessed++;
        updateProgressBar(noOfRecordsProcessed, totalRecordsToProcess);

        if (noOfRecordsProcessed == totalRecordsToProcess) {
            generateFileUploadDataObject(fileInfo, dataList);
           closePopup('uploadProgress');
           showPopup('uploadConfirmation');
        }
    }
    return dataList;
}

function updateProgressBar(recordsProcessed, totalRecords) {

    setTimeout(function() {
        var elem = document.getElementById("progressBar");
        var width = (recordsProcessed/totalRecords) * 100;
        elem.style.width = width + '%';
        progressMessage = ' Processed ' + recordsProcessed + ' out of ' + totalRecords + ' records';
        j$('#progressMessage').text(progressMessage);
    }, 1000);
}

function generateFileUploadDataObject(fileInfo, dataList) {
    uploadedFileData = {
        fileData : fileInfo,
        projectIndicatorAndResultData : dataList
    }
}

function closeProgressBarAndShowConfirmation() {
    closePopup('uploadProgress');
    showPopup('uploadConfirmation');
}

function resetUploadExcelPopup() {
    j$('.selectedRPNameAndGeoName').text(
        j$("[id$=reportingPeriodSL] option:selected").text()+ ' - ' + j$("[id$=geographyAreaSelect] option:selected").text().trim()
    );
    j$('.selectedRPName').text(
        j$("[id$=reportingPeriodSL] option:selected").text()
    );
    j$('.selectedGAName').text(
        j$("[id$=geographyAreaSelect] option:selected").text().trim()
    );
    resetInputFile();
    hideInvalidTypeErrorMessage('invalidFileTypeContainer');
}

function resetInputFile() {
    j$('#excelFileInput').val('');
}

function hideInvalidTypeErrorMessage(elementId) {
    j$('#'+elementId).hide();
}

function validateTabName(tabNames) {
    var isValidTab = false;
    var expectedTabName = getSheetName(selectedRPName, selectedGAName);
    for (var i = 0; i < tabNames.length; i++) {
        if (expectedTabName == tabNames[i]) {
            isValidTab = true;
            validTabIndex = i;
            break;
        }
    }
    return isValidTab;
}

function validateHeaderText() {
    var actualHeaderText = resultsSheetArray[0][0].h;
    var expectedHeaderText = projectName + ' - ' + selectedRPName + ' - ' + selectedGAName + ' - ' + sourcePage;

    if (actualHeaderText == expectedHeaderText) {
        hasValidHeader = true;
    }
}

function validateColumnHeaders() {
    var expectedColumnHeaders = [];
    var actualHeaders = [];

    for (var i = 0; i < fieldsetFields.length; i++) {
        expectedColumnHeaders.push(fieldsetFields[i]);
    }

    expectedColumnHeaders.push(EXCEL_INDICATOR_COLUMN_HEADER);
    expectedColumnHeaders.push(EXCEL_DISAGGREGATION_COLUMN_HEADER);

    if (SHOW_TARGETS_ON_RESULTS == 'true' && sourcePage == FILE_NAME_RESULTS) {
        expectedColumnHeaders.push(TOTAL_COLUMN);
        expectedColumnHeaders.push('');

        if (hasGenderDisaggregations == 'true') {
            expectedColumnHeaders.push(MALE_COLUMN);
            expectedColumnHeaders.push('');
            expectedColumnHeaders.push(FEMALE_COLUMN);
            expectedColumnHeaders.push('');
            expectedColumnHeaders.push(UNKNOWN_COLUMN);
            expectedColumnHeaders.push('');
        }

        expectedColumnHeaders.push(COMMENTS_COLUMN);
        expectedColumnHeaders.push(UNIQUE_KEY_COLUMN);

        for (var i = 0; i < fieldsetFields.length; i++) {
            expectedColumnHeaders.push('');
        }

        //Indicator and disaggregation row
        expectedColumnHeaders.push('');
        expectedColumnHeaders.push('');

        expectedColumnHeaders.push(TARGET_COLUMN);
        expectedColumnHeaders.push(RESULT_COLUMN);

        if (hasGenderDisaggregations == 'true') {
            for (var i = 0; i <= 2; i++) {
                expectedColumnHeaders.push(TARGET_COLUMN);
                expectedColumnHeaders.push(RESULT_COLUMN);
            }
        }
        //comments
        expectedColumnHeaders.push('');
        //unique key
        expectedColumnHeaders.push('');
    }

    else {
        expectedColumnHeaders.push(TOTAL_COLUMN);
        if (hasGenderDisaggregations == 'true') {
            expectedColumnHeaders.push(MALE_COLUMN);
            expectedColumnHeaders.push(FEMALE_COLUMN);
            expectedColumnHeaders.push(UNKNOWN_COLUMN);
        }
        expectedColumnHeaders.push(COMMENTS_COLUMN);
        expectedColumnHeaders.push(UNIQUE_KEY_COLUMN);
    }

    for (var j = 0; j < resultsSheetArray[3].length; j++) {
        actualHeaders.push(resultsSheetArray[3][j].h);
    }

    if (SHOW_TARGETS_ON_RESULTS == 'true' && sourcePage == FILE_NAME_RESULTS) {
        for (var j = 0; j < resultsSheetArray[4].length; j++) {
            actualHeaders.push(resultsSheetArray[4][j].h);
        }
    }

    if (expectedColumnHeaders.length == actualHeaders.length) {
        for (var i =0; i < actualHeaders.length; i++) {
            if (expectedColumnHeaders[i].trim() != actualHeaders[i].trim()) {
                hasValidColumns = false;
                break;
            }
            else {
                hasValidColumns = true;
            }
        }
    }
}

function confirmUpload() {
    showLoader();
    Visualforce.remoting.Manager.invokeAction (
        UPLOAD_DATA,
        JSON.stringify(uploadedFileData),
        function(result, event) {
            if (event.status) {
                uploadResponse = result;
                var successCount = +result.successCount;
                var errorCount = +result.errorCount;
                j$('#successCount').text(successCount);
                j$('#errorCount').text(errorCount);
                if (successCount > 0) {
                    j$('#successButton').removeClass('noDisplayElement');
                }
                if (errorCount > 0) {
                    j$('#errorButton').removeClass('noDisplayElement');
                }
                hideLoader();
                closePopup('uploadConfirmation');
                showPopup('successAndErrorPopup');
            }
            else {
                hideLoader();
                addError('uploadConfirmHeader');
                addErrorMessage('confirmUploadError', event.message);
            }
        },
        {escape: false}
    );
}

function generateSuccessLog() {
    showLoader();
    Visualforce.remoting.Manager.invokeAction (
        GENERATE_SUCCESS_LOG,
        JSON.stringify(uploadResponse),
        function(result, event) {
            if (event.status) {
                hideLoader();
                downloadFile(result, EXCEL_FILE_FORMAT);
            }
            else {
                hideLoader();
                addError('downloadExcelHeader');
                addErrorMessage('responseError', event.message);
            }
        },
        {escape: false}
    );
}

function generateErrorLog() {
    showLoader();
    Visualforce.remoting.Manager.invokeAction (
        GENERATE_ERROR_LOG,
        JSON.stringify(uploadResponse),
        function(result, event) {
            if (event.status) {
                hideLoader();
                downloadFile(result, EXCEL_FILE_FORMAT);
            }
            else {
                hideLoader();
                addError('downloadExcelHeader');
                addErrorMessage('responseError', event.message);
            }
        },
        {escape: false}
    );
}