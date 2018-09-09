module.exports = {
    
    'FetchClaimIntent': function (claimno) {
    },

    'ClaimStatusIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);
        }
        else {
            prompt = glbClaimRec.ClaimStatus + this.speechBuilder()
                .addBreak('400ms')
                .addT('ClaimStatusOptions')
            this.ask(prompt, reprompt);
        }
    },

    'LastCommentIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);
        }
        else {
            prompt = glbClaimRec.LastComment + this.speechBuilder()
                .addBreak('400ms')
                .addT('LastCommentOptions')
            this.ask(prompt, reprompt);
        }
    },

    'LastDepartmentIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);
        }
        else {
            prompt = glbClaimRec.LastDepartment + this.speechBuilder()
                .addBreak('400ms')
                .addT('LastDepartmentOptions')
            this.ask(prompt, reprompt);
        }
    },

    'LossDateIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);
        }
        else {
            prompt = glbClaimRec.LossDate + this.speechBuilder()
                .addBreak('400ms')
                .addT('LossDateOptions')
            this.ask(prompt, reprompt);
        }
    },


    'NoOfInvoicesIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);
        }
        else {
            prompt = glbClaimRec.NoOfInvoices + this.speechBuilder()
                .addBreak('400ms')
                .addT('NoOfInvoicesOptions')
            this.ask(prompt, reprompt);
        }
    },   


    'EmailDocumentIntent': function (mail, entity, details, cert) {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);

        }
        else {

            if (entity === 'claim' && details === 'summary') {
                prompt = this.speechBuilder() = []
                    .addT('EmailClaimSummary')
                    .addBreak('400ms')
                    .addT('EmailClaimSummaryOptions')
                this.ask(prompt, reprompt);

            } else if (category === 'premium' && details === 'summary') {

                prompt = this.speechBuilder()
                    .addT('EmailPremiumSummary')
                    .addBreak('400ms')
                    .addT('EmailPremiumSummaryOptions')
                this.ask(prompt, reprompt);

            } else if (category === 'premium' && cert === 'certificate') {
                prompt = this.speechBuilder()
                    .addT('EmailPremiumCertificate')
                    .addBreak('400ms')
                    .addT('EmailPremiumCertificateOptions')
                this.ask(prompt, reprompt);
            }
        }
    },

};