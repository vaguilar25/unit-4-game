$(function () {
   
    $("#attackButton").prop("disabled",true);
    function gameCharacter(nameChar, attPow, countAttPow,hPoints) {
        this.name= nameChar;
        this.attackPower=attPow;
        this.counterAttackPower=countAttPow;
        this.healthPoints=hPoints;
    };

    var obiwanCharacter= new gameCharacter("obiwan",8,10,120);
    var lukeCharacter= new gameCharacter("luke",2,5,100);
    var sidiousCharacter= new gameCharacter("sidious",10,20,150);
    var maulCharacter= new gameCharacter("maul",15,25,180);
    
    $(document).on("click", "#attackButton", function (event) {
       //var currentCharacter = $(".imageChar").data();
       var currentCharacter = $(".imageChar").attr("data");
       var currentDefender = $(".imageDefender").attr("data");


       console.log(currentCharacter + " vs " + currentDefender);
    });

    //Function healthPoints Character decrease
    function healthPointsDecrease(nameChar) {
        
    }

    //Function healthPoints Defender Decrease

    //Function check winner return defender Win or Character Win.. 
    //Global variable of points take the decrease value of Character Win




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
    //disable click on Enemies
    function disableClickOnEnemi(enemiesLeft) {
        enemiesLeft.forEach(function (element) {
            $(element).click(function () { return false; });
        });
    };
    $(document).on("click", ".imageEnemi", function (event) {
        
        switch ($(this).attr("data")) {
            
            case "obiwan":
                //move Characters to Enemies and change the class
                $("#obi").appendTo("#defender");
                moveEnemiToDefender("#obi");
                //var enemiesLeft=["luk","sid"]; 
                //disableClickOnEnemi(enemiesLeft);
                $("#enemies").click(function () { return false; });
                break;

            case "luke":
                //move Characters to Enemies and change the class
                $("#luk").appendTo("#defender");
                moveEnemiToDefender("#luk");

                //var enemiesLeft=["","sid"]; 
                //disableClickOnEnemi(enemiesLeft);
                break;
            case "sidious":

                //move Characters to Enemies and change the class
                $("#sid").appendTo("#defender");
                moveEnemiToDefender("#sid");
                break;

            case "maul":
                //move Characters to Enemies and change the class
                $("#mau").appendTo("#defender");
                moveEnemiToDefender("#mau");
                break;
        }
        //disable click on enemies
        $("#enemies").click(function () { return false; });

        //enable attack
        //$("#attackButton").click(function () { return true; });
        $("#attackButton").prop("disabled",false);

    });


})