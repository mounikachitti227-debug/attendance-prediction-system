function calculate() {

    let total = Number(document.getElementById("total").value);
    let attended = Number(document.getElementById("attended").value);
    let required = Number(document.getElementById("required").value);
    let remaining = Number(document.getElementById("remaining").value);

    if (total <= 0 || attended < 0 || attended > total ||
        required <= 0 || required >= 100 || remaining < 0) {

        document.getElementById("result").innerHTML =
            "Please enter valid values.";

        document.getElementById("recommendation").innerHTML = "";
        return;
    }

    let currentPercentage = (attended / total) * 100;

    let result = "";

    result += "<h2>Current Attendance</h2>";
    result += "Attendance: <b>" +
              currentPercentage.toFixed(2) +
              "%</b><br>";

    if (currentPercentage >= required) {

        let canMiss = Math.floor(
            attended / (required / 100) - total
        );

        result += "Status: <b>SAFE</b><br>";
        result += "You can miss <b>" +
                  canMiss +
                  "</b> more class(es).";

    } else {

        result += "Status: <b>SHORTAGE</b><br>";
    }

    document.getElementById("result").innerHTML = result;


    /* Recommendation */

    let recommendation = "";

    recommendation += "<div class='recommendation-box'>";
    recommendation += "<h2>Attendance Recommendation</h2>";

    if (remaining == 0) {

        recommendation +=
            "There are no remaining classes.";

    } else {

        let totalFutureClasses = total + remaining;

        let requiredAttended =
            Math.ceil((required / 100) * totalFutureClasses);

        let classesNeeded =
            requiredAttended - attended;

        if (classesNeeded <= 0) {

            recommendation +=
                "<p class='safe'>You already meet the required attendance.</p>";

            recommendation +=
                "You don't need to attend all remaining classes.";

        } else if (classesNeeded > remaining) {

            recommendation +=
                "<p class='danger'>75% attendance cannot be reached.</p>";

            recommendation +=
                "Even if you attend all <b>" +
                remaining +
                "</b> remaining classes, your final attendance will be only <b>" +
                ((attended + remaining) / totalFutureClasses * 100).toFixed(2) +
                "%</b>.";

            recommendation +=
                "<br><br><b>Recommendation:</b> Attend all remaining classes.";

        } else {

            let canMiss = remaining - classesNeeded;

            recommendation +=
                "<p><b>You need to attend " +
                classesNeeded +
                " out of the remaining " +
                remaining +
                " classes.</b></p>";

            recommendation +=
                "You can miss up to <b>" +
                canMiss +
                "</b> remaining class(es).";

            recommendation +=
                "<br><br><p class='safe'><b>Recommendation:</b> " +
                "Attend at least " +
                classesNeeded +
                " of the remaining " +
                remaining +
                " classes to reach " +
                required +
                "%.</p>";
        }
    }

    recommendation += "</div>";

    document.getElementById("recommendation").innerHTML =
        recommendation;
}
