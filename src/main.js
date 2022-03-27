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
// ----------------------------------- REPO -----------------------------------
// repo/Worlds/*/
// runParser(parseBribeRepo, exportedPath + "repo/Worlds/1/BribeRepo.json");
// runParser(parseBubbleRepo, exportedPath + "repo/Worlds/2/BubbleRepo.json");
// runParser(parsePostOfficeUpgradesRepo, exportedPath + "repo/Worlds/2/PostOfficeUpgradesRepo.json");
// runParser(parseBuildingRepo, exportedPath + "repo/Worlds/3/BuildingRepo.json");
// runParser(parsePrayerRepo, exportedPath + "repo/Worlds/3/PrayerRepo.json");
// runParser(parseSaltLickRepo, exportedPath + "repo/Worlds/3/SaltLickRepo.json");
// runParser(parseShrineRepo, exportedPath + "repo/Worlds/3/ShrineRepo.json");
//TODO add world 4 from repo/worlds/4

// repo/Talents/*
// runParser(parseTalentTreeRepo, exportedPath + "repo/Talents/TalentTreeRepo.json");

// repo/Misc/*
// runParser(parseAchievementRepo, exportedPath + "repo/Misc/AchievementRepo.json");
// runParser(parseGemShopRepo, exportedPath + "repo/Misc/GemShopRepo.json");
// runParser(parseGuildBonusRepo, exportedPath + "repo/Misc/GuildBonusRepo.json");
// runParser(parseStarSignsRepo, exportedPath + "repo/Misc/StarSignsRepo.json");
// runParser(parseTaskShopDescRepo, exportedPath + "repo/Misc/TaskShopDescRepo.json");

// repo/Item/* 
// runParser(parseCardRepo, exportedPath + "repo/Item/CardRepo.json");
    //TODO repo/Item/ItemDetailRepo (weird parsing...)
    // runParser(parseItemDetailRepo, exportedPath + "repo/Item/ItemDetailRepo.json"); //INCOMPLETE
//TODO repo/Item/StampDescriptionRepo (need to do some mapping)
// runParser(parseStatueRepo, exportedPath + "repo/Item/StatueRepo.json");

// repo/Dungeon/*
//TODO DungEnanceRepo (might not do because bonuses only apply to dungeons?)
//TODO DungeonItemRepo (same as above)
//TODO DungPassivesRepo (at least the flurbo passives)
//TODO DungTraitRepo (same as first)
//TODO FlurboShopRepo?
//TODO KeychainBonusRepo?

// repo/Arcade/*
// runParser(parseArcadeBonusRepo, exportedPath + "repo/Arcade/ArcadeBonusRepo.json");

// console.log(JSON.stringify(output));
// searchOutput(/mining[a-zA-Z _]*(eff|power)|skilling power/i, output);
// searchOutput(/.*/i, output);

// fs.writeFile("output/output.json", JSON.stringify(output), (err) => {
//     if(err) throw err;
// })

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

//TODO add which skilling tools give skilling power for some bubbles...
function parseBubbleRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: body.cauldron,
        name: key,
        bonuses: [body.description],
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

//TODO this might not be wanted as bonus descriptions only apply to the buildings themselves
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
        name: key,
        bonuses: [body.bonus, body.curse],
        worksInGame: true
    });
}

function parseSaltLickRepo(keyValue){
    //TODO map key to it's dispaly name
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        name: key + " salt lick upgrade",
        bonuses: [body.desc],
        worksInGame: true
    });
}

function parseShrineRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
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
        name: key,
        bonuses: [body.rewards],
        worksInGame: true
    });
}

function parseGemShopRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        name: body.itemName + " Gem Shop Purchase",
        bonuses: [body.desc],
        worksInGame: true
    });
}

function parseGuildBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        name: key + " Guild Bonus",
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
        name: "Star Sign: " + key,
        bonuses: [body.text],
        worksInGame: true
    });
}

//TODO change from task shop num maybe?
function parseTaskShopDescRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        name: "Task shop number: " + key,
        bonuses: [body.descLine1 + body.descLine2],
        worksInGame: true
    });
}

//TODO map key to display name
function parseCardRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        name: key + " Card",
        bonuses: [body.effect],
        worksInGame: true
    });
}

function parseStatueRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        name: body.name + " Statue",
        bonuses: [body.effect],
        worksInGame: true
    });
}

//TODO map bonus to full name?
function parseArcadeBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        name: "Arcade Bonus " + key,
        bonuses: [body.effect],
        worksInGame: true
    });
}

function parseItemDetailRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    //TODO make these globals or smth?
    const skipList = ["NothingERROR", "aError", "dQuest", "bOre", "bBar", "bLog", "bLeaf", "dFish", "dCritters", "dSouls", "dStatueStone", "aRecipe", "aTalentBook", "aCarryBag", "bCraft", "dTimeCandy", "aInventoryBag", "aStorageChest", "dFishToolkit", "dCard", "dCurrency", "dCardPack"]
    const armorList = ["aHelmet", "aShirt", "aPants", "aShoes", "aPendant", "aRing", "aChatRingMTX", "aTrophy", "aHelmetMTX", "aCape", "aKeychain"];
    const armorKeysList = ["Speed", "Reach", "Weapon_Power", "STR", "AGI", "WIS", "LUK", "Defence"];
    //TODO tools display "weapon power", but it should be mining/chopping/etc power....
    const toolList = ["aPick", "aHatchet", "aFishingRod", "aBugNet", "aTrap", "aSkull", "aDNAgun"];
    const obolList = ["aObolCircle", "aObolSquare", "aObolHexagon", "aObolSparkle"];
    let typeGen = body.typeGen;
    if(skipList.indexOf(typeGen) > -1){
        return;
    }
    output.push({
        name: body.displayName,
        bonuses: function(){
            if(armorList.indexOf(typeGen) > -1){
                // console.log(typeGen);
                let r = [];
                for(armorKey of armorKeysList){
                    if(body[armorKey] != 0){
                        r.push(armorKey + ": " + body[armorKey]);
                    }
                }
                if(body.UQ1val != 0){
                    r.push(body.UQ1val + body.UQ1txt);
                }
                if(body.UQ2val != 0){
                    r.push(body.UQ2val + body.UQ2txt);
                }
                return r;
            }

            //independent parsing
            //cOil, aWeapon, cFood, aStamp, dStone

            // console.error("Unhandled typeGen: " + typeGen);
            return ["INSIGHT ERROR"];
        }(),
        worksInGame: true
    });
}

//helper functions
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

function runParser(func, path){
    Object.entries(getWikiBotJSON(path)).forEach(func);
}

function getWikiBotJSON(path){
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
