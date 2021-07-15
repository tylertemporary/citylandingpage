window.onclick = () => {
    console.log("fiired");
    window.parent.postMessage('foo','*')
}
