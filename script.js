String.prototype.toSentenceCase = function () {
    "use strict";
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

function convert() {
    "use strict";
    var w = 0,
        d = new Date(),
        yr = d.getFullYear(),
        dow = d.getDay(),
        finalDate = "",
        simplerDate = "";
    
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    w = Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7) + 1;
    
    var simple = new Date(yr, 0, 1 + (w - 1) * 7),
        ISOweekStart = simple,
        plusSix = simple;
    
    if (dow <= 4) {
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    simplerDate = simple.format("mmmm d");
    plusSix.setDate(simple.getDate() + 6);
    plusSix = plusSix.format("mmmm d");
    finalDate = String(simplerDate + " – " + plusSix);
    
	var inputBox = document.getElementById("stuffs"),
        resultSpiel = document.getElementById("result"),
        text = inputBox.value,
        x = "",
        y = "",
        clippings = "",
        urls = "",
        works = "",
        posPer = "",
        negPer = "",
        mixedPer = "",
        str = "",
        about = "",
        workLength = 0,
        clippingLength,
        findWholeClipping = /(--)(\n.*?)+?(--)/igm, // Finds a whole clipping
        findCountry = /^(Nigeria|India|Mexico|Brazil|Indonesia|Egypt)/igm,
        findClipping = /(.*\s-\s.*|^Nigeria|^India|^Mexico|^Brazil|^Indonesia|^Egypt)/igm, // Finds the work-title thing
        findURL = /http.*/g, // Finds the URL
        findWork = /(.*?)\s-\s/, // Finds the hyphen separator
        findPosPer = /^(Positive).*/igm,
        findNegPer = /^(Negative).*/igm,
        findMixedPer = /^(Mixed).*/igm,
        findGeneric = /http.*\n^.*\n(Positive|Negative|Mixed)/igm,
        wholes = text.match(findWholeClipping); // put clippings in array
    
	resultSpiel.innerHTML = ""; //blank it!
    
    resultSpiel.innerHTML += "===" + finalDate + "===\n\n";
    
	for (var i = 0; i < wholes.length; i++) {
		// put clipping details in array
		clippings = wholes[i].match(findClipping); 
		// put url in array
		urls = wholes[i].match(findURL);
		// put work in array
		works = wholes[i].match(findWork);
		posPer = wholes[i].match(findPosPer);
		negPer = wholes[i].match(findNegPer);
		mixedPer = wholes[i].match(findMixedPer);
        str = String(wholes[i].match(findGeneric)); //should be null if a country
        about = str.replace(findURL,"").replace(findPosPer,"").replace(findNegPer,"").replace(findMixedPer,"").replace(/\n/igm," ");
		// To catch the clipping length
		clippingLength = clippings[0].length;
		// If this is null it means it's found a date, not a clipping...
        if (clippingLength < 10) {
            y = clippings[0].toSentenceCase();
        }
        
		if (works !== null || clippingLength > 10) {
  			// To catch the work length
			workLength = works[0].length; 
			x = "{{NRP\n|pub=" + works[0].substring(0, workLength - 3) + "\n|url=" + urls[0] + "\n|title=" + clippings[0].substring(workLength, clippingLength) + "\n|about=" + about;
            if (posPer !== null) {
                x += "\n|positive=" + String(posPer[0]).replace(/Positive.*?\:.?/ig,"");
            }
            if (negPer !== null) {
                x += "\n|negative=" + String(negPer[0]).replace(/Negative.*?\:.?/ig,"");
            }
            if (mixedPer !== null) {
                x += "\n|mixed=" + String(mixedPer[0]).replace(/Mixed.*?\:.?/ig,"");
            }
            x += "\n|country=" + y + "\n|related=\n}}\n\n";
            resultSpiel.innerHTML += x;
		}
	}
}

$(document).ready(function () {
    $('button.help').click(function () {
        $('.helpbox').fadeToggle();  
    });
});