<template>
  <div>
    <Modal
      v-model="show"
      :class-name="modalClass"
      :width="width"
      :mask-closable="mask"
      v-bind="$attrs"
      v-on="$listeners"
      ref="modal"
    >
      <span slot="close">
        <Icon v-if="!mask" type="ios-close" size="31" color="#999" v-on:click.stop="close" />
        <Icon v-else type="ios-close" size="31" color="#999" v-on:click="close" />
      </span>
      <div slot="header" class="iv-header">
        <slot name="header">
          <slot name="icon">
            <Icon v-show="simple" type="md-help-circle mr-15" size="30" :color="iconColor" />
          </slot>
          <label :title="title" class="title mr-15">{{ title }}</label>
        </slot>
      </div>
      <div :style="contentStyle">
        <slot></slot>
      </div>
      <div class="iv-footer" slot="footer">
        <slot name="footer">
          <Button :type="okType" :loading="loading" @click.native="onOk">{{ okText }}</Button>
          <Button :type="cancelType" @click.native="onCancel">{{ cancelText }}</Button>
        </slot>
      </div>
    </Modal>
  </div>
</template>

<script>
/**
 * 垂直居中modal
 */

export default {
  name: `modal`,
  data() {
    return {
      clientH: 0,
      mask: true
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    /**
     * 是否需要确认后关闭，开启后点击X或者遮罩层将不再关闭弹出需要手动关闭
     */
    confirm: {
      type: Boolean,
      default: false
    },
    /**
     * 是否允许点击遮罩层关闭
     */
    maskClosable: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 416
    },
    /**
     * 确认按钮是否开启loading
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 是否是简单弹窗
     */
    simple: {
      type: Boolean,
      default: false
    },
    type: {
      default: "info",
      validator(type) {
        const types = ["info", "warning"];
        return types.indexOf(type) > -1;
      }
    },
    okText: {
      type: String,
      default: "确定"
    },
    okType: {
      type: String,
      default: "primary"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    cancelType: {
      type: String,
      default: "default"
    }
  },
  watch: {
    trueClose: {
      handler: "changeMask",
      immediate: true
    }
  },
  methods: {
    onOk() {
      this.$emit("on-ok");
    },
    close() {
      if (this.trueClose) {
        this.$emit("on-cancel");
      } else {
        this.show = false;
      }
    },
    onCancel() {
      if (!this.trueClose) {
        this.show = false;
      }
      this.$emit("on-cancel");
    },
    changeMask() {
      if (this.trueClose) this.mask = false;
      else this.mask = this.maskClosable;
    },
    closeEscClose() {
      // ESC close
      try {
        if (this.trueClose)
          document.removeEventListener("keydown", this.$refs.modal.EscClose);
      } catch (error) {
        throw Error(error);
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    trueClose() {
      return this.loading || this.confirm;
    },
    iconColor() {
      return this.type === "info" ? "#2d8cf0" : "#ff9900";
    },
    showClosable() {
      return !this.simple;
    },
    modalClass() {
      return this.simple
        ? "vertical-center-modal simple"
        : "vertical-center-modal";
    },
    contentStyle() {
      // body展示高度 number

      this.$nextTick(() => {
        const dom = document.documentElement || document.body;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.clientH = dom.clientHeight;
      });

      // 弹窗内最大可用高度
      const maxInnerH = `${this.clientH - (51 + 60 + 32 + 10 + 10)}px`;
      return this.simple
        ? { minHeight: "auto", marginLeft: "45px" }
        : {
            maxHeight: maxInnerH,
            minHeight: "100px",
            overflowY: "auto"
          };
    }
  },
  mounted() {
    this.closeEscClose();
  }
};
</script>

<style lang="stylus" scoped>
.mr-15 {
  margin-right: 15px
}
.title {
  display: inline-block
  width: 100%
  height: 20px
  line-height: 20px
  font-size: 14px
  color: #17233d
  font-weight: 700
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
}
>>>.vertical-center-modal {
  display: flex
  align-items: center
  justify-content: center
  .ivu-modal {
    top: 0
  }
  .ivu-modal-header {
    line-height: 1.2
  }
}
>>>.vertical-center-modal.simple {
  .ivu-modal-header {
    border-bottom: none
  }
  .ivu-modal-footer {
    border-top: none
  }
}
.iv-header {
  display: flex
  align-items: center
  ellipsis()
  label {
    font-size: 16px
    color: #464C5B
    font-weight: 600
  }
}
.iv-footer {
  display: flex
  align-items: center
  justify-content: flex-end
}
</style>
