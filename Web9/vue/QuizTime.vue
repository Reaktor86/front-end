<template>
  <div class="QuizTime">
    Это компонент 00:{{time}}
  </div>
</template>

<script>
export default {
  name: "QuizTime",
  props: ['time'],
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>