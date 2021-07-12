function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', e => reject(e.error));
        document.head.appendChild(script);
    });
}

injectScript("https://webtracking-v01.bpmonline.com/JS/track-cookies.js");
injectScript("https://webtracking-v01.bpmonline.com/JS/create-object.js");



/**
* Replace the "css-selector" placeholders in the code below with the element selectors on your landing page.
* You can use #id or any other CSS selector that will define the input field explicitly.
* Example: "Email": "#MyEmailField".
* If you don't have a field from the list below placed on your landing, leave the placeholder or remove the line.
*/
var config = {
    fields: {
        "Name": "css-selector", // Name of a visitor, submitting the page
        "Email": "css-selector", // Visitor's email
        "Zip": "css-selector", // Visitor's ZIP code
        "MobilePhone": "css-selector", // Visitor's phone number
        "Company": "css-selector", // Name of a company (for business landing pages)
        "Industry": "css-selector", // Company industry (for business landing pages)
        "FullJobTitle": "css-selector", // Visitor's job title (for business landing pages)
        "UseEmail": "css-selector", // Logical value: 'true' equals to visitor's opt-in to receive emails
        "City": "css-selector", // City
        "Country": "css-selector", // Country
        "Commentary": "css-selector", // Notes
        "UsrContactFirstName": "css-selector", // Contact first name
        "UsrContactLastName": "css-selector", // Contact last name
        "UsrHelpRequested": "css-selector", // Help requested
        "UsrNumber": "css-selector", // Number
        "UsrSourceDetail": "css-selector", // Source Details
        "UsrRefId": "css-selector" // RefId
    },
    landingId: "5a80076b-e53d-48d7-9145-38a4d7dab441",
    serviceUrl: "https://citycommunications.creatio.com/0/ServiceModel/GeneratedObjectWebFormService.svc/SaveWebFormObjectData",
    redirectUrl: ""
};
/**
* The function below creates a object from the submitted data.
* Bind this function call to the "onSubmit" event of the form or any other elements events.
* Example: <form class="mainForm" name="landingForm" onSubmit="createObject(); return false">
*/
function createObject() {
    landing.createObjectFromLanding(config)
}
/**
* The function below inits landing page using URL parameters.
*/
function initLanding() {
    landing.initLanding(config)
}
jQuery(document).ready(initLanding)

