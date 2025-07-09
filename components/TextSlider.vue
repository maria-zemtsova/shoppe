<template>
  <div class="carousel">
    <p class="carousel__text">Gold big hoops</p>
    <span class="carousel__price">$ 68,00</span> <br />
    <button class="carousel__button">View Product</button>
  </div>
</template>

<style lang="scss" scoped>
  .carousel {
    width: 217px;
    font-family: $font-dm-sans;
    font-weight: normal;
    color: $white;

    &__text {
      margin-bottom: 16px;
      font-size: 33px;
      line-height: 43px;

      @media (width <=1000px) {
        margin-bottom: 3px;
        font-size: 20px;
        line-height: 26px;
      }
    }

    &__price {
      font-size: 26px;
      line-height: 35px;

      @media (width <=1000px) {
        font-size: 14px;
        line-height: 22px;
      }
    }

    &__button {
      display: inline-block;
      width: 193px;
      height: 53px;
      margin-top: 48px;
      font-size: 20px;
      line-height: 100%;
      color: $white;
      background-color: transparent;
      border: 2px solid $white;
      border-radius: 6px;

      @media (width <=1000px) {
        width: 92px;
        height: 32px;
        margin-top: 10px;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
