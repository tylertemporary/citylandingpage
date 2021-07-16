window.onclick = () => {
    window.parent.postMessage({
        messenger: "formBuilder",
        name: "formBuilder:postData",
        fields: {
            company: document.getElementById('text-0000000a').value,
            legalBusinessName: document.getElementById('text-0000000c').value,
            taxId: document.getElementById('text-00000012').value,
            lineOfBusiness: document.getElementById('text-00000026').value,
            otherServices: document.getElementById('textarea-00000028').value,
            carriers: document.getElementById('text-0000002c').value,
            source: document.getElementById('text-0000002e').value,
            title: document.getElementById('text-00000034').value,
            additionalInformation: document.getElementById('textarea-0000003a').value
        }
    },'*')
}
