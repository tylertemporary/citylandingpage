window.onclick = () => {
    console.log("fiired");
    console.log(window.parent);
    window.parent.postMessage({
        'func': 'parentFunc',
        'message': 'Message text from iframe.'
    }, "*");
}
