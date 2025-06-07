const fs = require('fs');

let exportedPath = "IdleonWikiBot3.0/exported/";
let output = [];
// ----------------------------------- Helper Data ---------------------------------
let EnemyRepo = getJSONFromFile(exportedPath + "repo/Enemy/EnemyRepo.json");
let ItemDetailRepo = getJSONFromFile(exportedPath + "repo/Item/ItemDetailRepo.json");

// ----------------------------------- REPO -----------------------------------
// repo/Worlds/*/
runParser(parseBribeRepo, exportedPath + "repo/Worlds/1/BribeRepo.json");
runParser(parseFeatherRepo, exportedPath + "repo/Worlds/1/FeatherRepo.json")

runParser(parseBubbleRepo, exportedPath + "repo/Worlds/2/BubbleRepo.json");
runParser(parsePostOfficeUpgradesRepo, exportedPath + "repo/Worlds/2/PostOfficeUpgradesRepo.json");
runParser(parseSigilRepo, exportedPath + "repo/Worlds/2/SigilRepo.json");

runParser(parseBuildingRepo, exportedPath + "repo/Worlds/3/BuildingRepo.json");
runParser(parsePrayerRepo, exportedPath + "repo/Worlds/3/PrayerRepo.json");
runParser(parseSaltLickRepo, exportedPath + "repo/Worlds/3/SaltLickRepo.json");
runParser(parseShrineRepo, exportedPath + "repo/Worlds/3/ShrineRepo.json");
runParser(parseAtomColliderRepo, exportedPath + "repo/Worlds/3/AtomColliderRepo.json");

runParser(parseArenaBonusRepo, exportedPath + "repo/Worlds/4/ArenaBonusRepo.json");
runParser(parseChipRepo, exportedPath + "repo/Worlds/4/ChipRepo.json");
runParser(parseJewelRepo, exportedPath + "repo/Worlds/4/JewelRepo.json");
runParser(parseLabBonusRepo, exportedPath + "repo/Worlds/4/LabBonusRepo.json");
runParser(parseMealRepo, exportedPath + "repo/Worlds/4/MealRepo.json");
runParser(parsePetUpgradeRepo, exportedPath + "repo/Worlds/4/PetUpgradeRepo.json");
runParser(parsePetRepo, exportedPath + "repo/Worlds/4/PetRepo.json");

runParser(parseArtifactRepo, exportedPath + "repo/Worlds/5/ArtifactRepo.json")
runParser(parseCaptainBonusRepo, exportedPath + "repo/Worlds/5/CaptainBonusRepo.json")
runParser(parseDivinityStyleRepo, exportedPath + "repo/Worlds/5/DivinityStyleRepo.json")
runParser(parseGamingSuperbitsRepo, exportedPath + "repo/Worlds/5/GamingSuperBitsRepo.json")
runParser(parseGamingUpgraderepo, exportedPath + "repo/Worlds/5/GamingUpgradeRepo.json")
runParser(parseGodInfoRepo, exportedPath + "repo/Worlds/5/GodInfoRepo.json")
runParser(parseAmplifierStoneRepo, exportedPath + "repo/Worlds/5/Hole/AmplifierStoneRepo.json")
runParser(parseCosmoUpgradeRepo, exportedPath + "repo/Worlds/5/Hole/CosmoUpgradeRepo.json")
runParser(parseHoleBuildingRepo, exportedPath + "repo/Worlds/5/Hole/HoleBuildingRepo.json")
runParser(parseLampWishRepo, exportedPath + "repo/Worlds/5/Hole/LampWishRepo.json")


runParser(parseJadeUpgradeRepo, exportedPath + "repo/Worlds/6/JadeUpgradeRepo.json")
runParser(parseMarketInfoRepo, exportedPath + "repo/Worlds/6/MarketInfoRepo.json")
runParser(parseNinjaItemRepo, exportedPath + "repo/Worlds/6/NinjaItemRepo.json")
runParser(parseNinjaUpgradeRepo, exportedPath + "repo/Worlds/6/NinjaUpgradeRepo.json")
runParser(parseSummonEnemyBonusRepo, exportedPath + "repo/Worlds/6/SummonEnemyBonusRepo.json")
runParser(parseSummonUpgradeRepo, exportedPath + "repo/Worlds/6/SummonUpgradeRepo.json")

// repo/Talents/*ccc
runParser(parseTalentTreeRepo, exportedPath + "repo/Talents/TalentTreeRepo.json");

// repo/Misc/*
runParser(parseAchievementRepo, exportedPath + "repo/Misc/AchievementRepo.json");
runParser(parseGemShopRepo, exportedPath + "repo/Misc/GemShopRepo.json");
runParser(parseGuildBonusRepo, exportedPath + "repo/Misc/GuildBonusRepo.json");
runParser(parseStarSignsRepo, exportedPath + "repo/Misc/StarSignsRepo.json");
runParser(parseTaskShopDescRepo, exportedPath + "repo/Misc/TaskShopDescRepo.json");
runParser(parseCardSetRepo, exportedPath + "repo/Misc/CardSetRepo.json");
runParser(parseSkullShopRepo, exportedPath + "repo/Misc/SkullShopRepo.json");
runParser(parseDreamChallengeRepo, exportedPath + "repo/Misc/Equinox/DreamChallengeRepo.json");
runParser(parseDreamUpgradeRepo, exportedPath + "repo/Misc/Equinox/DreamUpgradeRepo.json");
runParser(parseGrimoireUpgradeRepo, exportedPath + "repo/Misc/GrimoireUpgradeRepo.json");

// repo/Item/* 
runParser(parseCardRepo, exportedPath + "repo/Item/CardRepo.json");
runParser(parseSpecificItemRepo, exportedPath + "repo/Item/SpecificItemRepo.json");
runParser(parseStatueRepo, exportedPath + "repo/Item/StatueRepo.json");

// repo/Dungeon/*
runParser(parseDungPassivesRepo, exportedPath + "repo/Dungeon/DungPassivesRepo.json");

//TODO KeychainBonusRepo?

// repo/Arcade/*
runParser(parseArcadeBonusRepo, exportedPath + "repo/Arcade/ArcadeBonusRepo.json");

// repo/Misc
runParser(parseCompanionRepo, exportedPath + "repo/Misc/CompanionRepo.json");
runParser(parseWeeklyActionRepo, exportedPath + "repo/Misc/WeeklyTask/WeeklyActionRepo.json")
runParser(parseUpgradeVaultRepo, exportedPath + "repo/Misc/UpgradeVaultRepo.json")

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
    })
}, "manual/manual.json");

// console.log(JSON.stringify(output));
// searchOutput(/mining[a-zA-Z _]*(eff|power)|skilling power/i, output);
// searchOutput(/Skill Efficiency/i, output);
// searchName(/Coconut/i, output);

fs.writeFile("output/output.json", JSON.stringify(cleanOutput(output)), (err) => {
    if(err) throw err;
});

fs.writeFile("output/pretty.json", JSON.stringify(cleanOutput(output), null, 2), (err) => {
    if(err) throw err;
});

//parsing functions
function parseBribeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Bribe",
        name: key,
        bonuses: [body.desc],
    });
}

function parseFeatherRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Orion Feathers",
        name: body.name,
        bonuses: [body.bonus1, body.bonus2],
    });
}

function parseBubbleRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    if(["Power Cauldron", "Quicc Cauldron", "High-IQ Cauldron", "Kazam Cauldron"].includes(key)){
        body["bubbles"].forEach(bubble => {
            parseCauldron(bubble);
        })
    }
    if (key == "Vials"){
        body["bubbles"].forEach(bubble => {
            parseVial(bubble);
        })
    }
    if (key == "Liquid Shop"){
        body["bubbles"].forEach(bubble => {
            parseLiquidShop(bubble);
        })
    }
}

function parseCauldron(body){
    let description = body.description;
    if(body.name === "Le Brain Tools") description = description.replace("$", "Hatchets");
    if(body.name === "Stronk Tools") description = description.replace("$", "Pickaxes and Fishing Rods");
    if(body.name === "Sanic Tools") description = description.replace("$", "Catching Nets");
    output.push({
        source: body.cauldron,
        name: body.name,
        bonuses: [description]
    })
}

function parseVial(body){
    output.push({
        source: "Vials",
        name: body.name,
        bonuses: [body.description]
    })
}

function parseLiquidShop(body){
    output.push({
        source: "Liquid Shop",
        name: body.name,
        bonuses: [body.description]
    })
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
    });
}

function parseSigilRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Sigil",
        name: key,
        bonuses: [body.desc],
    });
}


function parseBuildingRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Building Upgrade",
        name: key,
        bonuses: [body.bonus],
    });
}

function parsePrayerRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Prayer",
        name: key,
        bonuses: [body.bonus, body.curse],
    });
}

function parseSaltLickRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Salt Lick",
        name: ItemDetailRepo[key].displayName,
        bonuses: [body.desc],
    });
}

function parseShrineRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Shrine",
        name: key,
        bonuses: [body.desc],
    });
}

function parseAtomColliderRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Atom Collider",
        name: key,
        bonuses: [body.desc],
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
    });
}

function parseGemShopRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Gem Shop",
        name: body.mtxName,
        bonuses: [body.desc],
    });
}

function parseGuildBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Guild Bonus",
        name: key,
        bonuses: [body.bonus],
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
    });
}

function parseTaskShopDescRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Merit Shop",
        name: "Upgrade: " + key,
        bonuses: [body.descLine1 + " " + (body.descLine2 === "Descline2" ? "" : body.descLine2)],
    });
}

function parseCardSetRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Card Set",
        name: key,
        bonuses: [body.bonus],
    });
}

function parseSkullShopRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Skull Shop",
        name: body.rewardId,
        bonuses: [body.description],
    });
}

function parseDreamChallengeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Equinox Cloud",
        name: body.challenge,
        bonuses: [body.reward],
    });
}

function parseDreamUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Equinox Dream Upgrade",
        name: body.name,
        bonuses: [body.upgrade],
    });
}

function parseGrimoireUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Grimoire",
        name: key,
        bonuses: [body.description],
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
    });
}

function parseStatueRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Statue",
        name: body.name,
        bonuses: [body.effect],
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
    });
}

function parseCompanionRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Pet Companion",
        name: EnemyRepo[body.id].details.Name,
        bonuses: [body.desc],
    });
}

function parseWeeklyActionRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    // only a few of the actions give bonuses in the main game
    let validKeys = ["3","8","14"];
    if(validKeys.includes(key)){
        output.push({
            source: "Weekly Battle",
            name: "Misc Action",
            bonuses: [body.desc],
        })
    }
}

function parseUpgradeVaultRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Upgrade Vault",
        name: body.name,
        bonuses: [body.description_line1 + " " + (body.description_line2 === "" ? "" : body.description_line2)],
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
    });
}

function getSpecificItemBonuses(body){
    const armorList = ["aHelmet", "aShirt", "aPants", "aShoes", "aPendant", "aRing", "aChatRingMTX", "aTrophy", "aHelmetMTX", "aCape", "aKeychain", "aGown"];
    const toolList = ["aPick", "aHatchet", "aFishingRod", "aBugNet", "aTrap", "aSkull", "aDNAgun"];
    const obolList = ["aObolCircle", "aObolSquare", "aObolHexagon", "aObolSparkle"]; 
    const keysList = ["Weapon_Power", "STR", "AGI", "WIS", "LUK", "Defence"];
    const weaponKeysList = ["Weapon_Power", "STR", "AGI", "WIS", "LUK", "Defence", "Speed","Reach"];
    const nameTagKeysList = ["Weapon_Power", "STR", "AGI", "WIS", "LUK", "Defence"];
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

    if(typeGen === "aNametag"){
        let r = [];
        for(nameKey of nameTagKeysList){
            if(body[nameKey] != 0){
                r.push(nameKey + ": " + body[nameKey]);
            }
        }
        if(body.miscUp1 != "" && body.miscUp1 != "00"){
            r.push(body.miscUp1);
        }
        if(body.miscUp2 != "" && body.miscUp2 != "00"){
            r.push(body.miscUp2);
        }
        return [r, "Name Tag"];
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
    });
}

function parseChipRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Lab Chip",
        name: key,
        bonuses: [body.bonus],
    });
}

function parseJewelRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Lab Jewel",
        name: key,
        bonuses: [body.effect],
    });
}

function parseLabBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Lab Bonus",
        name: key,
        bonuses: [body.description],
    });
}

function parseMealRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Meal",
        name: key,
        bonuses: [body.bonusText],
    });
}

function parsePetUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Pet Upgrade",
        name: key,
        bonuses: [body.description],
    });
}

function parsePetRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Shiny Pet Bonus",
        //defender is named _ for some reason. Not in EnemyRepo either...
        name: key == "_" ? "Defender" : EnemyRepo[key].details.Name,
        bonuses: [body.shinyBonus.shinyBonusDesc],
    });
}


function parseArtifactRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Artifact",
        name: key,
        bonuses: [body.bonus, "Ancient: " + body.ancientBonus]
    })
}

function parseCaptainBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Sailing",
        name: "Captain",
        bonuses: [body.bonus]
    })
}

function parseDivinityStyleRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Divinity Style",
        name: key,
        bonuses: [body.desc]
    })
}

function parseGamingSuperbitsRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Gaming Super Bit",
        name: body.name,
        bonuses: [body.description]
    })
}

function parseGamingUpgraderepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Gaming Upgrade",
        name: key,
        bonuses: [body.desc]
    })
}

function parseGodInfoRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Divinity God",
        name: key,
        bonuses: [body.majorBonus, body.passiveBonus, body.blessingBonus]
    })
}

function parseAmplifierStoneRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "(Hole) Amplifier Stone",
        name: key,
        bonuses: [body.desc]
    })
}

function parseCosmoUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "(Hole) Cosmo Upgrade",
        name: key,
        bonuses: [body.desc]
    })
}

function parseHoleBuildingRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "(Hole) Engineering",
        name: key,
        bonuses: [body.desc]
    })
}

function parseLampWishRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "(Hole) Lamp Wish",
        name: key,
        bonuses: [body.desc]
    })
}

function parseJadeUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "The Jade Emporium",
        name: body.name,
        bonuses: [body.bonus]
    })
}
function parseMarketInfoRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Farming Market",
        name: body.name,
        bonuses: [body.bonus]
    })
}
function parseNinjaItemRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Sneaking Items",
        name: body.name,
        bonuses: [body.bonus ?? body.desc ?? "Basic Item"]
    })
}
function parseNinjaUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Sneaking Upgrades",
        name: body.name,
        bonuses: [body.bonus]
    })
}
function parseSummonEnemyBonusRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Summoning Winner Bonuses",
        name: "Bonus " + body.bonusId,
        bonuses: [body.bonus]
    })
}
function parseSummonUpgradeRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    output.push({
        source: "Summoning Upgrades",
        name: body.name,
        bonuses: [body.bonus]
    })
}

//helper functions

function cleanOutput(output){
    for(obj of output){
        obj.bonuses.forEach(function(bonus, i, bonuses){
            try{
                obj.bonuses[i] = bonus.replace(/\[|\{|\}/g, "").replace(/\_/g, " ");

            }catch(e){
                let string = ""
            }
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
