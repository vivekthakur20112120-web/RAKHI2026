// =======================================
// FIREBASE CONFIG
// =======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA2RwBfCL2BzjCIcnqNxPk-TVTaTmBjbVg",
    authDomain: "rakhi2026.firebaseapp.com",
    projectId: "rakhi2026",
    storageBucket: "rakhi2026.firebasestorage.app",
    messagingSenderId: "316312574033",
    appId: "1:316312574033:web:1ff39e7f05e0903e390070"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore Database
export const db = getFirestore(app);