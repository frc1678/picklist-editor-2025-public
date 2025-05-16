// Copyright (c) 2023 FRC 1678 Citrus Circuits

const firstPickCols = ["first_pickability"];
const secondPickCols = [
    "defensive_second_pickability",
    "offensive_second_pickability"
];
/**
 * Shows the first pickability columns and hides the second pickability columns.
 *
 * Sorts the teams by first pickability.
 */
function goToFirstPick() {
    settingsSheet.getRange("B4").setValue("FALSE");
    for (let i = 1; i <= mainEditorSheet.getLastColumn(); i++) {
        if (firstPickCols.includes(mainEditorSheet.getRange(2, i).getValue())) {
            mainEditorSheet.showColumns(i);
        } else if (secondPickCols.includes(mainEditorSheet.getRange(2, i).getValue())) {
            mainEditorSheet.hideColumns(i);
        }
    }
    // Get the first pickability column, used to sort the teams
    // var columnOfFirstPickability = 1;
    // for (var i = 1; i <= mainEditorSheet.getLastColumn(); i++) {
    //     if (mainEditorSheet.getRange(2, i).getValue() == "first_pickability") {
    //         columnOfFirstPickability = i;
    //         break;
    //     }
    // }
    // // Sort the teams by first pickability
    // var teamsCol = mainEditorSheet.getRange(
    //     4,
    //     1,
    //     mainEditorSheet.getLastRow() - 3,
    //     mainEditorSheet.getLastColumn()
    // );
    // teamsCol.sort({ column: columnOfFirstPickability, ascending: false });
    // // Renumber the order numbers
    // renumberOrder(mainEditorSheet);
}

/**
 * Shows the second pickability columns and hides the first pickability columns.
 */
function goToSecondPick() {
    for (let i = 1; i <= mainEditorSheet.getLastColumn(); i++) {
        if (firstPickCols.includes(mainEditorSheet.getRange(2, i).getValue())) {
            mainEditorSheet.hideColumns(i);
        } else if (secondPickCols.includes(mainEditorSheet.getRange(2, i).getValue())) {
            mainEditorSheet.showColumns(i);
        }
    }
}
