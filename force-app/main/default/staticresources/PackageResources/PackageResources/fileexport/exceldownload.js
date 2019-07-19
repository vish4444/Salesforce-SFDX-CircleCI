    // variables to store file name and work sheet
    var excelName = '';
    var workSheetOneName = 'Instructions';
    var workSheetTwoName = '';

    //work book and workseet objects
    var workBook = new Workbook();
    var workSheetOne = {};
    var workSheetTwo = {};

    // variable for merging rows and columns
    var mergeList = [];
    var mergeObject = {};
    //start index
    var start = {};
    // end index
    var end = {};

    // objects to hold styling of a cell
    var fontAttr = {};
    var alignmentAttr = {};
    var bgColorAttr = {};
    var fillAttr = {};
    var borderAttr = {};
    var bottomAttr = {};
    var topAttr = {};
    var leftAttr = {};
    var rightAttr = {};
    var styleAttribute = {};
    var indexToStyleClass = new Object();
    var indexToStyle = new Object();

    // width array for cells
    var columnWidth = [];

    var columnHeaderLength;
    var popoverColumnLength;
    var totalColumnHeaders = 0;

    // initial count is 4, 2 rows for project header, 1 for Time and UserName stamp and 1 for header
    var rowCount = 4;

    // header arrays to display column headers
    var resultHeaders = [];
    var targetResultHeaders = [];
    var totalHeaders = [];

    var emptyHeaders = [];
    var project = [];
    var rows = [];
    //headerRow
    var rowOne = [];
    //empty row to merge
    var emptyRow = [];

    var dateTimeStampRow = [];

    //This is to identify how many cells should be populated
    var columnsToFill = 0;

    var SKY_BLUE_HEX = 'c5d9f1';
    var GREY_HEX = 'd9d9d9';


    // Call this method from remoting method
    // this method takes Excel_Data Object
    function initiateExcelDownload(object) {
        resetVariables();
        buildBorders();
        createArrayTemplate(object);
        // columnHeaderLength has count of columns till Disaggregation
        columnHeaderLength = object.columnHeaders.length - 1;
        popoverColumnLength = object.columnHeaders.length;
        object = shouldHeaderBeMerged(object);
        excelName = getFileName(
            object.projectInfo.projectName,
            object.projectInfo.reportingPeriodName,
            object.projectInfo.geographicAreaName,
            object.source,
            object.isResponse,
            object.isSuccess
        );
        workSheetTwoName = getSheetName(
            object.projectInfo.reportingPeriodName,
            object.projectInfo.geographicAreaName
        );
        if (!object.isResponse) {
            workSheetOne = getInstructionsSheet(object.instructions);
        }
        workSheetTwo = sheet_from_array_of_arrays(generateRows(object));
        generateExcel(object.isResponse);
    }

    /*
    * This method is used when user clicks on download multiple times, it resets all
    * the variables
    */
    function resetVariables () {
        excelName = '';
        workSheetTwoName = '';
        workBook = new Workbook();
        workSheetTwo = {};

        //merge
        mergeList = [];
        mergeObject = {};
        //start
        start = {};
        // end
        end = {};

        fontAttr = {};
        alignmentAttr = {};
        bgColorAttr = {};
        fillAttr = {};
        borderAttr = {};
        bottomAttr = {};
        topAttr = {};
        leftAttr = {};
        rightAttr = {};
        styleAttribute = {};
        indexToStyleClass = new Object();
        indexToStyle = new Object();

        columnWidth = [];

        columnHeaderLength;
        popoverColumnLength;
        totalColumnHeaders = 0;
        rowCount = 4;

        resultHeaders = [];
        targetResultHeaders = [];
        totalHeaders = [];

        emptyHeaders = [];
        project = [];
        rows = [];
        //headerRow
        rowOne = [];
        //empty row
        emptyRow = [];

        dateTimeStampRow = [];

        columnsToFill = 0;
    }

    function buildBorders () {
        rightAttr = {style : 'thin'};
        leftAttr = {style : 'thin'};
        topAttr = {style : 'thin'};
        bottomAttr = {style : 'thin'};
        borderAttr = {
            bottom : bottomAttr,
            top : topAttr,
            right : rightAttr,
            left : leftAttr
        };
    }

    // This method creates headers depending on certain criteria
    function createArrayTemplate(object) {
        if (!object.isResponse) {
            if (!object.hasGenderDisaggregations && object.hasTargets) {
                targetResultHeaders = [TOTAL_COLUMN, '', COMMENTS_COLUMN, UNIQUE_KEY_COLUMN];
                totalHeaders = [TARGET_COLUMN, RESULT_COLUMN, '', ''];
                columnsToFill = 3; // 0 - 2 i.e; 3
            }
            else if (!object.hasGenderDisaggregations && !object.hasTargets) {
                targetResultHeaders = [TOTAL_COLUMN, COMMENTS_COLUMN, UNIQUE_KEY_COLUMN];
                totalHeaders = [];
                columnsToFill = 2; // 0 - 1 i.e; 2
            }
            else if (object.hasGenderDisaggregations && !object.hasTargets) {
                targetResultHeaders = [
                    TOTAL_COLUMN, MALE_COLUMN, FEMALE_COLUMN, UNKNOWN_COLUMN, COMMENTS_COLUMN, UNIQUE_KEY_COLUMN
                ];
                totalHeaders = [];
                columnsToFill = 5;
            }
            else if (object.hasGenderDisaggregations && object.hasTargets) {
                targetResultHeaders = [
                    TOTAL_COLUMN,
                    '',
                    MALE_COLUMN,
                    '',
                    FEMALE_COLUMN,
                    '',
                    UNKNOWN_COLUMN,
                    '',
                    COMMENTS_COLUMN,
                    UNIQUE_KEY_COLUMN
                ];
                totalHeaders = [
                    TARGET_COLUMN,
                    RESULT_COLUMN,
                    TARGET_COLUMN,
                    RESULT_COLUMN,
                    TARGET_COLUMN,
                    RESULT_COLUMN,
                    TARGET_COLUMN,
                    RESULT_COLUMN,
                    '',
                    ''
                ];
                columnsToFill = 9;
            }
        }
        else {
            if (!object.hasGenderDisaggregations && object.hasTargets) {
                if (object.isSuccess) {
                    targetResultHeaders = [TOTAL_COLUMN, '', 'ID'];
                    totalHeaders = [TARGET_COLUMN, RESULT_COLUMN, ''];
                    columnsToFill = 3; // 0 - 2 i.e; 3
                }
                else {
                    targetResultHeaders = [TOTAL_COLUMN, '', 'ID', 'ERROR'];
                    totalHeaders = [TARGET_COLUMN, RESULT_COLUMN, '', ''];
                    columnsToFill = 4; // 0 - 2 i.e; 3
                }
            }
            else if (!object.hasGenderDisaggregations && !object.hasTargets) {
                if (object.isSuccess) {
                    targetResultHeaders = [TOTAL_COLUMN, 'ID'];
                    totalHeaders = [];
                    columnsToFill = 2; // 0 - 1 i.e; 2
                }
                else {
                    targetResultHeaders = [TOTAL_COLUMN, 'ID', 'ERROR'];
                    totalHeaders = [];
                    columnsToFill = 3; // 0 - 1 i.e; 2
                }
            }
            else if (object.hasGenderDisaggregations && !object.hasTargets) {
                if (object.isSuccess) {
                    targetResultHeaders = [
                        TOTAL_COLUMN, MALE_COLUMN, FEMALE_COLUMN, UNKNOWN_COLUMN, 'ID'
                    ];
                    totalHeaders = [];
                    columnsToFill = targetResultHeaders.length;
                }
                else {
                    targetResultHeaders = [
                        TOTAL_COLUMN, MALE_COLUMN, FEMALE_COLUMN, UNKNOWN_COLUMN, 'ID', 'ERROR'
                    ];
                    totalHeaders = [];
                    columnsToFill = targetResultHeaders.length;
                }
            }
            else if (object.hasGenderDisaggregations && object.hasTargets) {
                if (object.isSuccess) {
                    targetResultHeaders = [
                        TOTAL_COLUMN,
                        '',
                        MALE_COLUMN,
                        '',
                        FEMALE_COLUMN,
                        '',
                        UNKNOWN_COLUMN,
                        '',
                        'ID'
                    ];
                    totalHeaders = [
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        ''
                    ];
                    columnsToFill = totalHeaders.length;
                }
                else {
                    targetResultHeaders = [
                        TOTAL_COLUMN,
                        '',
                        MALE_COLUMN,
                        '',
                        FEMALE_COLUMN,
                        '',
                        UNKNOWN_COLUMN,
                        '',
                        'ID',
                        'ERROR'
                    ];
                    totalHeaders = [
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        TARGET_COLUMN,
                        RESULT_COLUMN,
                        '',
                        ''
                    ];
                    columnsToFill = totalHeaders.length;
                }
            }
        }
    }

    /*
    * This method checks if the headers should be merged and
    * merges the headers
    */
    function shouldHeaderBeMerged(object) {
        if (
                (object.hasTargets && object.hasGenderDisaggregations)
            || (!object.hasGenderDisaggregations && !object.hasTargets)
            || (object.hasGenderDisaggregations && !object.hasTargets)
            || (!object.hasGenderDisaggregations && object.hasTargets)
        ) {
            if (totalHeaders.length != 0) {
                for (var i = 0; i < object.columnHeaders.length; i++) {
                    emptyHeaders.push('');
                }
                for (var i = 0; i < totalHeaders.length; i++) {
                    emptyHeaders.push(totalHeaders[i]);
                }
            }
            for (var i = 0; i < targetResultHeaders.length; i++) {
                object.columnHeaders.push(targetResultHeaders[i]);
            }
            mergeProjectInfoRow(object.columnHeaders.length);
            mergeDateTimeStampRow(object.columnHeaders.length);
        }
        // totalColumnHeaders is count of all the columns to be displayed in excel
        totalColumnHeaders = object.columnHeaders.length - 1;
        return object;
    }

    // This method builds file name
    function getFileName(project, reportPeriod, geoArea, source, isResponse, isSuccess) {
        var projectName = replaceSpecialCharacters(project);
        var reportName = replaceSpecialCharacters(reportPeriod);
        var geoName = replaceSpecialCharacters(geoArea);
        var sourceName = replaceSpecialCharacters(source);
        var fileName = getSlicedString(projectName, 147) + ' - ' + getSlicedString(reportName, 27)
            + ' - ' + getSlicedString(geoName, 47) + ' - ' + getSlicedString(sourceName, 25);
        if (isResponse) {
            if (isSuccess) {
                fileName = SUCCESS_LOG + ' - ' + fileName;
            }
            else {
                fileName = ERROR_LOG + ' - ' + fileName;
            }
        }
        return fileName;
    }

    // This method builds sheet name
    function getSheetName(reportPeriod, geoArea) {
        var report = replaceSpecialCharacters(reportPeriod);
        var geoName = replaceSpecialCharacters(geoArea);
        var sheetName = getSlicedString(report, 10) + ' - ' + getSlicedString(geoName, 18);
        return sheetName;
    }

    // this method replaces special characters with _
    function replaceSpecialCharacters(name) {
        var modifiedName = name.replace(/[^a-z0-9\s]/gi, '_');
        return modifiedName;
    }

    function getSlicedString(name, limit) {
        var slicedName = '';
        if (name.length > limit) {
            slicedName = name.substring(0, limit);
        }
        else {
            slicedName = name;
        }
        return slicedName;
    }

    /*
    * This method adds actual data into an array
    * This method also creates style attributes for cells
    */
    function generateRows(object) {
        addProjectInfoAndColumnHeaderToRow(object);
        mergeHeaderColumnsRows(object);
        // looping over indicator infos
        for (var i = 0; i < object.dataRows.length; i++) {

            var dataRow = [];
            var popoverBlank = [];
            var popOverLength = object.dataRows[i].popoverInfo.length;
            var isColumnCalculated = false;

            // getting popover info
            for (var j = 0; j < object.dataRows[i].popoverInfo.length; j++) {
                dataRow.push(object.dataRows[i].popoverInfo[j]);
                popoverBlank.push('');
            }

            // getting disaggregations
            for (var k = 0; k < object.dataRows[i].disagAndResultInfo.length; k++) {
                var totalColumnCount = object.dataRows[i].popoverInfo.length;
                var numberOfDisaggregations = object.dataRows[i].disagAndResultInfo.length;
                var isFirstRow = false;
                var popoverCount = popOverLength;
                var arrayBlank = [];
                var columnCount = 0;
                var isCommentRowMerged = false;

                // filling in empty row for next rows
                for (var m = 0; m < popoverCount; m++) {
                    arrayBlank.push('');
                    if (numberOfDisaggregations >= 1 && k == 0 && !isColumnCalculated) {
                        var rowColumnCount = (rowCount + numberOfDisaggregations) - 1;
                        start = {r : rowCount, c : columnCount};
                        end = {r : rowColumnCount, c : columnCount};
                        mergeObject = {s: start, e: end};
                        mergeList.push(mergeObject);

                        if (!object.isResponse) {
                            if (!isCommentRowMerged) {
                                start = {r : rowCount, c : totalColumnHeaders -1};
                                end = {r : rowColumnCount, c : totalColumnHeaders - 1};
                                mergeObject = {s: start, e: end};
                                mergeList.push(mergeObject);
                                isCommentRowMerged = true;
                            }
                        }
                    }
                    columnCount++;
                }

                // once the loop is over set it to true because it should only
                // run for first row of each disaggregation
                isColumnCalculated = true;

                // getting cell data
                var rowLength = object.dataRows[i].disagAndResultInfo[k].cellData.length;

                // looping over all cell values
                for (var l = 0; l < object.dataRows[i].disagAndResultInfo[k].cellData.length; l++) {
                    if (columnsToFill != 0 && l < columnsToFill && l != rowLength - 1) {
                        if (numberOfDisaggregations >= 1 && k == 0) {
                            isFirstRow = true;
                            dataRow.push(object.dataRows[i].disagAndResultInfo[k].cellData[l].value);
                        }
                        else {
                            arrayBlank.push(object.dataRows[i].disagAndResultInfo[k].cellData[l].value);
                        }
                        if (object.dataRows[i].disagAndResultInfo[k].cellData[l].isEditable) {
                            bgColorAttr = {rgb : SKY_BLUE_HEX};
                            fillAttr = {fgColor : bgColorAttr};
                            var align = getCellAlignment(true);
                            styleAttribute = getStyleForCell(fillAttr, borderAttr, align);
                            indexToStyleClass[rowCount + '#' + totalColumnCount] = styleAttribute;
                        }
                        else {
                            var align = getCellAlignment(true);
                            styleAttribute = {border : borderAttr, alignment : align};
                            indexToStyleClass[rowCount + '#' + totalColumnCount] = styleAttribute;
                        }
                    }
                    totalColumnCount ++;
                }

                if (isFirstRow) {
                    //comments
                    if (!object.isResponse) {
                        dataRow.push(object.dataRows[i].disagAndResultInfo[k].cellData[rowLength - 2].value);
                    }
                    //unique hidden key
                    dataRow.push(object.dataRows[i].disagAndResultInfo[k].cellData[rowLength - 1].value);
                    rows.push(dataRow);
                    bgColorAttr = {rgb : GREY_HEX};
                    fillAttr = {fgColor : bgColorAttr};
                    var align = getCellAlignment(false);
                    styleAttribute = getStyleForCell(fillAttr, borderAttr, align);
                    indexToStyleClass[rowCount + '#' + totalColumnHeaders] = styleAttribute;
                }
                else {
                    //comments
                    if (!object.isResponse) {
                        arrayBlank.push(object.dataRows[i].disagAndResultInfo[k].cellData[rowLength - 2].value);
                    }
                    //unique hidden key
                    arrayBlank.push(object.dataRows[i].disagAndResultInfo[k].cellData[rowLength - 1].value);
                    rows.push(arrayBlank);
                    bgColorAttr = {rgb : GREY_HEX};
                    fillAttr = {fgColor : bgColorAttr};
                    var align = getCellAlignment(false);
                    styleAttribute = getStyleForCell(fillAttr, borderAttr, align);
                    indexToStyleClass[rowCount + '#' + totalColumnHeaders] = styleAttribute;
                }
                rowCount ++;
            }
        }
        return rows;
    }

    function getCellAlignment(isWrapped) {
        var align = {
            horizontal : 'center',
            vertical : 'center',
            wrapText : isWrapped
        };
        return align;
    }

    function getStyleForCell(colorFill, border, align) {
        var styleAttr = {fill : colorFill, border : border, alignment : align};
        return styleAttr;
    }

    function Workbook() {
        if(!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function getInstructionsSheet(data) {
        var instructionsStyle = new Object();
        instructionsStyle['1#1'] = {
            alignment : {
                horizontal : 'left',
                vertical : 'left',
                wrapText : true
            },
            font : {
                sz : '24',
                family : 'helvetica neue',
                name : 'helvetica neue',
                underline : false,
                bold: true
            }
        };
        instructionsStyle['3#1'] = {
            alignment : {
                horizontal : 'left',
                vertical : 'left',
                wrapText : true
            },
            font : {
                sz : '14',
                underline : true,
                bold: true
            }
        };
        instructionsStyle['12#1'] = {
            alignment : {
                horizontal : 'left',
                vertical : 'left',
                wrapText : true
            },
            font : {
                sz : '14',
                underline : true,
                bold: true
            }
        };
        instructionsStyle['29#1'] = {
            alignment : {
                horizontal : 'left',
                vertical : 'left',
                wrapText : true
            },
            font : {
                sz : '14',
                underline : true,
                bold: true
            }
        };
        var size = (Object.keys(data).length + 1) / 2;
        var work_Sheet = {};
        var rowColumnRange = 10000000;
        var range = {s: {c:rowColumnRange, r:rowColumnRange}, e: {c:0, r:0 }};
        for (var r = 0; r != size; r++) {
            for (var c = 0; c != 2; c++) {
                if (range.s.r > r) {
                    range.s.r = r;
                }
                if (range.s.c > c) {
                    range.s.c = c;
                }
                if (range.e.r < r) {
                    range.e.r = r;
                }
                if (range.e.c < c) {
                    range.e.c = c;
                }
                var cellAttributes = {};
                var key = r + '#' + c;
                if (key in instructionsStyle) {
                    cellAttributes = instructionsStyle[key];
                }
                else {
                    cellAttributes = {
                        alignment : {
                            horizontal : 'left',
                            vertical : 'left',
                            wrapText : true
                        },
                        font : {
                            sz : '12'
                        }
                    };
                }
                var instruction = data[key];
                if (instruction != undefined) {
                    var cell = {v: instruction.val, s: cellAttributes};
                    var cell_ref = XLSX.utils.encode_cell({c:c, r:r});
                    if (cell.v != null) {
                        if (typeof cell.v === 'number') {
                            cell.t = 'n';
                        }
                        else if (typeof cell.v === 'boolean') {
                            cell.t = 'b';
                        }
                        else {
                            cell.t = 's';
                        }
                    }
                    work_Sheet[cell_ref] = cell;
                }
            }
        }
        if(range.s.c < rowColumnRange) {
            work_Sheet['!ref'] = XLSX.utils.encode_range(range);
        }
        var instructionWidth = [{wpx:50}, {wpx:1000}];
        work_Sheet['!cols'] = instructionWidth;
        return work_Sheet;
    }

    function sheet_from_array_of_arrays(data, opts) {
        var work_Sheet = {};
        var rowColumnRange = 10000000;
        //The range is number cells that this worksheet holds
        // r - Rows & c - Columns
        var range = {s: {c:rowColumnRange, r:rowColumnRange}, e: {c:0, r:0 }};
        for (var r = 0; r != data.length; r++) {
            for (var c = 0; c != data[r].length; c++) {
                if (range.s.r > r) {
                    range.s.r = r;
                }
                if (range.s.c > c) {
                    range.s.c = c;
                }
                if (range.e.r < r) {
                    range.e.r = r;
                }
                if (range.e.c < c) {
                    range.e.c = c;
                }

                var cellAttributes = {};
                var key = r + '#' + c;
                if (key in indexToStyle) {
                    cellAttributes = indexToStyle[key];
                }
                else {
                    if (key in indexToStyleClass) {
                        cellAttributes = {
                            border : borderAttr,
                            fill : indexToStyleClass[key].fill,
                            font : indexToStyleClass[key].font,
                            alignment : indexToStyleClass[key].alignment,
                            font : {
                                sz : '12'
                            }
                        };
                    }
                    else {
                        cellAttributes = {
                            border : borderAttr,
                            alignment : {
                                horizontal : 'center',
                                vertical : 'center',
                                wrapText : true
                            },
                            font : {
                                sz : '12'
                            }
                        };
                    }
                }

                var cell = {
                    v: data[r][c], s: cellAttributes
                };
                var cell_ref = XLSX.utils.encode_cell({c:c, r:r});
                if (cell.v != null) {
                    if (typeof cell.v === 'number') {
                        cell.t = 'n';
                    }
                    else if (typeof cell.v === 'boolean') {
                        cell.t = 'b';
                    }
                    else {
                        cell.t = 's';
                    }
                }
                work_Sheet[cell_ref] = cell;
            }
        }
        if(range.s.c < rowColumnRange) {
            work_Sheet['!ref'] = XLSX.utils.encode_range(range);
        }
        work_Sheet['!merges'] = mergeList;
        work_Sheet['!cols'] = columnWidth;
        return work_Sheet;
    }

    function generateExcel(isResponse) {
        var fileName = excelName+'.xlsx';
        var title = excelName;
        // add worksheet to workbook
        if (!isResponse) {
            workBook.SheetNames.push(workSheetOneName);
            workBook.Sheets[workSheetOneName] = workSheetOne;
        }
        workBook.SheetNames.push(workSheetTwoName);
        workBook.Sheets[workSheetTwoName] = workSheetTwo;
        var workBookOut = XLSX.write(workBook,
            {
                bookType:'xlsx',
                bookSST:true,
                type: 'binary'
            }
        );

        // Method in contentVersionUpload.resource. Saves the excel file in Files Sobject
        upsertContentVersion(
            true,
            isResponse,
            new Blob([saveToArrayBuffer(workBookOut)],{type:"application/octet-stream"}),
            fileName,
            title,
            true,
            'C'
        );
    }

    function downloadExcel() {
        if (cv_error == null || cv_error == '') {
            var location = EXCEL_DOWNLOAD_LINK + cv_response.id;
            if (sitePrefix != undefined && sitePrefix != '') {
                location = sitePrefix + location;
            }
            window.open(location,'_self');
            closePopup('downloadExcelPopUp');
        }
        else {
            addErrorMessage('donwloadExcelError', cv_error);
        }
    }

    function saveToArrayBuffer(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    function buildColumnHeaderStyle(rowNumber, columnNumber, size) {
        var attr = {};
        if (rowNumber == 0 && columnNumber == 0) {
            attr = {
                font : {bold : true, sz : size},
                border : borderAttr
            };
        }
        else if(rowNumber == 2 && columnNumber == 0){
            attr = {
                font : {sz : size},
                border : borderAttr
            };
        }
        else {
            attr = {
                font : {bold : true, sz : size},
                border : borderAttr,
                alignment : {
                    horizontal : 'center',
                    vertical : 'center',
                    wrapText : true
                }
            };
        }
        indexToStyle[rowNumber + '#' + columnNumber] = attr;
    }

    /*
    * Merging first two rows to display project info
    */
    function mergeProjectInfoRow(size) {
        var columnLength = size - 1;
        start = {r : 0, c : 0};
        end = {r : 1, c : columnLength};
        mergeObject = {s : start, e : end};
        mergeList.push(mergeObject);
    }

    /*Merging of columns of date time stamp row*/
    function mergeDateTimeStampRow(size) {
        var columnLength = size - 1;
        start = {r : 2, c : 0};
        end = {r : 2, c : columnLength};
        mergeObject = {s : start, e : end};
        mergeList.push(mergeObject);
    }

    /*
    * Merging 2 and 3 rows to display headers
    */
    function mergeHeaderRows(index) {
        start = {r : 3, c : index};
        end = {r : 4, c : index};
        mergeObject = {s : start,e : end};
        mergeList.push(mergeObject);
    }

    /*
    * Merging columns for row 3
    */
    function mergeHeaderColumns(index, next) {
        start = {r : 3, c : index};
        end = {r : 3, c : next};
        mergeObject = {s : start, e : end};
        mergeList.push(mergeObject);
    }

    /*
    * creating an array of cell width
    */
    function generateColumnWidthArray(object) {
        columnWidth.push(object);
    }


    /*
    * This method adds Project info and column headers to an array
    * This method also builds up style attributes and width for each cell
    */
    function addProjectInfoAndColumnHeaderToRow(object) {
        var projectDetails =
            object.projectInfo.projectName + ' - ' +
            object.projectInfo.reportingPeriodName + ' - ' +
            object.projectInfo.geographicAreaName + ' - ' +
            object.source;
        project.push(projectDetails);
        dateTimeStampRow.push(
            GENERATED_BY+': ' + object.userData.userName + ' ' + object.userData.localeDateTime
        );
        for (var i = 0; i < object.columnHeaders.length; i++) {
            if (i < object.columnHeaders.length - 1) {
                project.push(''); //first row
                dateTimeStampRow.push('');//second row
            }
            emptyRow.push(''); //second row that will be merged with the first row
            rowOne.push(object.columnHeaders[i]);
            buildColumnHeaderStyle(0, i, '20');
            buildColumnHeaderStyle(1, i, '20');
            buildColumnHeaderStyle(2, i, '10')
            if (object.hasTargets) {
                buildColumnHeaderStyle(3, i, '12');
                buildColumnHeaderStyle(4, i, '12');
            }
            else {
                buildColumnHeaderStyle(3, i, '12');
            }
            if (i < popoverColumnLength) {
                var widthObject = {wpx:150};
                generateColumnWidthArray(widthObject);
            }
            else {
                var lastColumn = (object.columnHeaders.length - 1);
                if (!object.isResponse) {
                    var widthObject = {wpx:75};
                    if (i == lastColumn) {
                        widthObject = {hidden:true};
                    }
                }
                else {
                    var widthObject = {wpx:90};
                    if (i == lastColumn) {
                        widthObject = {wpx:120};
                    }
                }
                generateColumnWidthArray(widthObject);
            }
        }
        rows.push(project);
        rows.push(emptyRow);
        rows.push(dateTimeStampRow);
        rows.push(rowOne);
    }

    /*
    * This method identifies different header cells and merges them accordingly
    */
    function mergeHeaderColumnsRows(object) {
        // merging headers in case target and results are displayed
        if (object.hasTargets) {
            rows.push(emptyHeaders);
            if ((object.isResponse && !object.isSuccess) || !object.isResponse) {
                mergeHeaderRows(object.columnHeaders.length -2);
            }
            mergeHeaderRows(object.columnHeaders.length -1);
            for (var i = 0; i < object.columnHeaders.length; i++) {
                if (i <= columnHeaderLength){
                    mergeHeaderRows(i);
                }
            }
            for (var i = popoverColumnLength; i < object.columnHeaders.length - 2; i+=2) {
                if (i > columnHeaderLength) {
                    var firstColumn = i;
                    var nextColumn = i + 1;
                    mergeHeaderColumns(firstColumn, nextColumn);
                }
            }
            rowCount ++;
        }
    }