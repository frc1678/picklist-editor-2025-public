const lfm = [];
const notLFM = [
  // Pickabilities
  "foul_cc",
  "first_pickability",
  "second_pickability",
  // Subj scout data
  "driver_field_awareness",
  "driver_agility",
  "driver_ability",
  // Pit data
  "can_intake_ground",
  "weight",
  // Manually inputted datapoints from matt
  "electrical_robustness",
  "mechanical_robustness",
  // Other
  "has_compatible_auto",
  "was_tippy",
  "avg_defense_rating",
];

function toggleLFM(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  sheet.showRows(1);
  sheet.showRows(2);
  
  // Whether you are in the main editor or the final picklist
  let start = (sheet.getName() == "Main Editor")? 3 : 4
  // Checking if LFM checkbox is checked
  if (sheet.getRange("A3").getValue()) {
    // Loop through every column on second row and add lfm to them if they aren't lfm already
    for (let i = start; i <= sheet.getLastColumn(); i++) {
      let range = sheet.getRange(2, i);
      if (!notLFM.includes(range.getValue())) {
        if (!range.getValue().startsWith("lfm")) {
          range.setValue("lfm_" + range.getValue());
        }
      }
    }
  } else {
    
    // Loop through every column on the second row and remove lfm to them if they aren't in the notLFM list.
    for (let i = start; i <= sheet.getLastColumn(); i++) {
      let range = sheet.getRange(2, i);
      if (!notLFM.includes(range.getValue())) {
        if (range.getValue().startsWith("lfm")) {
          range.setValue(range.getValue().replace("lfm_", ""));
        }
      }
    }
  }

  sheet.hideRows(1);
  sheet.hideRows(2);
}
