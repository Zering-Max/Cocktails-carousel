<template>
    <div class="carousel">
        <slot></slot>
        <button class="carousel__nav carousel__next" @click.prevent="next">Suivant</button>
        <button class="carousel__nav carousel__prev" @click.prevent="prev">Précédent</button>
        <div class="carousel__pagination">
            <button v-for="n in slidesCount" @click="goto(n-1)" :class="{active: n == index+1}" ></button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        
        return {
            index: 0,
            slides : [],
            direction: null
        }
    },
    watch:{
        slides (slides){
            if(this.index >= this.slidesCount){
                this.index = this.slidesCount - 1
            }
        }
    },
    
    computed : {
        slidesCount (){
            return this.slides.length
        }
    },
    methods: {
        next(){
            this.index++
            this.direction = 'right'
            if(this.index >= this.slidesCount){
                this.index = 0
            }
        },
        prev(){
            this.index--
            this.direction = 'left'
            if(this.index < 0){
                this.index = this.slidesCount - 1
            }
        },
        goto(index){
            this.direction = index > this.index ? "right" : "left"
            this.index = index
        }
    },
    mounted(){
        this.slides = this.$children
        
    },
    
}
</script>

<style src="./carousel.css">


</style>