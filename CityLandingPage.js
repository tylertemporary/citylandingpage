window.onclick = () => {
    console.log("fiired");
    window.parent.postMessage({
        'func': 'parentFunc',
        'message': 'Message text from iframe.'
    }, "*");
}
