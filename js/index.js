const tabList = document.getElementById("tabList")
const view = document.getElementById("characterView")

const getCharactersList = () => {
    let req = new XMLHttpRequest;
    req.open('GET', "https://www.anapioficeandfire.com/api/characters")
    req.onload = function () {
        if (this.status === 200) {
            characterListHandler(JSON.parse(this.responseText));
            console.log(JSON.parse(this.responseText))
        } else {
            console.log("Error occured")
        }
    }
    req.send();
}


const characterListHandler = (data) => {
    data.forEach(character => {
        let tab = document.createElement('div')
        tab.className = "tab"
        tab.dataset.url = character.url
        const name = character.aliases[0]
        tab.innerHTML = `<h3>${name}</h3>`
        tab.addEventListener("click", () => getCharacterData(tab.dataset.url))
        tabList.append(tab)
    });
}

const getCharacterData = url => {
    let req = new XMLHttpRequest;
    req.open('GET', url)
    req.onload = function () {
        if (this.status === 200) {
            getCharacterView(JSON.parse(this.responseText))
            console.log(JSON.parse(this.responseText))


        } else {
            console.log("Error occured")
        }
    }
    req.send();
}

const getCharacterView = data => {
    view.innerHTML = ''
    let characterName = document.createElement("h2")
    characterName.className = "characterName"
    characterName.innerText = data.aliases[0]
    view.append(characterName)
    for (const [key, value] of Object.entries(data)) {
        let dataRow = document.createElement('div')
        dataRow.className = "dataRow"
        dataRow.innerHTML = `<span>${key}</span>: ${value}`
        view.append(dataRow)
    }

}