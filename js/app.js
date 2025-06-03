//3d products full screen function
const fullScreenBtns = document.querySelectorAll('.full-screen');
const pImgBoxes = document.querySelectorAll('.p-img-box');

fullScreenBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const pImgBox = pImgBoxes[index];

        if (!document.fullscreenElement) {
            if (pImgBox.requestFullscreen) {
                pImgBox.requestFullscreen();
            } else if (pImgBox.webkitRequestFullscreen) {
                pImgBox.webkitRequestFullscreen();
            } else if (pImgBox.msRequestFullscreen) {
                pImgBox.msRequestFullscreen();
            }

            btn.innerHTML = '<i class="fa-regular fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { 
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            btn.innerHTML = '<i class="fa-regular fa-expand"></i>';
        }
    });
});

//benefit content show and hide
const buttons = document.querySelectorAll(".benefit-btn");
const contentBoxes = document.querySelectorAll(".benefit-content-box");

// Add click event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));

        contentBoxes.forEach((box) => (box.style.display = "none"));

        button.classList.add("active");

        const targetContentId = button.id.replace("-btn", "-content");
        const targetContentBox = document.getElementById(targetContentId);
        if (targetContentBox) {
            targetContentBox.style.display = "block";
        }
    });
});

//FAQS sections
document.addEventListener("DOMContentLoaded", function () {
    const faqToggles = document.querySelectorAll(".faq-toggle");
  
    faqToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const faqItem = toggle.parentElement;
  
        document.querySelectorAll(".faq-item").forEach((item) => {
          if (item !== faqItem) {
            item.classList.remove("active");
            // item.querySelector(".faq-content").style.display = "none";
            item.querySelector(".faq-toggle").classList.remove("active");
          }
        });
  
        const content = toggle.nextElementSibling;
        faqItem.classList.toggle("active");
        toggle.classList.toggle("active");
        // content.style.display =
        //   content.style.display === "block" ? "none" : "block";
      });
    });
  });
  //---------------------------------------- scroll top------------------------// Select the scroll-to-top button using its class
const scrollTopBtn = document.querySelector('.scrollTopBtn');

// Show the button when the user scrolls down more than 100px
window.addEventListener('scroll', function() {
  if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll to the top when the button is clicked
scrollTopBtn.addEventListener('click', function() {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }
});