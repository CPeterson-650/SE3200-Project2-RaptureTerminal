// -----------------------------
// Rapture Survival Terminal
// -----------------------------


// DATA
// Arrays containing JavaScript objects

const locations = [
    {
        name: "Neptune's Bounty",
        danger: "High"
    },
    {
        name: "Fort Frolic",
        danger: "High"
    },
    {
        name: "Arcadia",
        danger: "Medium"
    },
    {
        name: "Medical Pavilion",
        danger: "Medium"
    },
    {
        name: "Welcome Center",
        danger: "Low"
    }
];


const threats = [
    {
        name: "Leadhead Splicer",
        description: "An armed Splicer has been reported in the area."
    },
    {
        name: "Spider Splicer",
        description: "A highly mobile Spider Splicer is hunting nearby."
    },
    {
        name: "Big Daddy",
        description: "A Big Daddy is protecting the area."
    },
    {
        name: "Security Bots",
        description: "Rapture's security system has detected you."
    },
    {
        name: "Flooded Corridor",
        description: "Structural damage has flooded the surrounding area."
    }
];


const objectives = [
    "Locate emergency medical supplies.",
    "Restore power to the district.",
    "Recover a missing audio diary.",
    "Reach the nearest Bathysphere station.",
    "Find food and ammunition.",
    "Disable the local security system.",
    "Search the district for survivors."
];


const rewards = [
    "First Aid Kit",
    "EVE Hypo",
    "Ammunition",
    "Security Access Card",
    "Extra ADAM",
    "Emergency Supplies"
];


// -----------------------------
// DOM QUERYING
// -----------------------------

const generateButton = document.querySelector("#generate-button");

const archiveButton = document.querySelector("#archive-button");

const clearButton = document.querySelector("#clear-button");

const missionDisplay = document.querySelector("#mission-display");

const missionLog = document.querySelector("#mission-log");

const archiveDisplay = document.querySelector("#archive-display");


// -----------------------------
// RANDOMNESS
// -----------------------------

function getRandomItem(array) {

    const randomIndex =
        Math.floor(Math.random() * array.length);

    return array[randomIndex];
}


// -----------------------------
// GENERATE MISSION
// -----------------------------

function generateMission() {

    const location = getRandomItem(locations);

    const threat = getRandomItem(threats);

    const objective = getRandomItem(objectives);

    const reward = getRandomItem(rewards);


    // DOM MANIPULATION

    missionDisplay.innerHTML = "";

    missionDisplay.classList.remove(
        "low-danger",
        "medium-danger",
        "high-danger"
    );


    // Change the style depending on danger level

    if (location.danger === "Low") {

        missionDisplay.classList.add("low-danger");

    } else if (location.danger === "Medium") {

        missionDisplay.classList.add("medium-danger");

    } else {

        missionDisplay.classList.add("high-danger");

    }


    // DOM INSERTION

    const title = document.createElement("h3");

    title.textContent =
        "Mission: " + location.name;


    const dangerText = document.createElement("p");

    dangerText.textContent =
        "Danger Level: " + location.danger;


    const threatText = document.createElement("p");

    threatText.textContent =
        "Threat: " + threat.name;


    const threatDescription =
        document.createElement("p");

    threatDescription.textContent =
        threat.description;


    const objectiveText =
        document.createElement("p");

    objectiveText.textContent =
        "Objective: " + objective;


    const rewardText =
        document.createElement("p");

    rewardText.textContent =
        "Possible Reward: " + reward;


    missionDisplay.appendChild(title);

    missionDisplay.appendChild(dangerText);

    missionDisplay.appendChild(threatText);

    missionDisplay.appendChild(threatDescription);

    missionDisplay.appendChild(objectiveText);

    missionDisplay.appendChild(rewardText);


    addMissionToLog(
        location,
        threat,
        objective
    );
}


// -----------------------------
// MISSION LOG
// -----------------------------

function addMissionToLog(
    location,
    threat,
    objective
) {

    const emptyLog =
        document.querySelector("#empty-log");


    if (emptyLog) {

        emptyLog.remove();

    }


    const missionCard =
        document.createElement("div");

    missionCard.classList.add("mission-card");


    const missionTitle =
        document.createElement("h3");

    missionTitle.textContent =
        location.name;


    const missionInfo =
        document.createElement("p");

    missionInfo.textContent =
        "Threat: " +
        threat.name +
        " | Objective: " +
        objective;


    missionCard.appendChild(missionTitle);

    missionCard.appendChild(missionInfo);

    missionLog.prepend(missionCard);
}


// -----------------------------
// CLEAR MISSION LOG
// -----------------------------

function clearMissionLog() {

    missionLog.innerHTML = "";

    const message =
        document.createElement("p");

    message.id = "empty-log";

    message.textContent =
        "No completed mission assignments.";

    missionLog.appendChild(message);
}


// -----------------------------
// FETCH API
// -----------------------------

function loadArchive() {

    archiveDisplay.innerHTML =
        "<p>Connecting to Rapture archive...</p>";


    fetch("archive.json")

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            archiveDisplay.innerHTML = "";


            data.forEach(function (record) {

                const card =
                    document.createElement("div");

                card.classList.add(
                    "archive-card"
                );


                const title =
                    document.createElement("h3");

                title.textContent =
                    record.location;


                const description =
                    document.createElement("p");

                description.textContent =
                    record.description;


                const status =
                    document.createElement("p");

                status.textContent =
                    "Status: " +
                    record.status;


                card.appendChild(title);

                card.appendChild(description);

                card.appendChild(status);

                archiveDisplay.appendChild(card);

            });

        })

        .catch(function (error) {

            archiveDisplay.innerHTML =
                "<p>Unable to access archive.</p>";

            console.log(error);

        });
}


// -----------------------------
// EVENTS
// -----------------------------

generateButton.addEventListener(
    "click",
    generateMission
);


archiveButton.addEventListener(
    "click",
    loadArchive
);


clearButton.addEventListener(
    "click",
    clearMissionLog
);