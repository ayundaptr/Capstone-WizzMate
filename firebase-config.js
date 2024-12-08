const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getDatabase, ref, set } = require("firebase/database");
const fetch = require("node-fetch");
global.fetch = fetch;

const firebaseConfig = {
  apiKey: "AIzaSyAtCZQiGkcYLBkwTATpwatEOCblp9Dna98",
  databaseURL:
    "https://coba-6f8e4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coba-6f8e4",
  storageBucket: "capstone-backend-1cfba.appspot.com",
  messagingSenderId: "145207385445",
  appId: "your-app-id",
  type: "service_account",
  private_key_id: "0e24bead8c476397d7ce54c6367139048a4d6f71",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDx8HI9unJ5rz3w\n2CaJt0wUo0zFILGDz9Ve7jAp3eyIzHtIgX+atbxRCb21QFhWn6IctSC/xd1YmH9o\ne+e0kieu38pELz+ApGq3nUBSUeKgKDoWTb8fv5kMHWTiXOUwJoY99vNCXP41fSSe\n/RYBKKNt5ygzC+anyXX4Xyc1kRe2AqLtc2guQrDv7M/ap9wD0hrC3sTc9Ta4ia6W\nce6iZ8Ouqk+2eScrXJNmvwh2/OljbFSbdahpn/WGwkjE7E1RfnDqLkzMAkrCp5Zq\nKHo5fP9pnwUIwMJHkZOGzLJgn5HJMSWiLPu3WQTar3fH4r2Kj87qcOesNvwCjNMj\n/9veYUPxAgMBAAECggEAA30zVpDOZxMYBnXFi4GjVR5cRHEB4lvgUL3IX8gxqbDi\nO8PTVGa3zCbi757Zj0k+0CFsExvuQuFzH+1+hFABxr+3NefFB4zHdbWsuGsyJJtj\n6A+vuIxdr4sqeem7S+gYUkMyE6RN7bVL7oeJllNw1OxLG/5ZUZTiEMaFhRweLoug\nwczdH4azITmitaasc4et1RUBM9KSaCMA3GtG7LtRR+1fZtcdUwQVLtXDZ/qJ7zsL\nk/kg2y+le7MGG1RH9FUWs6LNu+ALqZN10AdakytTt9+ABK919nZ+7MvC1E5Zch1o\nSNYTrpMlfmNMXHbZ5tOA37ycGEIbMGd0KgMlHKK3AQKBgQD/+FFPgPs1sEGyy857\n1JlNtKlfdDA4EdRUzz6Ftc2jid0sAcfO9XF9pV1181ZIw94iRXdclJhBKoGzY0rj\nDZ9lrKMspO5uIl603d8eHRArYYz5oR80lBY3pALoHgPWgNn5VxLQjzBiTCsWcmpx\nWCl/qsETGtdqJrO4w+Pi6KL8gQKBgQDx97Ug3c/RrK/WYvM3KULtjl8INhPbAo42\nJY81DSzuIxEa2Fc84sEmGOJ40Xir/ohSxFB7Wev/KRdLpQnKQWv8P4olJifLQgZY\nsneU6x7iQ/CfUFerUEoO6lsbvPTYYFFgb7TTqSLk+gnh452lOqcgj7KVqWRS+1TE\nhVZGsIRPcQKBgAy1kaP27YIu7DQqdmgjmDEJhVdd937xM6+6UoplCn7SO48Rz4/x\nE99/NHLE0EXwo7jj5hdMsXqa17HGflNju8RanAd9cPE696TXV1qxarocr9k9LMV5\njNjaZeKMivg9kZUVw7NjSK24xnLo32wdSoIyQj/ml0eIAGhuIYSEtIMBAoGAVjEH\nm1KIAceCx1puCrsu9RIe9fzVa9FoOQ9+CMbNt3JUWHyx7qVTai+5FJKBarr7cogt\npxLsBvNrMe3zI9HUFoHHwt3plPTK7/N6t1hdovnSj919rS+ngdKna6UOjrkYo8KG\n5lK8dFZBCO8cq8vN1sJ5OeiiLREMLAjXJ80fBHECgYEA4YSQMQK047NXIAOsqiGm\nrn/X6c7BABq6nWvJdX2qVO5D1bKWBFc5itph0NsBfxNHaGF2qfaK8ey21eYViGHK\nG3721uY7QSEsiixoXA2rrGIgKlREdIv1zzuykPeYqB8FL8WNTN0KthJU/iFM6KzY\niCvqqY6MlEEvEkUgnsyurLU=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-p2xhw@coba-6f8e4.iam.gserviceaccount.com",
  client_id: "102554503370355651582",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p2xhw%40coba-6f8e4.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

module.exports = { auth, db, ref, set };
