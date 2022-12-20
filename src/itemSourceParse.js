const fs = require('fs');

let exportedPath = "IdleonWikiBot3.0/exported/";
let output = [];

let ItemDetailRepo = getJSONFromFile(exportedPath + "repo/Item/ItemDetailRepo.json");

runParser(parseSourceRepo, exportedPath + "repo/Item/Sources/SourceRepo.json")

function parseSourceRepo(keyValue){
    let key = keyValue[0];
    let body = keyValue[1];
    console.log(key)
    let name = ItemDetailRepo[key]
    if(name == undefined){
        name = key
    }else{
        name = name.displayName
    }
    output.push({
        name: name,
        sources: body.sources.map((source)=>{
            return source.txtName
        })
    });
}

fs.writeFile("output/sources.json", JSON.stringify(output), (err) => {
    if(err) throw err;
});

fs.writeFile("output/sourcesPretty.json", JSON.stringify(output, null, 2), (err) => {
    if(err) throw err;
});

//helper functions

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
