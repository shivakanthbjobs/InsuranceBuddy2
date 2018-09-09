module.exports = {
    
    'FetchPolicyIntent': function (policyno) {
        if(glbPolicyNo=="") {
            var dbPolices = db.collection('Policy');
            console.log("fetchPolices :  dbPolices" + dbPolices)
            var policyQuery = dbPolices.where('PolicyNumber', '==', policyno.value)
            console.log("fetchPolices :  policyQuery" + policyQuery + "policyno.value = " + policyno.value)
            policyQuery.get()
                .then(Policy => {
                    Policy.forEach(doc => {
                        glbPolicyRec = doc.data();
                        console.log('SHIVAPOLICY ' + glbPolicyRec.PolicyNumber )
    
                        let prompt = ''
                        glbPolicyNo = policyno
                        let reprompt =   this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
                        prompt =  this.speechBuilder()
                            .addT('PolicyWelcomeP1')
                            .addText(glbPolicyRec.InsuranceCompany)
                            .addBreak('400ms')
                            .addT('PolicyWelcomeP2')
                        this.ask(prompt, reprompt);
                
                    })
                })
    
        }   
        else  if(glbClaimNo=="") {
            var dbClaims = db.collection('Claim');
            console.log("fetchClaims :  dbClaims" + dbClaims)
            var claimQuery = dbClaims.where('ClaimNo', '==', policyno.value)
            console.log("fetchClaims :  claimQuery" + claimQuery + "policyno.value = " + policyno.value)
            claimQuery.get()
                .then(Claim => {
                    Claim.forEach(doc => {
                        glbClaimRec = doc.data();
                        console.log('SHIVACLAIM ' + glbClaimRec.ClaimNumber )
    
                        let prompt = '';
                        glbClaimNo = policyno;
                        let reprompt =   this.speechBuilder().addBreak('400ms').addT('ClaimWelcomeP2')
                        prompt =  this.speechBuilder()
                            .addT('ClaimWelcomeP1')
                            .addBreak('400ms')
                            .addT('ClaimWelcomeP2')
                        this.ask(prompt, reprompt);
                
                    })
                })
        } 

    },
    'PolicySummaryIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {
            prompt = glbPolicyRec.Summary + this.speechBuilder()
                .addBreak('400ms')
                .addT('PolicySummaryOptions')
            this.ask(prompt, reprompt);
        }
    },

    'NextPremiumIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);
        }
        else {
            prompt = this.speechBuilder()
                .addT('NextPremium1')
                .addText(glbPolicyRec.DueDate)
                .addT('NextPremium2')
                .addText(glbPolicyRec.NextPremiumAmt)
                .addBreak('400ms')
                .addT('NextPremiumOptions')
            this.ask(prompt, reprompt);
        }
    },


    'LastPremiumIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')

        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {
            prompt = this.speechBuilder()
                .addT('LastPremium')
                .addText(glbPolicyRec.LastPremium)
                .addT('LastPremium2')
                .addText(glbPolicyRec.NextPremiumAmt)
                .addT('LastPremium3')
                .addBreak('400ms')
                .addT('LastPremiumOptions')
            this.ask(prompt, reprompt);
        }
    },

    'PremiumAmountIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {

            prompt = this.speechBuilder()
                .addT('PremiumAmount')
                .addText(glbPolicyRec.Premium)
                .addT('PremiumAmount2')
                .addBreak('400ms')
                .addT('PremiumAmountOptions')
            this.ask(prompt, reprompt);
        }
    },

    'HowManyPremiumsIntent': function (polyno) {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')

        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {

            prompt = this.speechBuilder()
                .addT('HowManyPremiums')
                .addText(glbPolicyRec.NoOfPremiums)
                .addT('HowManyPremiums2')
                .addBreak('400ms')
                .addT('HowManyPremiumsOptions')
            this.ask(prompt, reprompt);
        }
    },


    'PolicyExpiryIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {

            prompt = this.speechBuilder()
                .addT('PolicyExpiry')
                .addText(glbPolicyRec.ExpiryDate)
                .addBreak('400ms')
                .addT('PolicyExpiryOptions')
            this.ask(prompt, reprompt);
        }
    },

    'NearestBranchIntent': function (branch) {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {

            prompt = this.speechBuilder()
                .addT('NearestBranch')
                .addText(glbPolicyRec.BranchAddress)
                .addT('NearestBranch2')
                .addBreak('400ms')
                .addT('NearestBranchOptions')
            this.ask(prompt, reprompt);
        }
    },

    'RelationshipManagerIntent': function () {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {

            prompt = this.speechBuilder()
                .addT('RelationshipManager')
                .addText(glbPolicyRec.RelationshipManager)
                .addT('RelationshipManager2')
                .addBreak('600ms')
                .addT('RelationshipManagerOptions')
            this.ask(prompt, reprompt);
        }
    },

    'EmailDocumentIntent': function (mail, entity, details, cert) {
        let prompt = ''
        let reprompt = this.speechBuilder().addBreak('400ms').addT('PolicyWelcomeP2')
        if (glbPolicyNo == null) {
            let policyWelcomeMsg = this.speechBuilder().addBreak('400ms').addT('ok').addBreak('400ms').addT('GiveMePolicyNumber')
            this.followUpState('FetchPolicyIntent').ask(policyWelcomeMsg, reprompt);

        }
        else {

            if (entity === 'policy' && details === 'summary') {
                prompt = this.speechBuilder() = []
                    .addT('EmailPolicySummary')
                    .addBreak('400ms')
                    .addT('EmailPolicySummaryOptions')
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