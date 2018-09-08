module.exports = {
    
    'FetchClaimIntent': function (claimNo) {
        var dbClaims = db.collection('Claim');
        console.log("fetchClaims :  dbClaims" + dbClaims)
        var claimQuery = dbClaims.where('ClaimNumber', '==', claimNo.value)
        console.log("fetchClaims :  claimQuery" + claimQuery + "claimno.value = " + claimNo.value)
        claimQuery.get()
            .then(Claim => {
                Claim.forEach(doc => {
                    glbClaimRec = doc.data();
                    console.log('SHIVACLAIM ' + glbClaimRec.ClaimNumber )

                    let prompt = ''
                    glbClaimNo = claimNo
                    let reprompt =   this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
                    prompt =  this.speechBuilder()
                        .addT('ClaimWelcomeP1')
                        .addText(glbClaimRec.InsuranceCompany)
                        .addBreak('400ms')
                        .addT('ClaimWelcomeP2')
                    this.ask(prompt, reprompt);
            
                })
            })
    },

    'ClaimStatusIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);
        }
        else {
            prompt = glbClaimRec.Summary + this.speechBuilder()
                .addBreak('400ms')
                .addT('ClaimSummaryOptions')
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
                .addT('ClaimSummaryOptions')
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
                .addT('ClaimSummaryOptions')
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
                .addT('ClaimSummaryOptions')
            this.ask(prompt, reprompt);
        }
    },


    'NoOfClaimantsIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
        if (glbClaimNo == null) {
            let claimWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMeClaimNumber')
            this.followUpState('FetchClaimIntent').ask(claimWelcomeMsg, reprompt);
        }
        else {
            prompt = glbClaimRec.NoOfClaimants + this.speechBuilder()
                .addBreak('400ms')
                .addT('ClaimSummaryOptions')
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