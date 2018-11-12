$(function () {
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
                $("#obi").appendTo("#defender");
                moveEnemiToDefender("#obi");
                ("#luk").off(click);
                break;

            case "luke":
                //move Characters to Enemies and change the class
                $("#luk").appendTo("#defender");
                moveEnemiToDefender("#luk");
                ("#sid").off(click);
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

        });
    

})