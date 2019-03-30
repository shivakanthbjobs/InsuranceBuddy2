# Insurance Buddy

## CHALLENGES / OPPORTUNITIES

- Auto Insurance Customers are Fed up with Traditional Insurance Solutions

 - Delayed Services 

 - Awful Customer Support


## SOLUTION

**Multi Platform:** Implemented using Alexa  SDK ( Alexa Skill ) and Google SDK (Google Action)

**Multi Process:** Personalized Auto Insurance Conversations
- Create a New Policy 
- Create a Claim ( post accident)
 -Fetch Policy details
- Fetch Claim details

**Multi Lingual:** Customer can converse in multiple languages 
- English
- Hindi 


## Benefits 

- Multi Platform : Works on amazon echo devices and google home devices (device having a google assistant )

- Light weight : Installation not required just need one to enable skill or action 

- Works on home devices and Mobile devices 

- Multi Lingual : Flexible framework make adding a new language extremely simple



### Installation
It is a node application 

```sh
# Install node (npm) dependencies
$ npm install

# Builds the files for your alexa skill and google actions  ( optional:  Use this command post local changes )
$ jovo build

# Deploys this new  skill to your Alexa developers account @ https://developer.amazon.com/alexa/console/ask
$ jovo deploy

# Start the Server ( jovo web hoot url will appear on the console e.g. https://webhook.jovo.cloud/1fdd42ff-7057-4841-a4cf-1234567890)
$ jovo run watch 
```
Note : jovo deploy -  automatically deploys the to alexa developers account but google actions needs manual intervention [click me to know more](https://www.jovo.tech/tutorials/google-action-tutorial-nodejs)

## Demo 
Start talking to your Alexa echo or Traverse to your alexa developers account @ [alexa demo page]( 
 

### Development

Want to contribute? Great!

### TODO'S

 - Unit test cases 
 - Data model 

