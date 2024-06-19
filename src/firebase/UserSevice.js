import firebase from 'firebase/app';
import 'firebase/auth';

const deleteUserAuth = async (uid) => {
  try {
    await firebase.auth().deleteUser(uid);
    console.log(`User authentication data deleted for UID ${uid}`);
  } catch (error) {
    console.error(`Error deleting user authentication data: ${error}`);
  }
};