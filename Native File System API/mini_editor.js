let handle = undefined;
updateSaveButton();

function updateSaveButton() {
    document.getElementById("buttonSave").disabled = handle == undefined;
}

async function handleShowContentsClicked() {
    const dirHandle = await window.chooseFileSystemEntries({
        type: "openDirectory",
    });
    const entries = await dirHandle.getEntries();
    let result = "";
    for await (const entry of entries) {
        if (result.length > 0) {
            result += "\n";
        }
        result += entry.name;
    }
    document.getElementById("fileContent").value = result;
}

async function handleNewClicked() {
    handle = await window.chooseFileSystemEntries({
        type: "saveFile",
        multiple: false,
        accepts: [{
            extensions: ['txt'],
        }],
        mimeTypes: ['text/plain'],
    });
    document.getElementById("filename").innerHTML = `${handle.name} (new)`;
    document.getElementById("fileContent").value = "";
    console.log(`queryPermission(): ${await handle.queryPermission()}`);
    updateSaveButton();
}

async function handleSelectClicked() {
    handle = await window.chooseFileSystemEntries({
        type: "openFile",
        multiple: false,
        accepts: [{
            extensions: ['txt'],
        }]
    });
    console.log(handle.isFile);
    console.log(handle.isDirectory);
    console.log(handle.name);
    const file = await handle.getFile();
    document.getElementById("filename").innerHTML = `${file.name} (${file.size} Bytes)`;
    document.getElementById("fileContent").value = await file.text();
    updateSaveButton();
}

async function handleSaveClicked() {
    const writer = await handle.createWriter();
    await writer.truncate(0);
    await writer.write(0, document.getElementById("fileContent").value);
    await writer.close();
}