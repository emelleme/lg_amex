var Server = {
    /* Callback function to be set by client */
    dataReceivedCallback : null,
    XHRObj : null,
    url : "XML/videos.xml"

};

Server.init = function() {
    var success = true;
    if (this.XHRObj) {
        this.XHRObj.destroy();
        // Saves memory
        this.XHRObj = null;
    }
    return success;
}

Server.fetchVideoList = function() {
    if (this.XHRObj == null) {
        this.XHRObj = new XMLHttpRequest();
    }

    if (this.XHRObj) {
        this.XHRObj.onreadystatechange = function() {
            if (Server.XHRObj.readyState == 4) {
                Server.createVideoList();
            }
        }
        this.XHRObj.open("GET", this.url, true);
        this.XHRObj.send(null);
    } else {
        alert("Failed to create XHR");
    }
}

Server.createVideoList = function() {
    alert("XHR Object status===============================>" + this.XHRObj.status);
    var xmlElement = this.XHRObj.responseXML.documentElement,
        videoNames = [],
        videoURLs = [],
        videoDescriptions = [],
        index,
        items,
        titleElement,
        descriptionElement,
        linkElement;

    if (!xmlElement) {
        alert("Failed to get valid XML");
    } else {
        // Parse RSS
        // Get all "item" elements
        items = xmlElement.getElementsByTagName("item");

        for (index = 0; index < items.length; index++) {
            titleElement = items[index].getElementsByTagName("title")[0];
            descriptionElement = items[index].getElementsByTagName("description")[0];
            linkElement = items[index].getElementsByTagName("link")[0];

            if (titleElement && descriptionElement && linkElement) {
                videoNames[index] = titleElement.firstChild.data;
                videoURLs[index] = linkElement.firstChild.data;
                videoDescriptions[index] = descriptionElement.firstChild.data;
            }
        }
        Data.setVideoNames(videoNames);
        Data.setVideoURLs(videoURLs);
        Data.setVideoDescriptions(videoDescriptions);
        if (this.dataReceivedCallback) {
            this.dataReceivedCallback();
            /* Notify all data is received and stored */
        }
    }
}