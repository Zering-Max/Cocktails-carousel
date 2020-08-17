
<template>
  <div id='app' >
    <h1>La Fête des Cocktails</h1>
    <div class="list_container">
      <div class="button_container" v-for="letter in letters" >
        <button class="button" key="{{letter}}"  @click="search(letter)">Cocktails '{{letter}}'</button>

      </div>

    </div>
    <carousel>
      <carousel-slide v-for="cocktail in cocktails" :index="(cocktails.indexOf(cocktail))-1" >
        <div style="position:absolute;left:0;right:0;text-align:center;top:5%;color:lightblue;font-size:24px;" key="{{cocktail.name}}">{{cocktail.name}}</div>
        <img v-bind:src="cocktail.image" width="50%" style="border-radius:10px;">
        <div class="container-text-cocktail">
          <p key="{{cocktail.name}}"> Instructions : {{cocktail.instructions}}</p>
          <p>Ingrédients : {{cocktail.ingredients.join(', ')}}</p>
          <p>Dosages : {{cocktail.measures.join(', ')}}</p>

        </div>
      </carousel-slide>
      
    </carousel>
    
  </div>
</template>

<script>

import Carousel from './components/carousel/Carousel'
import CarouselSlide from './components/carousel/CarouselSlide'

export default {
  data() {
    return {
      slides: 0,    
      cocktails: [],
      letters: []
      
    }
  },
  components: {
    Carousel,
    CarouselSlide
  },
  methods: {
    addSlide(){
      this.slides++
    },
    removeSlide(){
      this.slides--
    },
    
    search(letter){
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(response => response.json())
        .then((data)=>{
          console.log(data.drinks);
          this.cocktails = [];
          data.drinks.forEach((drink)=>{
            
            this.cocktails.push({
              name: drink.strDrink,
              image : drink.strDrinkThumb,
              instructions : drink.strInstructions,
              ingredients : this.filter_cocktail([drink.strIngredient1,drink.strIngredient2,drink.strIngredient3,drink.strIngredient4,drink.strIngredient5,drink.strIngredient6]),
              measures : this.filter_cocktail([drink.strMeasure1,drink.strMeasure2,drink.strMeasure3,drink.strMeasure4,drink.strMeasure5,drink.strMeasure6])
            })
            
          })
        })
    
    },
    filter_cocktail(array){
      let filtered = array.filter(x=>x !== null)
      console.log(filtered);
      return filtered;
    }
  },
  mounted(){
    
      let i = 97;
      let j = 123;
      for(let k = i; k<j;k++){
         this.letters.push(String.fromCharCode(k));
         console.log(this.letters);
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position:relative;
}

.list_container{
  
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom:2rem;
  
}
.button_container{
  width:10%;
}

.button{
  border:none;
  height:20px;
  margin: 0.2rem 0;
  cursor: pointer;
  border-radius: 5px;
  background-color: salmon;
  font-weight:700;

}

.button:hover{
  background-color: rgb(248, 100, 83);
  color:#fff;
  border:1px solid purple;

}

</style>
