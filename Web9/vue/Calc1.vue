<template>
  <div class="my-calc">
    <p class="my-calc__price">Цена: {{priceSelectCurrency}}</p>
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
      //totalPrice: 0,
      price: 1000,
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
    totalPrice: function () {
      return this.quantity * this.priceSelectCurrency;
    },
    priceSelectCurrency: function () {
      let courseValue = this.course[this.currency];
      return this.price / courseValue;
    }
  },
}
</script>

<style scoped>
  .my-calc {
    display: flex;
    flex-direction: column;
  }
</style>