<template>
  <div class="wrapper">
    <b-carousel
      id="carousel-no-animation"
      style="text-shadow: 0px 0px 2px #000"
      img-width="1024"
      img-height="480"
      ref="realtimeCarousel"
      v-model="slide"
    >
      <b-carousel-slide
        caption="First slide"
        img-src="https://picsum.photos/1024/480/?image=10"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Second Slide"
        img-src="https://picsum.photos/1024/480/?image=12"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Third Slide"
        img-src="https://picsum.photos/1024/480/?image=22"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="Fourth Slide"
        img-src="https://picsum.photos/1024/480/?image=23"
      ></b-carousel-slide>
    </b-carousel>
    <div class="button-actions-next">
      <b-button @click="changeToNextSlide" squared variant="success">Next</b-button>
    </div>
    <div class="button-actions-prev">
      <b-button @click="changeToPreviousSlide" squared variant="primary">Previous</b-button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'Carousel',
  data () {
    return {
      socket: io.connect('http://localhost:3000'),
      slide: 0
    }
  },
  created () {
    this.socket.on('setPreviousSlide', (payload) => {
      const slide = payload - 1 < 0 ? 3 : payload - 1
      this.setSlide(slide)
    })

    this.socket.on('setNextSlide', (payload) => {
      const slide = payload + 1 > 3 ? 0 : payload + 1
      this.setSlide(slide)
    })
  },
  methods: {
    changeToPreviousSlide () {
      this.socket.emit('previousSlide', this.slide)
    },
    changeToNextSlide () {
      this.socket.emit('nextSlide', this.slide)
    },
    setSlide (index) {
      this.$refs.realtimeCarousel.setSlide(index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    position: relative
  }

  .button-actions-next {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 20%;
  }

   .button-actions-prev {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 20%;
  }
</style>
