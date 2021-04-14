<template>
  <div class="my-calc">
    <p class="my-calc__price">Цена: {{price}}</p>
    <label>Кол-во:<input type="number" v-model="quantity"></label>
    <label>Кол-во:
      <select v-model="currency">
        <option>RUR</option>
        <option>EUR</option>
        <option>USD</option>
      </select>
    </label>
    <p class="my-calc__total-price">Итог: {{totalPrice}}</p>
  </div>
</template>

<script>
export default {
  name: "Calc",
  data() {
    return {
      totalPrice: 0,
      price: 1000,
      defaultPrice: 1000,
      quantity: 1,
      currency: 'RUR',
      course: {
        RUR: 1,
        EUR: 99,
        USD: 77,
      },
    };
  },
  computed: {

  },
  watch: {
    quantity: function (val) {
      this.totalPrice = val * this.price;
    },
    currency: function (val) {
      this.price = this.defaultPrice / this.course[val];
      this.totalPrice = this.quantity * this.price;
    }
  }
}
</script>

<style scoped>
  .my-calc {
    display: flex;
    flex-direction: column;
  }
</style>