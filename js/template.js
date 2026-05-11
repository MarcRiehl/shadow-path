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
                 <section id="datenschutz">
                    <h2 class="h-law">Impressum</h2>

                    <h2 class="h-law">Angaben gemäß § 5 TMG</h2>
                    <p>
                        BurgerHouse<br>
                        Inh. Marc Riehl<br>
                        Pellenzstr. 123<br>
                        56743 Mendig
                    </p>
                    <br>
                    <h2 class="h-law">Kontakt</h2>
                    <p>
                        Telefon: <a class="links-law" href="tel:+4926529585067">+49 (0)2652 9585067</a><br>
                        E-Mail: <a class="links-law" href="mailto:riehl@pixel-lay.de">riehl@pixel-lay.de</a>
                    </p>
                    <br>
                    <h2 class="h-law">Umsatzsteuer-<br>Identifikationsnummer</h2>
                    <p>
                        DEXXXXXX
                    </p>
                    <h2 class="h-law">Haftungsausschluss</h2>

                    <h3>Haftung für Inhalte</h3>
                    <p>
                        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                        nach den allgemeinen Gesetzen verantwortlich.
                    </p>
                    <p>
                        Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
                        übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                        zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
                        Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
                        bleiben hiervon unberührt.
                    </p>

                    <p>
                        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                        konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                        Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>
                    <br>
                    <h3>Haftung für Links</h3>
                    <p>
                        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                        keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                        Gewähr übernehmen.
                    </p>

                    <p>
                        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                        der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
                        auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                        Verlinkung nicht erkennbar.
                    </p>

                    <p>
                        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                        Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                        Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                    </p>
                    <br>
                    <h3 class="h-law">Urheberrecht</h3>
                    <p>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>

                    <p>
                        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                        Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                        wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                        Dritter als solche gekennzeichnet.
                    </p>

                    <p>
                        Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir
                        um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir
                        derartige Inhalte umgehend entfernen.
                    </p>
                    <br>
                    <h3>Audio & Picture</h3>
                    <p>
                    <a href="https://www.magnific.com" target="_blank">https://www.magnific.com/<br></a>
                   <a href="https://promok-botinok.itch.io/" target="_blank"> https://promok-botinok.itch.io/<br></a>
                    <a href="https://craftpix.net" target="_blank">https://craftpix.net<br></a>
                    <a href="http://www.freepik.com" target="_blank">Designed by macrovector_official / Freepik</a>
</p>
                </section>
    </div>
    `}

    function getHTMLForInstructions() {
    return `
    <div class="modal-content">
        <span class="close-btn" onclick="closeModalInstructions()">&times;</span>
        <h2>Instructions</h2>
        <table cellspacing="15">
            <tr>
                <td width="50%"><img src="./assets/buttons/button-arrow-left.png" height="50px"></td>
                <td>Arrow right - go lrft</td>
            </tr>
            <tr>
                <td><img src="./assets/buttons/button-arrow-right.png" height="50px"></td>
                <td>Arrow left - go right</td>
            </tr>
            <tr>
                <td><img src="./assets/buttons/button-throw.png" height="50px"></td>
                <td>Key D - throw magic</td>
            </tr>
            <tr>
                <td><img src="./assets/buttons/button-jump.png" height="50px"></td>
                <td>Space - jump</td>
            </tr>
        </table>
        <p>5 magic points are needed to defeat the final boss.</p>
    </div>
    `}