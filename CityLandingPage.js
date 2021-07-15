window.onclick = () => {
    window.parent.postMessage({
        messenger: "formBuilder",
        name: "formBuilder:postData",
        fields: {
            company: "TestCompany"
        }
    },'*')
}
