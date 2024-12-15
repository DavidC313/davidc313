// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.navbar').offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Validation and Confirmation
    const contactForm = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate inputs
        let valid = true;

        if (nameInput.value.trim() === '') {
            alert('Please enter your name.');
            valid = false;
        } 
        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            valid = false;
        } 
        if (messageInput.value.trim() === '') {
            alert('Please enter your message.');
            valid = false;
        }

        if (valid) {
            // Clear inputs
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

            // Show confirmation styled message
            const confirmation = document.createElement('div');
            confirmation.classList.add('confirmation-message');
            confirmation.textContent = 'Thank you! Your email has been sent.';
            document.body.appendChild(confirmation);

            // Apply styles to make the confirmation visible in the middle of the screen
            confirmation.style.position = 'fixed';
            confirmation.style.top = '50%';
            confirmation.style.left = '50%';
            confirmation.style.transform = 'translate(-50%, -50%)';
            confirmation.style.backgroundColor = '#28a745';
            confirmation.style.color = '#fff';
            confirmation.style.padding = '20px 30px';
            confirmation.style.borderRadius = '10px';
            confirmation.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            confirmation.style.fontSize = '1.2rem';
            confirmation.style.textAlign = 'center';
            confirmation.style.opacity = '0';
            confirmation.style.transition = 'opacity 1s ease-in-out';
            confirmation.style.zIndex = '1000';

            // Fade in the confirmation
            setTimeout(() => {
                confirmation.style.opacity = '1';
            }, 50);

            // Remove confirmation after 5 seconds with fade-out effect
            setTimeout(() => {
                confirmation.style.opacity = '0';
                setTimeout(() => {
                    confirmation.remove();
                }, 1000); // Wait for fade-out transition to complete
            }, 5000);

            contactForm.reset();
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add dynamic content to each section with boxes
    const sections = document.querySelectorAll('section');


});


// Data for results and GPA
const resultsData = {
    year4: [
        { title: "N/A", grade: "N/A", credits: 0, status: "N/A" }
    ],
    year3: [
        { title: "EXPERIENTIAL LEARNING", grade: "PS", credits: 30, status: "Pass" },
        { title: "Server-side Web Development", grade: "C+", credits: 5, status: "Pass" },
        { title: "Operating Systems", grade: "C", credits: 5, status: "Pass" },
        { title: "Innovation & Entrepreneurship", grade: "B-", credits: 5, status: "Pass" },
        { title: "Cloud Service & Distrib Comp", grade: "C+", credits: 5, status: "Pass" },
        { title: "Big Data Technologies", grade: "B-", credits: 5, status: "Pass" },
        { title: "Data Structures & Algorithms", grade: "B-", credits: 5, status: "Pass" }
    ],
    year2: [
        { title: "Software Development 4", grade: "C+", credits: 5, status: "Pass" },
        { title: "Project", grade: "B", credits: 5, status: "Pass" },
        { title: "Routing & Switching Essentials", grade: "B", credits: 5, status: "Pass" },
        { title: "Management Science", grade: "B-", credits: 5, status: "Pass" },
        { title: "Database Admin & Analysis", grade: "B-", credits: 5, status: "Pass" },
        { title: "Information Security", grade: "B-", credits: 5, status: "Pass" },
        { title: "Software Development 3", grade: "B", credits: 5, status: "Pass" },
        { title: "Software Qual Ass & Testing", grade: "B+", credits: 5, status: "Pass" },
        { title: "Network Fundamentals", grade: "C+", credits: 5, status: "Pass" },
        { title: "Adv Database Technologies", grade: "B-", credits: 5, status: "Pass" },
        { title: "Discrete Mathematics 2", grade: "B-", credits: 5, status: "Pass" },
        { title: "Client-side Web Development", grade: "B+", credits: 5, status: "Pass" }
    ],
    year1: [
        { title: "Software Development 2", grade: "B+", credits: 5, status: "Pass" },
        { title: "Systems Analysis", grade: "C", credits: 5, status: "Pass" },
        { title: "Social Media Communications", grade: "C+", credits: 5, status: "Pass" },
        { title: "Statistics", grade: "B-", credits: 5, status: "Pass" },
        { title: "Database Fundamentals", grade: "B+", credits: 5, status: "Pass" },
        { title: "Operating System Fundamentals", grade: "B+", credits: 5, status: "Pass" },
        { title: "Software Development 1", grade: "A", credits: 5, status: "Pass" },
        { title: "Computer Architecture", grade: "B", credits: 5, status: "Pass" },
        { title: "Visual Design & User Experience", grade: "B+", credits: 5, status: "Pass" },
        { title: "Business & Information Systems", grade: "B", credits: 5, status: "Pass" },
        { title: "Discrete Mathematics 1", grade: "B-", credits: 5, status: "Pass" },
        { title: "Critical Skills Development", grade: "B-", credits: 5, status: "Pass" }
    ]
};

const gpaData = {
    year1: 3.06,
    year2: 2.90,
    year3: 2.54,
    year4: 0.00
};

function showResults(year) {
    const tableBody = document.getElementById("results");
    tableBody.innerHTML = "";

    resultsData[year].forEach(result => {
        const row = `<tr>
            <td>${result.title}</td>
            <td>${result.grade}</td>
            <td>${result.credits}</td>
            <td>${result.status}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.querySelectorAll('.btn').forEach(btn => btn.classList.replace('btn-primary', 'btn-secondary'));
    document.querySelector(`button[onclick="showResults('${year}')"]`).classList.replace('btn-secondary', 'btn-primary');

    document.getElementById("gpaValue").textContent = gpaData[year];
}

// Default to Year 4 results
showResults('year4');