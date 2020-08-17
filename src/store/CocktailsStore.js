//const axios = require('axios');


class CocktailsStore {
    
    constructor(){
       
        this.state ={
            count :0,
            cocktails :[]
        }
    }
    increment(){
        this.state.count++
    }
    decrement(){
        this.state.count--
    }
    updateCocktails(){
        
            let data;
            axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
            .then(function (response) {
                // handle success
                console.log(response.data);
                data = response.data;
                
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

           return this.state.cocktails.push(data)
           
    }
       
    
};

export default new CocktailsStore()





