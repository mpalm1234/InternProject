'use strict';

var Alexa = require('alexa-sdk');
var https = require('https');
var myRequest = '';
const APP_ID = 'amzn1.ask.skill.1e041c80-9217-4ddb-b923-295e425d4ea8';

// HELP QUESTIONS VARS:
var anyIssue = 'The help desk is open twenty four seven. ';
var voiceIssue = 'The help desk is open for voice and Phone issues Monday through Friday from 7 A M to 5 P M. ';
var SoftwareIssue = 'The help desk is open for Premium Software issues Monday through Friday from 8:30 A M to 5 P M. ';
var number = 'The help desk phone number is: 1 877 430 7500. ';
var CONTINUE= 'If you want to continue I can tell you hours for P C issues, voice issues, software issues, login issues, or other issues. ';
var unknown = 'I did not understand that.';

// FACTS VARS:
var FACTS_SKILL_NAME = 'P S E G Cool Facts';
var AWARDS_SKILL_NAME = 'P S E G Awards';
var GET_FACT_MESSAGE = "Here's your cool fact: ";
var HELP_REPROMPT = "What can I help you with?";

// SAFETY TIP VARS:
var ElectricSafety=[
    'While around live wires and large machines, always assume high voltages and use caution.',
    'When unplugging a cord, pull on the cord at the base rather than tugging on the cord itself to keep connector damage-free.',
    'Check power and extension cords regularly for frays, cracks, or kinks.',
    'If you see a fallen electrical wire, stay away from it. Call P S E G at 1 eight hundred. 4 3 6. P S E G. to report the downed wire.',
    'Never stick your fingers or any object into an electrical outlet or light bulb socket. You could get shocked!',
    'Treat every power line as if it were a live wire.',
    'Remember that a turned-off appliance is still connected to electricity until it is unplugged.',
    'Before you begin digging outside, call 1 eight hundred. 2 7 2. 1 0 0 0. to make sure you don’t dig atop a pipe or wire.',
    'Don’t ever climb the power or telephone poles for any reason. Special equipment and training is required to climb them.',
    'When putting nails in your walls, check to make sure there are not any power cables running through the walls in that area.',
    'Instead of using multiple splitters and surge protectors, relocate wires to evenly distribute the energy needs of your home.'
    ];
var GasSafety=[
    'If you smell gas, make sure to open a window and leave the building. Then call 1 eight hundred. 8 8 0. P S E G. to report the problem.',
    'Provide enough ventilation for gas appliances to burn correctly and make sure no air vents or chimneys are blocked.',
    'A carbon monoxide alarm will be able to notify an entire house of a harmful gas buildup. Make sure to have one installed and checked regularly. ',
    'A distinctive odor, like rotten eggs, is added to natural gas to help assist in the detection of leaks. For more info about this, visit p s e g dot com.',
    'Ensure that your gas pipework, appliances, and flues are regularly maintained. Quickly check your pipes every so often to ensure a proper system.',
    'Before you begin digging outside, make sure to call 1 eight hundred. 2 7 2. 1 0 0 0 to make sure you don’t begin digging atop an important pipe or wire.',
    'Ensure that your family members know what to do if someone smells gas. Everyone should leave the area and someone should call 1 eight hundred. 8 8 0. P S E G.',
    'Never try to locate a gas leak yourself. Get out of the area and dial 1 eight hundred. 8 8 0. P S E G for help.',
    'Do not cook wearing loose garments. These can mistakenly catch fire.',
    'Never use the kitchen range or oven as a space heater.',
    'Never chain a pet to a gas meter or piping.',
    'Do not sleep in a room with a non-vented gas or kerosene heater.'
    ];
var SafeDriving=[
    'Follow the posted speed limits.',
    'Never text and drive.',
    'Always where a seat belt whenever you are in a car.',
    'Practice defensive driving.',
    'Be extra careful in bad weather.',
    'Do not drive when drowsy.',
    'Do not drink or eat while driving a vehicle.',
    'Make sure to know the route to your destination before getting on the road.',
    'Periodically check your tires for wear and tear.',
    'Keep up with your vehicle maintanance.',
    'Closely monitor other drivers and pedestrians while driving.'
    ];
var EmployeeSafety=[
    'Be aware of your surroundings.',
    'Keep correct posture to protect your back.',
    'Take regular breaks to keep your mind on track.',
    'Always use tools And machines properly.',
    'Keep emergency exits easily accessible. Never block them for any reason.',
    'Report unsafe conditions to your supervisor.',
    'Use mechanical aids whenever possible.',
    'Stay sober in a work environment.',
    'Reduce workplace stress to reduce the liklihood of employee errors.',
    'Always wear the correct safety equipment.',
    'Eliminate fire hazards by following the appropriate protocol.'
    ];
    
var GasSafetyCopy=GasSafety.slice();
var ElectricSafetyCopy=ElectricSafety.slice();
var SafeDrivingCopy=SafeDriving.slice();
var EmployeeSafetyCopy=EmployeeSafety.slice();

// HELPER FUNCTIONS:
function httpsGet(myData, callback) {
    var options = {
        host: 'finance.google.com',
        port: 443,
        path: '/finance/info?client=ig&q=NASDAQ%3APEG',
        method: 'GET',
    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = '';

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
            FACTS: [
                'P S E G employs over thirteen thousand people across many different areas such as Utilities, Electric, Nuclear, Services, and more.',
                'In twenty sixteen, P S E G was ranked number 2 7 2 on the Forbes Fortune Five hundred list.',
                'In twenty seventeen, P S E G was named to Fortune Magazines list of most admired companies, and ranked eighth among electric and gas companies in the United States.',
                'In twenty sixteen, P S E G generated over 9 billion dollars in revenue and their total assets amounted to over 40 billion dollars.',
                'P S E and G was recognized as the most reliable utility in the Mid Atlantic Region for fifteen years in a row by P A Consulting.',
                'P S E G celebrated its one hundreth birthday in two thousand three.',
            ],
            AWARDS: [
                'In twenty seventeen, P S E G was the Investor Owned Utility of the Year by the Smart Electric Power Alliance for its efforts that add solar power to New Jerseys energy diversity.',
                'In twenty seventeen, Human Resources at the P S E G development program, called People Strong Development Curriculum, recieved a Leadership Excellence Award from H R dot com.',
                'In twenty sixteen, P S E G was named a Military Friendly Employer by Victory Media.',
                'In twenty sixteen, P S E G was honored with the New Jersey Month Great Oak award for their charitable giving programs that supported non-profit organizations in the state.',
                'In twenty sixteen, P S E G was ranked first in financial performance by Public Utilities fortnightly Magazine.',
                'In twenty sixteen, P S E G was ranked the most reliable utility in the Mid-Atlantic region for the fifteenth year in a row.'
            ],
            TIPS: [
                'Install a programmable thermostat and raise the setting to the highest comfortable temperature. You can save 3 to 5 percent on your air conditioning costs for each degree you raise the thermostat.',
                'Close doors leading to uncooled parts of your home. If you have central air conditioning, close off vents to unused rooms and keep filters clean.',
                'Even if you have air conditioning, use ceiling and or other fans to provide additional cooling and better circulation.',
                'Seal holes and cracks around doors and windows with foam insulation or weather-stripping.',
                'Close blinds, shades, and draperies facing the sun to keep out the heat so that fans and air conditioners can help cool more efficiently.',
                'Reduce your use of electricity by plugging electronics into power strips and then turning off the switch when the items are not in use. Electronic devices still draw power when they are still plugged in despite being in standby mode or turned off.',
                'Use timers and motion detectors on indoor and outdoor lighting.',
                'Replace old appliances with new energy efficient Energy Star appliances.',
                'If possible, install whole-house fans that bring in cooler night-time air.',
                'Take advantage of P S E Gs Home Energy Toolkit which helps you analyze your home energy use to receive customized energy saving tips.'
            ]
        }
    }
};

function Tips(TipsList, y, TipsListCopy){
    if(TipsList.length===0) {
        y.emit(':ask', 'I have already told you all of my safety tips for this, would you like to hear them again? Answer MORE FACTS PLEASE! or NO MORE FACTS.', "I'm sorry I don't quite know what you mean, can you repeat?");
    }
    var x = Math.floor(Math.random()*TipsList.length);  //chooses a random number that will be used to choose a random index in the list
    y.emit(':tell', TipsList[x]);
    TipsList.splice(x,1);                               //eliminates the item from the list
    return TipsList;
}

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
    callback(null, 'Hello from Lambda.');
};

var START_MESSAGE = 'Welcome to the P S E G Company Guide. Ask me anything you would like to know about the company.';
var HELP_MESSAGE = 'Ask me anythig you would like to know about P S E G.';
var STOP_MESSAGE = 'Goodbye. ';
var handlers = {
    
    'LaunchRequest': function () {
        this.emit(':tell', START_MESSAGE);
    },
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
    'SessionEndedRequest': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    
    /*************** GROUP LL2 ***************/
    
    // RESTAURANTS
    'FoodHelpIntent' : function () {
        var cType = this.event.request.intent.slots.CuisineType.value;
        switch(cType) {
        case 'sandwich':
        case 'sandwiches':
        case 'deli':
            this.emit(':tell', 'Right across the street from P S E G is hannas deli. Cafe Airlie, located at 32 commerce street, is also really good.');
            break;
        case 'Mexican':
            this.emit(':tell', 'There is a Q dough bu behind the whole foods at 64 halsey street.  You can also try darios located at 20 academy street.');
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
            this.emit(':tell', 'There are a lot of choices at the Q dough bu behind the whole foods at 64 halsey street.');
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
            this.emit(':tell', 'Darios offers delicious quesadillas and taco bowls.  It is located at 20 academy street.');
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
        httpsGet(myRequest,  (myResult) => {            // ignore myRequest, it was part of the cookbook example
            console.log("sent     : " + myRequest);
            console.log("received : " + myResult);
            
            this.emit(':tell', 'The price per share for P S E G is ' + myResult[0] + ' dollars. Last updated at ' + myResult[1]);
        }
        );
    },
    
    // PSEG INFO AND TIPS
    'GetNewSavingTipIntent': function () {
        this.emit('GetTip');
    },
    'GetTip': function () {
        // Use this.t() to get corresponding language data
        const factArr = this.t('TIPS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = this.t(GET_FACT_MESSAGE) + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'CoolFactIntent': function(){
        this.emit('GetFact');
    },
    'GetFact': function () {
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = this.t(GET_FACT_MESSAGE) + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t(FACTS_SKILL_NAME), randomFact);
    },
    'AwardsIntent': function(){
        this.emit('GetAward');
    },
    'GetAward': function () {
        var factArr = this.t('AWARDS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = this.t(GET_FACT_MESSAGE) + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t(AWARDS_SKILL_NAME), randomFact);
    },
    'CafIntent': function () {
        this.emit(':tell', 'The P S E G Cafeteria is located on the third floor, take the elevator to the second floor and use the escalator to go get some food.');
    },
    'FactsIntent': function() {
        this.emit(':tell', 'P S E G, or Public Service Enterprise group, is the main energy distributor for New Jersey and Long Island. The company has been around since nineteen oh two and is one of the ten largest utility companies in the country. Wow, that is impressive!');
    },
    'ITInfoIntent': function(){
        this.emit(':tell', 'The I T department at P S E G is made up of a number of different sub teams such as Network Operations, Security, A P O, I P O, See So, Quality Assurance, and others. They are responsible for large scale technology projects which ensure that customers have the best experience when using our applications and services.');
    },
    'BestTeamIntent': function(){
        this.emit(':tell', 'The I T department is the best department at P S E G, that is where you can find all the best looking interns and employees.');
    },
    'IfYouWereRealIntent': function(){
        this.emit(':tell', 'If I could have a job I would definitely work in the I T department at P S E G. They are the smartest, funniest, and best looking group of employees. I cant even see and I know that.');
    },
    'locationsIntent': function(){
        this.emit(':tell','The main P S E G headquarters is in Newark New Jersey, however there are offices and power plants in other locations such as Edison, Salem, and Long Island.');
    }, 
    'ceoIntent': function(){
        this.emit(':tell', 'Ralph Izzo is the C E O of P S E G, he has held this position for the last ten years.');
    },
    'cioIntent': function(){
        this.emit(':tell', 'The C I O is currently Joseph Santamaria.');
    },
    'historyIntent': function(){
        this.emit(':tell', 'P S E G began in nineteen oh three and currently serves almost four million customers in New Jersey with electricity and or gas services.');
    },
    
    /*************** GROUP T15 ***************/
    
    // HELP QUESTIONS
    'beforeYouDig': function() {
        this.emit(':tell', 'Call 1 8 hundred, 2 7 2, 1 0 0 0');
    },
    'gasLeak': function(){
        this.emit(':tell', 'Call 1 8 hundred, 8 8 0, 7 7 3 4 to report a gas leak. In the mean time, be sure to open a window and leave the building.');
    },
    'downedWire': function(){
        this.emit(':tell', 'Call 1 8 hundred, 8 8 0, 7 7 3 4 to report a downed wire. Be sure to stay away from fallen lines and anything or anyone that may have come in contact with them.');
    },
    'powerOutage': function(){
        this.emit(':tell', 'Call 1 8 hundred, 8 8 0, 7 7 3 4 to report a power outage.');
    },
    // see help question vars at top for the following:
    'HelpDeskIntent' : function(){
        this.emit(':ask', anyIssue + "you may ask again if you need more help", CONTINUE);
    },
    'CallEightIntent' : function(){
        this.emit(':ask', SoftwareIssue + "you may ask again if you need more help", CONTINUE);
    },
    'CallSevenIntent' : function(){
        this.emit(':ask', voiceIssue + "you may ask again if you need more help", CONTINUE);
    },
    'numberIntent' : function(){
        this.emit(':ask',number + "you may ask again if you need more help", CONTINUE);
    },
    'Unhandled': function() {
    this.emit(':ask', unknown, unknown);
    },
    
    // SAFETY
    'SafetyIntent': function(){
        /* generalized intent that will use the function to go through the list
        and choose a random fact to be stated and removed from the list */
        var b=this;
        var safetyType=b.event.request.intent.slots.safetyType.value;
        
        switch(safetyType){
            case 'electric':
                ElectricSafety = new Tips(ElectricSafety, b, ElectricSafetyCopy);
                break;
            case 'gas':
                GasSafety = new Tips(GasSafety, b, GasSafetyCopy);
                break;
            case 'driving':
                SafeDriving = new Tips(SafeDriving, b, SafeDrivingCopy);
                break;
            case 'employee':
                EmployeeSafety = new Tips(EmployeeSafety, b, EmployeeSafetyCopy);
                break;
            default:
                b.emit(':tell', "I'm sorry, I do not know any safety tips on that subject.");
        }
    },
    'MoreFactsIntent': function(){
        /* this intent repopulates every list with the original contents after the user requests
        more facts to be said and then asks the user again what facts they would like to hear */
        GasSafety=GasSafetyCopy.slice();
        ElectricSafety=ElectricSafetyCopy.slice();
        SafeDriving=SafeDrivingCopy.slice();
        EmployeeSafety=EmployeeSafety.slice();
        this.emit(':tell', "Would you like to hear Gas Safety Information, Electric Safety Information, Driving Safety Information, or Employee Safety Information?");
    },
    'NoMoreFactsIntent': function(){
        /* this intent leaves the safety facts lists unpopulated */
        this.emit(':tell', "Ok.");
    },
    
    /*************** GROUP T17 ***************/
    
    // NUCLEAR
    'WhatIsNuclear': function () {
        this.emit(':tell', 'P S E G Nuclear L L C operates the Salem and Hope Creek Nuclear Generating Stations.  They are located together on one site in Salem County New Jersey.');
    },
    'SalemSpecs': function () {
        this.emit(':tell', 'Salem consists of dual unit pressured water reactors with a total generating capacity of two thousand two hundred and ninety six megawatts.  That is enough to generate enough electricity to power approximately two million homes per day.');
    },
    'SalemAge' : function () {
        this.emit(':tell', 'The construction of Salem began in nineteen sixty eight.  The first unit began commercial service in nineteen seventy seven while the second unit began commercial service in nineteen eighty one.');
    },
    'HopeCreekSpecs': function () {
        this.emit(':tell', 'Hope Creek consists of a single unit boiling water reactor with a total generating capacity of one thousand one hundred and seventy two megawatts.  That is enough to generate enough electricity to power approximately one million homes per day.');
    },
    'HopeCreekAge' : function () {
        this.emit(':tell', 'The construction of Hope creek began in nineteen seventy four.  Commercial service then began in nineteen eighty six.');
    },
    'NeedNuclear': function () {
     this.emit(':tell', 'Nuclear Power Plants in New Jersey produce reliable and clean energy that powers homes and businesses throughout the state. Using nuclear energy means cleaner air, lower electric bills, and economic growth. ');
    },
    'CleanNuclear': function () {
         this.emit(':tell', 'Nuclear energy provides more than ninety percent of New Jerseys pollution-free energy. If nuclear were to be replaced with fossil fuels, fourteen million tons of pollution would be added to the air. This is equivalent to adding 3 million more cars on the roads.');
    },
    'ReliNuclear': function () {
         this.emit(':tell', 'Nuclear energy makes up forty seven percent of electricity in New Jersey, powers two point seven million homes, and runs around the clock. Relying on fossil fuels would cause New Jersey to use more electricity than it produces, not to mention the fluctuation on cost if fossil fuel supplies are disrupted.');
    },
    
    // ACRONYMS
    'acronymHelper': function () {
        
        var acronym = this.event.request.intent.slots.AcronymName.value;
        var say = "Sorry, I don't know that acronym.";
        
        switch(acronym) {
            case 'ADR':
                say = 'A D R stands for Application Design Review.';
                break;
            case 'APO':
                say = 'A P O stands for Application Project Office.';
                break;
            case 'ARD':
                say = 'A R D stands for Application Requirements Document.';
                break;
            case 'ART':
                say = 'A R T stands for All Requirements and Testing.';
                break;
            case 'ASD':
                say = 'A S D stands for Accounting Services Department.';
                break;
            case 'ASO':
                say = 'A S O stands for Application Support Office.';
                break;
            case 'BGS':
                say = 'B G S stands for Basic Generation Service.';
                break;
            case 'BGSS':
                say = 'B G S S stands for Basic Gas Supply Service.';
                break;
            case 'BI':
                say = 'B I stands for Business Intelligence.';
                break;
            case 'BP':
                say = 'B P stands for Business Partner.';
                break;
            case 'BPL':
                say = 'B P L stands for Body Politic Lighting.';
                break;
            case 'BPM':
                say = 'B P M stands for Business Process Management.';
                break;
            case 'BPU':
                say = 'B P U stands for Board of PUblic Utilities.';
                break;
            case 'BR':
                say = 'B R stands for Business Requirements.';
                break;
            case 'BVA':
                say = 'B V A stands for Business Value Assessment.';
                break;
            case 'BVS':
                say = 'B V S stands for Business Valution Summary.';
                break;
            case 'CBT':
                say = 'C B T stands for Computer Based Training.';
                break;
            case 'CI':
                say = 'C I stands for Configuration Management.';                   //?
                break;
            case 'CIEP':
                say = 'C I E P stands for Commerical adn Industrial Energy Pricing.';
                break;
            case 'CISO':
                say = 'C I S O stands for Chief Information Security Office.';
                break;
            case 'CMDB':
                say = 'C M D B stands for Configuration Management Database.';
                break;
            case 'CSR':
                say = 'C S R stands for Customer Service Representative.';
                break;
            case 'DCR':
                say = 'D C R stands for Document Repository.';
                break;
            case 'DDI':
                say = 'D D I stands for Dynamic Data Integrator.';
                break;
            case 'EMR':
                say = 'E M R stands for Elastic Map Reduce.';
                break;
            case 'ER':
                say = 'E R stands for Enterprise Release.';
                break;
            case 'ERP':
                say = 'E R P stands for Enterprise Resource Planning.';
                break;
            case 'ERT':
                say = 'E R T stands for Energy Resource Transmission.';
                break;
            case 'FO':
                say = 'F O stands for Front Office.';
                break;
            case 'FR':
                say = 'F R stands for Functinoal Requirements.';
                break;
            case 'FRRB':
                say = 'F R R B stands for Funding Release Review Board.';
                break;
            case 'FTE':
                say = 'F T E stands for Full Time Employment.';
                break; 
            case 'GLP':
                say = 'G L P stands for General Lighting and Power.';
                break;
            case 'GSG':
                say = 'G S G stands for General Service Gas.';
                break;
            case 'HS':
                say = 'H S stands for Heating Service.';
                break;
            case 'HTS':
                say = 'H T S stands for High Tension Service.';
                break;
            case 'IM':
                say = 'I M stands for Infrastruction Management.';
                break;
            case 'IRD':
                say = 'I R D stands for Infrastructure Requirements Document.';
                break;
            case 'ISO':
                say = 'I S O stands for Infrastructure Support Office.';
                break;
            case 'IVR':
                say = 'I V R stands for Interactive Voice Response.';
                break;
            case 'KWH':
                say = 'K W H stands for Kilowatt Hour.';
                break;
            case 'LOB':
                say = 'L O B stands for Line of Business.';
                break;
            case 'LPL':
                say = 'L P L stands for Large Power and Lighting.';
                break;
            case 'LVG':
                say = 'L V G stands for Large Volume Gas.';
                break;
            case 'MAC':
                say = 'M A C stands for Margin Adjustment Charge.';
                break;
            case 'MM':
                say = 'M M stands for Material Management.';
                break;
            case 'NFR':
                say = 'N F R stands for Non-Functional Requirements.';
                break;
            case 'OGC':
                say = 'O G C stands for Ongoing Costs.';
                break;
            case 'OL':
                say = 'O L stands for Online Release.';                             //?
                break;
            case 'PA':
                say = 'P A stands for Production Acceptance.';
                break;
            case 'PCI':
                say = 'P C I stands for Project Cost Index.';
                break;
            case 'PCR':
                say = 'P C R stands for Personal Change Request.';
                break;
            case 'PEP':
                say = 'P E P stands for Purchased Electric Power.';
                break;
            case 'PII':
                say = 'P I I stands for Personal Identifying Information.';
                break;
            case 'PIR':
                say = 'P I R stands for Process Improvement Request.';
                break;
            case 'PO':
                say = 'P O stands for Purchase Order.';
                break;
            case 'POC':
                say = 'P O C stands for Proof of Concept.';
                break;
            case 'POF':
                say = 'P O F stands for Publically Owned Facilities.';
                break;
            case 'PPQA':
                say = 'P P Q A stands for Process and Product Quality Assurance.';
                break;
            case 'PSAL':
                say = 'P S A L stands for Private Street and Area Lighting.';
                break;
            case 'PSEG':
                say = 'P S E G stands for Public Service Enterprise Group.';
                break;
            case 'PSI':
                say = 'P S I stands for Project Schedule Index.';
                break;
            case 'PSR':
                say = 'P S R stands for Project Status Report.';
                break;
            case 'PT':
                say = 'P T stands for Performance Testing.';
                break;
            case 'PTC':
                say = 'P T C stands for Price to Compare.';
                break;
            case 'RCA':
                say = 'R C A stands for Root Cause Analysis.';
                break;
            case 'RHS':
                say = 'R H S stands for Residential Heating Service.';
                break;
            case 'RICEFW':
                say = 'R I C E F W stands for Reports, Interface, Conversation, Enhancements, Forms, and Workflow.';
                break;
            case 'RLM':
                say = 'R L M stands for Residential Load Management.';
                break;
            case 'RNC':
                say = 'R N C stands for Risk and Contingency.';                     //?
                break;
            case 'ROM':
                say = 'R O M stands for Rough Order of Magnitude.';
                break;
            case 'RPA':
                say = 'R P A stands for Robotic Process Automation.';
                break;
            case 'RS':
                say = 'R S stands for Residential Service.';
                break;
            case 'RSG':
                say = 'R S G stands for Residential Service Gas.';
                break;
            case 'SBC':
                say = 'S B C stands for Societal Benefits Charge.';
                break;
            case 'SLA':
                say = 'S L A stands for Service Level Agreement.';
                break;
            case 'SLG':
                say = 'S L G stands for Street Lighting Gas.';
                break;
            case 'SLO':
                say = 'S L O stands for Service Level.';                            //?
                break;
            case 'SLT':
                say = 'S L T stands for Service Level.';                            //?
                break;
            case 'SME':
                say = 'S M E stands for Subject Matter Experts.';
                break;
            case 'SN':
                say = 'S N stands for Service Now.';
                break;
            case 'SOW':
                say = 'S O W stands for Statement of Work.';
                break;
            case 'SRM':
                say = 'S R M stands for Strategic Relationship Manager.';
                break;
            case 'TAR':
                say = 'T A R stands for Tasks, Authority, Responsibilities.';
                break;
            case 'TDD':
                say = 'T D D stands for Test Driven Development.';
                break;
            case 'UAT':
                say = 'U A T stands for User Acceptance Testing.';
                break;
            case 'UPO':
                say = 'U P O stands for Unplanned Outage.';
                break;
            case 'WBS':
                say = 'W B S stands for Work Breakdown Structure.';
                break;
            case 'WH':
                say = 'W H stands for Water Heating.';
                break;
            case 'WHS':
                say = 'W H S stands for Water Heating Storage.';
                break;
            case 'WM':
                say = 'W M stands for Work Management.';
                break;
            case 'XI':
                say = 'X I stands for Exchange Infrastructure.';
                break;
        }
        
      this.emit(':tell', say);  
    }

};
