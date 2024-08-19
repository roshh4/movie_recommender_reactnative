const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const usersCollection = db.collection('users');

const addUser = async (userData) => {
    await usersCollection.add(userData);
};

const getUser = async (userId) => {
    const userDoc = await usersCollection.doc(userId).get();
    if (!userDoc.exists) {
        throw new Error('User not found');
    }
    return userDoc.data();
};

const updateUser = async (userId, userData) => {
    await usersCollection.doc(userId).update(userData);
};

module.exports = {
    addUser,
    getUser,
    updateUser
};
