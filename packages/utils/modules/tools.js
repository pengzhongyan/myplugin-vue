/**
 * 打开或退出全屏
 * @param isFullscreen
 */
export const onOffFullscreen = isFullscreen => {
  let main = document.body;
  if (isFullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    if (main.requestFullscreen) {
      main.requestFullscreen();
    } else if (main.mozRequestFullScreen) {
      main.mozRequestFullScreen();
    } else if (main.webkitRequestFullScreen) {
      main.webkitRequestFullScreen();
    } else if (main.msRequestFullscreen) {
      main.msRequestFullscreen();
    }
  }
};
