document.getElementById("commitForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if ((document.getElementById("name").value).trim().length > 0 && (document.getElementById("name").value).trim().length < 20 && document.getElementById("name").value.toLowerCase().trim().indexOf('Dev(noah)'.toLowerCase()) === -1) {
        if ((document.getElementById("text").value).trim().length > 0 && (document.getElementById("text").value).trim().length < 280) {
            let xhr = new XMLHttpRequest();

            xhr.open("POST", window.location, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                text: document.getElementById("text").value,
                name: document.getElementById("name").value
            }));
            alert("Submitted Successfully!");
            refresh();
        } else {
            alert("You did not leave a comment or it was too long!");
            refresh();
        }
    } else {
        alert("There is no username or it was too long!");
        refresh();
    }
});

let refresh = function () {
    let xhr = new XMLHttpRequest();

    xhr.open("PUT", window.location, true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = xhr.responseText;
            res = res.split('\n');
            parse(res);
        } else {
            console.log("help");
        }
    }

    xhr.send();
}

let parse = function (data) {
    for (let i = 0; i < data.length - 1; i++) {
        try {
            data[i] = JSON.parse(data[i]);
        } catch (e) {
            data[i] = {};
        }
    }
    data.pop();
    post(data);
}

let post = function (data) {
    let comments = ''
    for (let i = data.length - 1; i >= 0; i--) {
        let name = data[i].name;
        let text = data[i].text;
        text = text.replace('<', '&lt;');
        text = text.replace('>', '&gt;');
        name = name.replace('<', '&lt;');
        name = name.replace('>', '&gt;');
        comments = comments + `<div style="text-align: center; padding: 10px">${name} said, "${text}"</div>`;
    }
    document.getElementById("comments").innerHTML = `${comments}`
}

refresh();