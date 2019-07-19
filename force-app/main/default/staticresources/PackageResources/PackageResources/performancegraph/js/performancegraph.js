
    function getProjectIndicators() {
        var array = [];
        j$('#checkBoxHolder :checkbox:checked').each(function(){
            array.push(j$(this).attr('project-indicator'));
        });
        printSelectedCheckboxes(array.length);
        return array;
    }

    function checkIfProjectIndicatorExist() {
        return j$('#checkBoxHolder :checkbox').length;
    }

    function printSelectedCheckboxes() {
        var number = calculateCheckBoxes();
        validateTotalCheckBoxes(number);
        j$('#counter').attr('label', '(' + number + ') Selected');
    }

    function calculateCheckBoxes() {
        return j$('#checkBoxHolder :checkbox:checked').length;
    }

    function validateTotalCheckBoxes(number) {
        if (number >= 9) {
            enableAndDisableCheckBox(true);
        }
        else {
            enableAndDisableCheckBox(false);
        }
    }

    function enableAndDisableCheckBox(boolean) {
        j$('#checkBoxHolder :checkbox:not(:checked)').each(function() {
            j$(this).attr('disabled', boolean);
        });
    }

    function renderCharts() {
        clearCharts();
        loadChartData(getProjectIndicators());
    }

    function clearCharts() {
        j$('#chartHolder div').html('');
    }

    function buildChart(result) {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
                decimalPoint: '.'
            }
        });
        for (var i = 0; i < result.length; i++) {
            Highcharts.chart('container' + i, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: result[i].description
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories : result[i].categories,
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                        minPointLength: 3
                    }
                },
                credits: {
                    enabled: false
                },
                colors: ['#87CEEB', '#90ED7D'],
                series: result[i].columns
            });
        }
    }

    function toggleDiv() {
        j$('#checkBoxHolder').toggle();
    }

    function hideOptions() {
        j$('#checkBoxHolder').hide();
    }

    function showContent(elementId) {
        j$('#' + elementId).show();
    }

    function hideContent(elementId) {
        j$('#' + elementId).hide();
    }

    function loadChartData(projectIndicators) {
        Visualforce.remoting.Manager.invokeAction(
            GETCOLUMNCHART,
            projectIndicators,
            function(result, event){
                if (event.status) {
                    if (result.length != 0) {
                        showContent('selectListHolder');
                        showContent('chartHolder');
                        hideContent('erroPanel');
                        buildChart(result);
                    }
                    if (checkIfProjectIndicatorExist() == 0) {
                        hideContent('selectListHolder');
                        showContent('erroPanel');
                    }
                }
            },
            {escape: false}
        );
    }