var displaySuccessMessage = false;

function renderFormulaStringAsHTML() {
    var formulaElement = document.getElementById("formulaInput");
    formulaElement.innerHTML = j$('#formulaInput').text();
}

function onCalculationPopupLoad() {
    closeDropDownOnDocumentClick();
}

function toggleMenu(elementId) {
    j$('[id$=' + elementId + ']').toggleClass('displayNoneElement');
}

function getProjectIndicators() {
    showLoader();
    Visualforce.remoting.Manager.invokeAction (
        PROJECTINDICATORLOOKUP,
        j$('#selectProjectIndicatorInput').val(),
        projectIndicatorId,
        function(result, event) {
            if (event.status)
            {
                var listElement = '';
                j$('#indicatorsDropdown').empty();
                var liToAppend = '';

                if (result.length <= 0) {
                    listElement = '<li class="slds-dropdown__item menuitemcheckbox indicatorLi" role="presentation">'+
                        '<a role="menuitemcheckbox" tabindex="-1">'+
                        '<span title="'+NO_CALCULATED_PI_FOUND+'" class="slds-truncate">'+NO_CALCULATED_PI_FOUND+'</span></a>'+
                        '</li>';
                    liToAppend = listElement;
                }
                for (i = 0; i < result.length; i++) {
                    listElement = '<li onclick="toggleMenu(\''+'indicatorsDropdownContainer'+'\');addPillComponent(this);" id="'+result[i].Id+'" class="slds-dropdown__item menuitemcheckbox indicatorLi" role="presentation">' +
                        '<a role="menuitemcheckbox" tabindex="-1">'+
                            '<span title="'+result[i][PROJECT_INDICATOR_DESCRIPTION]+'" class="slds-truncate">'+result[i][PROJECT_INDICATOR_DESCRIPTION]+'</span>'+
                        '</a>'+
                    '</li>';
                    liToAppend = liToAppend + listElement;
                }
                j$('#indicatorsDropdown').append(liToAppend);
                hideLoader();
            }
            else {
                hideLoader();
                showPopupException(event.message);
            }
        },
        {escape: true}
    );
}

function addPillComponent(liElement) {
    var liDescription = j$(liElement).find('span').html();
    var pillElement =
        '<div contenteditable="false" class="formulaInputElement slds-pill pillElement" pill-id="'+liElement.id+'">'+
            '<div class="slds-pill__label" title="'+liDescription+'">'+liDescription+'</div>'+
            '<div><i class="vi vi-close pillRemoveIcon" title="remove" onclick="removePillComponent(this);"></i></div>' +
        '</div>';
    appendValueToFormulaInput(' '+pillElement+' ');

    /*document.getElementById('formulaInput').focus();
    pasteHtmlAtCaret(' ' + pillElement + ' ');*/
}

function appendValueToFormulaInput(value) {
    j$('#formulaInput').append(value);
    placeCaretAtEnd(document.getElementById('formulaInput'));
    /*j$('#formulaInput').focus();*/
}

/*function addMathOperator(value) {
    document.getElementById('formulaInput').focus();
    pasteHtmlAtCaret(value);
}*/

function removePillComponent(element) {
    j$(element).closest('div .pillElement').remove();
}

function validateKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;

    var isValidKey = false;
    if (
        //Numbers
        (charCode >= 48 && charCode <= 57)
        ||
        //Decimal
        (charCode == 46)
        ||
        //open and close paranthesis,multiply, add
        (charCode >= 40 && charCode <= 43)
        ||
        //subsract,divide
        (charCode == 45 || charCode == 47)
    ) {
        isValidKey = true;
    }
    return isValidKey;
}

function validateAndSaveFormula() {
    var isSuccess = false;
    resetFormulaException();
    generateFormulaToValidate();
    if(compileAndSaveFormula()) {
        if(saveFormula()) {
            isSuccess = true;
            displaySuccessMessage = true;
        }
    }
    return isSuccess;
}

function generateFormulaToValidate() {
    var inputFormula = j$('#formulaInput').html();
    j$('#hiddenFormulaToValidate').html(inputFormula);

    j$('#hiddenFormulaToValidate .formulaInputElement').each(function(){
        //j$(this).replaceWith('\''+j$(this).attr('pill-id')+'\'');
        j$(this).replaceWith(' 1 ');
    });
}

function generateFormulaWithId() {
    var inputFormula = j$('#formulaInput').html();
    j$('#hiddenFormulaPIId').html(inputFormula);

    j$('#hiddenFormulaPIId .formulaInputElement').each(function(){
        //j$(this).replaceWith('\''+j$(this).attr('pill-id')+'\'');
        j$(this).replaceWith(' '+j$(this).attr('pill-id')+' ');
    });
}

function compileAndSaveFormula() {
    var isCompliled = true;
    try {
        var calculationFormulaToValidate = j$('#hiddenFormulaToValidate').text().trim();
        calculationFormulaToValidate = calculationFormulaToValidate.replace(/ /g, " ");
        math.compile(calculationFormulaToValidate);
        if (
            calculationFormulaToValidate.includes('++')||
            calculationFormulaToValidate.includes('--') ||
            calculationFormulaToValidate.includes('+-') ||
            calculationFormulaToValidate.includes('-+') ||
            calculationFormulaToValidate.includes('*+') ||
            calculationFormulaToValidate.includes('*-') ||
            calculationFormulaToValidate.includes('*-')
        ) {
            showFormulaException();
            isCompliled = false;
        }
        else {
            generateFormulaWithId();
            generateFormulaWithName();
        }
    }
    catch(err) {
        isCompliled = false;
        showFormulaException();
    }
    return isCompliled;
}

function showFormulaException() {
    j$('#formulaInvalidMsg').text('Error: '+ FORMULA_INVALID_MESSAGE);
}

function resetFormulaException() {
    j$('#formulaInvalidMsg').text('');
}

function generateFormulaWithName() {
    var inputFormula = j$('#formulaInput').html();
    j$('#hiddenFormulaPIName').html(inputFormula);

    j$('#hiddenFormulaPIName .formulaInputElement').each(function(){
        j$(this).replaceWith(j$(this).find('.slds-pill__label').text());
    });
}

function saveFormula() {
    var isSuccess = true;
    Visualforce.remoting.Manager.invokeAction (
        SAVEFORMULA,
        projectIndicatorId,
        j$('#hiddenFormulaPIName').text(),
        j$('#hiddenFormulaPIId').text().replace(/ /g, " "),
        j$('#formulaInput').html(),
        function(result, event) {
            if (event.status) {
                isSuccess = true;
            }
            else {
                showPopupException(event.message);
                isSuccess = false;
            }
        },
        {escape: true}
    );
    return isSuccess;
}

function showPopupException(errorMsg) {
    addError('calculationPopupHeader');
    addErrorMessage('calculationHeaderError', errorMsg);
}

function showLoader() {
    j$('#calcDivProcessing').css('display', 'block');
}


function hideLoader() {
    j$('#calcDivProcessing').css('display', 'none');
}

function addError(headerId) {
    j$('[id$=' + headerId + ']').addClass('slds-theme--error slds-theme--alert-texture');
}

function addErrorMessage(errorMessageHolder, message) {
    j$('[id$=' + errorMessageHolder + ']').text(GENERIC_EXCEPTION_MSG + ' ' + message);
}

function removePopupException(headerId, errorMessageHolderId) {
    j$('[id$=' + headerId + ']').removeClass('slds-theme--error slds-theme--alert-texture');
    j$('[id$=' + errorMessageHolderId + ']').text(' ');
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

function closeDropDownOnDocumentClick() {
    j$(document).click(function(e) {
        var target = e.target;
        if (!j$(target).is('#selectProjectIndicatorInput')) {
            j$('#indicatorsDropdownContainer').addClass('displayNoneElement');
        }
        if (!j$(target).is('#selectOperatorButton')) {
            j$('#operatorsDropdownContainer').addClass('displayNoneElement');
        }
    });
}

function showToast(elementId) {
    if (displaySuccessMessage == true) {
        showModal(elementId, elementId);
        setTimeout(
            function() {
                j$('#'+elementId).hide();
            },
            3000
        );
    }
}