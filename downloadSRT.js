// 点击触发下拉菜单的图标
const dropdownTrigger = document.querySelector('div.detail-meeting-menu-btn');
if (dropdownTrigger) {
  dropdownTrigger.click();
} else {
  console.log('未找到下拉菜单触发图标');
}

setTimeout(() => {
  // 点击导出妙记选项
  const exportOption = Array.from(document.querySelectorAll('.menu-item')).find(el => el.textContent.includes('导出妙记'));
  if (exportOption) {
    exportOption.click();
  } else {
    console.log('未找到导出妙记选项');
  }

  // 等待 5000 毫秒以确保下拉菜单已显示
  setTimeout(() => {
    // 点击 SRT 选项
    const srtOption = Array.from(document.querySelectorAll('.ud__select__list__item__content.ud__textOverflow')).find(el => el.textContent.includes('SRT'));
    if (srtOption) {
      srtOption.click();
    } else {
      console.log('未找到 SRT 选项');
    }

    // 取消勾选包含说话人选项
    const includeSpeakerCheckbox = document.querySelector('span.ud__checkbox > input.ud__checkbox__input[aria-checked="true"]');
    if (includeSpeakerCheckbox) {
      includeSpeakerCheckbox.click();
    } else {
      console.log('未找到包含说话人复选框');
    }

    // 点击导出按钮
    const exportButton = document.querySelector('.ud__modal__footer__btns button.ud__button--filled-default');
    if (exportButton) {
      exportButton.click();
      setTimeout(() => {
        window.opener.postMessage('SRTDownloaded', '*');
      }, 2000); // 等待2秒后发送消息
    } else {
      console.log('未找到导出按钮');
    }
  }, 5000);
}, 5000);
