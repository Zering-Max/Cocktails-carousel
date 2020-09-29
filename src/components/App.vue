
<template>
  <div id='app' >
    <h1>La Fête des Cocktails</h1>
    <div class="list_container">
      <div class="button_container" v-for="letter in letters" v-bind:key="letter">
        <button class="button" key="{{letter}}"  @click="search(letter)">Cocktails {{letter}}</button>

      </div>

    </div>
    <carousel>
      <carousel-slide v-for="cocktail in cocktails" v-bind:key="cocktail.name" :index="(cocktails.indexOf(cocktail))" >
        <div class="text-slide" >{{cocktail.name}}</div>
        <img class="image-slide" v-bind:src="cocktail.image" >
        
        
        <div class="container-text-cocktail">
          <p><span class="cocktail_titles">Instructions :</span> {{cocktail.instructions}}</p>
          <p><span class="cocktail_titles">Ingrédients :</span> {{cocktail.ingredients.join(', ')}}</p>
          <p><span class="cocktail_titles">Dosages :</span> {{cocktail.measures.join(', ')}}</p>

        </div>
       
      </carousel-slide>
      
    </carousel>
    
  </div>
</template>

<script>

import Carousel from './carousel/Carousel'
import CarouselSlide from './carousel/CarouselSlide'

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
    
    async search(letter){
        let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        let data = await response.json()

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
        
    
    },
    filter_cocktail(array){
      let filtered = array.filter(x=>x !== null)
      return filtered;
    }
  },
  mounted(){
    
      let i = 65;
      let j = 91;
      for(let k = i; k<j;k++){
        if(k !== 88 && k !== 85){
          this.letters.push(String.fromCharCode(k))
        }
      }
  }
}
</script>

<style src="./app.css">


</style>
