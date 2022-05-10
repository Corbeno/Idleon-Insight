# Idleon-Insight <a href="https://idleoninsight.com" target="_blank"><img src="https://github.com/Corbeno/Idleon-Insight/blob/main/insightLogo.png?raw=true" width="30" height="30" /></a>

A collection of script(s) used to generate a list of everything that gives a buff/debuf in the game Idleon

## What is it?
The purpose of these scripts are to generate a file located in output/output.json which is a JSON array that contains all bonuses in Idleon. For example, anything that gives weapon power should be included in the list. This list is used in [Idleon Insight Frontend](https://github.com/Corbeno/Idleon-Insight-Frontend).
## I found something that is missing!
If you find anything in the game that isn't in this list, please create a Github issue. It doesn't have to be long or descriptive, just let me know!
You can also make the changes yourself and create a pull request if you would like.

### Adding data manually
If the data isn't present in the wiki bot, it can be manually added to the output very easily. Simply add an entry in manual/manual.json that matches the example and submit a pull request!
## This list is cool! Can I use it in my project??
Absolutely! The following URL can be used to get the JSON as a string: 
https://raw.githubusercontent.com/Corbeno/Idleon-Insight/main/output/output.json
(This is actually how [Idleon Insight](https://idleoninsight.com) does it!)

## How to Run
```
node src/main.js
```
