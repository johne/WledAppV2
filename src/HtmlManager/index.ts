import {
  downloadFile,
  unlink,
  DocumentDirectoryPath,
  mkdir,
  moveFile,
  exists,
} from 'react-native-fs';
import {unzip} from 'react-native-zip-archive';

class HtmlManager {
  static projectBase = 'https://github.com/Aircoookie/WLED/archive/refs/';

  static main = `${this.projectBase}heads/main.zip`;
  static releaseBase = `${this.projectBase}tags`;

  static async _downloadArchiveAndUnzip(
    remoteZipFileUrl: string,
    dest: string,
    folder: string,
  ) {
    const temp = `${DocumentDirectoryPath}/tempDownloads`;

    if (!(await exists(temp))) {
      console.log('making temp');
      await mkdir(temp);
    }

    const tempDestZip = `${temp}/tempSource.zip`;

    try {
      await unlink(tempDestZip);
    } catch (error) {}

    console.log('downloading', JSON.stringify({remoteZipFileUrl}));
    const downloadPromise = downloadFile({
      fromUrl: remoteZipFileUrl,
      toFile: tempDestZip,
    });

    const downloadResult = await downloadPromise.promise;
    if (downloadResult.statusCode !== 200) {
      console.log('failed to download', {remoteZipFileUrl});
      return undefined;
    }

    console.log('unzipping', JSON.stringify({tempDestZip, temp}));
    await unzip(tempDestZip, temp);

    const tempHtml = `${temp}/${folder}/wled00/data`;

    console.log('moving', JSON.stringify({tempHtml, dest}));
    await moveFile(tempHtml, dest);

    console.log('deleting', JSON.stringify({temp}));
    await unlink(temp);

    console.log('returning', JSON.stringify({temp}));
    return dest;
  }

  static async getRelease(semver: string): Promise<string | undefined> {
    const htmlFolder = `${DocumentDirectoryPath}/html`;
    const mainFolder = `${DocumentDirectoryPath}/html/main`;

    if (!(await exists(htmlFolder))) {
      console.log('making html folder', JSON.stringify({htmlFolder}));
      await mkdir(htmlFolder);
    }

    const releaseFolder = `${htmlFolder}/v${semver}`;

    if (await exists(releaseFolder)) {
      console.log(
        'release html folder exists',
        JSON.stringify({releaseFolder}),
      );
      return releaseFolder;
    }

    const releaseDownload = `${this.releaseBase}/v${semver}.zip`;

    console.log('downloading release', JSON.stringify({releaseDownload}));

    const folder = await HtmlManager._downloadArchiveAndUnzip(
      releaseDownload,
      releaseFolder,
      `WLED-${semver}`,
    );

    if (folder) {
      return folder;
    }

    if (await exists(mainFolder)) {
      console.log('main exists', JSON.stringify({mainFolder}));
      return mainFolder;
    }

    console.log('downloading main', JSON.stringify({main: HtmlManager.main}));
    const downloadResult = await HtmlManager._downloadArchiveAndUnzip(
      HtmlManager.main,
      mainFolder,
      'WLED-main',
    );

    if (!downloadResult) {
      console.log("couldn't find main", {main: HtmlManager.main});
      return undefined;
    }

    return mainFolder;
  }
}

export default HtmlManager;
