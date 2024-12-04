const { auth, db, GoogleAuthProvider } = require("../firebase-config");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
} = require("firebase/auth");
const { ref, set, get, child } = require("firebase/database");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, dan password diperlukan" });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    await set(ref(db, `users/${userId}`), { username, email });

    res.status(201).json({
      message: "Register berhasil",
      user: { id: userId, username, email },
    });
  } catch (error) {
    console.error("Error creating new user:", error);

    let errorMessage = "Gagal mendaftarkan pengguna";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email sudah digunakan oleh pengguna lain";
    }

    res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password diperlukan" });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    const userSnapshot = await get(child(ref(db), `users/${userId}`));

    if (!userSnapshot.exists()) {
      return res
        .status(404)
        .json({ message: "User tidak ditemukan di database" });
    }

    const userData = userSnapshot.val();

    res.status(200).json({
      message: "Login berhasil",
      user: { id: userId, username: userData.username, email: userData.email },
    });
  } catch (error) {
    console.error("Error during login:", error);

    let errorMessage = "Gagal login";
    if (error.code === "auth/wrong-password") {
      errorMessage = "Password salah";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "User tidak ditemukan";
    }

    res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
};

exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res
      .status(400)
      .json({ success: false, message: "ID Token is required" });
  }

  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);

    const user = userCredential.user;
    const { uid, email, displayName, photoURL } = user;

    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(child(ref(db), `users/${uid}`));

    if (!snapshot.exists()) {
      await set(userRef, {
        uid,
        email,
        displayName,
        photoURL: photoURL || null,
        createdAt: new Date().toISOString(),
      });
    }

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user: {
        uid,
        email,
        displayName,
        photoURL,
      },
    });
  } catch (err) {
    console.error("Error during Google login:", err);
    res.status(500).json({
      success: false,
      message: "Google login failed",
      error: err.message,
    });
  }
};
