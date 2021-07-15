window.onclick = () => {
    window.parent.postMessage({
        'func': 'parentFunc',
        'message': 'Message text from iframe.'
    }, "*");
}
