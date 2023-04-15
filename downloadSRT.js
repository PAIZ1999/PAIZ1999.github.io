const waitFor = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function downloadSRT() {
  // 找到并鼠标悬停在一个菜单的触发图标
  const menuTrigger = document.querySelector('svg[data-icon="MoreOutlined"]');
  if (!menuTrigger) {
    console.error('无法找到菜单触发图标');
    return;
  }
  menuTrigger.dispatchEvent(new MouseEvent('mouseover'));

  await waitFor(500);

  // 点击导出妙记选项
  const exportOption = document.querySelector('.menu-item > span > svg[data-icon="ExportOutlined"]');
  if (!exportOption) {
    console.error('无法找到导出妙记选项');
    return;
  }
  exportOption.click();

  await waitFor(500);

  // 点击飞书文档元素以打开下拉菜单
  const feishuDocOption = document.querySelector('.ud__select__selector__selectItem');
  if (!feishuDocOption) {
    console.error('无法找到飞书文档选项');
    return;
  }
  feishuDocOption.click();

  await waitFor(500);

  // 点击 SRT 选项
  const srtOption = document.querySelector('.ud__select__list__item__content > span > span');
  if (!srtOption) {
    console.error('无法找到 SRT 选项');
    return;
  }
  srtOption.click();

  // 取消勾选包含说话人选项
  const speakerCheckbox = document.querySelector('.ud__checkbox__input[aria-checked="true"]');
  if (!speakerCheckbox) {
    console.error('无法找到包含说话人的复选框');
    return;
  }
  speakerCheckbox.click();

  // 点击导出按钮
  const exportButton = document.querySelector('.ud__button--filled.ud__button--filled-default.ud__button--size-md');
  if (!exportButton) {
    console.error('无法找到导出按钮');
    return;
  }
  exportButton.click();
}

downloadSRT();
