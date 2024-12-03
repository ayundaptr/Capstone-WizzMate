const { auth, db, googleProvider } = require("../firebase-config");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} = require("firebase/auth");
const { ref, set, get, child } = require("firebase/database");

// Register dengan email dan password
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

    // Simpan data pengguna ke database
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

// Login dengan email dan password
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

    // Ambil data pengguna dari database
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
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    const userSnapshot = await get(child(ref(db), `users/${user.uid}`));

    if (!userSnapshot.exists()) {
      await set(ref(db, `users/${user.uid}`), {
        username: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL,
      });
    }

    res.status(200).json({
      message: "Login dengan Google berhasil",
      user: {
        id: user.uid,
        username: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    console.error("Error during Google Login:", error);
    res.status(500).json({
      message: "Gagal login dengan Google",
      error: error.message,
    });
  }
};
