$(document).ready(function () {
    $('form.k-form').find('select').each(function (i, el) {

        $(el).kendoDropDownList({
            //dataSource: ['Test1','Test2', 'Test3' ],

            optionLabel: "Here is your select...",

        });

    });

    $('form.k-form').find('input[type=text]').each((i, el) => {

        $(el).kendoTextBox()
    });

    $('form.k-form').find('textarea').each((i, el) => {

        if ($(el).hasClass('k-editor')) {
            $(el).kendoEditor({
                tools: [
                    "bold",
                    "italic",
                    "underline",
                    "undo",
                    "redo",
                    "justifyLeft",
                    "justifyCenter",
                    "justifyRight",
                    "insertUnorderedList",
                    "createLink",
                    "unlink",
                    "insertImage",
                    "tableWizard",
                    "createTable",
                    "addRowAbove",
                    "addRowBelow",
                    "addColumnLeft",
                    "addColumnRight",
                    "deleteRow",
                    "deleteColumn",
                    "mergeCellsHorizontally",
                    "mergeCellsVertically",
                    "splitCellHorizontally",
                    "splitCellVertically",
                    "tableAlignLeft",
                    "tableAlignCenter",
                    "tableAlignRight",
                    "formatting",
                    {
                        name: "fontName",
                        items: [
                            {text: "Andale Mono", value: "\"Andale Mono\""}, // Font-family names composed of several words should be wrapped in \" \"
                            {text: "Arial", value: "Arial"},
                            {text: "Arial Black", value: "\"Arial Black\""},
                            {text: "Book Antiqua", value: "\"Book Antiqua\""},
                            {text: "Comic Sans MS", value: "\"Comic Sans MS\""},
                            {text: "Courier New", value: "\"Courier New\""},
                            {text: "Georgia", value: "Georgia"},
                            {text: "Helvetica", value: "Helvetica"},
                            {text: "Impact", value: "Impact"},
                            {text: "Symbol", value: "Symbol"},
                            {text: "Tahoma", value: "Tahoma"},
                            {text: "Terminal", value: "Terminal"},
                            {text: "Times New Roman", value: "\"Times New Roman\""},
                            {text: "Trebuchet MS", value: "\"Trebuchet MS\""},
                            {text: "Verdana", value: "Verdana"},
                        ]
                    },
                    "fontSize",
                    "foreColor",
                    "backColor",
                ]
            });


        } else if ($(el).hasClass('k-editor-simple')) {
            $(el).kendoEditor({
                tools: [
                    "bold",
                    "italic",
                    "underline"
                ]
            });

        } else {
            $(el).kendoTextArea({rows: 5});
        }
        ;

    });

    $('form.k-form').find('input[type=checkbox]').each((i, el) => {

        if ($(el).hasClass('k-switch')) {
            $(el).kendoSwitch();

        } else {
            $(el).addClass('k-checkbox');
        }

    });

    $('form.k-form').find('input[type=reset]').each((i, el) => {
        $(el).addClass('k-button k-button-solid-secondary');
    });



});