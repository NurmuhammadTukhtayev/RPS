var dataGame = {
    value:{
        player:0,
        bot: 0
    },
    state:{
        win:0,
        lose:0,
        draw:0
    }
}

if(!localStorage.getItem('state'))
    localStorage.setItem('state', JSON.stringify(dataGame.state))
else
    dataGame.state = JSON.parse(localStorage.getItem('state'))

var LevelStart = () =>{
    document.querySelector("#game").append(createBtn(["btn"], "Start", handleStartGame))
}

var LevelGame = () =>{
    let gameContent = createEl("div", ["game-content"])
    let gameAction = createEl("div", ["game-action"])
    let gameActionBot = createEl('div', ["game-action-bot"])
    let gameActionBotList = createEl('div', ["game-action-bot-list"])
    let gameBlock1 = createEl('div', ["game-block"])

    let result = createEl('div', ['result'])
    let text = document.createElement('h2')
    text.innerHTML = ''
    result.append(text)
    document.querySelector('#game').append(result)

    gameActionBot.append(gameActionBotList)
    gameActionBotList.append(gameBlock1)
    gameAction.append(gameActionBot)
    gameContent.append(gameAction)

    let gameActionCenter = createEl('div', ["game-action-center"])
    let spanCenter = document.createElement('span')
    spanCenter.innerHTML = "vs"
    gameActionCenter.append(spanCenter)
    gameAction.append(gameActionCenter)

    let gameActionPlayer = createEl('div', ["game-action-player"])
    let gameBlock = createEl('div', ["game-block"])
    gameActionPlayer.append(gameBlock)
    gameAction.append(gameActionPlayer)

    let gameInput = createEl('div', ["game-buttons"])

    let removeListeners = () =>{
        let btns = document.querySelectorAll('button');
        for (const btn of btns) {
            const oldBtnElement = btn
            const newBtnElement = oldBtnElement.cloneNode(true);
            oldBtnElement.parentNode.replaceChild(newBtnElement, oldBtnElement);
        }
    }

    let onChoose = (chose)=>{
        selectPlayer(chose)
        selectBot()
        removeListeners()
    }
    
    let btnB1 = createBtn(['btn', 'btn-b', 'btn-b1'], "", ()=>{
        onChoose(1)
    })

    let btnB2 = createBtn(['btn', 'btn-b', 'btn-b2'], "", ()=>{
        onChoose(2)
    })

    let btnB3 = createBtn(['btn', 'btn-b', 'btn-b3'], "", ()=>{
        onChoose(3)
    })

    gameInput.append(btnB1)
    gameInput.append(btnB2)
    gameInput.append(btnB3)
    gameAction.append(gameInput)

    let selectPlayer = (a)=>{
        let tmpPlayer = createEl('div', ['game-block', 'game-block-'+a+''])
        gameActionPlayer.innerHTML = ""
        gameActionPlayer.append(tmpPlayer)

        dataGame.value.player = a
    }

    let selectBot = ()=>{
        gameActionBotList.innerHTML = ""
        let value = getRandomInt(3)
        value ++

        dataGame.value.bot = value

        let tmpBot = createEl('div', ['game-block', 'game-block-'+value+''])
        gameActionBotList.append(tmpBot)

        resultGame()
    }

    document.querySelector('#game').append(gameContent)
}

var LevelEnd = () =>{
    var gameContent = createEl("div", ["game-content"]);
	var title = createEl("span", ["game-text", "pb-10"]);
	title.innerHTML = "Statistics:";
	
    var gameState = createEl("div", ["game-state"]);
	var tableState = createEl("table", []);
	
    var trWins = createEl("tr", []);
	var tdWin = createEl("td", []);
	tdWin.innerHTML = "Win:";
	var tdWinValue = createEl("td", ["win"]);
	tdWinValue.innerHTML = dataGame.state.win;
	
    var trLoses = createEl("tr", []);
	var tdLose = createEl("td", []);
	tdLose.innerHTML = "Lose:";
	var tdLoseValue = createEl("td", ["over"]);
	tdLoseValue.innerHTML = dataGame.state.lose;

    var trDraws = createEl('tr', [])
    var tdDraw = createEl('td', [])
    tdDraw.innerHTML = 'Draw:'
    var tdDrawValue = createEl('td', ['draw'])
    tdDrawValue.innerHTML = dataGame.state.draw

	var btnRefresh = createBtn(["btn", "btn-refresh"], "", handleStartGame);

	gameContent.append( title );
	gameState.append( tableState );
	tableState.append( trWins );
	trWins.append( tdWin );
	trWins.append( tdWinValue );
	tableState.append( trLoses );
	trLoses.append( tdLose );
	trLoses.append( tdLoseValue );
    tableState.append(trDraws);
    trDraws.append(tdDraw)
    trDraws.append(tdDrawValue)
	gameContent.append( gameState );
	gameContent.append( btnRefresh );

	document.querySelector("#game").append( gameContent );
}

var resultGame = ()=>{
    nowLevel = dataLevels.end;
    let result = 'Draw'

	switch (dataGame.value.player === dataGame.value.bot || `${dataGame.value.player}${dataGame.value.bot}`) {
		case true :
			++dataGame.state.draw
			break;
		case "13" :
		case "21" :
		case "32" :
			++dataGame.state.win;
            result = 'You Win!'
			break;
		default :
            result = 'You Lost!'
			++dataGame.state.lose;
	}

    document.querySelector('h2').innerHTML = result
    localStorage.setItem('state', JSON.stringify(dataGame.state))

    setTimeout(() => {
        levelClear()
        loadLevel()
    }, 1000);
}

var createEl = (el, classList) =>{
    var element = document.createElement(el)
    element.classList.add(...classList)

    return element
}

var dataLevels = {
    start: LevelStart,
    game: LevelGame,
    end: LevelEnd
}

var nowLevel = dataLevels.start



var createBtn = (classBtn, contentBtn, handler) =>{
    let btn = document.createElement("button")
    btn.classList.add(...classBtn)
    btn.innerHTML = contentBtn
    btn.addEventListener("click", handler, {capture:true, once:true})

    return btn
}




window.addEventListener("load", ()=>{
    initGame("body")
    loadLevel()
})

var initGame = (parent) =>{
    let gameContainer = document.createElement("div")
    gameContainer.id = "game"
    document.querySelector(parent).append(gameContainer)
}

var handleStartGame = () =>{
    nowLevel = dataLevels.game
    levelClear()
    loadLevel()
}

var levelClear = () =>{
    document.querySelector("#game").innerHTML = ""
}

var getRandomInt = (max) =>{
    return Math.floor(Math.random()*Math.floor(max))
}

var loadLevel = () =>{
    nowLevel()
}