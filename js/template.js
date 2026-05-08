function getHTMLForStartScreen() {
    return `
                <div id="start-button">
                    <img class="start-button" src="./assets/buttons/button-start.png" alt="start-button" onclick="startGame()">
                </div>
    
    `}

function getHTMLForSoundButton() {
    return `
                <div id="sound-button">
                <div id="sound-on">
                 <img class="sound-button" src="./assets/buttons/button-sound-on.png" alt="button-sound-on" onclick="toogleSound()">
                 </div>
                 <div id="sound-mute" class="d-none">
                   <img class="sound-button" src="./assets/buttons/button-sound-mute.png" alt="button-sound-mute" onclick="toogleSound()">
                   </div>
          
                  
                </div>
    
    `}

function getHTMLForMenu() {
    return `
              <div id="impressum-menu">
                            <img class="impressum-button" src="./assets/buttons/button-impressum.png" alt="impressum"
                                onclick="openModalImpressum()">
                        </div>
                        <div id="instructions-menu">
                            <img class="instructions-button" src="./assets/buttons/button-menu.png" alt="instructions"
                                onclick="openModalInstructions()">
            </div>

    `}

function getHTMLForScreenWin() {
    return `
<div class="win-lost-menu">
    <div class="back-main-menu">
        <img class="main-menu-button" src="./assets/buttons/button-main-menu.png" alt="button main menu"
            onclick="loadGame()">
    </div>
    <div class="restart">
        <img class="restart-button" src="./assets/buttons/button-restart.png" alt="button restart"
            onclick="startGame()">
    </div>
</div>
    `}

function getHTMLForScreenLost() {
    return `
<div class="win-lost-menu">
    <div class="back-main-menu">
        <img class="main-menu-button" src="./assets/buttons/button-main-menu.png" alt="button main menu"
            onclick="loadGame()">
    </div>
    <div class="restart">
        <img class="restart-button" src="./assets/buttons/button-restart.png" alt="button restart"
            onclick="startGame()">
    </div>
</div>
    `}

    function getHTMLForImpressum() {
    return `
    <div class="modal-content">
        <span class="close-btn" onclick="closeModalImpressum()">&times;</span>
        <h2>Impressum</h2>
        <p>
        </p>
    </div>
    `}

    function getHTMLForInstructions() {
    return `
    <div class="modal-content">
        <span class="close-btn" onclick="closeModalInstructions()">&times;</span>
        <h2>Instructions</h2>
        <p>
        </p>
    </div>
    `}