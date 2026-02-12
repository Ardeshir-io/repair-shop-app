import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDB = async () => {
  return SQLite.openDatabase({
    name: 'repairshop.db',
    location: 'default',
  });
};
