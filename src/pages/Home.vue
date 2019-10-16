<template>
  <div class="home">
    <div class="box">
      <div class="mt-10 mb-10">支付密码{{initPassword}}</div>
      <div class="box-btn" @click="showPay">点击显示支付弹框</div>
      <!--支付组件 -->
      <vpay
        ref="pays"
        v-model="show"
        :title="title"
        @input-end="inputEnd"
        @forget="forget"
        @close="close"
      ></vpay>
      <!--全屏 -->
      <div class="screen mt-10">
        <div class="mr-5">操作全屏</div>
        <fullscreen></fullscreen>
      </div>
      <!--删除 -->
      <div class="delebtn mt-10">
        <div @click="showDeleModal">删除</div>
      </div>
      <modal
        @on-ok="deleteSure"
        v-model="deleteModel"
        title="确认删除"
        ok-text="删除"
        ok-type="error"
        @on-cancel="deleteModel=false"
        simple
        type="warning"
      >
        <span class="ml-10">您确认删除这个管理员吗？</span>
      </modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      show: false,
      deleteModel: false,
      initPassword: "111111",
      title: "请输入支付密码"
    };
  },
  methods: {
    showPay() {
      this.show = true;
    },
    /**
     * 密码输入完成自动触发加载中状态，并触发父组件的input-end自定义事件，可在父组件这里发生支付请求
     */
    inputEnd(val) {
      setTimeout(() => {
        //模拟成功状态
        if (val === this.initPassword) {
          // 调用插件的$success方法告知插件支付成功
          // 并且在then方法里面可以写支付成功的回调，例如可以跳转支付结果页面
          this.$refs.pays.success().then(res => {
            console.log("支付成功");
            this.$router.push("/success");
          });
        } else {
          //密码错误重新输入的提示框：当请求结果为密码错误时，可以在父组件通过
          this.$refs.pays.fail();
        }
      }, 1000);
    },
    /**
     * 忘记密码
     */
    forget() {
      console.log("触发forge事件");
    },

    /**
     * 关闭
     */
    close() {
      console.log("关闭");
    },
    showDeleModal() {
      this.deleteModel = true;
    },
    deleteSure() {
      console.log("点击删除");
    }
  }
};
</script>
<style lang="stylus" scoped>
.home {
  box-sizing: border-box
  display: flex
  align-items: center
  flex-direction: column
  user-select: none
  .box {
    width: 400px
    background: #f1f1f1
    min-height: 100vh
    text-align: center
  }
  .box-btn {
    width: 50%
    height: 50px
    line-height: 50px
    transform: translateX(50%)
    border-radius: 10px
    background: red
    color: #fff
    cursor: pointer
  }
  .delebtn {
    width: 20%
    height: 30px
    line-height: 30px
    border-radius: 10px
    margin: 0 auto
    background: red
    color: #fff
    cursor: pointer
  }
  .screen {
    display: flex
    align-items: center
    justify-content: center
  }
}
</style>
