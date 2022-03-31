const fs = require('fs');
const { off } = require('process');

let example = {
    source: "",
    name: "",
    bonuses: [],
    worksInGame: true,
}

let exportedPath = "IdleonWikiBot3.0/exported/";
let output = [];
// ----------------------------------- Helper Data ---------------------------------
let EnemyRepo = getJSONFromFile(exportedPath + "repo/Enemy/EnemyRepo.json");
let ItemDetailRepo = getJSONFromFile(exportedPath + "repo/Item/ItemDetailRepo.json");

// ----------------------------------- REPO -----------------------------------
// repo/Worlds/*/
runParser(parseBribeRepo, exportedPath + "repo/Worlds/1/BribeRepo.json");
runParser(parseBubbleRepo, exportedPath + "repo/Worlds/2/BubbleRepo.json");
runParser(parsePostOfficeUpgradesRepo, exportedPath + "repo/Worlds/2/PostOfficeUpgradesRepo.json");
runParser(parseBuildingRepo, exportedPath + "repo/Worlds/3/BuildingRepo.json");
runParser(parsePrayerRepo, exportedPath + "repo/Worlds/3/PrayerRepo.json");
runParser(parseSaltLickRepo, exportedPath + "repo/Worlds/3/SaltLickRepo.json");
runParser(parseShrineRepo, exportedPath + "repo/Worlds/3/ShrineRepo.json");
runParser(parseArenaBonusRepo, exportedPath + "repo/Worlds/4/ArenaBonusRepo.json");
runParser(parseChipRepo, exportedPath + "repo/Worlds/4/ChipRepo.json");
runParser(parseJewelRepo, exportedPath + "repo/Worlds/4/JewelRepo.json");
runParser(parseLabBonusRepo, exportedPath + "repo/Worlds/4/LabBonusRepo.json");
runParser(parseMealRepo, exportedPath + "repo/Worlds/4/MealRepo.json");
runParser(parsePetUpgradeRepo, exportedPath + "repo/Worlds/4/PetUpgradeRepo.json");


// repo/Talents/*
runParser(parseTalentTreeRepo, exportedPath + "repo/Talents/TalentTreeRepo.json");

// repo/Misc/*
runParser(parseAchievementRepo, exportedPath + "repo/Misc/AchievementRepo.json");
runParser(parseGemShopRepo, exportedPath + "repo/Misc/GemShopRepo.json");
runParser(parseGuildBonusRepo, exportedPath + "repo/Misc/GuildBonusRepo.json");
runParser(parseStarSignsRepo, exportedPath + "repo/Misc/StarSignsRepo.json");
runParser(parseTaskShopDescRepo, exportedPath + "repo/Misc/TaskShopDescRepo.json");

// repo/Item/* 
runParser(parseCardRepo, exportedPath + "repo/Item/CardRepo.json");
runParser(parseSpecificItemRepo, exportedPath + "repo/Item/SpecificItemRepo.json"); //INCOMPLETE
runParser(parseStatueRepo, exportedPath + "repo/Item/StatueRepo.json");

// repo/Dungeon/*
runParser(parseDungPassivesRepo, exportedPath + "repo/Dungeon/DungPassivesRepo.json");

//TODO KeychainBonusRepo?

// repo/Arcade/*
runParser(parseArcadeBonusRepo, exportedPath + "repo/Arcade/ArcadeBonusRepo.json");

// ------------------------------- Add Manual ----------------------------
runParser(function(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    if(body.name === "example"){
        return;
    }
    output.push({
        source: body.source,
        name: body.name,
        bonuses: body.bonuses,
        worksInGame: body.worksInGame
    })
}, "manual/manual.json");

// console.log(JSON.stringify(output));
// searchOutput(/mining[a-zA-Z _]*(eff|power)|skilling power/i, output);
// searchOutput(/Skill Efficiency/i, output);
// searchName(/Coconut/i, output);

fs.writeFile("output/output.json", JSON.stringify(cleanOutput(output)), (err) => {
    if(err) throw err;
})

//parsing functions
function parseBribeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Bribe",
        name: key,
        bonuses: [body.desc],
        worksInGame: true
    });
}

function parseBubbleRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    // include bubble tool descriptions as wiki data doesn't have right now
    let description = body.description;
    if(key === "Le Brain Tools") description = description.replace("$", "Hatchets");
    if(key === "Stronk Tools") description = description.replace("$", "Pickaxes and Fishing Rods");
    if(key === "Sanic Tools") description = description.replace("$", "Catching Nets");
    output.push({
        source: body.cauldron,
        name: key,
        bonuses: [description],
        worksInGame: true
    });
}

function parsePostOfficeUpgradesRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Post Office Box",
        name: key,
        bonuses: function(){
            let r = [];
            for(bonus of body.bonuses){
                r.push(bonus.bonus);
            }
            return r;
        }(),
        worksInGame: true
    });
}

function parseBuildingRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Building Upgrade",
        name: key,
        bonuses: [body.bonus],
        worksInGame: true
    });
}

function parsePrayerRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Prayer",
        name: key,
        bonuses: [body.bonus, body.curse],
        worksInGame: true
    });
}

function parseSaltLickRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Salt Lick",
        name: ItemDetailRepo[key].displayName,
        bonuses: [body.desc],
        worksInGame: true
    });
}

function parseShrineRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Shrine",
        name: key,
        bonuses: [body.desc],
        worksInGame: true
    });
}

function parseTalentTreeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    Object.entries(body.talents).forEach(function(keyValue2){
        key2 = keyValue2[0];
        body2 = keyValue2[1];
        output.push({
            source: key + " Talents",
            name: key2,
            bonuses: [body2.description],
            worksInGame: true
        });
    })
}

function parseAchievementRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Achievement",
        name: key,
        bonuses: [body.rewards],
        worksInGame: true
    });
}

function parseGemShopRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Gem Shop",
        name: body.itemName,
        bonuses: [body.desc],
        worksInGame: true
    });
}

function parseGuildBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Guild Bonus",
        name: key,
        bonuses: [body.bonus],
        worksInGame: true
    });
}

function parseStarSignsRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    if(key.includes("Unknown") || key.includes("Filler")){
        return;
    }
    output.push({
        source: "Star Sign",
        name: key,
        bonuses: [body.text],
        worksInGame: true
    });
}

//TODO change from task shop num maybe?
function parseTaskShopDescRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Task Shop",
        name: "Upgrade: " + key, //TODO map to name?
        bonuses: [body.descLine1 + body.descLine2],
        worksInGame: true
    });
}

function parseCardRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    if(key === "Blank"){
        return;
    }
    output.push({
        source: "Card",
        name: EnemyRepo[key].details.Name,
        bonuses: [body.effect],
        worksInGame: true
    });
}

function parseStatueRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Statue",
        name: body.name,
        bonuses: [body.effect],
        worksInGame: true
    });
}

//TODO map bonus to full name?
function parseArcadeBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Arcade Bonus",
        name: key,
        bonuses: [body.effect],
        worksInGame: true
    });
}

function parseSpecificItemRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    const skipList = ["NothingERROR", "aError", "dQuest", "bOre", "bBar", "bLog", "bLeaf", "dFish", "dCritters", "dBugs", "dSouls", "dStatueStone", "aRecipe", "aTalentBook", "aCarryBag", "bCraft", "dTimeCandy", "aInventoryBag", "aStorageChest", "dFishToolkit", "dCard", "dCurrency", "dCardPack"]
    let typeGen = body.typeGen;
    if(skipList.indexOf(typeGen) > -1){
        return;
    }
    let bonusesAndSource = getSpecificItemBonuses(body);
    let bonuses = bonusesAndSource[0];
    let source = bonusesAndSource[1];
    if(bonuses[0] === "INSIGHT ERROR" || source === "SKIP"){
        return;
    }
    let displayName = body.displayName;
    if(displayName === "FILLER"){
        return;
    }
    output.push({
        source: source,
        name: displayName,
        bonuses: bonuses,
        worksInGame: true
    });
}

function getSpecificItemBonuses(body){
    const armorList = ["aHelmet", "aShirt", "aPants", "aShoes", "aPendant", "aRing", "aChatRingMTX", "aTrophy", "aHelmetMTX", "aCape", "aKeychain"];
    const toolList = ["aPick", "aHatchet", "aFishingRod", "aBugNet", "aTrap", "aSkull", "aDNAgun"];
    const obolList = ["aObolCircle", "aObolSquare", "aObolHexagon", "aObolSparkle"]; 
    const keysList = ["Weapon_Power", "STR", "AGI", "WIS", "LUK", "Defence"];
    const weaponKeysList = ["Weapon_Power", "STR", "AGI", "WIS", "LUK", "Defence", "Speed","Reach"];
    let typeGen = body.typeGen;
    if(armorList.indexOf(typeGen) > -1){

        let r = [];
        for(armorKey of keysList){
            if(body[armorKey] != 0){
                r.push(armorKey + ": " + body[armorKey]);
            }
        }
        if(body.miscUp1 != "" && body.miscUp1 != "00"){
            r.push(body.miscUp1);
        }
        if(body.miscUp2 != "" && body.miscUp2 != "00" && typeGen != "aKeychain"){
            r.push(body.miscUp2);
        }
        return [r, "Armor"];
    }

    if(toolList.indexOf(typeGen) > -1){
        let r = [];
        r.push(body.Skill_Power + " " + body.Skill + " Power");
        r.push(body.Speed + " " + body.Skill + " Speed");
        for(toolKey of keysList){
            if(body[toolKey] != 0){
                r.push(toolKey + ": " + body[toolKey]);
            }
        }
        if(body.miscUp1 != "" && body.miscUp1 != "00"){
            r.push(body.miscUp1);
        }
        if(body.miscUp2 != "" && body.miscUp2 != "00"){
            r.push(body.miscUp2);
        }
        return [r, "Tool"];
    }

    if(obolList.indexOf(typeGen) > -1){
        let r = [];
        if(body.Skill != ""){
            r.push(body.Skill_Power + " " + body.Skill + " Power");
        }
        for(obolKey of keysList){
            if(body[obolKey] != 0){
                r.push(obolKey + ": " + body[obolKey]);
            }
        }
        if(body.miscUp1 != "" && body.miscUp1 != "00"){
            r.push(body.miscUp1);
        }
        if(body.miscUp2 != "" && body.miscUp2 != "00"){
            r.push(body.miscUp2);
        }
        return [r, "Obol"];
    }

    if(typeGen === "aWeapon"){
        let r = [];
        //ignore dungeon weapons, as they are very spammy for the output...
        if(body.internalName.includes("DungWeapon")){
            return [r, "SKIP"];
        }
        for(weaponKey of weaponKeysList){
            if(body[weaponKey] != 0){
                r.push(weaponKey + ": " + body[weaponKey]);
            }
        }
        if(body.miscUp1 != "" && body.miscUp1 != "00"){
            r.push(body.miscUp1);
        }
        if(body.miscUp2 != "" && body.miscUp2 != "00"){
            r.push(body.miscUp2);
        }
        return [r, "Weapon"];
    }

    switch(typeGen){
        case "aStamp":
            return [[body.bonus], "Stamp"];
        case "cFood":
            return [[body.description], "Food"];
        case "cOil":
            return [[body.description], "Forge Oil"];
        case "dStone":
            return [[body.description], "Upgrade Stone"];
        default:
            console.error("Unhandled typeGen: " + typeGen);
            return [["INSIGHT ERROR"], "INSIGHT ERROR"];
    }   
}

function parseDungPassivesRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    if(key === "Flurbo"){
        for(passive of body.passives){
            output.push({
                source: "Dungeon",
                name: "Flurbo passive",
                bonuses: [passive.effect],
                worksInGame: true
            });
        }
    }
}


function parseArenaBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Pet Arena Bonus",
        name: key,
        bonuses: [body.desc],
        worksInGame: true
    });
}

function parseChipRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Lab Chip",
        name: key,
        bonuses: [body.bonus],
        worksInGame: true
    });
}

function parseJewelRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Lab Jewel",
        name: key,
        bonuses: [body.effect],
        worksInGame: true
    });
}

function parseLabBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Lab Bonus",
        name: key,
        bonuses: [body.description],
        worksInGame: true
    });
}

function parseMealRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Meal",
        name: key,
        bonuses: [body.bonusText],
        worksInGame: true
    });
}

function parsePetUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Pet Upgrade",
        name: key,
        bonuses: [body.description],
        worksInGame: true
    });
}

//helper functions

function cleanOutput(output){
    for(obj of output){
        obj.bonuses.forEach(function(bonus, i, bonuses){
            obj.bonuses[i] = bonus.replace(/\[|\{|\}/g, "").replace(/\_/g, " ");
        })
    }
    return output
}

function searchOutput(search, output){
    for(obj of output){
        for(bonus of obj.bonuses){
            if(search.test(bonus)){
                console.log(JSON.stringify(obj));
                continue;
            }
        }
    }
}

function searchName(search, output){
    for(obj of output){
        if(search.test(obj.name)){
            console.log(JSON.stringify(obj));
        }
    }
}

function runParser(func, path){
    Object.entries(getJSONFromFile(path)).forEach(func);
}

function getJSONFromFile(path){
    let json = JSON.parse(fs.readFileSync(path));
    if(!isJson(json)){
        console.error("File: " + path + " doesn't contain valid JSON.");
        return -1;
    }
    return json;
}

function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;
    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }
    return false;
}
