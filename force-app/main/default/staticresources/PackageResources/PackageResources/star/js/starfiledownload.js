// This method checks the file format and calls a
// method accordingly to download a file in that file format
function downloadFile(object, fileFormat) {
    if (EXCEL_FILE_FORMAT == fileFormat) {
        initiateExcelDownload(object);
    }
}