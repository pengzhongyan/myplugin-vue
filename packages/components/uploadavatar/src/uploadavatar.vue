<template>
  <div>
    <input type="file" accept="image/*" id="imgReader" class="inpuFile" @change="loadingImg" />
    <Modal v-model="modal" :width="720" :mask-closable="false" :styles="{top:'60px'}">
      <p slot="header" class="first_header">
        <Icon type="ios-cut" />
        <span>裁剪头像</span>
      </p>
      <div class="mainBox">
        <div class="leftsideBox">
          <img id="cropImg" />
        </div>
        <div class="rightsideBox">
          <div class="previewText">裁剪预览</div>
          <div class="previewBox"></div>
          <div class="previewBoxRound"></div>
        </div>
      </div>
      <div class="cropButton">
        <ButtonGroup shape="circle">
          <Button icon="ios-undo" @click="rotateChange(-45)"></Button>
          <Button icon="md-share-alt" @click="rotateChange(45)"></Button>
          <Button icon="md-remove" @click="scaleChange(-0.1)"></Button>
          <Button icon="md-add" @click="scaleChange(0.1)"></Button>
          <Button icon="md-sync" @click="reset()"></Button>
        </ButtonGroup>
      </div>
      <img id="priviewImg" />
      <div slot="footer">
        <Button @click="closeBox">取消</Button>
        <Button type="success" @click="finish">完成裁剪</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "uploadavatar",
  data() {
    return {
      modal: false,
      cropper: null
    };
  },
  methods: {
    getImg() {
      document.querySelector("#imgReader").click();
      if (this.cropper) {
        this.cropper.destroy();
      }
    },
    loadingImg(eve) {
      console.log("上传文件");
      let reader = new FileReader();
      if (event.target.files[0]) {
        reader.readAsDataURL(eve.target.files[0]);
        reader.onload = e => {
          let dataURL = reader.result;
          document.querySelector("#cropImg").src = dataURL; //展示
          const image = document.getElementById("cropImg");

          this.cropper = new Cropper(image, {
            aspectRatio: 16 / 16,
            minContainerWidth: 500,
            minContainerHeight: 500,
            dragMode: "move",
            preview: [
              document.querySelector(".previewBox"),
              document.querySelector(".previewBoxRound")
            ]
          });
          this.modal = true;
        };
      }
    },
    openBox() {
      this.modal = true;
    },
    closeBox() {
      this.modal = false;
    },
    rotateChange(rotate) {
      this.cropper.rotate(rotate);
    },
    scaleChange(scale) {
      this.cropper.zoom(scale);
    },
    reset() {
      this.cropper.reset();
    },
    finish() {
      this.cropper
        .getCroppedCanvas({
          maxWidth: 4096,
          maxHeight: 4096,
          fillColor: "#fff",
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high"
        })
        .toBlob(blob => {
          //测试用
          let url = window.URL.createObjectURL(blob);
          document.querySelector("#priviewImg").src = url;
          const formData = new FormData();
          // 第三个参数为文件名，可选填.
          formData.append("croppedImage", blob /*, 'example.png' */);
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };

          this.$axios
            .post(flow_mission_UploadFile(), param, config)
            .then(response => {
              console.log(response);
              if (response.data.status) {
                this.modal = false;
                this.$Message.success("上传成功");
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.secondStep {
  display: flex;
}
.first_header {
  color: rgb(95, 95, 95);
}
.inpuFile {
  display: none;
}
.mainBox {
  display: flex;
  padding-left: 10px;
}
.leftsideBox {
  flex: 0 0 500px;
}
.rightsideBox {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#cropImg {
  height: 450px;
  width: 450px;
  box-shadow: 0 0 5px #adadad;
}
.previewBox,
.previewBoxRound {
  box-shadow: 0 0 5px #adadad;
  width: 100px;
  height: 100px;
  margin-top: 30px;
  overflow: hidden;
}
.previewBoxRound {
  border-radius: 50%;
}
.previewText {
  font-size: 15px;
}
.cropButton {
  width: 500px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>