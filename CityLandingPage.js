function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', e => reject(e.error));
        document.head.appendChild(script);
    });
}

/** cookies v1.1.0*/
(function () {
    var tools = {
        /**
        * Href cookie name.
        */
        hrefCookieName: "bpmHref",

        /**
        * Ref cookie name.
        */
        refCookieName: "bpmRef",

        /**
        * Session cookie name.
        */
        obsoleteCookieName: "bpmSessionId",
        trackingIdCookieName: "bpmTrackingId",
        href: null,
        ref: null,
		
		/**
		* Top-level domains.
		*/
		TLDs: ["ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "arpa", "as", "asia", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "com", "coop", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "edu", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jobs", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mm", "mn", "mo", "mobi", "money", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "name", "nc", "ne", "net", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xn--0zwm56d", "xn--11b5bs3a9aj6g", "xn--3e0b707e", "xn--45brj9c", "xn--80akhbyknj4f", "xn--90a3ac", "xn--9t4b11yi5a", "xn--clchc0ea0b2g2a9gcd", "xn--deba0ad", "xn--fiqs8s", "xn--fiqz9s", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--g6w251d", "xn--gecrj9c", "xn--h2brj9c", "xn--hgbk6aj7f53bba", "xn--hlcj6aya9esc7a", "xn--j6w193g", "xn--jxalpdlp", "xn--kgbechtv", "xn--kprw13d", "xn--kpry57d", "xn--lgbbat1ad8j", "xn--mgbaam7a8h", "xn--mgbayh7gpa", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgberp4a5d4ar", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1ai", "xn--pgbs0dh", "xn--s9brj9c", "xn--wgbh1c", "xn--wgbl6a", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zckzah", "xxx", "ye", "yt", "za", "zm", "zw", "zone"].join(),

        /**
        * Returns the value of cookie with the specified key.
	    * @param {String} name The key (cookie name) of the cookie.
	    * @return {String} The value of a specified cookie.
	    */
        getCookie: function (name) {
            var cname = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(cname) === 0) {
                    return c.substring(cname.length, c.length);
                }
            }
            return null;
        },

        /**
         * @param {string} name Cookie name.
         * @param {string} value Coockie value.
         * @param {string} expires Cookie expires date in GMT string representation.
         * @param {string} domain Cookie domain.
         * @returns {string} String data for the cookie.
         */
        formatCookieString: function (name, value, expires, domain) {
            return name ? name + "=" + (value ? value : "") +
                (expires ? ";expires=" + expires : "") +
                "; path=/" +
                (domain ? ";domain=" + domain : "")
                : null;
        },

        /**
         * @param {string} name Name of the cookie.
         * @returns {void}
         */
        deleteCookie: function (name) {
            var domain = this.getTopLevelDomain();
            var expireDate = "Thu, 01 Jan 1970 00:00:01 GMT";
            var coockieString = this.formatCookieString(name, null, expireDate, domain);
            if (coockieString) {
                document.cookie = coockieString;
            }
        },

        /**
         * Get top-level domain of the current page.
         * @returns {string} Domain name.
         */
        getTopLevelDomain: function() {
            var url = document.location.hostname;
			var parts = url.split('.');
			if (parts[0] === 'www' && parts[1] !== 'com'){
				parts.shift()
			}
			var ln = parts.length
			  , i = ln
			  , minLength = parts[parts.length-1].length
			  , part
			while(part = parts[--i]){
				if (i === 0
					|| i < ln-2
					|| part.length < minLength
					|| this.TLDs.indexOf(part) < 0
				){
					return parts.slice(i).join('.')
				}
			}
        },

        /**
         * Replace value of new tracking cookie with existing old value.
         * @returns {bool} True if the tracking id cookie was replaced with existing value of the old cookie.
         */
        replaceTrackingIdCookie: function () {
            var existingCookie = this.getCookie(this.obsoleteCookieName);
            if (existingCookie) {
                this.setCookie(this.trackingIdCookieName, existingCookie);
                this.deleteCookie(this.obsoleteCookieName);
                return true;
            }
            return false;
        },

        /**
        * Set the value of cookie with the specified key.
	    * @param {String} name The key (cookie name) of the cookie.
	    * @param {String} value The value of a specified cookie.
	    */
        setCookie: function (name, value) {
            var date = new Date();
            var expiresCookieDays = 180;
            date.setTime(date.getTime() + (expiresCookieDays * 24 * 60 * 60 * 1000));
            var expires = date.toGMTString();
            var domain = this.getTopLevelDomain();
            var coockieString = this.formatCookieString(name, value, expires, domain);
            if (coockieString) {
                document.cookie = coockieString;
            }
        },

        /**
        * Init module.
	    */
        init: function () {
            this.href = window.location.href;
            this.ref = document.referrer;
        },
		
		/**
        * Returns domain name.
	    * @param {String} site url.
	    * @return {String} domain name.
	    */
        extractDomain: function (url) {
            var domain;
            if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
            } else {
                domain = url.split('/')[0];
            }
            domain = domain.split('/')[0];
            if (domain.substring(0, 4) === "www.") {
                domain = domain.substring(4, domain.length);
            }
            return domain;
        },

        /**
        * Returns the value of flag.
        * @return {Boolean} The flag for internal navigation.
        */
        isInternalNavigation: function () {
            if (this.ref === "") {
                return false;
            }
            return this.extractDomain(this.ref) === this.extractDomain(location.host);
        },

        /**
        * Returns the value of flag.
        * @param {String} value The url address.
        * @return {Boolean} The flag for url address is contains Utm.
        */
        containsUtm: function (value) {
            var queryStr = value.split("?")[1];
            var queryParams = [];
            if (queryStr) {
                queryParams = queryStr.split("&");
            }
            var flag = false;
            var i = 0;
            while (i < queryParams.length && !flag) {
                var param = queryParams[i].trim();
                flag = param.indexOf("utm_") === 0;
                i++;
            }
            return flag;
        },

        /**
        * Returns new guid.
        * @return {String} new guid.
        */
        newGuid: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        }
    };
    tools.init();
    if (!tools.isInternalNavigation()) {
        if (tools.ref === "" && !tools.containsUtm(tools.href)) {
            var refValue = tools.getCookie(tools.refCookieName);
            var hrefValue = tools.getCookie(tools.hrefCookieName);
            if (!refValue) {
                tools.setCookie(tools.refCookieName, "");
            }
            if (!hrefValue || refValue === "") {
                tools.setCookie(tools.hrefCookieName, tools.href);
            }
        } else {
            tools.setCookie(tools.refCookieName, tools.extractDomain(tools.ref));
            tools.setCookie(tools.hrefCookieName, tools.href);
        }
        if (!tools.getCookie(tools.trackingIdCookieName) && !tools.replaceTrackingIdCookie()) {
            tools.setCookie(tools.trackingIdCookieName, tools.newGuid());
        }
    }
})();
"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),landing=function(){var a=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"setFieldsData",value:function setFieldsData(b){for(var c in this.config.fields){var d=this.config.fields[c];a.addFieldRecord(b,c,a.getElementValueBySelector(d))}}},{key:"setContactFieldsData",value:function setContactFieldsData(b){for(var c in this.config.contactFields){var d=this.config.contactFields[c];b.contactFieldsData.push({name:c,value:a.getElementValueBySelector(d)})}}},{key:"mergeProperties",value:function mergeProperties(b,c){for(var d in c)c.hasOwnProperty(d)&&(b[d]=c[d]);return b}},{key:"transformObjectToArray",value:function transformObjectToArray(obj){var props=Object.keys(obj);return props.map(function(key){return{name:key,value:obj[key]};});}},{key:"getLandingData",value:function getLandingData(){var f=[];if(this.config.hasOwnProperty("customFields")&&this.config.customFields!==null){f=this.transformObjectToArray(this.config.customFields);}var g=[];if(this.config.hasOwnProperty("trackingFields")&&this.config.trackingFields!==null){g=this.transformObjectToArray(this.config.trackingFields);}var b={formId:this.config.landingId,formFieldsData:f,contactFieldsData:g,options:{extendResponseWithExceptionType:!0}};b.options=this.mergeProperties(b.options,this.config.options);this.setFieldsData(b);if(this.config.hasOwnProperty("contactFields")&&this.config.contactFields!==null){this.setContactFieldsData(b);}a.setCookiesData(b);return b;}},{key:"getExceptionHandlerName",value:function getExceptionHandlerName(b){return"on"+b+"Handler"}},{key:"getFunctionFromObject",value:function getFunctionFromObject(b,c){if(c&&b&&b in c){var d=c[b];if(a.jQuery.isFunction(d))return d}0}},{key:"getExceptionHandler",value:function getExceptionHandler(b){var c=this.getFunctionFromObject(this.getExceptionHandlerName(b),this.config);return c?c:(c=this.getFunctionFromObject(this.getExceptionHandlerName(b),this),c?c:void 0)}},{key:"callExceptionHandler",value:function callExceptionHandler(b){if(-1===b.resultCode){var c=this.getExceptionHandler(b.exceptionType);if(c)return c(b,this),!0}return!1}},{key:"onError",value:function onError(b,c,d){a.jQuery.isFunction(this.config.onError)&&this.config.onError(b,c,d)}},{key:"onComplete",value:function onComplete(b){a.jQuery.isFunction(this.config.onComplete)&&this.config.onComplete(b)}},{key:"onSuccess",value:function onSuccess(b){a.jQuery.isFunction(this.config.onSuccess)&&this.config.onSuccess(b)}},{key:"onSaveDuplicatedEntityExceptionHandler",value:function onSaveDuplicatedEntityExceptionHandler(b,c){c.redirect()}},{key:"onResponse",value:function onResponse(b){var c=b.SaveWebFormLeadDataResult||b.SaveWebFormObjectDataResult;if(c){var _d=a.parseResponse(c);this.callExceptionHandler(_d)||(this.config.onSuccess?this.onSuccess(_d):0===_d.resultCode&&this.config.redirectUrl&&this.redirect())}}},{key:"redirect",value:function redirect(){window.location.href=this.config.redirectUrl}},{key:"createObjectFromLanding",value:function createObjectFromLanding(b){this.config=b;var c={formData:this.getLandingData()};this.addContactRegistrationInfo(c.formData),a.jQuery.ajax({url:b.serviceUrl,type:"POST",data:JSON.stringify(c),contentType:"application/json; charset=UTF-8",async:!0,crossDomain:!0,error:this.onError.bind(this),success:this.onResponse.bind(this),complete:this.onComplete.bind(this)})}},{key:"addContactRegistrationInfo",value:function addContactRegistrationInfo(b){this.contactId.value&&b.formFieldsData.push(this.contactId),this.bulkEmailRecipientId.value&&b.formFieldsData.push(this.bulkEmailRecipientId)}},{key:"createLeadFromLanding",value:function createLeadFromLanding(b){return console.warn("Method \"createLeadFromLanding()\" is obsolete. Use \"createObjectFromLanding()\""),this.createObjectFromLanding(b)}},{key:"initLanding",value:function initLanding(b){if(!a.isIE())for(var c in b.fields){var d=a.getURLParameter(c.replace(".","_"));a.setElementValueBySelector(b.fields[c],d)}}},{key:"contactId",get:function get(){if(!this._contactId){var b=a.contactIdKey;this._contactId={name:b,value:a.getURLParameter(b)||a.getCookie(b)}}return this._contactId}},{key:"bulkEmailRecipientId",get:function get(){if(!this._bulkEmailRecipientId){var b=a.bulkEmailRecipientIdKey;this._bulkEmailRecipientId={name:b,value:a.getURLParameter(b)||a.getCookie(b)}}return this._bulkEmailRecipientId}},{key:"config",get:function get(){if(!this._config)throw Error("Config not found");return this._config},set:function set(b){this._config=b}}],[{key:"$",value:function $(){if(!window.jQuery)throw Error("jQuery not found");return window.jQuery.apply(window.jQuery,arguments)}},{key:"addFieldRecord",value:function addFieldRecord(b,c,d){b.formFieldsData.push({name:c,value:d})}},{key:"parseResponse",value:function parseResponse(b){return b=b.replace("resultCode","\"resultCode\""),b=b.replace("resultMessage","\"resultMessage\""),b=b.replace("exceptionType","\"exceptionType\""),b=b.replace("optionResult","\"optionResult\""),JSON.parse(b)}},{key:"getCookie",value:function getCookie(b){if(!b)return"";var c=new RegExp("(?:(?:^|.*;)\\s*"+b+"\\s*\\=\\s*([^;]*).*$)|^.*$");return a.cookie.replace(c,"$1")||""}},{key:"getCorrectCookiesName",value:function getCorrectCookiesName(b){return{BpmRef:"bpmRef",BpmHref:"bpmHref",BpmSessionId:"bpmTrackingId"}[b]}},{key:"setCookiesData",value:function setCookiesData(b){for(var _arr=["BpmRef","BpmHref","BpmSessionId"],_i=0;_i<_arr.length;_i++){var c=_arr[_i],d=a.getCorrectCookiesName(c),e=a.getCookie(d);e&&a.addFieldRecord(b,c,e)}}},{key:"getElementValueBySelector",value:function getElementValueBySelector(b){var c=a.$(b)[0];return c?a.$(c).is(":checkbox")?a.$(c).prop("checked"):a.$(c).val():""}},{key:"setElementValueBySelector",value:function setElementValueBySelector(b,c){var d=a.$(b)[0];d&&a.$(d).val(c)}},{key:"getURLParameter",value:function getURLParameter(b){return decodeURIComponent((RegExp("[?|&]"+b+"=(.+?)(&|$)","i").exec(a.getLocationSearch())||[,""])[1])}},{key:"getLocationSearch",value:function getLocationSearch(){return location.search}},{key:"isIE",value:function isIE(){return /msie|trident/i.test(window.navigator.userAgent)}},{key:"contactIdKey",get:function get(){return"ContactId"}},{key:"bulkEmailRecipientIdKey",get:function get(){return"BulkEmailRecipientId"}},{key:"cookieExpireDays",get:function get(){return 7}},{key:"cookie",get:function get(){return document.cookie}},{key:"jQuery",get:function get(){if(!window.jQuery)throw Error("jQuery not found");return window.jQuery}}]),a}();return new a(window.$)}();


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

window.console.log(window.document);
window.console.log(window);

window.onclick = () => {
    createObject();
}
