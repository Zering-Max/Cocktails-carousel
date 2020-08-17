<template>
    <transition :name="transition">
        <div v-show="visible">
            <slot></slot>
        </div>

    </transition>
</template>

<script>
export default {
    props: {
        index: {type: Number, default:0}
    },
    computed:{
        visible (){
            return this.index === this.$parent.index
        },
        transition(){
            return 'slide-'+ this.$parent.direction
        }
    }
    
}
</script>

<style src='./carouselSlide.css'>


</style>