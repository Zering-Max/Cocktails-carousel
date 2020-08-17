<template>
    <div class="carousel">
        <slot></slot>
        <button class="carousel__nav carousel__next" @click.prevent="next">Suivant</button>
        <button class="carousel__nav carousel__prev" @click.prevent="prev">Précédent</button>
        <div class="carousel__pagination">
            <button v-for="n in slidesCount" @click="goto(n-1)" :class="{active: n-1 == index}" ></button>
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

<style >

.carousel{
    position: relative

}
.carousel__nav{
    position : absolute; 
    border: none;
    background-color : #000;
    color: #fff;
    cursor : pointer;
    height:20px;
    border-radius: 10px;
}
.carousel__nav:hover{
    
    background-color :#fff;
    color: #000;
    border:2px solid #000;
    
}
.carousel__nav.carousel__prev{
    top : 40%;
    left: 26%;
    right: auto;
}
.carousel__nav.carousel__next{
    top:40%;
    right: 26%;
    left: auto;
}

.carousel__pagination{
    position: absolute; 
    bottom:20%;
    left:0;
    right:0;
    text-align: center;
}

.carousel__pagination button {
    display: inline-block;
    width:10px;
    height: 20px;
    background-color: #000;
    opacity: 0.8;
    border-radius:10px;
}

.carousel__pagination button.active{
    background-color: #fff;
}
    
</style>