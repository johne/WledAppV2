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
      await mkdir(temp);
    }

    const tempDestZip = `${temp}/tempSource.zip`;

    try {
      await unlink(tempDestZip);
    } catch (error) {}

    const downloadPromise = downloadFile({
      fromUrl: remoteZipFileUrl,
      toFile: tempDestZip,
    });

    const downloadResult = await downloadPromise.promise;
    if (downloadResult.statusCode !== 200) {
      return undefined;
    }

    await unzip(tempDestZip, temp);

    const tempHtml = `${temp}/${folder}/wled00/data`;

    await moveFile(tempHtml, dest);

    await unlink(temp);

    return dest;
  }

  static async getRelease(semver: string): Promise<string | undefined> {
    const htmlFolder = `${DocumentDirectoryPath}/html`;
    const mainFolder = `${DocumentDirectoryPath}/html/main`;

    if (!(await exists(htmlFolder))) {
      await mkdir(htmlFolder);
    }

    const releaseFolder = `${htmlFolder}/v${semver}`;

    if (await exists(releaseFolder)) {
      return releaseFolder;
    }

    const releaseDownload = `${this.releaseBase}/v${semver}.zip`;

    const folder = await HtmlManager._downloadArchiveAndUnzip(
      releaseDownload,
      releaseFolder,
      `WLED-${semver}`,
    );

    if (folder) {
      return folder;
    }

    if (await exists(mainFolder)) {
      return mainFolder;
    }

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
