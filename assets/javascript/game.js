$(function () {

    $("#attackButton").prop("disabled", true);
    $("#newGame").prop("disabled", true);
    function gameCharacter(nameChar, attPow, countAttPow, hPoints) {
        this.name = nameChar;
        this.attackPower = attPow;
        this.counterAttackPower = countAttPow;
        this.healthPoints = hPoints;

        this.getHealthpoint = function () {
            this.healthPoints
        }
    };

    var obiwanCharacter = new gameCharacter("obiwan", 8, 10, 120);
    var lukeCharacter = new gameCharacter("luke", 2, 5, 100);
    var sidiousCharacter = new gameCharacter("sidious", 10, 20, 150);
    var maulCharacter = new gameCharacter("maul", 15, 25, 180);

    var attackTimes = 1;

    $(document).on("click", "#attackButton", function (event) {
        $("#enemies").click(function () { return true; });
        //Get Character and defender names.
        var currentCharacter = $(".imageChar").attr("data") + "Character";
        var currentDefender = $(".imageDefender").attr("data") + "Character";


        attackHpDecrease(currentCharacter, currentDefender)


        console.log(currentCharacter + " vs " + currentDefender);
    });

    function resetGame() {
        $("#attackButton").prop("disabled", true);
        $("img").prop("disabled", true);

        $("#gameMessages2").text("");
        $("#newGame").prop("disabled", false);
    };
    //Function healthPoints Character decrease
    function attackHpDecrease(currentCharacter, currentDefender) {

        //Here we reduce the character attack power
        attackCharacterPower = eval(currentCharacter).attackPower * attackTimes;

        //get the character and defender Objects HealtPoints
        eval(currentCharacter).healthPoints =
            eval(currentCharacter).healthPoints - eval(currentDefender).counterAttackPower;

        eval(currentDefender).healthPoints =
            eval(currentDefender).healthPoints - attackCharacterPower;

        //increase attack counter
        attackTimes++
        console.log("Health Power Current Character" + eval(currentCharacter).healthPoints);

        //update DOM with new healthpoints
        $("#characterHealtPoints").text(eval(currentCharacter).healthPoints);
        $("#defenderHealtPoints").text(eval(currentDefender).healthPoints);

        $("#gameMessages").text(eval(currentDefender).name + " Attacked you back for "
            + eval(currentDefender).counterAttackPower + " damage. ");

        $("#gameMessages2").text("You " + eval(currentCharacter).name + " attacked " + eval(currentDefender).name + " for "
            + attackCharacterPower + " damage. ");


        if (eval(currentDefender).healthPoints < 0 && eval(currentCharacter).healthPoints > 0) {
            //Remove Defender from the dom, reset defender health points, Disable attack button, enable defender selection
            
            eval(currentCharacter).healthPoints = eval(currentCharacter).healthPoints + eval(currentDefender).counterAttackPower;
            $("#characterHealtPoints").text(eval(currentCharacter).healthPoints);

            //If there are no more enemies reset game
            if (+ $("#enemies > img").length === 0) {
                $("#gameMessages").text("You Won!! - Game Over!!");

                resetGame();
            } else {
                $(".imageDefender").remove();
            $("#defenderHealtPoints").text("");
            $("#attackButton").prop("disabled", true);
            $("img").prop("disabled", false);
            $("#gameMessages").text("");
            $("#gameMessages2").text("");
            }
            console.log("Length of div" + $("#enemies > img").length)

        } else if (((eval(currentCharacter).healthPoints) > (eval(currentDefender).healthPoints))
            && ((eval(currentDefender).healthPoints) < 0 && (eval(currentCharacter).healthPoints <= 0))) {
            console.log("Div images length:" + $("#enemies > img").length);
            console.log("Current healt Points" + eval(currentCharacter).healthPoints);
            if (($("#enemies > img").length === 0) || ((eval(currentCharacter).healthPoints === 0) && ($("#enemies > img").length !== 0))) {
                $("#gameMessages").text("You Won!! - Game Over!!");

                resetGame();
            }

        } else if (eval(currentDefender).healthPoints > 0 && eval(currentCharacter).healthPoints <= 0) {
            $("#gameMessages").text("You have been defeat by " + eval(currentDefender).name + ", you lost");
            resetGame();
        }
    }

    //Function to remove a class from an array
    function removeClass(arrayElements, className) {
        arrayElements.forEach(function (element) {
            $(element).removeClass(className);
        });
    };

    //Function to add a class to an array
    function addClass(arrayElements, className) {
        arrayElements.forEach(function (element) {
            $(element).addClass(className);
        });
    };

    //Function to appendTo element from an array
    function appendArray(arrayElements, identifier) {
        arrayElements.forEach(function (element) {
            $(element).appendTo(identifier);
        });
    };

    //funtion to move Character to Enemies
    function moveCharacterToEnemies(arrayCharacters) {
        removeClass(arrayCharacters, "imageChar");
        addClass(arrayCharacters, "imageEnemi");
        appendArray(arrayCharacters, "#enemies")
    };

    function moveEnemiToDefender(enemi) {
        $(enemi).removeClass("imageEnemi");
        $(enemi).addClass("imageDefender");
    };

    //Get OnClick listener for the images

    $(document).on("click", ".imageChar", function (event) {
        //Move the images that are not selected to enemies
        //   $("#attackButton").click(function () { return false; });
        var currentCharacter = $(".imageChar").attr("data") + "Character";
        $("#characterHealtPoints").text(eval(currentCharacter).healthPoints);

        switch ($(this).attr("data")) {
            case "obiwan":
                //move Characters to Enemies and change the class
                var arrayCharacters = ["#luk", "#sid", "#mau"];
                moveCharacterToEnemies(arrayCharacters);
                break;

            case "luke":
                //move Characters to Enemies and change the class
                var arrayCharacters = ["#obi", "#sid", "#mau"];
                moveCharacterToEnemies(arrayCharacters);
                break;

            case "sidious":

                //move Characters to Enemies and change the class
                var arrayCharacters = ["#obi", "#luk", "#mau"];
                moveCharacterToEnemies(arrayCharacters);
                break;

            case "maul":
                //move Characters to Enemies and change the class
                var arrayCharacters = ["#obi", "#luk", "#sid"];
                moveCharacterToEnemies(arrayCharacters);
                break;

        }


    });


    $(document).on("click", ".imageEnemi", function (event) {

        switch ($(this).attr("data")) {

            case "obiwan":
                //move Characters to Enemies and change the class
                $("#obi").prependTo("#defender");
                moveEnemiToDefender("#obi");
                break;

            case "luke":
                //move Characters to Enemies and change the class
                $("#luk").prependTo("#defender");
                moveEnemiToDefender("#luk");
                break;

            case "sidious":
                //move Characters to Enemies and change the class
                $("#sid").prependTo("#defender");
                moveEnemiToDefender("#sid");
                break;

            case "maul":
                //move Characters to Enemies and change the class
                $("#mau").prependTo("#defender");
                moveEnemiToDefender("#mau");
                break;
        }
        //disable click on enemies
        $("img").prop("disabled", true);


        //enable attack
        $("#attackButton").prop("disabled", false);

        //add defender health points
        var currentDefender = $(".imageDefender").attr("data") + "Character";
        $("#defenderHealtPoints").text(eval(currentDefender).healthPoints);
    });

    //OnClick New Game Reload the page

    $(document).on("click", "#newGame", function (event) {
        console.log("reload");
        location.reload();
    });



})