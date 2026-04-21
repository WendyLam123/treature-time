function calculateExpenses() {

    // Grab the values the user typed in
    var totalBudget = Number(document.getElementById("totalBudget").value);
    var weeklyAllowance = Number(document.getElementById("weeklyAllowance").value);
    var cookingFrequency = Number(document.getElementById("cookingFrequency").value);
    var otherExpenses = Number(document.getElementById("otherExpenses").value);

    // Make sure the user actually filled things in
    if (totalBudget == 0) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Please enter your total budget!</p>";
        return;
    }

    // Drexel terms are about 10 weeks long
    var weeksPerTerm = 10;

    // Figure out how much money is left for housing + dining
    var spendingMoney = weeklyAllowance * weeksPerTerm;
    var moneyLeft = totalBudget - otherExpenses - spendingMoney;

    if (moneyLeft <= 0) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Your budget doesn't cover other expenses and spending money. Try adjusting your numbers.</p>";
        return;
    }

    // --- Housing Options (cost per term) ---
    var housingOptions = [
        { name: "Towers Hall", cost: 3840, style: "Traditional", notes: "Most social, classic high-rise, great for meeting people." },
        { name: "Bentley Hall", cost: 4015, style: "Traditional", notes: "Honors students, quiet, close to library." },
        { name: "Kelly Hall", cost: 4015, style: "Traditional", notes: "Neighborhood layout, great social scene." },
        { name: "Millennium Hall", cost: 4015, style: "Hybrid", notes: "Private-entry bathrooms, awesome city views." },
        { name: "North Hall", cost: 4310, style: "Suite", notes: "Apartment feel, 4-6 person suites with kitchenette." },
        { name: "Race Street", cost: 4310, style: "Suite", notes: "Close to classes and the gym, great for athletes." },
        { name: "Caneris Hall", cost: 4310, style: "Suite", notes: "Clean and reliable, 4-6 person suites." },
        { name: "Van Rensselaer", cost: 4310, style: "Suite", notes: "Historic brownstone feel, the only dorm with gas ranges for cooking." }
    ];

    // --- Dining Options (cost per term) ---
    var diningOptions = [
        { name: "Weekly 14 + $250 Dining Dollars", cost: 2210, swipes: "14 per week", dollars: 250, notes: "Good if you skip breakfast. Covers lunch and dinner daily." },
        { name: "All Access + $225 Dining Dollars", cost: 2380, swipes: "Unlimited", dollars: 225, notes: "Eat as much as you want at Urban Eatery. Great for athletes or big eaters." },
        { name: "All Access + $400 Dining Dollars", cost: 2565, swipes: "Unlimited", dollars: 400, notes: "Most flexible plan. Unlimited swipes plus lots of dining dollars." },
        { name: "150 Dining Dollars Only", cost: 150, swipes: "None", dollars: 150, notes: "Upperclassman option. Good if you mostly cook and just need a little campus money." },
        { name: "250 Dining Dollars Only", cost: 250, swipes: "None", dollars: 250, notes: "Upperclassman option. You handle most meals yourself." },
        { name: "500 Dining Dollars Only", cost: 500, swipes: "None", dollars: 500, notes: "Upperclassman option. Good balance if you cook often but still eat on campus sometimes." },
        { name: "800 Dining Dollars Only", cost: 800, swipes: "None", dollars: 800, notes: "Upperclassman option. Lots of campus dining flexibility without swipes." },
        { name: "Block 25 + $200 Dining Dollars", cost: 570, swipes: "25 per term", dollars: 200, notes: "Upperclassman option. About 2-3 dining hall meals a week." },
        { name: "Block 50 + $350 Dining Dollars", cost: 1020, swipes: "50 per term", dollars: 350, notes: "Upperclassman option. About 5 dining hall meals a week." },
        { name: "Block 80 + $500 Dining Dollars", cost: 1470, swipes: "80 per term", dollars: 500, notes: "Upperclassman option. Frequent dining hall visits plus spending money." }
    ];

    // --- Figure out which housing options fit the budget ---
    var affordableHousing = [];
    for (var i = 0; i < housingOptions.length; i++) {
        if (housingOptions[i].cost <= moneyLeft) {
            affordableHousing.push(housingOptions[i]);
        }
    }

    // --- Narrow down housing based on cooking habits ---
    // If they cook a lot, prioritize suite dorms (they have kitchens)
    var recommendedHousing = [];
    if (cookingFrequency >= 10) {
        // They cook a lot, suggest suites first, then anything else
        for (var i = 0; i < affordableHousing.length; i++) {
            if (affordableHousing[i].style == "Suite") {
                recommendedHousing.push(affordableHousing[i]);
            }
        }
        // If no suites fit the budget, fall back to all affordable options
        if (recommendedHousing.length == 0) {
            recommendedHousing = affordableHousing;
        }
    } else {
        // They don't cook much, all affordable options work
        recommendedHousing = affordableHousing;
    }

    // --- Figure out which dining plans fit the remaining budget after housing ---
    // We'll find the best housing + dining combo
    var bestCombos = [];

    for (var h = 0; h < recommendedHousing.length; h++) {
        var housingCost = recommendedHousing[h].cost;
        var budgetAfterHousing = moneyLeft - housingCost;

        for (var d = 0; d < diningOptions.length; d++) {
            var diningCost = diningOptions[d].cost;

            if (diningCost <= budgetAfterHousing) {
                // Score this combo: cooking frequency affects which dining plan is best
                var score = 0;

                // More cooking = prefer dining dollar only plans
                if (cookingFrequency >= 10 && diningOptions[d].swipes == "None") {
                    score = score + 3;
                }
                // Less cooking = prefer swipe plans
                if (cookingFrequency == 0 && diningOptions[d].swipes != "None") {
                    score = score + 3;
                }
                // Reward plans that use most of the budget (less waste)
                var totalCost = housingCost + diningCost;
                var budgetUsed = totalCost / moneyLeft;
                if (budgetUsed > 0.8) {
                    score = score + 2;
                }
                if (budgetUsed > 0.9) {
                    score = score + 1;
                }

                bestCombos.push({
                    housing: recommendedHousing[h],
                    dining: diningOptions[d],
                    totalCost: totalCost,
                    leftover: moneyLeft - totalCost,
                    score: score
                });
            }
        }
    }

    // Sort combos by score (highest first)
    bestCombos.sort(function(a, b) {
        return b.score - a.score;
    });

    // Only show the top 3 combos
    var topCombos = [];
    for (var i = 0; i < bestCombos.length && i < 3; i++) {
        topCombos.push(bestCombos[i]);
    }

    // --- Build the results HTML to show the user ---
    var resultHTML = "";

    resultHTML += "<div style = \"background: #07294d; color: yellow; padding: 15px; border-radius: 10px;\">";
    resultHTML += "<hr>";
    resultHTML += "<h2 style='color: #E9D358'>Your Budget Breakdown</h2>";
    resultHTML += "<p><b>Total Budget:</b> $" + totalBudget + "</p>";
    resultHTML += "<p><b>Other Expenses:</b> $" + otherExpenses + "</p>";
    resultHTML += "<p><b>Spending Money (10 weeks):</b> $" + spendingMoney + "</p>";
    resultHTML += "<p><b>Available for Housing + Dining:</b> $" + moneyLeft + "</p>";
    resultHTML += "<hr>";
    resultHTML += "</div>";

    if (topCombos.length == 0) {
        resultHTML += "<p style='color:red;'>Sorry, no housing and dining combos fit your budget. Try increasing your budget or reducing other expenses.</p>";
    } else {
        resultHTML += "<h2>Top Recommendations For You</h2>";

        for (var i = 0; i < topCombos.length; i++) {
            var combo = topCombos[i];

            resultHTML += "<div style='border: 2px solid #07294d; border-radius: 10px; padding: 20px; margin-bottom: 20px; background: #07294d;'>";
            resultHTML += "<h3 style='color: #E9D358'>Option " + (i + 1) + "</h3>";
            resultHTML += "<p><b>Housing:</b> " + combo.housing.name + " — $" + combo.housing.cost + "/term (" + combo.housing.style + ")</p>";
            resultHTML += "<p><em>" + combo.housing.notes + "</em></p>";
            resultHTML += "<p><b>Dining Plan:</b> " + combo.dining.name + " — $" + combo.dining.cost + "/term</p>";
            resultHTML += "<p><em>" + combo.dining.notes + "</em></p>";
            resultHTML += "<p><b>Combined Cost:</b> $" + combo.totalCost + "</p>";
            resultHTML += "<p><b>Money Left Over:</b> $" + combo.leftover + "</p>";
            resultHTML += "</div>";
        }
    }

    // Show the results on the page
    document.getElementById("result").innerHTML = resultHTML;
}
