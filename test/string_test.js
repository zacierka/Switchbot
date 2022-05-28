var trophies = [":1st_place_medal:", ":2nd_place_medal:", ":3rd_place_medal:"];
var results = [
    {memberName: "Mike", score: 7},
    {memberName: "Joe", score: 6},
    {memberName: "Louis", score: 5},
    {memberName: "Jack", score: 4},
    {memberName: "Kate", score: 3},
    {memberName: "Zac", score: 1},
];

var leaderboard = "```\n";
for (var i = 0; i < results.length; i++) {
    if (trophies.length > i) {
        var str = `${trophies[i]} ${results[i].memberName} ${results[i].score}\n`
        leaderboard += str;
        trophies.splice(i, 0);
    } else {
        var str = `${results[i].memberName} ${results[i].score}\n`
        leaderboard += str
    }
}
leaderboard += "```";
console.log(leaderboard);