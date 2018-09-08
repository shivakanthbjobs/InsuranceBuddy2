'use strict';

global.admin = require("firebase-admin");

global.serviceAccount = require("./insurancebuddy2-firebase-db.json");

global.admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firebasics-b561e.firebaseio.com"
});

global.db = admin.firestore();


// =================================================================================
// App Configuration
// =================================================================================

const { App } = require('jovo-framework');

var jsonQuery = require('json-query')


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
var myPremium = 1400
var glbPolicyNo = null
var glbClaimNo = null
var glbPolicyRec = null
// dbPolices.get()
//     .then(doc => {
//         dbPolicyRec = doc.data().title;
//     })


// =================================================================================
// App Logic
// =================================================================================

app.setHandler(require('./handlers/newPolicy'),require('./handlers/newClaim'),require('./handlers/fetchPolicyDetails'),{

    'LAUNCH': function () {
        glbPolicyNo = null
        glbClaimNo = null
        this.toIntent('WelcomeIntent');
    },

    'WelcomeIntent': function () {
        glbPolicyNo = null
        glbClaimNo = null
        let speech = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Intro.mp3')

            .addBreak('400ms').addT('welcomeMsg1')
            .addBreak('400ms').addT('welcomeMsg2')

        this
            .showImageCard(this.t('cardTitle'), this.t('claimPolicyDef'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/icon.PNG')
            .ask(speech);
    },

    'AMAZON.HelpIntent': function () {
        if (glbPolicyNo == null) {
            this.toIntent('WelcomeIntent');
        } else if (glbPolicyNo != null) {
            this
                .ask(this.speechBuilder().addT('helpPolicy'), this.speechBuilder().addT('helpPolicy'));
        } else {
            this
                .ask(this.speechBuilder().addT('helpPolicy'), this.speechBuilder().addT('helpPolicy'));
        }
    },

    'ThankYouIntent': function () {
        let speech = this.speechBuilder()
            .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Intro.mp3')
            //.addT(str)
            .addBreak('400ms').addT('ThankYouFromInsuranceBuddy')


        this
            .tell(speech, speech);
    },

    'StartIntent': function (entity, details, status) {
        let StartIntent = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('welcomeMsg2')


        if (entity.value === 'claim' && status.value === 'new') {
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
        else if (entity.value === 'policy') {

            if (details.value === 'details' || status.value === 'existing') {
                let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
                this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);
            }
            else if (status.value === 'new') {
                let policyWelcomeMsg = this.speechBuilder()
                    .addBreak('400ms').addT('ok')
                    .addBreak('400ms').addT('InMercShowroom')
                    .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
                    .addBreak('400ms').addT('DidYouBuyaCar')

                this.followUpState('BuyAPolicy')
                    .showImageCard(this.t('cardTitle'), this.t('DidYouBuyaCar'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/MercShowrrom.jpg')
                    .ask(policyWelcomeMsg, reprompt);

            } else {
                this.toIntent('Unhandled');
            }

        }
        else {
            this.toIntent('Unhandled');
        }
    },

   'Unhandled': function () {
        let speech = this.speechBuilder()
            .addBreak('400ms').addT('WeSorry')
            .addBreak('400ms').addT('welcomeMsg2')
        this.ask(speech);
    },

});
app.setLanguageResources(languageResources, { returnObjects: true });

module.exports.app = app;

