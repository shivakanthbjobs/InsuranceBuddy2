'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');


const hi = require('./I18n/hi-IN.json');
const inn = require('./I18n/en-IN.json');
const us = require('./I18n/en-US.json');

let languageResources = {
    'hi-IN': hi,
    'en-US': us,
    'en-IN': inn,
}


const config = {
    logging: true,
    intentMap: {
        'AMAZON.YesIntent': 'YesIntent',
        'AMAZON.NoIntent': 'NoIntent',
    },
    i18n: {
        resources: languageResources,
        returnNull: false,
        fallbackLng: 'en-IN',
    },  
};

const app = new App(config);
app.setLanguageResources(languageResources);
var  myPremium = 1400
var glbPolicyNo 
var glbClaimNo



// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    
    'LAUNCH': function() {
       // this.ask(this.t('WELCOME'');
        this.toIntent('WelcomeIntent');
    },

    'WelcomeIntent': function() {
        glbPolicyNo=null
        glbClaimNo =null
        let speech = this.speechBuilder()
      //  .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Intro.mp3')
        .addBreak('400ms').addT('welcomeMsg1')
        .addBreak('400ms').addT('welcomeMsg2')
       
        this
        .showImageCard(this.t('cardTitle'), this.t('claimPolicyDef'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/icon.PNG')
        .ask(speech);
    },  
    
    'StartIntent': function(entity, details,status) {
        let StartIntent=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT('fileAClaim').addBreak('400ms').addT('orAPolicy')


        if(entity.value === this.t('claim')) {
            StartIntent = this.speechBuilder()
             .addBreak('400ms').addT('getLocation')
             .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
             .addBreak('400ms').addT('accidentNotification')
             .addBreak('400ms').addT('IsAnyoneInjured')

             
            this
            .showImageCard(this.t('cardTitle'), this.t('IsAnyoneInjured'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/claim/2.1+images.jpg')
            .followUpState('SelectedClaimState')            
            .ask(StartIntent, reprompt);
        }
        
        else if(entity.value === this.t('policy'))  {
            
            if (details.value === 'details' || status.value === 'existing' || details.value === 'summary'  )  {
                let policyWelcomeMsg = this.speechBuilder()
                .addBreak('400ms').addT('ok')
                .addBreak('400ms').addT('GiveMePolicyNumber')
                
                this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg,reprompt);
            }
            else if (status.value === 'new' || status.value === null )  {
                let policyWelcomeMsg = this.speechBuilder()
                .addBreak('400ms').addT('ok')
                .addBreak('400ms').addT('InMercShowroom')
                .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
                .addBreak('400ms').addT('DidYouBuyaCar')
                
                this.followUpState('BuyAPolicy')
                .showImageCard(this.t('cardTitle'), this.t('DidYouBuyaCar'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/MercShowrrom.jpg')
                .ask(policyWelcomeMsg,reprompt);
    
            }
        }
        
 
    },


    'FetchPolicyIntent': function(policyno) {
        let prompt=''
        glbPolicyNo = policyno
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'PolicyWelcomeP1')
        .addBreak('400ms')
        .addT( 'PolicyWelcomeP2')
        this.ask(prompt, reprompt);
    },

    'PolicySummaryIntent': function() {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'PolicySummary')
        .addBreak('400ms')
        .addT( 'PolicySummaryOptions')
        this.ask(prompt, reprompt);
    },

    'NextPremiumIntent': function() {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'NextPremium')
        .addBreak('400ms')
        .addT( 'NextPremiumOptions')
        this.ask(prompt, reprompt);
    },

    
    'LastPremiumIntent': function() {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'LastPremium')
        .addBreak('400ms')
        .addT( 'LastPremiumOptions')
        this.ask(prompt, reprompt);
    },

    'PremiumAmountIntent': function() {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'PremiumAmount')
        .addBreak('400ms')
        .addT( 'PremiumAmountOptions')
        this.ask(prompt, reprompt);
    },

    'HowManyPremiumsIntent': function(polyno) {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'HowManyPremiums')
        .addBreak('400ms')
        .addT( 'HowManyPremiumsOptions')
        this.ask(prompt, reprompt);
    },   


    'PolicyExpiryIntent': function() {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'PolicyExpiry')
        .addBreak('400ms')
        .addT( 'PolicyExpiryOptions')
        this.ask(prompt, reprompt);
    }, 

    'NearestBranchIntent': function(branch) {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'NearestBranch')
        .addBreak('400ms')
        .addT( 'NearestBranchOptions')
        this.ask(prompt, reprompt);
    }, 

    'RelationshipManagerIntent': function() {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')
        prompt = this.speechBuilder()
        .addT( 'RelationshipManager')
        .addBreak('400ms')
        .addT( 'RelationshipManagerOptions')
        this.ask(prompt, reprompt);
    }, 

    'EmailDocumentIntent': function(mail,entity,details,cert) {
        let prompt=''
        let reprompt =  this.speechBuilder().addBreak('400ms').addT( 'PolicyWelcomeP2')

        if (entity === 'policy' && details === 'summary') {
            prompt = this.speechBuilder()=[]
            .addT( 'EmailPolicySummary')
            .addBreak('400ms')
            .addT( 'EmailPolicySummaryOptions')
            this.ask(prompt, reprompt);
   
        } else if (category === 'premium' && details === 'summary') {

            prompt = this.speechBuilder()
            .addT( 'EmailPremiumSummary')
            .addBreak('400ms')
            .addT( 'EmailPremiumSummaryOptions')
            this.ask(prompt, reprompt);
    
        } else if (category === 'premium' && cert === 'certificate') {
            prompt = this.speechBuilder()
            .addT( 'EmailPremiumCertificate')
            .addBreak('400ms')
            .addT( 'EmailPremiumCertificateOptions')
            this.ask(prompt, reprompt);
        }
        
    }, 

    

    /**************************CREATE CLAIM************************ */
    'SelectedClaimState': {
        'YesIntent': function() {
            let SelectedClaimState = this.t('DoYouNeedAnAmbulance');
            this.followUpState('NeedAmbulance').ask(SelectedClaimState);
        },
        'NoIntent': function() {
    
            let SelectedClaimState = this.speechBuilder()
            .addBreak('400ms').addT('GladYouAreOk')
            .addBreak('400ms').addT('MrShiv')
            .addBreak('400ms').addT('pinPointingYourCar')
            .addBreak('400ms').addT('InformedPoliceAndSendingDrone')
            .addBreak('400ms').addT('PhotosSentHelpInvestigation')
            .addAudio("https://s3-eu-west-1.amazonaws.com/insurance-buddy/Drone2.mp3")
            .addBreak('400ms').addT('DroneArrived')
            .addBreak('400ms').addT('droneTakePictures')
            .addBreak('400ms').addT('canWeTakePictures')
                    
            this.followUpState('DroneArrived')
            .showImageCard(this.t('cardTitle'), this.t('pinPointingYourCar'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/claim/3.+giphy-4.gif')
            .ask(SelectedClaimState, this.t('boolReprompt'));
        },

        'Unhandled': function() {
            this.followUpState('SelectedClaimState')
                .ask( this.t('boolPrompt'),  this.t('boolReprompt'));
        },
    }, 

    'NeedAmbulance': {
        'YesIntent': function() {

            let NeedAmbulance = this.speechBuilder()
            .addBreak('400ms').addT('BookedAmbulance')
            .addBreak('400ms').addT('AmbulanceCarOntheWaay')                  
                    
            this.tell(NeedAmbulance, this.t('boolReprompt'));

        },
        'NoIntent': function() {
            this.toStateIntent('SelectedClaimState', 'NoIntent');
        },
        'Unhandled': function() {
            this.followUpState('NeedAmbulance')
                .ask( this.t('boolPrompt'),  this.t('boolReprompt'));
        },
    },

    'DroneArrived': {
        'YesIntent': function() {

            let droneArrived = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/CameraClick1.mp3')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/CameraClick1.mp3')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/CameraClick1.mp3')
            //.addBreak('400ms')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
            //.addBreak('400ms')
            .addBreak('400ms').addT('recievedPhotosFromDrone')
            .addBreak('400ms').addT('assessedSituation')
            .addBreak('400ms').addT('canWeBookTowTruck')
                    
                    
            this.followUpState('CallForTowTruck')
            .showImageCard(this.t('cardTitle'), this.t('BookingTowTruck'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/claim/4.+Car-Tow-Truck-56137.gif')
            .ask(droneArrived, this.t('boolReprompt'));

        },
        'NoIntent': function() {

            let droneArrived = this.speechBuilder()
            .addBreak('400ms').addT('ok')
            .addBreak('400ms').addT('SendingPerson')
            .addBreak('400ms').addT('takeFewMinutes')
           
                    
            this.tell(droneArrived, this.t('boolReprompt'));
    
        },
        'Unhandled': function() {
            this.followUpState('DroneArrived')
                .ask( this.t('boolPrompt'),  this.t('boolReprompt'));
        },
    },


    'CallForTowTruck': {
        'YesIntent': function() {

            let CallForTowTruck = this.speechBuilder()
            .addBreak('400ms').addT('bookingaTowTruck')
            .addBreak('400ms').addT('bookingUber')
            .addBreak('400ms').addT('dontWorryAbouttheCar')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/UberCar1.mp3')
            .addBreak('400ms').addT('yourTowTruckArrived')
            .addBreak('400ms').addT('dontForgetCarKeys')
            .addBreak('400ms').addT('canWeProceed')
                                
            this.followUpState('UberArrived')
            .showImageCard(this.t('cardTitle'),this.t( 'yourTowTruckArrived'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/claim/5.1+tow-truck-logo-26.gif')
            .ask(CallForTowTruck, this.t('boolReprompt'));

        },
        'NoIntent': function() {

            let CallForTowTruck = this.speechBuilder()
            .addBreak('400ms').addT('ok')
            .addBreak('400ms').addT('SendingPerson')
            .addBreak('400ms').addT('takeFewMinutes')
            .addBreak('400ms').addT('bookingUber')
            .addBreak('400ms').addT('canWeProceed')
                    
            this.followUpState('UberArrived').tell(CallForTowTruck, this.t('boolReprompt'));
    
        },
        'Unhandled': function() {
            this.followUpState('CallForTowTruck')
                .ask( this.t('boolPrompt'),  this.t('boolReprompt'));
        },
    },

    'UberArrived': {
        'YesIntent': function() {

            let UberArrived = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/UberCar1.mp3')
            .addBreak('400ms').addT('uberHasArrived')
            .addBreak('400ms').addT('PleaseProceed')
            //.addBreak('3000ms')
            .addBreak('400ms').addT('didYouGetIntoTheCar')
                                
            this
            .showImageCard(this.t('cardTitle'), this.t('uberHasArrived'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/claim/6.+download.jpg')
            .followUpState('ClaimThanks').ask(UberArrived, this.t('boolReprompt'));

        },
        'NoIntent': function() {

            this.toStateIntent('ClaimThanks', 'YesIntent');
    
        },
        'Unhandled': function() {
            this.followUpState('UberArrived')
                .ask( this.t('boolPrompt'),  this.t('boolReprompt'));   
        },
    },

    'ClaimThanks': {
        'YesIntent': function() {

            let ClaimThanks = this.speechBuilder()
            .addBreak('400ms').addT('sentClaimDetailstoEmail')
            .addBreak('400ms').addT('keepPostedOnCar')
            .addBreak('400ms').addT('keepPostedOnClaim')
            .addBreak('400ms').addT('ThankYouFromInsuranceBuddy')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Intro.mp3')
                                
            this
            .showImageCard(this.t('cardTitle'), this.t('BigThankYou'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/claim/7+download.jpg')
            .tell(ClaimThanks, this.t('boolReprompt'));

        },
        'NoIntent': function() {

            let ClaimThanks = this.speechBuilder()
            .addBreak('400ms').addT('ok')
            .addBreak('400ms').addT('getIntoTheCar')
            .addBreak('400ms').addT('didYouGetIntoTheCar')
                    
            this.followUpState('ClaimThanks').tell(ClaimThanks, this.t('boolReprompt'));
    
        },
        'Unhandled': function() {
            this.followUpState('ClaimThanks')
                .ask( this.t('boolPrompt'),  this.t('boolReprompt'));
        },
    },
    


    'Unhandled': function() {
        let speech = this.speechBuilder()
        .addBreak('400ms').addT('WeSorry')
        .addBreak('400ms').addT('fileAClaim')
        .addBreak('400ms').addT('orAPolicy')
        this.ask(speech);
    },

    /*****************CREATE Policy***************************** */


    'BuyAPolicy': {
        'YesIntent': function() {
            let BuyAPolicy = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Applause2.mp3')
            .addBreak('400ms').addT('congratsOnMerc')
            .addBreak('400ms').addT('hasPreinstalledTelematics')
            .addBreak('400ms').addT('shallIGetTheQuote')
            
            this.followUpState('ProfileDescription')
            .showImageCard(this.t('cardTitle'), this.t('congrats'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/Congrats.jpg')
            .ask(BuyAPolicy,  this.t('boolReprompt'));
        }, 
        'NoIntent': function() {

            let BuyAPolicy = this.speechBuilder()
            .addBreak('400ms').addT('contactCustomerSupport')
            
            this.tell(BuyAPolicy,  this.t('boolReprompt'));

        },
        'Unhandled': function() {
            this.followUpState('BuyAPolicy')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },



    'ProfileDescription': {
        'YesIntent': function() {
            let ProfileDescription = this.speechBuilder()
            .addBreak('400ms').addT('getPermissionToAccessDetails')
            .addBreak('400ms').addT('canWefetchDetails')
            
            this.followUpState('HealthReport')
            .showImageCard(this.t('cardTitle'), this.t('canWefetchDetails'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/FetchingDetails.jpg')
            .ask(ProfileDescription,  this.t('boolReprompt'));
        },    
        'NoIntent': function() {

            let ProfileDescription = this.speechBuilder()
            .addBreak('400ms').addT('contactCustomerSupport')
            
            this.tell(ProfileDescription);

        },
        'Unhandled': function() {
            this.followUpState('ProfileDescription')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },

    'HealthReport': {
        'YesIntent': function() {
            let HealthReport = this.speechBuilder()
            .addBreak('400ms').addT('FetchingYourDetails')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
            .addBreak('400ms').addT('healthReport')
            .addBreak('400ms').addT('drivingReport')
            .addBreak('400ms').addT('proceedToGetQuote')
            .addBreak('400ms').addT('canWeProceed')
            
            this.followUpState('InitialPremiumAndOfferOne')
            .showImageCard(this.t('cardTitle'), this.t('reportDetails'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/HealthReport.jpg')
            .ask(HealthReport,  this.t('boolReprompt'));
        },    
        'NoIntent': function() {

            let HealthReport = this.speechBuilder()
            .addBreak('400ms').addT('noPolicywithoutAuthentication')
            .addBreak('400ms').addT('contactCustomerSupport')


            this.tell(HealthReport);

        },
        'Unhandled': function() {
            this.followUpState('HealthReport')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },

    'InitialPremiumAndOfferOne': {
        'YesIntent': function() {
            let InitialPremiumAndOfferOne = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
            .addBreak('400ms').addT('quoteReady')
            .addBreak('400ms').addT('basePremiumIs') 
            .addBreak('400ms').addT(myPremium)
            .addBreak('400ms').addT('dollars')
            .addBreak('400ms').addT('additionalFeaturesYouCanOpt')
            .addBreak('400ms').addT('BreakDownResuce')
            
            this.followUpState('AddOnTwo').ask(InitialPremiumAndOfferOne,  this.t('boolReprompt'));
        },    
        'NoIntent': function() {

            let InitialPremiumAndOfferOne = this.speechBuilder()
            .addBreak('400ms').addT('contactCustomerSupport')

            
            this.tell(InitialPremiumAndOfferOne);

        },
        'Unhandled': function() {
            this.followUpState('InitialPremiumAndOfferOne')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },

    'AddOnTwo': {
        'YesIntent': function() {
            myPremium = myPremium + 90    

            let AddOnTwo = this.speechBuilder()
            .addBreak('400ms').addT('Replacementlockcover')
            
            this.followUpState('FinalPremium').ask(AddOnTwo,  this.t('boolReprompt'));
           
        },    
        'NoIntent': function() {

            let AddOnTwo = this.speechBuilder()
            .addBreak('400ms').addT('Replacementlockcover')
            
            this.followUpState('FinalPremium').ask(AddOnTwo,  this.t('boolReprompt'));

        },
        'Unhandled': function() {
            this.followUpState('AddOnTwo')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },

    'FinalPremium': {
        'YesIntent': function() {
            myPremium = myPremium + 90  

            let FinalPremium = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
            .addBreak('400ms').addT('finalPremium')
            .addBreak('400ms').addT(myPremium) 
            .addBreak('400ms').addT('dollars') 
            .addBreak('400ms').addT('annually')
             //.addBreak('400ms').addT('' or  '+ ((myPremium/2) +25) +' dollars  if you pay every 6 months ') 
             // .addBreak('400ms').addT('' or '+ ((myPremium/2) +50)+' quarterly  ')
            .addBreak('400ms').addT('proceedPayment')

            this.followUpState('CreditCardSection').ask(FinalPremium,  this.t('boolReprompt'));
           
        },    
        'NoIntent': function() {

            let FinalPremium = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
            .addBreak('400ms').addT('finalPremium')
            .addBreak('400ms').addT(myPremium) 
            .addBreak('400ms').addT('dollars') 
            .addBreak('400ms').addT('annually')
             //.addBreak('400ms').addT('' or  '+ ((myPremium/2) +25) +' dollars  if you pay every 6 months ') 
             // .addBreak('400ms').addT('' or '+ ((myPremium/2) +50)+' quarterly  ')
            .addBreak('400ms').addT('proceedPayment')

            
            this.followUpState('CreditCardSection').ask(FinalPremium,  this.t('boolReprompt'));

        },
        'Unhandled': function() {
            this.followUpState('FinalPremium')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },
    

    'CreditCardSection': {
        'YesIntent': function() {
            let CreditCardSection = this.speechBuilder()
            .addBreak('400ms').addT('useDefaultCreditCard')

            
            this.followUpState('FingerPrint').ask(CreditCardSection,  this.t('boolReprompt'));

        },    
        'NoIntent': function() {

            let CreditCardSection = this.speechBuilder()
            .addBreak('400ms').addT('noPaymentNoPolicy'   )
            .addBreak('400ms').addT('contactCustomerSupport'   )
            
            this.tell(CreditCardSection,  this.t('boolReprompt'));
            

        },
        'Unhandled': function() {
            this.followUpState('CreditCardSection')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },    

    'FingerPrint': {
        'YesIntent': function() {
            let FingerPrint = this.speechBuilder()
            .addBreak('400ms').addT('placefingerforProceeding')
            .addBreak('400ms').addT('yesToProceed'  )

            
            this.followUpState('CongratsPolicy').ask(FingerPrint,  this.t('boolReprompt'));

        },    
        'NoIntent': function() {

            let FingerPrint = this.speechBuilder()
            .addBreak('400ms').addT('noPaymentNoPolicy'   )
            .addBreak('400ms').addT('contactCustomerSupport'   )
            
            this.tell(FingerPrint,  this.t('boolReprompt'));

        },
        'Unhandled': function() {
            this.followUpState('FingerPrint')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },
    },    

    'CongratsPolicy': {
        'YesIntent': function() {
            let CongratsPolicy = this.speechBuilder()
            .addBreak('400ms').addT('AuthenticatingFingerPrint')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
                        //.addBreak('1000ms')
            .addBreak('400ms').addT('paymentSuccessful')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Applause2.mp3')
            
            .addBreak('400ms').addT('congratsOnPolicy')
            .addBreak('400ms').addT('yourPolicyNumberIs')
            .addSayAsCharacters('PL102312') 
            .addBreak('400ms').addT('physicalCopy')
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Intro.mp3')
                        

            
            this.tell(CongratsPolicy,  this.t('boolReprompt'));

        },    
        'NoIntent': function() {

            
        },
        'Unhandled': function() {
            this.followUpState('CongratsPolicy')
                .ask( this.t('boolReprompt'),  this.t('boolReprompt'));
        },

        'RepeatIntent': function() {
            this.repeat();
        },
    },       
    
   
});
app.setLanguageResources(languageResources, { returnObjects: true });

module.exports.app = app;

