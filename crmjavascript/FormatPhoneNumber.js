function formatPhoneNumber(context) {
    var phoneNumber = context.getEventSource();
    //Added By Rahul Tiwari
    // Verify that the field is valid 
    if (typeof (phoneNumber) != "undefined" && phoneNumber != null) {
        if (phoneNumber.getValue() != null) {
            // Remove any special characters
            var sTmp = phoneNumber.getValue().replace(/[^0-9,A-Z,a-z]/g, "");

            // Translate any letters to the equivalent phone number, if method is included
            try {
                if (sTmp.length <= 10) {
                    sTmp = TranslateMask(sTmp);
                }
                else {
                    sTmp = TranslateMask(sTmp.substr(0, 10)) + sTmp.substr(10, sTmp.length);
                }
            }
            catch (e) {
            }

            // If the number is a length we expect and support, 
            // format the translated number
            switch (sTmp.length) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                    break;
                case 7:
                    phoneNumber.setValue(sTmp.substr(0, 3) + "-" + sTmp.substr(3, 4));
                    break;
                case 10:
                    phoneNumber.setValue("(" + sTmp.substr(0, 3) + ") " + sTmp.substr(3, 3) + "-" + sTmp.substr(6, 4));
                    break;
                default:
                    phoneNumber.setValue("(" + sTmp.substr(0, 3) + ") " + sTmp.substr(3, 3) + "-" + sTmp.substr(6, 4) + " " + sTmp.substr(10, sTmp.length));
                    break;
            }
        }
    }
}

/// <summary>
/// TranslateMask() will step through each character of an 
/// input string and pass that character to the 
/// TranslatePhoneLetter() helper method
/// </summary>
/// <param name="s">Input string to translate</param>
function TranslateMask(s) {
    var ret = "";

    //loop through each char, and pass it to the translation method
    for (var i = 0; i < s.length; i++) {
        ret += TranslatePhoneLetter(s.charAt(i))
    }

    return ret;
}

/// <summary>
/// TranslatePhoneLetter() takes a character and returns the 
/// equivalent phone number digit if it is alphanumeric
/// </summary>
/// <param name="s">Character to translate</param>
function TranslatePhoneLetter(s) {
    var sTmp = s.toUpperCase();
    var ret = s;

    switch (sTmp) {
        case "A":
        case "B":
        case "C":
            ret = 2;
            break;
        case "D":
        case "E":
        case "F":
            ret = 3;
            break;
        case "G":
        case "H":
        case "I":
            ret = 4;
            break;
        case "J":
        case "K":
        case "L":
            ret = 5;
            break;
        case "M":
        case "N":
        case "O":
            ret = 6;
            break;
        case "P":
        case "Q":
        case "R":
        case "S":
            ret = 7;
            break;
        case "T":
        case "U":
        case "V":
            ret = 8;
            break;
        case "W":
        case "X":
        case "Y":
        case "Z":
            ret = 9;
            break;
        default:
            ret = s;
            break;
    }

    return ret;
}