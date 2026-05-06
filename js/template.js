function getHTMLForStartScreen() {
    AudioHub.playOne(AudioHub.CHARACTER_WALKING);
    return `
                <div id="start-button">
                    <img class="start-button" src="./assets/buttons/button-start.png" alt="start-button" onclick="startGame()">
                </div>
    
    `}