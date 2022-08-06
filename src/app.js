var body = document.getElementById("body");
var table;
var headerNames = ["", "", "", "Equipment", "Stat Modifiers", "", "", "", "Moves"];
var subHeaderNames = ["Doodle", "Set Name", "Stars", "Helmet", "Amulet", "Artifact", "Stat 1", "Value", "Stat 2", "Value", "Trait", "Item", "Level", "Move 1", "Move 2", "Move 3", "Move 4"]
let allElements = [];

function createTable() {
    table = document.createElement("table");
    table.className = "gridtable";

    let thead = document.createElement("thead");
    let tSubHead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let headerRow = document.createElement("tr");
    let subHeaderRow = document.createElement("tr");

    headerNames.forEach(function (k) {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(k));
        if (k == "Equipment") {
            th.colSpan = 3;
        }
        if (k == "Moves" || k == "Stat Modifiers") {
            th.colSpan = 4;
        }

        headerRow.appendChild(th);
    });

    subHeaderNames.forEach(function (k) {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(k));
        subHeaderRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    tSubHead.appendChild(subHeaderRow);
    
    tbody = createTenRows(tbody);

    table.appendChild(thead);
    table.appendChild(tSubHead);
    table.appendChild(tbody);

    body.appendChild(table);

}

function saveSets() {
    let sets = {};

    for (let row in allElements) {
        if (allElements[row][1].value == "" || allElements[row][1].value == undefined) {
            break;
        }
        let set = createSet(allElements[row]);
        sets[set.setName] = set;
        console.log(set.name);
    } 

    if (Object.keys(sets).length != 0) {
        let json = JSON.stringify(sets);
        let pakoStuff = pako.deflate(json, {to: "string"});
        let encoded = btoa(pakoStuff);
        document.getElementById("export").value = encoded;
        document.getElementById("export").select();
        document.execCommand("copy");
        alert("Copied to clipbord");
    }
}
function createSet(row) {
    let set = {};

    set.name = row[0].value;
    set.setName = row[1].value;
    set.stars = row[2].value;

    set.helmet = row[3].value;
    set.amulet = row[4].value;
    set.artifact = row[5].value;
    
    set.posNature = row[6].value;
    set.mod1 = row[7].value;
    set.negNature = row[8].value;
    set.mod2 = row[9].value;

    set.ability = row[10].value;
    set.item = row[11].value;
    set.level = row[12].value;

    set.moves = {};
    set.moves.move1 = row[13].value;
    set.moves.move2 = row[14].value;
    set.moves.move3 = row[15].value;
    set.moves.move4 = row[16].value;

    return set;
}
function createHeader(text) {
    let hr = document.createElement("th");
    hr.innerHTML = text;
    return hr;
}

function createRow() {
    let row = document.createElement("tr");
    let elements = [];

    let pokeDropdown = createPokeDropdown();
    let setNameInput = createTextInput();

    let stars = createInput(1,6);
    stars.value = 6;

    let helmetSet = createHelmetDropdown();
    let amuletSet = createAmuletDropdown();
    let artifactSet = createArtifactDropdown();

    let posNat = createPosNatureDropdown();
    let mod1 = createNegNatureDropdown();
    let negNat = createPosNatureDropdown();
    let mod2 = createNegNatureDropdown();

    let abilityDropdown = createAbilityDropdown();
    let itemDropdown = createItemyDropdown();

    let level = createInput(1, 100);
    level.value = 100;

    let moveOne = createMoveDropdown();
    let moveTwo = createMoveDropdown();
    let moveThree = createMoveDropdown();
    let moveFour = createMoveDropdown();

    elements.push(pokeDropdown, setNameInput, stars, helmetSet, amuletSet, artifactSet);
    elements.push(posNat, mod1, negNat, mod2, abilityDropdown, itemDropdown, level, moveOne, moveTwo, moveThree, moveFour);

    allElements.push(elements);

    for (let element in elements) {
        let td = document.createElement("td");
        td.appendChild(elements[element]);
        row.appendChild(td);
    }
    return row;
}

function createTenRows(tbody) {
    for (let i = 0; i < 10; i++) {
        let newRow = createRow();
        tbody.appendChild(newRow);
    }
    return tbody;
}

function createPokeDropdown() {
    let dropdown = document.createElement("select");
    dropdown.className = "pokeSelect";

    for (let loom in loomians) {
        dropdown.options[dropdown.options.length] = new Option(loomians[loom].name); 
        
    }
    return dropdown;
}

function createMoveDropdown() {
    let dropdown = document.createElement("select");
    let moveNames = [];
    dropdown.className = "moveSelect";

    for (let move in moves) {
        moveNames.push(moves[move].name);
    }

    moveNames.sort();

    for (let move in moveNames) {
        dropdown.options[dropdown.options.length] = new Option(moveNames[move]);
    }

    return dropdown;
}

function createPosNatureDropdown() {
    let dropdown = document.createElement("select");
    
    dropdown.options[0] = new Option("None", "none");
    dropdown.options[1] = new Option("Health", "health");
    dropdown.options[2] = new Option("Attack", "attack");
    dropdown.options[3] = new Option("Defense", "defense");
    dropdown.options[4] = new Option("M Attack", "mAttack");
    dropdown.options[5] = new Option("M Defense", "mDefense");
    dropdown.options[6] = new Option("Speed", "speed");

    return dropdown;
}

function createNegNatureDropdown() {
    let dropdown = document.createElement("select");
    
    dropdown.options[0] = new Option("10");
    dropdown.options[1] = new Option("5");
    dropdown.options[2] = new Option("-5");
    dropdown.options[3] = new Option("-10");

    return dropdown;
}

/*function createVeryNatureDropdown() {
    let dropdown = document.createElement("select");
    dropdown.options[0] = new Option("None", "none");
    dropdown.options[1] = new Option("Very Brawny", "vBrawny");
    dropdown.options[2] = new Option("Very Robust", "vRobust");
    dropdown.options[3] = new Option("Very Smart", "vSmart");
    dropdown.options[4] = new Option("Very Clever", "vClever");
    dropdown.options[5] = new Option("Very Nimble", "vNimble");
    dropdown.options[6] = new Option("Very Frail", "vFrail");
    dropdown.options[7] = new Option("Very Tender", "vTender");
    dropdown.options[8] = new Option("Very Clumsy", "vClumsy");
    dropdown.options[9] = new Option("Very Foolish", "vFoolish");
    dropdown.options[10] = new Option("Very Sluggish", "vSluggish");  
    
    return dropdown;
}*/
function createAbilityDropdown() {
    let dropdown = document.createElement("select");

    dropdown.options[0] = new Option("None");
    abilities.sort();

    for (let ability in abilities) {
        dropdown.options[dropdown.options.length] = new Option(abilities[ability]);
    }

    return dropdown;
}

function createItemyDropdown() {
    let dropdown = document.createElement("select");
    
    dropdown.options[0] = new Option("None");
    items.sort();

    for (let item in items) {
        dropdown.options[dropdown.options.length] = new Option(items[item]);
    }

    return dropdown;
}

function createHelmetDropdown() {
    let dropdown = document.createElement("select");
    let helmetNames = [];

    for (let helmet in helmets) {
        helmetNames.push(helmets[helmet].name);
    }
    
    helmetNames.sort();

    for (let helmet in helmetNames) {
        dropdown.options[dropdown.options.length] = new Option(helmetNames[helmet]);
    }

    return dropdown;
}

function createAmuletDropdown() {
    let dropdown = document.createElement("select");
    let amuletNames = [];

    for (let amulet in amulets) {
        amuletNames.push(amulets[amulet].name);
    }
    
    amuletNames.sort();

    for (let amulet in amuletNames) {
        dropdown.options[dropdown.options.length] = new Option(amuletNames[amulet]);
    }

    return dropdown;
}

function createArtifactDropdown() {
    let dropdown = document.createElement("select");
    let artifactNames = [];

    for (let artifact in artifacts) {
        artifactNames.push(artifacts[artifact].name);
    }
    
    artifactNames.sort();

    for (let artifact in artifactNames) {
        dropdown.options[dropdown.options.length] = new Option(artifactNames[artifact]);
    }

    return dropdown;
}

function createInput(min, max) {
    let input = document.createElement("input");
    input.type = "number";
    input.min = min;
    input.max = max;

    input.addEventListener("keyup", function() {
        input.value = restrict(input.value, input.min, input.max);
    });

    input.value = 0;
    return input;
}

function createTextInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.className = "textInput";
    
    return input;
}

function restrict(value, min, max) {
    if (parseInt(value) < min) {
        return min;
    }
    else if (parseInt(value) > max) {
        return max;
    }

    return value;
}
