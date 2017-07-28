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
