function getDataObject(name, uploader, desc, url, thumbUrl) {
	var obj = new Object();
	obj.name = name;
	obj.uploader = uploader;
	obj.desc = desc;
	obj.url = url;
	obj.thumbUrl = thumbUrl;
	return obj;
}

var sampleArray = new Array();
var DISPLAY_COUNT = 33;

sampleArray[0]  = getDataObject("brown eyes girls", "sjlmf", "brown eyes girls", "../sampleImg/0.jpg", "../sampleImg/thumbnail/0.jpg");
sampleArray[1]  = getDataObject("sample_01", "sjlmf", "sample_desc_01", "../sampleImg/1.jpg", "../sampleImg/thumbnail/1.jpg");
sampleArray[2]  = getDataObject("sample_02", "atxtx", "sample_desc_02", "../sampleImg/2.jpg", "../sampleImg/thumbnail/2.jpg");
sampleArray[3]  = getDataObject("sample_03", "sjlmf", "sample_desc_03", "../sampleImg/3.jpg", "../sampleImg/thumbnail/3.jpg");
sampleArray[4]  = getDataObject("sample_04", "atxtx", "sample_desc_04", "../sampleImg/4.jpg", "../sampleImg/thumbnail/4.jpg");
sampleArray[5]  = getDataObject("sample_05", "sjlmf", "sample_desc_05", "../sampleImg/5.jpg", "../sampleImg/thumbnail/5.jpg");
sampleArray[6]  = getDataObject("sample_06", "atxtx", "sample_desc_06", "../sampleImg/6.jpg", "../sampleImg/thumbnail/6.jpg");
sampleArray[7]  = getDataObject("sample_07", "sjlmf", "sample_desc_07", "../sampleImg/7.jpg", "../sampleImg/thumbnail/7.jpg");
sampleArray[8]  = getDataObject("sample_08", "atxtx", "sample_desc_08", "../sampleImg/8.jpg", "../sampleImg/thumbnail/8.jpg");
sampleArray[9]  = getDataObject("sample_09", "sjlmf", "sample_desc_09", "../sampleImg/9.jpg", "../sampleImg/thumbnail/9.jpg");
sampleArray[10] = getDataObject("sample_10", "atxtx", "sample_desc_10", "../sampleImg/10.jpg", "../sampleImg/thumbnail/10.jpg");
sampleArray[11] = getDataObject("sample_11", "atxtx", "sample_desc_11", "../sampleImg/11.jpg", "../sampleImg/thumbnail/11.jpg");
sampleArray[12] = getDataObject("sample_12", "atxtx", "sample_desc_12", "../sampleImg/12.jpg", "../sampleImg/thumbnail/12.jpg");
sampleArray[13] = getDataObject("sample_13", "atxtx", "sample_desc_13", "../sampleImg/13.jpg", "../sampleImg/thumbnail/13.jpg");
sampleArray[14] = getDataObject("sample_14", "atxtx", "sample_desc_14", "../sampleImg/14.jpg", "../sampleImg/thumbnail/14.jpg");
sampleArray[15] = getDataObject("sample_15", "atxtx", "sample_desc_15", "../sampleImg/15.jpg", "../sampleImg/thumbnail/15.jpg");
sampleArray[16] = getDataObject("sample_16", "atxtx", "sample_desc_16", "../sampleImg/16.jpg", "../sampleImg/thumbnail/16.jpg");
sampleArray[17] = getDataObject("sample_17", "atxtx", "sample_desc_17", "../sampleImg/17.jpg", "../sampleImg/thumbnail/17.jpg");
sampleArray[18] = getDataObject("sample_18", "atxtx", "sample_desc_18", "../sampleImg/18.jpg", "../sampleImg/thumbnail/18.jpg");
sampleArray[19] = getDataObject("sample_19", "atxtx", "sample_desc_19", "../sampleImg/19.jpg", "../sampleImg/thumbnail/19.jpg");
sampleArray[20] = getDataObject("sample_20", "atxtx", "sample_desc_20", "../sampleImg/20.jpg", "../sampleImg/thumbnail/20.jpg");
sampleArray[21] = getDataObject("sample_21", "atxtx", "sample_desc_21", "../sampleImg/21.jpg", "../sampleImg/thumbnail/21.jpg");
sampleArray[22] = getDataObject("sample_22", "atxtx", "sample_desc_22", "../sampleImg/22.jpg", "../sampleImg/thumbnail/22.jpg");
sampleArray[23] = getDataObject("sample_23", "atxtx", "sample_desc_23", "../sampleImg/23.jpg", "../sampleImg/thumbnail/23.jpg");
sampleArray[24] = getDataObject("sample_24", "atxtx", "sample_desc_24", "../sampleImg/24.jpg", "../sampleImg/thumbnail/24.jpg");
sampleArray[25] = getDataObject("sample_25", "atxtx", "sample_desc_25", "../sampleImg/25.jpg", "../sampleImg/thumbnail/25.jpg");
sampleArray[26] = getDataObject("sample_26", "atxtx", "sample_desc_26", "../sampleImg/26.jpg", "../sampleImg/thumbnail/26.jpg");
sampleArray[27] = getDataObject("sample_27", "atxtx", "sample_desc_27", "../sampleImg/27.jpg", "../sampleImg/thumbnail/27.jpg");
sampleArray[28] = getDataObject("sample_28", "atxtx", "sample_desc_28", "../sampleImg/28.jpg", "../sampleImg/thumbnail/28.jpg");
sampleArray[29] = getDataObject("sample_29", "atxtx", "sample_desc_29", "../sampleImg/29.jpg", "../sampleImg/thumbnail/29.jpg");
sampleArray[30] = getDataObject("sample_30", "atxtx", "sample_desc_30", "../sampleImg/30.jpg", "../sampleImg/thumbnail/30.jpg");
sampleArray[31] = getDataObject("sample_31", "sjlmf", "sample_desc_31", "../sampleImg/31.jpg", "../sampleImg/thumbnail/31.jpg");
sampleArray[32] = getDataObject("sample_32", "atxtx", "sample_desc_32", "../sampleImg/32.jpg", "../sampleImg/thumbnail/32.jpg");
sampleArray[33] = getDataObject("sample_33", "sjlmf", "sample_desc_33", "../sampleImg/33.jpg", "../sampleImg/thumbnail/33.jpg");
sampleArray[34] = getDataObject("sample_34", "atxtx", "sample_desc_34", "../sampleImg/34.jpg", "../sampleImg/thumbnail/34.jpg");
sampleArray[35] = getDataObject("sample_35", "sjlmf", "sample_desc_35", "../sampleImg/35.jpg", "../sampleImg/thumbnail/35.jpg");
sampleArray[36] = getDataObject("sample_36", "atxtx", "sample_desc_36", "../sampleImg/36.jpg", "../sampleImg/thumbnail/36.jpg");
sampleArray[37] = getDataObject("sample_37", "sjlmf", "sample_desc_37", "../sampleImg/37.jpg", "../sampleImg/thumbnail/37.jpg");
sampleArray[38] = getDataObject("sample_38", "atxtx", "sample_desc_38", "../sampleImg/38.jpg", "../sampleImg/thumbnail/38.jpg");
sampleArray[39] = getDataObject("sample_39", "sjlmf", "sample_desc_39", "../sampleImg/39.jpg", "../sampleImg/thumbnail/39.jpg");
sampleArray[40] = getDataObject("sample_40", "atxtx", "sample_desc_40", "../sampleImg/40.jpg", "../sampleImg/thumbnail/40.jpg");
sampleArray[41] = getDataObject("sample_41", "atxtx", "sample_desc_41", "../sampleImg/41.jpg", "../sampleImg/thumbnail/41.jpg");
sampleArray[42] = getDataObject("sample_42", "atxtx", "sample_desc_42", "../sampleImg/42.jpg", "../sampleImg/thumbnail/42.jpg");
sampleArray[43] = getDataObject("sample_43", "atxtx", "sample_desc_43", "../sampleImg/43.jpg", "../sampleImg/thumbnail/43.jpg");
sampleArray[44] = getDataObject("sample_44", "atxtx", "sample_desc_44", "../sampleImg/44.jpg", "../sampleImg/thumbnail/44.jpg");
sampleArray[45] = getDataObject("sample_45", "atxtx", "sample_desc_45", "../sampleImg/45.jpg", "../sampleImg/thumbnail/45.jpg");
sampleArray[46] = getDataObject("sample_46", "atxtx", "sample_desc_46", "../sampleImg/46.jpg", "../sampleImg/thumbnail/46.jpg");
sampleArray[47] = getDataObject("sample_47", "atxtx", "sample_desc_47", "../sampleImg/47.jpg", "../sampleImg/thumbnail/47.jpg");
sampleArray[48] = getDataObject("sample_48", "atxtx", "sample_desc_48", "../sampleImg/48.jpg", "../sampleImg/thumbnail/48.jpg");
sampleArray[49] = getDataObject("sample_49", "atxtx", "sample_desc_49", "../sampleImg/49.jpg", "../sampleImg/thumbnail/49.jpg");
sampleArray[50] = getDataObject("sample_50", "atxtx", "sample_desc_50", "../sampleImg/50.jpg", "../sampleImg/thumbnail/50.jpg");
sampleArray[51] = getDataObject("sample_51", "atxtx", "sample_desc_51", "../sampleImg/51.jpg", "../sampleImg/thumbnail/51.jpg");
sampleArray[52] = getDataObject("sample_52", "atxtx", "sample_desc_52", "../sampleImg/52.jpg", "../sampleImg/thumbnail/52.jpg");
sampleArray[53] = getDataObject("sample_53", "atxtx", "sample_desc_53", "../sampleImg/53.jpg", "../sampleImg/thumbnail/53.jpg");
sampleArray[54] = getDataObject("sample_54", "atxtx", "sample_desc_54", "../sampleImg/54.jpg", "../sampleImg/thumbnail/54.jpg");
sampleArray[55] = getDataObject("sample_55", "atxtx", "sample_desc_55", "../sampleImg/55.jpg", "../sampleImg/thumbnail/55.jpg");
sampleArray[56] = getDataObject("sample_56", "atxtx", "sample_desc_56", "../sampleImg/56.jpg", "../sampleImg/thumbnail/56.jpg");
sampleArray[57] = getDataObject("sample_57", "atxtx", "sample_desc_57", "../sampleImg/57.jpg", "../sampleImg/thumbnail/57.jpg");
sampleArray[58] = getDataObject("sample_58", "atxtx", "sample_desc_58", "../sampleImg/58.jpg", "../sampleImg/thumbnail/58.jpg");
sampleArray[59] = getDataObject("sample_59", "atxtx", "sample_desc_59", "../sampleImg/59.jpg", "../sampleImg/thumbnail/59.jpg");
sampleArray[60] = getDataObject("sample_60", "atxtx", "sample_desc_60", "../sampleImg/60.jpg", "../sampleImg/thumbnail/60.jpg");


/*

*/