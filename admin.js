/* =================================
   RAKHI 2026 ADMIN PANEL JS
================================= */

function checkLogin(){

    let pass =
    document.getElementById("password").value;


    if(pass==="@Vivek20112120"){

        document.getElementById("loginBox")
        .style.display="none";

        alert("Welcome Admin 🎀");

    }

    else{

        alert("Wrong Password ❌");

    }

}

// Load Data
document.addEventListener("DOMContentLoaded",()=>{


    loadDashboard();


    // Buttons

    document
    .getElementById("dashboardBtn")
    .addEventListener("click",()=>{

        loadDashboard();

    });



    document
    .getElementById("feedbackBtn")
    .addEventListener("click",()=>{

        showFeedback();

    });



    document
    .getElementById("visitorBtn")
    .addEventListener("click",()=>{

        showVisitors();

    });



    document
    .getElementById("logoutBtn")
    .addEventListener("click",()=>{

        logout();

    });



    // Search

    document
    .getElementById("searchBox")
    .addEventListener("input",(e)=>{

        searchFeedback(e.target.value);

    });



});




// ================================
// DASHBOARD
// ================================


function loadDashboard(){


    let visitors =
    localStorage.getItem("visitors") || 0;


    let feedback =
    JSON.parse(localStorage.getItem("feedback")) || [];



    document.getElementById("visitorCount")
    .innerText = visitors;



    document.getElementById("feedbackCount")
    .innerText = feedback.length;



    let totalRating = 0;


    feedback.forEach(item=>{

        totalRating += Number(item.rating || 0);

    });



    let avg = feedback.length
    ?
    (totalRating / feedback.length).toFixed(1)
    :
    0;



    document.getElementById("ratingAverage")
    .innerText = avg+"⭐";



    showFeedback();

}




// ================================
// SHOW FEEDBACK
// ================================


function showFeedback(){


    let container =
    document.getElementById("feedbackContainer");



    container.innerHTML="";



    let feedback =
    JSON.parse(localStorage.getItem("feedback")) || [];



    if(feedback.length===0){


        container.innerHTML=
        `
        <div class="feedbackCard">
        <h2>No Feedback Found</h2>
        <p>No sister has submitted feedback yet 💖</p>
        </div>
        `;


        return;

    }




    feedback.forEach((data,index)=>{


        let card=document.createElement("div");


        card.className="feedbackCard";


        card.innerHTML=
        `

        <h2>${data.name || "Unknown"}</h2>

        <p>
        💌 ${data.message || "No message"}
        </p>


        <p>
        ⭐ Rating: ${data.rating || 0}
        </p>


        <button onclick="deleteFeedback(${index})">
        Delete
        </button>

        `;



        container.appendChild(card);


    });



}





// ================================
// DELETE FEEDBACK
// ================================


function deleteFeedback(index){


    let feedback =
    JSON.parse(localStorage.getItem("feedback")) || [];



    feedback.splice(index,1);



    localStorage.setItem(
        "feedback",
        JSON.stringify(feedback)
    );



    loadDashboard();


}





// ================================
// SEARCH
// ================================


function searchFeedback(text){


    let cards =
    document.querySelectorAll(".feedbackCard");



    cards.forEach(card=>{


        if(
        card.innerText
        .toLowerCase()
        .includes(text.toLowerCase())
        )

        {

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }


    });



}





// ================================
// VISITORS
// ================================


function showVisitors(){


    let visitors =
    localStorage.getItem("visitors") || 0;



    document.getElementById("feedbackContainer")
    .innerHTML=
    `

    <div class="feedbackCard">

    <h2>👥 Visitors</h2>

    <p>
    Total website visitors:
    ${visitors}
    </p>

    </div>

    `;


}





// ================================
// LOGOUT
// ================================


function logout(){


    alert(
    "Admin Logout Successful 🚪"
    );


    window.location.href="index.html";


}