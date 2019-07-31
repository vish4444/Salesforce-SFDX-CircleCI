*** Settings ***
Suite Setup       Open Test Browser    #
#Suite Teardown    Delete Records and Close Browser    #
Resource          Salesforce.robot

*** Test Cases ***
Test case 1
    [Documentation]    Test case 1: Verify that user is able to login to salesforce and create a new Contact record successfully by populating the following fields:
    ${first_name} =    Generate Random String
    ${last_name} =    Generate Random String
    Select App Launcher App    Service
    Current App Should Be    Service
    Go To Object Home    Contact
    Click Object Button    New
    Validate contact Fields
    Populate Form    First Name=${first_name}    Last Name=${last_name}
    Capture Page Screenshot  filename=selenium-screenshot.png
    Click Modal Button    Save
    Wait Until Modal Is Closed
    ${contact_id} =    Get Current Record Id
    Store Session Record    Contact    ${contact_id}
    Validate Contact    ${contact_id}    ${first_name}    ${last_name}

Test case 2
    [Documentation]    Test case 2: Verify that an error message is displayed to the user if he tries to save a New Contact record without entering the LastName.
    ...    Type of scenario: error validation
    ${first_name} =    Generate Random String
    ${last_name} =    Generate Random String
    Select App Launcher App    Service
    Current App Should Be    Service
    Go To Object Home    Contact
    Click Object Button    New
    Click Modal Button    Save
    Error Validation for last Name

*** Keywords ***
Validate Contact
    [Arguments]    ${contact_id}    ${first_name}    ${last_name}
    # Validate via UI
    Go To Record Home    ${contact_id}
    Page Should Contain    ${first_name} ${last_name}
    # Validate via API
    &{contact} =    Salesforce Get    Contact    ${contact_id}
    Should Be Equal    ${first_name}    &{contact}[FirstName]
    Should Be Equal    ${last_name}    &{contact}[LastName]

Validate contact Fields
    [Documentation]    Validate feild in New Contact tab
    Element Should Be Visible    //*[text()='Salutation']    Salutation
    Element Should Be Visible    //*[text()='Last Name']    Last Name
    Element Should Be Visible    //*[text()='Birthdate']    Birthdate
    Element Should Be Visible    //*[text()='Mailing Street']    Mailing Street
    Element Should Be Visible    //*[text()='Mailing Zip/Postal Code']    Mailing Zip/Postal Code
    Element Should Be Visible    //*[text()='Description']    Description

Error Validation for last Name
    Sleep    10s
    Element Should Be Visible    //*[text()='These required fields must be completed: Last Name']
