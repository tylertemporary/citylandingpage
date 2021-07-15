window.onclick = () => {
    window.parent.postMessage({
        messenger: "formBuilder",
        name: "formBuilder:postData",
        fields: {
            company: document.getElementById('text-0000000a').value
        }
    },'*')
}
