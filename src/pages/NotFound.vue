<template>
  <section class="not-found">
    <ul>
      <li class="text" :class="{amin1: flag}">4</li>
      <li class="text" :class="{amin2: flag}">0</li>
      <li class="text" :class="{amin3: flag}">4</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      msg: '404 notFound',
      flag: false
    }
  },
  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.flag = true;

      // 跳转到登录页
      setTimeout(function() {
        _this.$router.push({path: '/'});
      }, 3000);
    }, 500);
  }
}
</script>

<style lang="scss">
.not-found {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    ul {
        padding: 0px;
        margin: 0px;
        display: flex;
        li {
            list-style: none;
            margin-left: 10px;
            transform: rotateX(0deg);
            &:first-child {
                margin-left: 0px;
            }
        }
        .amin1 {
            transform: rotateX(360deg);
            transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .amin2 {
            transform: rotateX(720deg);
            transition: transform 2s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .amin3 {
            transform: rotateX(1080deg);
            transition: transform 3s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }
    .text {
        font-size: 120px;
        color: #4e8ef2;
        padding: 20px;
    }
}
</style>
