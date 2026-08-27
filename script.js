// Mobile navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
}

// Keep the copyright year current.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Smooth scroll for same-page links.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// EmailJS contact form.
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const originalButton = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        formStatus.textContent = "";

        const formData = {
            name: contactForm.name.value.trim(),
            reply_to: contactForm.reply_to.value.trim(),
            project_type: contactForm.project_type.value,
            message: contactForm.message.value.trim(),
            time: new Date().toLocaleString()
        };

        try {
            await emailjs.send(
                "service_kesrds2",
                "template_oa8ahhv",
                formData
            );

            formStatus.textContent = "Thanks — your inquiry has been sent.";
            formStatus.style.color = "#8df06b";
            contactForm.reset();
        } catch (error) {
            console.error("EmailJS error:", error);
            formStatus.textContent = "Something went wrong. Please try again or contact me on WhatsApp.";
            formStatus.style.color = "#ff9a9a";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalButton;
        }
    });
}

// The live Savora URL is intentionally not guessed.
// Replace the href in index.html once you confirm the public URL.
const projectLink = document.querySelector("[data-project-link]");
if (projectLink) {
    projectLink.addEventListener("click", (event) => {
        if (projectLink.getAttribute("href") === "#") {
            event.preventDefault();
            alert("Add the public Savora project URL to index.html first.");
        }
    });
}
