export default function ValidationCard({ password, verification }) {

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (password) {
        return (
            <div id="message">
                <h3>Password must contain the following:</h3>
                <p id="letter" className={password.match(lowerCaseLetters) ? "valid" : "invalid"}>A <b>lowercase</b> letter</p>
                <p id="capital" className={password.match(upperCaseLetters) ? "valid" : "invalid"}>A <b>capital (uppercase)</b> letter</p>
                <p id="number" className={password.match(numbers) ? "valid" : "invalid"}>A <b>number</b></p>
                <p id="length" className={password.length >= 8 ? "valid" : "invalid"}>Minimum <b>8 characters</b></p>
                <p id="length" className={password === verification ? "valid" : "invalid"}>Passwords <b>must match</b></p>
            </div>
        )
    }
}