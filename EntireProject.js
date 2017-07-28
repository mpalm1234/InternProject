/* This is the lambda function for the project, last updated 7/28 */

'use strict';

var Alexa = require('alexa-sdk');
var https = require('https');
var myRequest = "";

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function httpsGet(myData, callback) {
    var options = {
        host: 'finance.google.com',
        port: 443,
        path: '/finance/info?client=ig&q=NASDAQ%3APEG',
        method: 'GET',
    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            var stringData = JSON.stringify(returnData);
            var parsePrice = stringData.substring(79,84);
            var parseTime = stringData.substring(162,169);
            var retArr = [parsePrice, parseTime];
            //callback(price);
            callback(retArr);
        });
    });
    req.end();
}

const languageStrings = {
    'en': {
        translation: {
            TIPS: [
                'Install a programmable thermostat and raise the setting to the highest comfortable temperature. You can save 3 to 5 percent on your air conditioning costs for each degree you raise the thermostat.',
                'Close doors leading to uncooled parts of your home. If you have central air conditioning, close off vents to unused rooms. Keep filters clean.',
                'Even if you have air conditioning, use ceiling and other fans to provide additional cooling and better circulation.',
                'Seal holes and cracks around doors and windows. Eliminate air leaks around window air conditioners with foam insulation or weather-stripping.',
                'Close blinds, shades and draperies facing the sun to keep out the sun’s heat and help fans and air conditioners cool more efficiently.',
                'Turn off power sources. TVs, computers and other electronic devices draw power when they are in standby mode or turned off but still plugged in. Plug electronics into power strips and turn off the power switch when the items are not in use.',
                'Use timers and motion detectors on indoor and outdoor lighting.',
                'Replace old appliances with new energy efficient Energy Star appliances.',
                'If possible, install whole-house fans that bring in cooler night-time air that can pre-cool a house and reduce energy use in the daytime if heat is kept out by closing windows and shades.',
                'Take advantage of PSE&G’s Home Energy Toolkit which helps you analyze your home energy use to receive customized energy saving tips. ',
            ],
            SKILL_NAME: 'P S E G Safety Tips',
            GET_FACT_MESSAGE: "Here's your safety tip: ",
            HELP_MESSAGE: 'You can say tell me a safety tip, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        }
    }
};

var handlers = {
    
    'LaunchRequest': function () {
        this.emit('Welcome to the P S E G Company Guide. Ask me about what the company does, when it began, who to call for services, or about anything else you would like to know.');
    },
    
    /***** GROUP LL2 *****/
    // RESTAURANTS
    'FoodHelpIntent' : function () {
        var cType = this.event.request.intent.slots.CuisineType.value; //replace CuisineType with whatever the name of your slot is
        switch(cType) {
        case 'sandwich':
        case 'sandwiches':
        case 'deli':
            this.emit(':tell', 'Right across the street from P S E G is hannas deli. Cafe Airlie at 32 commerce street is also really good.');
            break;
        case 'Mexican':
            this.emit(':tell', 'There is a kudoba behind the whole foods at 64 halsey street.  You can also try darios located at 20 academy street.');
            break;
        case 'mediterranean':
            this.emit(':tell', 'Try halal guys at 72 halsey street.');
            break;
        case 'pizza':
            this.emit(':tell', 'You should go to blaze pizza right across the street from military park at 691 broad street.  Or you can try Queens pizza at 122 halsey street.');
            break;
        case 'Asian':
            this.emit(':tell', 'You can go to wok to walk right across the street from military park.');
            break;
        case 'barbecue':
            this.emit(':tell', 'Check out dinosaur barbecue on 224 market street, right next to the prudential center.');
            break;
        default: 
            this.emit(':tell', 'Sorry, I dont know where to find that.'); 
        }
    },
    
    'FoodRandomIntent' : function () {
        var rand = Math.floor(Math.random() * 9); //multiply math.random() with however many switch cases you have
        switch(rand) {
        case 0:
            this.emit(':tell', 'Right across the street from P S E G is hannas deli.  Great for breakfast or lunch.');
            break;
        case 1:
            this.emit(':tell', 'There are a choices at the kudoba behind the whole foods at 64 halsey street.');
            break;
        case 2:
            this.emit(':tell', 'Halal guys at 72 halsey street is a great choice for a very filling meal.');
            break;
        case 3:
            this.emit(':tell', 'You can make your own custom pizza at blaze pizza, located right across the street from military park at 691 broad street.');
            break;
        case 4:
            this.emit(':tell', 'You can try wok to walk right across the street from military park.');
            break;
        case 5:
            this.emit(':tell', 'Cafe airlie at 32 commerce street has a variety sandwiches and salads to choose from.');
            break;
        case 6:
            this.emit(':tell', 'Darios offers delicious quasadillas and taco bowls.  It is located at 20 academy street.');
            break;
        case 7:
            this.emit(':tell', 'Check out Queens Pizza at 122 halsey street for some classic new york style pizza and a variety of toppings to choose from.');
            break;
        case 8:
            this.emit(':tell', 'You can go to dinosaur barbeque located at 224 market street.');
            break;
        default: 
            this.emit(':tell', 'Sorry, I dont know any good places to eat.'); 
        }
    },
    
    // STOCKS
    'stockIntent': function () {
        httpsGet(myRequest,  (myResult) => { //ignore myRequest it was part of the cookbook example
            console.log("sent     : " + myRequest); //ignore ^
            console.log("received : " + myResult);
            
            this.emit(':tell', 'The price per share for P S E G is ' + myResult[0] + ' dollars. Last updated at ' + myResult[1]);
        }
        );
    },
    
    // PSEG TIPS
    'GetNewSavingTipIntent': function () {
        this.emit('GetTip');
    },
    // helper functions
    'GetTip': function () {
        // Use this.t() to get corresponding language data
        const factArr = this.t('TIPS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    
    // not needed:
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    
    // GENERAL INFO
    'CafIntent': function () {
        this.emit(':tell', 'The P S E G Cafeteria is located on the third floor, take the elevator to the second floor and use the escalator to go get some food.');
    },
    'FactsIntent': function() {
        this.emit(':tell', 'P S E G, or Public Service Enterprise group is the main energy distributor for New Jersey and Long Island. The company has been around since 1902 and is one of the 10 largest Utilities companies in the country. Wow, that is impressive!');
    },
    'ITInfoIntent': function(){
        this.emit(':tell', 'The I T department at PSEG is made up of a number of different sub teams such as Network Operations, Security, A P O, I P O, CeeSo, Quality Assurance, and others. They are responsible for large scale technology projects which ensure that customers have the best experience when using our applications and services.');
    },
    'locationsIntent': function(){
        this.emit(':tell','The main P S E G headquarters is in Newark New Jersey, however we have offices and power plants in many other locations such as Edison, Salem, and Long Island.');
    }, 
    'ceoIntent': function(){
        this.emit(':tell', 'Ralph Izzo is the C E O of P S E G, he has held this position for the last 10 years.');
    },
    'cioIntent': function(){
        this.emit(':tell', 'The C I O is currently Joseph Santamaria.');
    },
    'historyIntent': function(){
        this.emit(':tell', 'P S E G began in nineteen oh three and currently serves almost 4 million customers in New Jersey with electricity and or gas services.');
    },
    
    /***** GROUP T15 *****/
    
    // HELP QUESTIONS
    'beforeYouDig': function() {
        this.emit(':tell', 'Call 1 8 hundred, 2 7 2, 1 0 0 0');
    },
    'gasLeak': function(){
        this.emit(':tell', 'Call 1 8 hundred, 8 8 0, 7 7 3 4 to report a gas leak. In the mean time, be sure to open a window and leave the building');
    },
    'downedWire': function(){
        this.emit(':tell', 'Call 1 8 hundred, 8 8 0, 7 7 3 4 to report a downed wire. Be sure to stay away from fallen lines and anything or anyone that may have come in contact with them.');
    },
    'powerOutage': function(){
        this.emit(':tell', 'Call 1 8 hundred, 8 8 0, 7 7 3 4 to report a power outage.');
    },
    
    /***** GROUP T17 *****/
    
    // NUCLEAR
    'WhatIsNuclear': function () {
        this.emit(':tell', 'P S E G Nuclear L L C operates the Salem and Hope Creek Nuclear Generating Stations.  They are located together on one site in Salem County New Jersey');
    },
    'SalemSpecs': function () {
        this.emit(':tell', 'Salem consists of dual unit pressured water reactors with a total generating capacity of two thousand two hundred and ninety six megawatts.  That is enough to generate enough electricity to power approximately two million homes per day.');
    },
    'SalemAge' : function () {
        this.emit(':tell', 'The construction of Salem began in nineteen sixty eight.  The first unit began commercial service in nineteen seventy seven while the second unit began commercial service in nineteen eighty one');
    },
    'HopeCreekSpecs': function () {
        this.emit(':tell', 'Hope Creek consists of a single unit boiling water reactor with a total generating capacity of one thousand one hundred and seventy two megawatts.  That is enough to generate enough electricity to power approximately one million homes per day.');
    },
    'HopeCreekAge' : function () {
        this.emit(':tell', 'The construction of Hope creek began in nineteen seventy four.  Commercial service then began in nineteen eighty six.');
    },
    
    // ACRONYMS
    'acronymHelper': function () {
        
        var acronym = this.event.request.intent.slots.AcronymName.value;
        var say = "Sorry, I don't know that acronym.";
        
        switch(acronym) {
            case 'ADR':
                say = 'A D R stands for Application Design Review';
                break;
            case 'APO':
                say = 'A P O stands for Application Project Office';
                break;
            case 'ARD':
                say = 'A R D stands for Application Requirements Document';
                break;
            case 'ART':
                say = 'A R T stands for All Requirements and Testing';
                break;
            case 'ASD':
                say = 'A S D stands for Accounting Services Department';
                break;
            case 'ASO':
                say = 'A S O stands for Application Support Office';
                break;
            case 'BI':
                say = 'B I stands for Business Intelligence';
                break;
            case 'BP':
                say = 'B P stands for Business Partner';
                break;
            case 'BPM':
                say = 'B P M stands for Business Process Management';
                break;
            case 'BR':
                say = 'B R stands for Business Requirements';
                break;
            case 'BVA':
                say = 'B V A stands for Business Value Assessment';
                break;
            case 'BVS':
                say = 'B V S stands for Business Valution Summary';
                break;
            case 'CBT':
                say = 'C B T stands for Computer Based Training';
                break;
            case 'CI':
                say = 'C I stands for Configuration Management';
                break;
            case 'CISO':
                say = 'C I S O stands for Chief Information Security Office';
                break;
            case 'CMDB':
                say = 'C M D B stands for Configuration Management Database';
                break;
            case 'CSR':
                say = 'C S R stands for Customer Service Representative';
                break;
            case 'DCR':
                say = 'D C R stands for Document Repository';
                break;
            case 'DDI':
                say = 'D D I stands for Dynamic Data Integrator';
                break;
            case 'EMR':
                say = 'E M R stands for Elastic Map Reduce';
                break;
            case 'ER':
                say = 'E R stands for Enterprise Release';
                break;
            case 'ERP':
                say = 'E R P stands for Enterprise Resource Planning';
                break;
            case 'ERT':
                say = 'E R T stands for Energy Resource Transmission';
                break;
            case 'FO':
                say = 'F O stands for Front Office';
                break;
            case 'FR':
                say = 'F R stands for Functinoal Requirements';
                break;
            case 'FRRB':
                say = 'F R R B stands for Funding Release Review Board';
                break;
            case 'FTE':
                say = 'F T E stands for Full Time Employment';
                break; 
            case 'IM':
                say = 'I M stands for Infrastruction Management';
                break;
            case 'IRD':
                say = 'I R D stands for Infrastructure Requirements Document';
                break;
            case 'ISO':
                say = 'I S O stands for Infrastructure Support Office';
                break;
            case 'IVR':
                say = 'I V R stands for Interactive Voice Response';
                break;
            case 'LOB':
                say = 'L O B stands for Line of Business';
                break;
            case 'MM':
                say = 'M M stands for Material Management';
                break;
            case 'NFR':
                say = 'N F R stands for Non-Functional Requirements';
                break;
            case 'OGC':
                say = 'O G C stands for Ongoing Costs';
                break;
            case 'OL':
                say = 'O L stands for Online Release';
                break;
            case 'PA':
                say = 'P A stands for Production Acceptance';
                break;
            case 'PCI':
                say = 'P C I stands for Project Cost Index';
                break;
            case 'PCR':
                say = 'P C R stands for Personal Change Request';
                break;
            case 'PII':
                say = 'P I I stands for Personal Identifying Information';
                break;
            case 'PIR':
                say = 'P I R stands for Process Improvement Request';
                break;
            case 'PO':
                say = 'P O stands for Purchase Order';
                break;
            case 'POC':
                say = 'P O C stands for Proof of Concept';
                break;
            case 'PPQA':
                say = 'P P Q A stands for Process and Product Quality Assurance';
                break;
            case 'PSI':
                say = 'P S I stands for Project Schedule Index';
                break;
            case 'PSR':
                say = 'P S R stands for Project Status Report';
                break;
            case 'PT':
                say = 'P T stands for Performance Testing';
                break;
            case 'RCA':
                say = 'R C A stands for Root Cause Analysis';
                break;
            case 'RICEFW':
                say = 'R I C E F W stands for Reports, Interface, Conversation, Enhancements, Forms, and Workflow';
                break;
            case 'RNC':
                say = 'R N C stands for Risk and Contingency';
                break;
            case 'ROM':
                say = 'R O M stands for Rough Order of Magnitude';
                break;
            case 'RPA':
                say = 'R P A stands for Robotic Process Automation';
                break;
            case 'SLA':
                say = 'S L A stands for Service Level Agreement';
                break;
            case 'SLO':
                say = 'S L O stands for Service Level';
                break;
            case 'SLT':
                say = 'S L T stands for Service Level';
                break;
            case 'SME':
                say = 'S M E stands for Subject Matter Experts';
                break;
            case 'SN':
                say = 'S N stands for Service Now';
                break;
            case 'SOW':
                say = 'S O W stands for Statement of Work';
                break;
            case 'SRM':
                say = 'S R M stands for Strategic Relationship Manager';
                break;
            case 'TAR':
                say = 'T A R stands for Tasks, Authority, Responsibilities';
                break;
            case 'TDD':
                say = 'T D D stands for Test Driven Development';
                break;
            case 'UAT':
                say = 'U A T stands for User Acceptance Testing';
                break;
            case 'UPO':
                say = 'U P O stands for Unplanned Outage';
                break;
            case 'WBS':
                say = 'W B S stands for Work Breakdown Structure';
                break;
            case 'WM':
                say = 'W M stands for Work Management';
                break;
            case 'XI':
                say = 'X I stands for Exchange Infrastructure';
                break;
        }
        
      this.emit(':tell', say);  
    }

};
