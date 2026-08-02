// ======================================
// FEEDBACK.JS
// ======================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// ======================================
// ELEMENTS
// ======================================

const nameInput = document.getElementById("userName");
const emailInput = document.getElementById("userEmail");
const messageInput = document.getElementById("message");

const thanks = document.getElementById("thanks");
const button = document.querySelector(".feedback button");

// ======================================
// BUTTON EVENT
// ======================================

button.addEventListener("click", submitFeedback);

// ======================================
// SUBMIT FEEDBACK
// ======================================

async function submitFeedback() {

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "" || email === "" || message === "") {

        alert("⚠ Please fill all the fields.");

        return;

    }

    button.disabled = true;

    button.innerHTML = "⏳ Sending...";

    try {

        await addDoc(collection(db, "feedback"), {

            name: name,

            email: email,

            message: message,

            createdAt: serverTimestamp()

        });

        // Success

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";

        thanks.innerHTML = "❤️ Thank you! Your feedback has been submitted.";

        button.innerHTML = "✅ Sent Successfully";

        setTimeout(function () {

            thanks.innerHTML = "";

            button.innerHTML = "❤️ Send Feedback";

            button.disabled = false;

        }, 2500);

    }

    catch (error) {

        console.error(error);

        alert("❌ Failed to send feedback.");

        button.id = "sendBtn";
        button.innerHTML = "❤️ Send Feedback";

        button.disabled = false;

    }
    
   
}