import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // set up varialbe to assign the database to
    const db = await initdb();
    // set up transaction to write to the database, pass jate and readwrite to the object store
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    // put the content into the database
    await store.put(content);
    // tx is a promise, so we need to wait for it to finish
    await tx.done;
    console.log('putDb done');
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // set up varialbe to assign the database to
    const db = await initdb();
    // set up transaction to read from the database, pass jate and readonly to the object store
    const tx = db.transaction('jate', 'readonly');
    //  get the content from the database
    const store = tx.objectStore('jate');
    // tx is a promise, so we need to wait for it to finish
    const all = await store.getAll();
    await tx.done;
    console.log('getDb done');
    return all;
} 

initdb();
