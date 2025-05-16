function getImages(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
    var apiUrl = "https://kestrel.1678doozer.net";
    var eventKey = "2025week0";
    var apiKey = "Yz0i7S8O1L5FNXO0e8zhwbx7zdkntEhsFe2ovmukLl";

    var options = {
        'method': 'get' as GoogleAppsScript.URL_Fetch.HttpMethod,
        headers: {
            'Kestrel-API-Key': apiKey
        }
    };

    try {
        // Fetch the list of image names with auth
        var imageListResponse = UrlFetchApp.fetch(`${apiUrl}/database/pit_collection/image_list/${eventKey}`, options);
        var imageList = JSON.parse(imageListResponse.getContentText());
        Logger.log("Image list fetched:", imageList);

        // Iterate over the image names and fetch the images
        for (var i = 0; i < imageList.length; i++) {
            var imageName = imageList[i];
            var teamNumber = imageName.split('_')[0];
            var imageType = imageName.split('_')[1];
            
            // Fetch the image with auth
            var imageUrl = `${apiUrl}/database/pit_collection/images/${eventKey}/${imageName}`;
            var imageResponse = UrlFetchApp.fetch(imageUrl, options);
            var imageBlob = imageResponse.getBlob().setContentType('image/jpeg');
            
            // Determine the column based on the image type
            var column = (imageType === "split") ? 2 : 3;
            var row = i + 2;
            
            // Insert the team number and image into the sheet
            sheet.getRange(row, 1).setValue(teamNumber);
            sheet.insertImage(imageBlob, column, row);
        }
    } catch (error) {
        Logger.log("Error occurred:", error);
        throw error;
    }
}