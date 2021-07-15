window.onclick = () => {
    window.parent.postMessage({
        code: "FormBuilder",
        data: {
            company: "TestCompany"
        }
    },'*')
}
