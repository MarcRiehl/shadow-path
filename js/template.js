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
              <div id="impressum">
                            <img class="impressum-button" src="./assets/buttons/button-impressum.png" alt="impressum"
                                onclick="openModal()">
                        </div>
                        <div id="instructions">
                            <img class="instructions-button" src="./assets/buttons/button-menu.png" alt="instructions"
                                onclick="openModal()">
            </div>
    
    `}

function getHTMLForScreenWin() {
    return `
    
    `}

function getHTMLForScreenLost() {
    return `
    
    `}