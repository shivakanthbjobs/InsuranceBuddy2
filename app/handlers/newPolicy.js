module.exports = {
    /*****************CREATE Policy***************************** */


    'BuyAPolicy': {
        'YesIntent': function () {
            let BuyAPolicy = this.speechBuilder()
                .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Applause2.mp3')
                .addBreak('400ms').addT('congratsOnMerc')
                .addBreak('400ms').addT('hasPreinstalledTelematics')
                .addBreak('400ms').addT('shallIGetTheQuote')

            this.followUpState('ProfileDescription')
                .showImageCard(this.t('cardTitle'), this.t('congrats'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/Congrats.jpg')
                .ask(BuyAPolicy, this.t('boolReprompt'));
        },
        'NoIntent': function () {

            let BuyAPolicy = this.speechBuilder()
                .addBreak('400ms').addT('contactCustomerSupport')

            this.tell(BuyAPolicy, this.t('boolReprompt'));

        },
        'Unhandled': function () {
            this.followUpState('BuyAPolicy')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },



    'ProfileDescription': {
        'YesIntent': function () {
            let ProfileDescription = this.speechBuilder()
                .addBreak('400ms').addT('getPermissionToAccessDetails')
                .addBreak('400ms').addT('canWefetchDetails')

            this.followUpState('HealthReport')
                .showImageCard(this.t('cardTitle'), this.t('canWefetchDetails'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/FetchingDetails.jpg')
                .ask(ProfileDescription, this.t('boolReprompt'));
        },
        'NoIntent': function () {

            let ProfileDescription = this.speechBuilder()
                .addBreak('400ms').addT('contactCustomerSupport')

            this.tell(ProfileDescription);

        },
        'Unhandled': function () {
            this.followUpState('ProfileDescription')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },

    'HealthReport': {
        'YesIntent': function () {
            let HealthReport = this.speechBuilder()
                .addBreak('400ms').addT('FetchingYourDetails')
                .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
                .addBreak('400ms').addT('healthReport')
                .addBreak('400ms').addT('drivingReport')
                .addBreak('400ms').addT('proceedToGetQuote')
                .addBreak('400ms').addT('canWeProceed')

            this.followUpState('InitialPremiumAndOfferOne')
                .showImageCard(this.t('cardTitle'), this.t('reportDetails'), 'https://s3-eu-west-1.amazonaws.com/insurance-buddy/CardImages/HealthReport.jpg')
                .ask(HealthReport, this.t('boolReprompt'));
        },
        'NoIntent': function () {

            let HealthReport = this.speechBuilder()
                .addBreak('400ms').addT('noPolicywithoutAuthentication')
                .addBreak('400ms').addT('contactCustomerSupport')


            this.tell(HealthReport);

        },
        'Unhandled': function () {
            this.followUpState('HealthReport')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },

    'InitialPremiumAndOfferOne': {
        'YesIntent': function () {
            let InitialPremiumAndOfferOne = this.speechBuilder()
                .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
                .addBreak('400ms').addT('quoteReady')
                .addBreak('400ms').addT('basePremiumIs')
                .addBreak('400ms').addT(myPremium)
                .addBreak('400ms').addT('dollars')
                .addBreak('400ms').addT('additionalFeaturesYouCanOpt')
                .addBreak('400ms').addT('BreakDownResuce')

            this.followUpState('AddOnTwo').ask(InitialPremiumAndOfferOne, this.t('boolReprompt'));
        },
        'NoIntent': function () {

            let InitialPremiumAndOfferOne = this.speechBuilder()
                .addBreak('400ms').addT('contactCustomerSupport')


            this.tell(InitialPremiumAndOfferOne);

        },
        'Unhandled': function () {
            this.followUpState('InitialPremiumAndOfferOne')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },

    'AddOnTwo': {
        'YesIntent': function () {
            myPremium = myPremium + 90

            let AddOnTwo = this.speechBuilder()
                .addBreak('400ms').addT('Replacementlockcover')

            this.followUpState('FinalPremium').ask(AddOnTwo, this.t('boolReprompt'));

        },
        'NoIntent': function () {

            let AddOnTwo = this.speechBuilder()
                .addBreak('400ms').addT('Replacementlockcover')

            this.followUpState('FinalPremium').ask(AddOnTwo, this.t('boolReprompt'));

        },
        'Unhandled': function () {
            this.followUpState('AddOnTwo')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },

    'FinalPremium': {
        'YesIntent': function () {
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

            this.followUpState('CreditCardSection').ask(FinalPremium, this.t('boolReprompt'));

        },
        'NoIntent': function () {

            let FinalPremium = this.speechBuilder()
                .addAudio('https://s3-eu-west-1.amazonaws.com/insurance-buddy/Process1.mp3')
                .addBreak('400ms').addT('finalPremium')
                .addBreak('400ms').addT(myPremium)
                .addBreak('400ms').addT('dollars')
                .addBreak('400ms').addT('annually')
                //.addBreak('400ms').addT('' or  '+ ((myPremium/2) +25) +' dollars  if you pay every 6 months ') 
                // .addBreak('400ms').addT('' or '+ ((myPremium/2) +50)+' quarterly  ')
                .addBreak('400ms').addT('proceedPayment')


            this.followUpState('CreditCardSection').ask(FinalPremium, this.t('boolReprompt'));

        },
        'Unhandled': function () {
            this.followUpState('FinalPremium')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },


    'CreditCardSection': {
        'YesIntent': function () {
            let CreditCardSection = this.speechBuilder()
                .addBreak('400ms').addT('useDefaultCreditCard')


            this.followUpState('FingerPrint').ask(CreditCardSection, this.t('boolReprompt'));

        },
        'NoIntent': function () {

            let CreditCardSection = this.speechBuilder()
                .addBreak('400ms').addT('noPaymentNoPolicy')
                .addBreak('400ms').addT('contactCustomerSupport')

            this.tell(CreditCardSection, this.t('boolReprompt'));


        },
        'Unhandled': function () {
            this.followUpState('CreditCardSection')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },

    'FingerPrint': {
        'YesIntent': function () {
            let FingerPrint = this.speechBuilder()
                .addBreak('400ms').addT('placefingerforProceeding')
                .addBreak('400ms').addT('yesToProceed')


            this.followUpState('CongratsPolicy').ask(FingerPrint, this.t('boolReprompt'));

        },
        'NoIntent': function () {

            let FingerPrint = this.speechBuilder()
                .addBreak('400ms').addT('noPaymentNoPolicy')
                .addBreak('400ms').addT('contactCustomerSupport')

            this.tell(FingerPrint, this.t('boolReprompt'));

        },
        'Unhandled': function () {
            this.followUpState('FingerPrint')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },
    },

    'CongratsPolicy': {
        'YesIntent': function () {
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



            this.tell(CongratsPolicy, this.t('boolReprompt'));

        },
        'NoIntent': function () {


        },
        'Unhandled': function () {
            this.followUpState('CongratsPolicy')
                .ask(this.t('boolReprompt'), this.t('boolReprompt'));
        },

        'RepeatIntent': function () {
            this.repeat();
        },
    },

};