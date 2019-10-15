<template>
  <div class="vpay" v-if="show">
    <div class="content">
      <!--标题栏 -->
      <div class="header">
        <div class="ico-back" @click="cancel"></div>
        <h3 class="title">{{title}}</h3>
      </div>
      <!--密码框 -->
      <div class="pass-box">
        <ul class="pass-area mt-20">
          <li
            class="pass-item"
            :class="{on: password.length > index}"
            v-for="(item,index) in digit"
            :key="index"
          />
        </ul>
      </div>
      <!--忘记密码 -->
      <div class="forget-pass">
        <div class="forget-pass-btn" @click="forget">忘记密码</div>
      </div>
      <!--键盘区 -->
      <ul class="keywords mt-50">
        <li @click="onKeyboard(1)">
          <p class="num">
            <strong>1</strong>
          </p>
          <p class="character"></p>
        </li>
        <li @click="onKeyboard(2)">
          <p class="num">
            <strong>2</strong>
          </p>
          <p class="character">ABC</p>
        </li>
        <li @click="onKeyboard(3)">
          <p class="num">
            <strong>3</strong>
          </p>
          <p class="character">DEF</p>
        </li>
        <li @click="onKeyboard(4)">
          <p class="num">
            <strong>4</strong>
          </p>
          <p class="character">GHI</p>
        </li>
        <li @click="onKeyboard(5)">
          <p class="num">
            <strong>5</strong>
          </p>
          <p class="character">JKL</p>
        </li>
        <li @click="onKeyboard(6)">
          <p class="num">
            <strong>6</strong>
          </p>
          <p class="character">MNO</p>
        </li>
        <li @click="onKeyboard(7)">
          <p class="num">
            <strong>7</strong>
          </p>
          <p class="character">PQRS</p>
        </li>
        <li @click="onKeyboard(8)">
          <p class="num">
            <strong>8</strong>
          </p>
          <p class="character">TUV</p>
        </li>
        <li @click="onKeyboard(9)">
          <p class="num">
            <strong>9</strong>
          </p>
          <p class="character">WXYZ</p>
        </li>
        <li class="none"></li>
        <li class="zero" @click="onKeyboard(0)">
          <strong>0</strong>
        </li>
        <li class="delete" @click="deleteKey"></li>
      </ul>
      <!--加载中状态 -->
      <div class="loading-wrap" v-if="payStatus !== 0">
        <!--图片 -->
        <div class="loading">
          <!--加载图片 -->
          <img src="./images/loading.png" class="loading-icon" v-if="payStatus === 1" />
          <img src="./images/success.png" class="success-icon" v-if="payStatus === 2" />
          <!--加载文字 -->
          <p class="mt-5" v-if="payStatus === 1">{{loadingText}}</p>
          <p class="mt-5" v-if="payStatus === 2">{{finishedText}}</p>
        </div>
      </div>

      <!--支付失败提示框 -->
      <div class="pay-fail" v-if="isShowFail">
        <div class="fail-delay">
          <h3 class="title">{{failTip}}</h3>
          <div class="btns">
            <div @click="reInput">重新输入</div>
            <div @click="forget">忘记密码</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vpay",
  model: {
    prop: "show",
    event: "change" //控制弹框是否展示
  },
  props: {
    title: {
      type: String,
      default: "支付密码"
    },
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    digit: {
      type: Number,
      default: 6 // 支付密码框位数
    },
    // 正在支付的文字提示
    loadingText: {
      type: String,
      default: "正在支付"
    },
    // 支付成功的文字提示
    finishedText: {
      type: String,
      default: "支付成功"
    },
    // 支付成功的提示显示时间
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      password: "", // 支付密码
      payStatus: 0, // 支付状态，0无状态， 1正在支付，2支付成功
      failTip: "支付密码错误",
      isShowFail: false
    };
  },
  methods: {
    //取消支付
    cancel() {
      //支付过程中，不可取消
      if (this.payStatus === 1) return;
      this.password = "";
      this.payStatus = 0;
      this.$emit("change", false); //控制show显示 or 隐藏
      // 触发父组件close自定义事件
      this.$emit("close");
    },
    onKeyboard(key) {
      //文本框输入密码,同时在input添加伪类样式
      this.password = (this.password + key).slice(0, this.digit); //只截取前六位
    },
    deleteKey() {
      // 密码已经为空时，不回删
      if (this.password.length === 0) return;
      this.password = this.password.slice(0, this.password.length - 1);
    },
    // 忘记密码,触发父组件的forget自定义事件
    forget() {
      this.$emit("forget");
    },
    //重新输入
    reInput() {
      this.password = "";
      this.isShowFail = false;
    },
    //支付成功
    success() {
      return new Promise((resolve, reject) => {
        //立即成功显示成功状态
        this.payStatus = 2;
        //等待6秒后进行页面跳转
        setTimeout(() => {
          this.cancel(); //直接触发取消方法
          resolve();
        }, this.duration);
      });
    },
    //支付失败
    fail(tip) {
      tip && typeof tip === "string" && (this.failTip = tip);
      this.payStatus = 0;
      this.isShowFail = true;
    }
  },
  watch: {
    password(val, oldVal) {
      //监听支付密码，支付密码输入完成后触发input-end回调
      if (val.length === this.digit) {
        this.payStatus = 1;
        this.$emit("input-end", this.password);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.vpay {
  width: 100%
  max-width: 400px
  position: fixed
  top: 0
  bottom: 0
  background: $shadow-v1
  z-index: 998
  display: flex
  flex-direction: column-reverse
  .content {
    position: relative
    background: #fafafa
  }
  .title {
    font-size: 18px
    font-weight: normal
    text-align: center
  }
  .header {
    position: relative
    height: 40px
    line-height: 40px
    border-bottom: 1px solid #e5e5e5
    .ico-back {
      height: 40px
      width: 40px
      position: absolute
      top: 0
      bottom: 0
      background: url('./images/back.png') no-repeat center
    }
  }
  .pass-box {
    padding: 0 20px
    .pass-area {
      border: $border
      background: #fff
      border-radius: 4px
      height: 40px
      display: flex
      .pass-item {
        flex: 1
        position: relative
        border-right: $border
        &:last-child {
          border-right: 0
        }
      }
      .on::after {
        content: ''
        width: 8px
        height: 8px
        background: #000
        border-radius: 50%
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
      }
    }
  }
  .forget-pass {
    padding: 10px 20px 0
    text-align: right
    .forget-pass-btn {
      font-size: 12px
      color: $primary-color
    }
  }
  .keywords {
    display: flex
    background: #fff
    flex-wrap: wrap
    li {
      width: 33.33%
      height: 45px
      padding-top: 4px
      text-align: center
      border-bottom: 1px solid #b2b2b2
      border-right: 1px solid #b2b2b2
      box-sizing: border-box
      cursor: pointer
      &:nth-child(3n) { // 3的倍数
        border-right: 0
      }
      .num {
        line-height: 1.2
        font-size: 18px
      }
      .character {
        line-height: 1.2
        font-size: 12px
      }
    }
    .none {
      border-bottom: 0
      background: #d1d5db
    }
    .zero {
      border-bottom: 0
      line-height: 44px
      font-size: 18px
    }
    .delete {
      border-bottom: 0
      background: url('./images/delete.png') no-repeat center #d1d5db
      &:active {
        border-bottom: 0
        background-color: #fff // 触发div显示不同状态
      }
    }
  }
  .loading-wrap {
    position: absolute
    top: 40px
    left: 0
    right: 0
    bottom: 0
    z-index: 1111
    display: flex
    justify-content: center
    align-items: center
    background: #fff
    .loading {
      text-align: center
    }
    .loading-icon {
      animation: rotate 0.6s linear infinite
    }
  }
  .pay-fail {
    position: fixed
    width: 100%
    max-width: 400px
    top: 0
    bottom: 0
    background: $shadow-v1
    z-index: 999
    .fail-delay {
      width: 60%
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      border-radius: 10px
      background: #fff
      overflow: hidden
    }
    .title {
      line-height: 30px
      padding: 16px
      font-size: 16px
      text-align: center
    }
    .btns {
      display: flex
      border-top: $border-tip
      cursor: pointer
      div {
        height: 40px
        line-height: 40px
        text-align: center
        flex: 1
        &:last-child {
          border-left: $border-tip // 优化考虑右边的情况
        }
        &:active {
          background: #f3f3f3
        }
      }
    }
  }
}
</style>