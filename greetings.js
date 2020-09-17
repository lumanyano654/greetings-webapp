module.exports = function greetings() {


    var namesList = {}


    function typedName(name) {
if(name){
        if (namesList[name] === undefined) {
            namesList[name] = 0;
       
         
        }

        namesList[name]++
        
   
    }
    }

    function correctInputs(nameEntered, language) {
if(language){
        if (language === "Xhosa") {


            return "Molo, " + nameEntered;

        }

        else if (language === "English") {


            return "Hello, " + nameEntered
        }

        else if (language === "Afrikaans") {


            return "Halo, " + nameEntered
        }

        }
    
    }


    function totalCounter() {

        return Object.keys(namesList).length;

    }

    function userList() {
        return namesList
    }

    function personCounter(name) {
      for (var key in namesList) {
        
        if (key === name)  {
              
            var element = namesList[key];
              

           
          }

          
      }
      return element
    }




    return {
        typedName,
        correctInputs,
        totalCounter,
        userList,
        personCounter,
       

    }


}





   
