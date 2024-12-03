const { ref, set, get, child, update } = require("firebase/database");
const { db } = require("../firebase-config");

async function addPreference(category) {
  try {
    const preferenceRef = ref(db, "preferences/" + Date.now());
    await set(preferenceRef, { category });
    return preferenceRef.key;
  } catch (err) {
    throw new Error("Error adding preference: " + err.message);
  }
}

async function getPreferences() {
  try {
    const preferencesRef = ref(db, "preferences");
    const snapshot = await get(preferencesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No preferences found");
    }
  } catch (err) {
    throw new Error("Error fetching preferences: " + err.message);
  }
}

async function addUserPreference(userId, preferenceId) {
  try {
    const userPreferencesRef = ref(db, `user_preferences/${userId}`);
    const snapshot = await get(userPreferencesRef);

    if (snapshot.exists()) {
      const existingData = snapshot.val();
      const preferencesList = existingData.preferences || [];
      preferencesList.push(preferenceId);

      await update(userPreferencesRef, {
        preferences: preferencesList,
      });
    } else {
      await set(userPreferencesRef, {
        preferences: [preferenceId],
        userId,
      });
    }

    return `Preference ${preferenceId} added for user ${userId}`;
  } catch (err) {
    throw new Error("Error adding user preference: " + err.message);
  }
}

async function getUserPreferences(userId) {
  try {
    const userPreferencesRef = ref(db, `user_preferences/${userId}`);
    const snapshot = await get(userPreferencesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No user preferences found");
    }
  } catch (err) {
    throw new Error("Error fetching user preferences: " + err.message);
  }
}

module.exports = {
  addPreference,
  getPreferences,
  addUserPreference,
  getUserPreferences,
};
