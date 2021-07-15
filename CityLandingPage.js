window.onclick = () => {
    window.parent.postMessage({
        messenger: "formBuilder",
        name: "formBuilder:postData",
        data: {
            company: "TestCompany"
        }
    },'*')
}
