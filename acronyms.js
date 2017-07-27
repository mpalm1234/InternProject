var Alexa = require('alexa-sdk');

    exports.handler = function(event, context, callback) {
        var alexa = Alexa.handler(event, context);
        alexa.registerHandlers(handlers);
        alexa.execute();
    };

    var handlers = {
        
        'LaunchRequest': function () {
            this.emit('MyIntent');
        },

        'acronymHelper': function () {
            
            var acronym = this.event.request.intent.slots.AcronymName.value;
            var say = "Sorry, I don't know that acronym.";
            
            switch(acronym) {
            case 'A D R':
                say = 'A D R stands for Application Design Review';
                break;
            case 'A P O':
                say = 'A P O stands for Application Project Office';
                break;
            case 'A R D':
                say = 'A R D stands for Application Requirements Document';
                break;
            case 'A R T':
                say = 'A R T stands for All Requirements and Testing';
                break;
            case 'A S D':
                say = 'A S D stands for Accounting Services Department';
                break;
            case 'A S O':
                say = 'A S O stands for Application Support Office';
                break;
            case 'B I':
                say = 'B I stands for Business Intelligence';
                break;
            case 'B P':
                say = 'B P stands for Business Partner';
                break;
            case 'B P M':
                say = 'B P M stands for Business Process Management';
                break;
            case 'B R':
                say = 'B R stands for Business Requirements';
                break;
            case 'B V A':
                say = 'B V A stands for Business Value Assessment';
                break;
            case 'B V S':
                say = 'B V S stands for Business Valution Summary';
                break;
            case 'C B T':
                say = 'C B T stands for Computer Based Training';
                break;
            case 'C I':
                say = 'C I stands for Configuration Management';
                break;
            case 'C I S O':
                say = 'C I S O stands for Chief Information Security Office';
                break;
            case 'C M D B':
                say = 'C M D B stands for Configuration Management Database';
                break;
            case 'C S R':
                say = 'C S R stands for Customer Service Representative';
                break;
            case 'D C R':
                say = 'D C R stands for Document Repository';
                break;
            case 'D D I':
                say = 'D D I stands for Dynamic Data Integrator';
                break;
            case 'E M R':
                say = 'E M R stands for Elastic Map Reduce';
                break;
            case 'E R':
                say = 'E R stands for Enterprise Release';
                break;
            case 'E R P':
                say = 'E R P stands for Enterprise Resource Planning';
                break;
            case 'E R T':
                say = 'E R T stands for Energy Resource Transmission';
                break;
            case 'F O':
                say = 'F O stands for Front Office';
                break;
            case 'F R':
                say = 'F R stands for Functinoal Requirements';
                break;
            case 'F R R B':
                say = 'F R R B stands for Funding Release Review Board';
                break;
            case 'F T E':
                say = 'F T E stands for Full Time Employment';
                break; 
            case 'I M':
                say = 'I M stands for Infrastruction Management';
                break;
            case 'I R D':
                say = 'I R D stands for Infrastructure Requirements Document';
                break;
            case 'I S O':
                say = 'I S O stands for Infrastructure Support Office';
                break;
            case 'I V R':
                say = 'I V R stands for Interactive Voice Response';
                break;
            case 'L O B':
                say = 'L O B stands for Line of Business';
                break;
            case 'M M':
                say = 'M M stands for Material Management';
                break;
            case 'N F R':
                say = 'N F R stands for Non-Functional Requirements';
                break;
            case 'O G C':
                say = 'O G C stands for Ongoing Costs';
                break;
            case 'O L':
                say = 'O L stands for Online Release';
                break;
            case 'P A':
                say = 'P A stands for Production Acceptance';
                break;
            case 'P C I':
                say = 'P C I stands for Project Cost Index';
                break;
            case 'P C R':
                say = 'P C R stands for Personal Change Request';
                break;
            case 'P I I':
                say = 'P I I stands for Personal Identifying Information';
                break;
            case 'P I R':
                say = 'P I R stands for Process Improvement Request';
                break;
            case 'P O':
                say = 'P O stands for Purchase Order';
                break;
            case 'P O C':
                say = 'P O C stands for Proof of Concept';
                break;
            case 'P P Q A':
                say = 'P P Q A stands for Process and Product Quality Assurance';
                break;
                
            case 'P S I':
                say = 'P S I stands for Project Schedule Index';
                break;
            case 'P S R':
                say = 'P S R stands for Project Status Report';
                break;
            case 'P T':
                say = 'P T stands for Performance Testing';
                break;
            case 'R C A':
                say = 'R C A stands for Root Cause Analysis';
                break;
            case 'R I C E F W':
                say = 'R I C E F W stands for Reports, Interface, Conversation, Enhancements, Forms, and Workflow';
                break;
            case 'R N C':
                say = 'R N C stands for Risk and Contingency';
                break;
            case 'R O M':
                say = 'R O M stands for Rough Order of Magnitude';
                break;
            case 'R P A':
                say = 'R P A stands for Robotic Process Automation';
                break;
            case 'S L A':
                say = 'S L A stands for Service Level Agreement';
                break;
            case 'S L O':
                say = 'S L O stands for Service Level';
                break;
            case 'S L T':
                say = 'S L T stands for Service Level';
                break;
            case 'S M E':
                say = 'S M E stands for Subject Matter Experts';
                break;
            case 'S N':
                say = 'S N stands for Service Now';
                break;
            case 'S O W':
                say = 'S O W stands for Statement of Work';
                break;
            case 'S R M':
                say = 'S R M stands for Strategic Relationship Manager';
                break;
            case 'T A R':
                say = 'T A R stands for Tasks, Authority, Responsibilities';
                break;
            case 'T D D':
                say = 'T D D stands for Test Driven Development';
                break;
            case 'U A T':
                say = 'U A T stands for User Acceptance Testing';
                break;
            case 'U P O':
                say = 'U P O stands for Unplanned Outage';
                break;
            case 'W B S':
                say = 'W B S stands for Work Breakdown Structure';
                break;
            case 'W M':
                say = 'W M stands for Work Management';
                break;
            case 'X I':
                say = 'X I stands for Exchange Infrastructure';
                break;
        }
            
          this.emit(':tell', say);  
        }

    };
