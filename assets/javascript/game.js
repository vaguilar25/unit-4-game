$(function () {
   
    $("#attackButton").prop("disabled",true);
    function gameCharacter(nameChar, attPow, countAttPow,hPoints) {
        this.name= nameChar;
        this.attackPower=attPow;
        this.counterAttackPower=countAttPow;
        this.healthPoints=hPoints;

        this.getHealthpoint = function() {
            this.healthPoints
        }   
    };

    var obiwanCharacter= new gameCharacter("obiwan",8,10,120);
    var lukeCharacter= new gameCharacter("luke",2,5,100);
    var sidiousCharacter= new gameCharacter("sidious",10,20,150);
    var maulCharacter= new gameCharacter("maul",15,25,180);
    
    var characterHealthPoints = 0;
    var defenderHealthPoints=0;
    var attackTimes = 1;
    $(document).on("click", "#attackButton", function (event) {
        $("#enemies").click(function () { return true; });
       //Get Character and defender names.
       var currentCharacter = $(".imageChar").attr("data") + "Character"; 
       var currentDefender = $(".imageDefender").attr("data") + "Character";
      
     
       attackHpDecrease(currentCharacter,currentDefender)

       

       
        

       console.log(currentCharacter + " vs " + currentDefender);
    });

    //Function healthPoints Character decrease
    function attackHpDecrease(currentCharacter,currentDefender) {
        
        //Here we reduce the character attack power
        attackCharacterPower = eval(currentCharacter).attackPower * attackTimes;

        //get the character and defender Objects HealtPoints
        eval(currentCharacter).healthPoints = 
        eval(currentCharacter).healthPoints - eval(currentDefender).counterAttackPower;
        
        eval(currentDefender).healthPoints = 
        eval(currentDefender).healthPoints - attackCharacterPower;

        //increase attack counter
        attackTimes++

        //update DOM with new healthpoints
        $("#characterHealtPoints").text(eval(currentCharacter).healthPoints);
        $("#defenderHealtPoints").text(eval(currentDefender).healthPoints);

        if ( eval(currentDefender).healthPoints < 0 &&  eval(currentCharacter).healthPoints >0) {
            $(".imageDefender").remove();
            $("#defenderHealtPoints").text("");
            $("#attackButton").prop("disabled",true);
          //  $("#enemies").click(function () { return true; });
            $("#enemies").prop("disabled",false);
        }

        console.log("CurrentCharacterHP: " + eval(currentCharacter).healthPoints);
        console.log("CurrentDefenderHP: " + eval(currentDefender).healthPoints);
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
                $("#obi").prependTo("#defender");
                moveEnemiToDefender("#obi");
                //var enemiesLeft=["luk","sid"]; 
                //disableClickOnEnemi(enemiesLeft);
                $("#enemies").click(function () { return false; });
                break;

            case "luke":
                //move Characters to Enemies and change the class
                $("#luk").prependTo("#defender");
                moveEnemiToDefender("#luk");

                //var enemiesLeft=["","sid"]; 
                //disableClickOnEnemi(enemiesLeft);
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
       // $("#enemies").click(function () { return false; });
        $("#enemies").prop("disabled",true);
        //enable attack
        //$("#attackButton").click(function () { return true; });
        $("#attackButton").prop("disabled",false);

    });


})