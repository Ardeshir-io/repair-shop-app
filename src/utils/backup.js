import RNFS from 'react-native-fs';
import {getDB} from '../database/db';

export const exportBackup = async () => {
  const db = await getDB();
  const res = await db.executeSql('SELECT * FROM customers');

  const data = res[0].rows.raw();
  const path = `${RNFS.DownloadDirectoryPath}/customers_backup.json`;

  await RNFS.writeFile(path, JSON.stringify(data, null, 2), 'utf8');

  return path;
};
 