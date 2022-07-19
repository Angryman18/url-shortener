import { onValue, ref, set } from "firebase/database";
import { database } from "./firebase";

const useReadData = () => {
  const readData = (val) => {
    return new Promise((resolve, reject) => {
      const starCountRef = ref(database, "data/" + val);
      onValue(starCountRef, (snapshot) => {
        const dataExistence = snapshot.exists();
        if (dataExistence) {
          resolve(snapshot.val());
        } else {
          reject("Invalid URL");
        }
      });
    });
  };

  const writeData = async (uniqueId, url) => {
    return await set(ref(database, "data/" + uniqueId), { url, uniqueId });
  };

  return {readData, writeData};
};

export default useReadData;
