import firestore from '@react-native-firebase/firestore';

export const addUserToFirestore = async (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }

  try {
    const userRef = firestore().collection('users');
    const userSnapshot = await userRef.where('email', '==', email).get();

    if (!userSnapshot.empty) {
      return { success: false, message: 'Email is already registered.' };
    }

    // need to hash
    await userRef.add({
      name,
      email,
      password,
    });

    return { success: true, message: 'User registered successfully!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (username, password) => {
  if (!username || !password) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  try {
    const userRef = firestore().collection('users');
    const userSnapshot = await userRef.where('name', '==', username).get();

    if (userSnapshot.empty) {
      return { success: false, message: 'Username is not registered.' };
    }

    const userData = userSnapshot.docs[0].data();

    if (userData.password !== password) {  // Replace this with isPasswordCorrect after hashing
      return { success: false, message: 'Incorrect password.' };
    }

    return { success: true, message: 'Login successful!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
