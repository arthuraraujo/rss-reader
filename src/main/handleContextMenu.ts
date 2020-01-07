const Menu =
  process.type === 'browser'
    ? require('electron').Menu
    : require('electron').remote.Menu;

export default function defaultContextMenuHandler(event: any, params: any) {
  const webContents = event.sender;

  let menuTemplate: Electron.MenuItemConstructorOptions[];

  const {
    linkURL,
    editFlags: { canCopy },
  } = params;
  const hasURL = !!linkURL;
  const canCopyImage = params.mediaType === 'image' && params.hasImageContents;

  switch (true) {
    case hasURL || canCopy || canCopyImage:
      menuTemplate = [
        {
          label: '复制链接地址',
          enabled: true,
          checked: false,
          click: () => {
            const { clipboard } = require('electron');
            clipboard.writeText(linkURL);
          },
          visible: hasURL,
        },
        {
          label: '复制图片',
          visible: canCopyImage,
          click: () => {
            if (webContents.isDestroyed()) {
              return;
            }

            webContents.copyImageAt(params.x, params.y);
          },
        },
      ];
      break;
    default:
      return;
  }

  const popupMenu = Menu.buildFromTemplate(menuTemplate);

  const currentWindow =
    process.type === 'browser'
      ? webContents.getOwnerBrowserWindow()
      : require('electron').remote.getCurrentWindow();

  popupMenu.popup({
    window: currentWindow,
  });
}
