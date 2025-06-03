document.querySelector('.logIn-btn').addEventListener('click', async function () {
  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;
  const loginS = document.querySelector('.logIn');
  const designS = document.querySelector('.design-section');
  const loginsbtn = document.querySelector('.logIn-btn');
  const errorMsg = document.querySelector('.error-msg');

  const sheetId = "1GOKMUAeNefOMPE8KflSIqeoodHYFesaD6aJgRGCi5Ng";
  const apiKey = "AIzaSyACww_yoqNc1ZnF14GTf-WmOR0_gYO8bms";
  const sheetRange = "card";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      // Process Google Sheets data
      const rows = data.values;
      const headers = rows[0];
      const records = rows.slice(1).map(row =>
          headers.reduce((obj, key, i) => {
              obj[key] = row[i] || "";
              return obj;
          }, {})
      );
      // Validate login data
      const user = records.find(
          (record) =>
              record.Email === emailInput && record.Password === passwordInput
      );
      if (user) {
        loginsbtn.innerText = "loading...";
          setTimeout(() => {
              loginS.style.display = 'none';
              designS.style.display = 'block';
              
              document.querySelector('textarea[name="UserId"]').value = user.UserId || "";
              document.querySelector('textarea[name="Id"]').value = user.Id || "";
              document.querySelector('textarea[name="Name"]').value = user.Name || "";
              document.querySelector('textarea[name="Email"]').value = user.Email || "";
              document.querySelector('textarea[name="Password"]').value = user.Password || "";

              document.getElementById('ctName').value = user.ctName || "";
              document.getElementById('ctProfessionOne').value = user.ctProfessionOne || "";
              document.getElementById('ctProfessionTow').value = user.ctProfessionTow || "";
              document.getElementById('ctProfessionThree').value = user.ctProfessionThree || "";

              var idValue = document.getElementById("Id").value;
            // Construct the URL with the given id value
            var url = "index.html?id=" + idValue;
            
            // Get the container where the QR code will be rendered
            var qrContainers = document.querySelectorAll(".QR");
            qrContainers.forEach(function(qrContainer) {
              // Clear any previously generated QR code
              qrContainer.innerHTML = "";
              
              // Generate the QR code with the constructed URL
              new QRCode(qrContainer, {
                text: url,
                width: 80,
                height: 80
              });
            });

            var appURl = document.getElementById("appURl");
            appURl.innerText = url;
            var appURLBtn = document.getElementById("appURLBtn");
            appURLBtn.href = url;
            
              console.log("Data has been successfully filled!");
          }, 2000);
      } else {
        setTimeout(() =>{
            errorMsg.style.display = 'block';
              loginS.style.display = 'block';
              designS.style.display = 'none';
              console.log("error");
              console.error("Invalid email or password!");
          }, 2000)
      }
  } catch (error) {
      console.error("Error fetching data from Google Sheets API:", error);
  }
});
// save content
const scriptURL = 'https://script.google.com/macros/s/AKfycbwM4HwOOpy7vAIMgRRJ_zYOkD0BuHr5eS4avSmO3omELVh58yHT9_qaNojLNS68FcqS_Q/exec';
const form = document.forms['submit-to-google-sheet'];
const submitButton = document.querySelector("button[type='submit']");

// Create a popup element
function createPopup(message) {
  const popupOverlay = document.createElement('div');
  popupOverlay.style.position = 'fixed';
  popupOverlay.style.top = '0';
  popupOverlay.style.left = '0';
  popupOverlay.style.width = '100%';
  popupOverlay.style.height = '100%';
  popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  popupOverlay.style.display = 'flex';
  popupOverlay.style.justifyContent = 'center';
  popupOverlay.style.alignItems = 'center';
  popupOverlay.style.zIndex = '9999';

  const popupBox = document.createElement('div');
  popupBox.style.backgroundColor = '#fff';
  popupBox.style.padding = '20px';
  popupBox.style.borderRadius = '8px';
  popupBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
  popupBox.style.textAlign = 'center';
  popupBox.style.maxWidth = '300px';

  const msg = document.createElement('p');
  msg.textContent = message;
  msg.style.marginBottom = '20px';
  msg.style.fontSize = '16px';
  msg.style.color = '#1e293b';

  const okBtn = document.createElement('button');
  okBtn.textContent = 'OK';
  okBtn.style.padding = '10px 20px';
  okBtn.style.border = 'none';
  okBtn.style.backgroundColor = '#10b981';
  okBtn.style.color = '#fff';
  okBtn.style.borderRadius = '5px';
  okBtn.style.cursor = 'pointer';

  okBtn.addEventListener('click', () => {
    document.body.removeChild(popupOverlay);
    window.location.href = '../status/';
  });

  popupBox.appendChild(msg);
  popupBox.appendChild(okBtn);
  popupOverlay.appendChild(popupBox);
  document.body.appendChild(popupOverlay);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.innerText = "Loading...";

  const formData = new FormData(form);

  try {
    const response = await fetch(scriptURL, { method: 'POST', body: formData });

    if (response.ok) {
      form.reset();
      createPopup("Design submitted successfully!");
    } else {
      throw new Error("Submission failed.");
    }
  } catch (error) {
    createPopup("Error: Something went wrong. Please try again.");
  } finally {
    submitButton.disabled = false;
    submitButton.innerText = "Submit";
  }
});
const scriptURLOne = 'https://script.google.com/macros/s/AKfycbw6Zbx9Fr-3JLG5L-t9WLc33Q9ZmmPu0-u58wPCbYHx9IMdqdZtf09CdUdhGIuJJ-DnAQ/exec'
  const formOne = document.forms['submit-to-google-sheet']

  formOne.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURLOne, { method: 'POST', body: new FormData(formOne)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
/*-------------------------Toggle Password Visibility-------------------------*/
  // TOGGLE PASSWORD VISIBILITY FOR ALL FIELDS WITH THE "toggle-password" CLASS
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === "password") {
          input.type = "text";
          button.textContent = "Hide";
        } else {
          input.type = "password";
          button.textContent = "Show";
        }
      }
    });
  });
/*----------------------------------card design----------------------------------*/
const ctn = document.getElementById('ctName');
const displayCtn = document.getElementById('display-ctn');
const displayCtnOne = document.getElementById('display-ctn-one');

// Update the top box content whenever the input changes
ctn.addEventListener('input', () => {
  displayCtn.textContent = ctn.value;
  displayCtnOne.textContent = ctn.value;
});

/*-----------profession input-----------*/
const ctpOne = document.getElementById('ctProfessionOne');
const displayCtpOne = document.getElementById('display-ctp-one');
const displayCtpOneOne = document.getElementById('display-ctp-one-one');

// Update the top box content whenever the input changes
ctpOne.addEventListener('input', () => {
  displayCtpOne.textContent = ctpOne.value;
  displayCtpOneOne.textContent = ctpOne.value;
});
/*-----------profession input tow-----------*/
const ctpTow = document.getElementById('ctProfessionTow');
const displayCtpTow = document.getElementById('display-ctp-tow');
const displayCtpTowTow = document.getElementById('display-ctp-tow-tow');

// Update the top box content whenever the input changes
ctpTow.addEventListener('input', () => {
  displayCtpTow.textContent = ' | ' + ctpTow.value;
  displayCtpTowTow.textContent = ' | ' + ctpTow.value;
});
/*-----------profession input Three-----------*/
const ctpThree = document.getElementById('ctProfessionThree');
const displayCtpThree = document.getElementById('display-ctp-three');
const displayCtpThreeThree = document.getElementById('display-ctp-three-three');

// Update the top box content whenever the input changes
ctpThree.addEventListener('input', () => {
  displayCtpThree.textContent = ' | ' + ctpThree.value;
  displayCtpThreeThree.textContent = ' | ' + ctpThree.value;
});
/*------------------------------------settings open------------------------------------*/
const settingBtns = document.querySelectorAll('.setting-btn');
const settingBoxes = document.querySelectorAll('.setting-box');

// Add event listeners to each button
settingBtns.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from propagating to the document

    // Toggle the visibility of the corresponding setting box
    const settingBox = settingBoxes[index];
    settingBox.style.display = settingBox.style.display === 'block' ? 'none' : 'block';

    // Hide all other setting boxes
    settingBoxes.forEach((box, boxIndex) => {
      if (boxIndex !== index) {
        box.style.display = 'none';
      }
    });
  });
});

// Hide all setting boxes when clicking anywhere else on the document
document.addEventListener('click', () => {
  settingBoxes.forEach((box) => {
    box.style.display = 'none';
  });
});

// Prevent the setting box from closing when clicking inside it
settingBoxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

/*----------------------------------settings----------------------------------*/
// Name
const topLeftN = document.getElementById('top-left-n');
const topRightN = document.getElementById('top-right-n');
const ctnN = document.querySelectorAll('.ctn');

// Profession
const topLeftP = document.getElementById('top-left-p');
const topRightP = document.getElementById('top-right-p');
const ctnP = document.querySelectorAll('.ctp');
/*--------------------- Name ---------------------*/
// Name Top Left button click
topLeftN.addEventListener('click', () => {
  ctnN.forEach(element => {
    element.style.top = '2rem';
    element.style.bottom = '';
    element.style.left = '2rem';
    element.style.right = '';
  });
});

// Name Top Right button click
topRightN.addEventListener('click', () => {
  ctnN.forEach(element => {
    element.style.top = '2rem';
    element.style.bottom = '';
    element.style.left = '';
    element.style.right = '2rem';
  });
});

/*--------------------- Profession ---------------------*/
// Profession Top Left button click
topLeftP.addEventListener('click', () => {
  ctnP.forEach(element => {
    element.style.top = '4.5rem';
    element.style.bottom = '';
    element.style.left = '2rem';
    element.style.right = '';
  });
});

// Profession Top Right button click
topRightP.addEventListener('click', () => {
  ctnP.forEach(element => {
    element.style.top = '4.5rem';
    element.style.bottom = '';
    element.style.left = '';
    element.style.right = '2rem';
  });
});

/*------------------------------Add event listener to the button------------------------------*/
document.getElementById('add-profession-input').addEventListener('click', () => {
  // Get all the hidden textareas
  const textAreas = ['ctProfessionTow', 'ctProfessionThree'];
  
  for (let id of textAreas) {
    const textArea = document.getElementById(id);
    // Show the first hidden textarea
    if (textArea.style.display === 'none') {
      textArea.style.display = 'block';
      break;
    }
  }
});
document.getElementById('delete-profession-input').addEventListener('click', () => {
  const deleteCtpThree = document.getElementById('ctProfessionThree');
  const deleteCtpTow = document.getElementById('ctProfessionTow');
  const threeValue = document.getElementById('display-ctp-three');
  const towValue = document.getElementById('display-ctp-tow');

  if (deleteCtpThree.style.display === 'block') {
    deleteCtpThree.value = '';
    deleteCtpThree.style.display = 'none';
    threeValue.innerText ='';
  } else {
    deleteCtpTow.value = '';
    deleteCtpTow.style.display = 'none';
    towValue.innerText = '';
  }
});

/*-----------------------------textarea type number system-----------------------------*/
// Select all textareas with the class 'phoneNumber'
const textareanum = document.querySelectorAll('.phoneNumber');

// Initialize each textarea with '+880'
textareanum.forEach((textarea) => {
  if (!textarea.value.startsWith('+880')) {
    textarea.value = '+880';
  }

  textarea.addEventListener('input', () => {
    let value = textarea.value;
    
    // Make sure the value always begins with '+880'
    if (!value.startsWith('+880')) {
      value = '+880' + value.replace(/^\+?880?/, '');
    }
    
    // Get the part after '+880'
    let numberPart = value.slice(4);
    
    // Remove all non-numeric characters from the number part
    numberPart = numberPart.replace(/[^0-9]/g, '');
    
    // If the number starts with one or more 0's, remove them.
    // This allows the user to type a 0, but it won't be part of the final number.
    numberPart = numberPart.replace(/^0+/, '');
    
    // Insert a dash after the first 4 digits if more than 4 digits are present
    if (numberPart.length > 4) {
      numberPart = numberPart.slice(0, 4) + '-' + numberPart.slice(4);
    }
    
    // Update the textarea with '+880' and the formatted number
    textarea.value = '+880 ' + numberPart;
  });
});


/*------------------card background design*------------------*/
document.querySelectorAll('.card-color-box input[type="radio"]').forEach(input => {
  input.addEventListener('change', function () {
    const label = this.closest('label');
    // Get only the first image within the label
    const img = label.querySelector('img');
    
    // Retrieve all matching elements for svg-box and svg-box-one
    const svgBoxes = document.querySelectorAll('.svg-box');
    const svgBoxesOne = document.querySelectorAll('.svg-box-one');
    const cardTheme = document.querySelector('.front.card-theme');
    const backCardTheme = document.querySelector('.back.card-theme');
    const cardThemeSum = document.querySelector('.front.card-summary');
    const backCardThemeSum = document.querySelector('.back.card-summary');

    // Always clear previous content
    svgBoxes.forEach(box => box.innerHTML = "");
    svgBoxesOne.forEach(box => box.innerHTML = "");
    cardTheme.style.background = "";
    backCardTheme.style.background = "";
    cardThemeSum.style.background = "";
    backCardThemeSum.style.background = "";

    // Get computed styles from the label.
    const computedStyle = window.getComputedStyle(label);
    const bgImage = computedStyle.backgroundImage; // e.g., "none" or "linear-gradient(...)"
    const bgColor = computedStyle.backgroundColor;   // e.g., "rgb(255, 255, 255)" or "rgba(0, 0, 0, 0)"
    
    // Determine if a background style is explicitly defined.
    // (Assumes "transparent" means no background was set.)
    const hasBackground = (bgImage && bgImage !== 'none' && bgImage.includes('gradient'))
                          || (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent');

    if (hasBackground) {
      // If a background (solid or gradient) is set, apply it to the card theme containers.
      // Using the shorthand "background" will carry both color and any gradient.
      cardTheme.style.background = computedStyle.background;
      backCardTheme.style.background = computedStyle.background;
      cardThemeSum.style.background = computedStyle.background;
      backCardThemeSum.style.background = computedStyle.background;
    } else if (img) {
      // If there's no background style but an image exists, update the SVG boxes with the image's HTML.
      svgBoxes.forEach(box => box.innerHTML = img.outerHTML);
      svgBoxesOne.forEach(box => box.innerHTML = img.outerHTML);
    }
  });
});




// Select all radio inputs for background color
const radioInputs = document.querySelectorAll('input[type="radio"][name="background"]');
const cardTheme = document.querySelector('.front.card-theme');
const backCardTheme = document.querySelector('.back.card-theme');
const cardThemeSum = document.querySelector('.front.card-summary');
const backCardThemeSum = document.querySelector('.back.card-summary');

// Function to apply the color of the checked radio input
function applyColor() {
  // Loop through all inputs
  radioInputs.forEach((input) => {
    if (input.checked) {
      // Find the associated p.color element
      const colorElement = input.parentElement.querySelector('.color');
      if (colorElement) {
        // Apply the color to the target elements
        const color = window.getComputedStyle(colorElement).color;
        cardTheme.style.color = color;
        backCardTheme.style.color = color;
        cardThemeSum.style.color = color;
        backCardThemeSum.style.color = color;
      }
    }
  });
}

// Add event listeners to all radio inputs for background color
radioInputs.forEach((input) => {
  input.addEventListener('change', applyColor);
});

// Apply color on page load
applyColor();

/*----------------------------next button to submit----------------------------*/
document.getElementById('next').addEventListener('click', () => {
  // Hide the main preview and card design form
  const mainPreview = document.getElementById('main-preview');
  const cardDesignForm = document.querySelector('.card-design-form');
  if (mainPreview) mainPreview.style.display = 'none';
  if (cardDesignForm) cardDesignForm.style.display = 'none';

  // Show the design summary
  const designSummary = document.querySelector('.design-summary');
  if (designSummary) designSummary.style.display = 'block';
});
/*----------------------------back button to submit----------------------------*/
document.getElementById('back').addEventListener('click', () => {
  // Hide the main preview and card design form
  const mainPreview = document.getElementById('main-preview');
  const cardDesignForm = document.querySelector('.card-design-form');
  if (mainPreview) mainPreview.style.display = 'flex';
  if (cardDesignForm) cardDesignForm.style.display = 'flex';

  // Show the design summary
  const designSummary = document.querySelector('.design-summary');
  if (designSummary) designSummary.style.display = 'none';
});

/*----------------------------design selection slide----------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const faqToggles = document.querySelectorAll(".faq-toggle");

  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const faqItem = toggle.parentElement;

      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
          item.querySelector(".faq-content").style.display = "none";
          item.querySelector(".faq-toggle").classList.remove("active");
        }
      });

      const content = toggle.nextElementSibling;
      faqItem.classList.toggle("active");
      toggle.classList.toggle("active");
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });
});
/*----------------------------backgrund texture----------------------------*/
document.getElementById('cttd').addEventListener('change', function(e) {
  // Hide all textures
  document.querySelectorAll('.background-texture-box img').forEach(function(img) {
    img.style.display = 'none';
  });
  
  // Get the selected value
  const selectedTexture = e.target.value;
  
  // If a valid texture is selected, display all matching images
  if (selectedTexture !== 'solid') {
    document.querySelectorAll('.' + selectedTexture).forEach(function(img) {
      img.style.display = 'block';
    });
  }
});

/*----------------------------scroll top----------------------------*/
document.querySelectorAll('.designNext').forEach(button => {
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
/*----------------------------background design----------------------------*/
document.querySelectorAll('.bg-items').forEach(item => {
  item.addEventListener('click', function(e) {
    e.stopPropagation();
    const content = this.querySelector('.bg-content');
    if (!content) return;

    const isActive = content.classList.contains('active');
    
    // Close all other popovers and reset their arrows
    document.querySelectorAll('.bg-content').forEach(other => {
      if (other !== content) {
        other.classList.remove('active');
        const parentArrow = other.closest('.bg-items')?.querySelector('i');
        if (parentArrow) parentArrow.style.transform = 'rotate(0deg)';
      }
    });

    // Toggle current popover
    content.classList.toggle('active', !isActive);

    if (!isActive) {
      positionPopover(content, this);
    } else {
      const arrow = this.querySelector('i');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  });
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.bg-items') && !e.target.closest('.bg-content')) {
    document.querySelectorAll('.bg-content').forEach(content => {
      content.classList.remove('active');
      // Reset all arrows
      const parentItem = content.closest('.bg-items');
      const arrow = parentItem?.querySelector('i');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    });
  }
});

function positionPopover(content, parentItem) {
  const arrow = parentItem.querySelector('i');
  // Reset arrow first
  if (arrow) arrow.style.transform = 'rotate(90deg)';

  // Reset positioning
  content.style.top = '110%';
  content.style.left = '0';
  content.style.bottom = 'auto';
  content.style.right = 'auto';

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const contentRect = content.getBoundingClientRect();

  // Vertical positioning
  if (contentRect.bottom > viewportHeight) {
    content.style.top = 'auto';
    content.style.bottom = '110%';
    if (arrow) arrow.style.transform = 'rotate(-90deg)'; // Flipped arrow
  }

  // Horizontal positioning
  const updatedRect = content.getBoundingClientRect();
  if (updatedRect.right > viewportWidth) {
    content.style.left = 'auto';
    content.style.right = '0';
  } else if (updatedRect.left < 0) {
    content.style.left = '0';
  }

  // Additional horizontal arrow rotation if needed
  if (updatedRect.right > viewportWidth || updatedRect.left < 0) {
    if (arrow) arrow.style.transform = 'rotate(90deg)';
  }
}
/*----------------------------mandatori button active----------------------------*/
const textInput = document.getElementById('ctName');
    const actionButton = document.getElementById('next');

    textInput.addEventListener('input', () => {
      // Trim whitespace to check if there's real content
      if (textInput.value.trim() !== "") {
        actionButton.disabled = false;
        actionButton.style.background = "#3e88ff";
        actionButton.style.color = "#ffffff";
        actionButton.style.cursor = "pointer";
      } else {
        actionButton.disabled = true;
        actionButton.style.background = "#e5e7eb";
        actionButton.style.color = "#cbd5e1";
        actionButton.style.cursor = " not-allowed";
      }
    });
/*----------------------------card logo block and none----------------------------*/
document.addEventListener("DOMContentLoaded", function() {
  // Get all radio buttons with the name "background"
  const radios = document.querySelectorAll('input[name="background"]');
  // Get the images (assumed unique IDs)
  const imgOneList = document.querySelectorAll('#main-logo');
  const imgTwoList = document.querySelectorAll('#main-white-logo');
  // Get all SVG path elements inside .nfc-icon-box
  const nfcIcons = document.querySelectorAll('.nfc-icon-box svg path');

  // Helper function to set the stroke for all nfc icon elements
  function setNfcIconStroke(color) {
    nfcIcons.forEach(icon => {
      icon.setAttribute('stroke', color);
      // Alternatively, you could use: icon.style.stroke = color;
    });
  }

  function toggleImages() {
    const radioAaaa = document.getElementById("aaaa");
    const radioFfff = document.getElementById("ffff");
    const radioVvv = document.getElementById("vvv");

    if (radioAaaa && radioAaaa.checked) {
      // For radio "aaaa": show imgOneList, hide imgTwoList
      imgOneList.forEach(img => img.style.display = "block");
      imgTwoList.forEach(img => img.style.display = "none");
      setNfcIconStroke('#000000');
    } else if (radioFfff && radioFfff.checked) {
      // For radio "ffff": show imgTwoList, hide imgOneList
      imgOneList.forEach(img => img.style.display = "block");
      imgTwoList.forEach(img => img.style.display = "none");
      setNfcIconStroke('#000000');
    } else if (radioVvv && radioVvv.checked) {
      // For radio "vvv": also show imgTwoList, hide imgOneList
      imgOneList.forEach(img => img.style.display = "block");
      imgTwoList.forEach(img => img.style.display = "none");
      setNfcIconStroke('#000000');
    } else {
      // Default state: hide imgOneList, show imgTwoList and set stroke to white
      imgOneList.forEach(img => img.style.display = "none");
      imgTwoList.forEach(img => img.style.display = "block");
      setNfcIconStroke('#ffffff');
    }
  }

  // Attach change event listeners to all radio buttons
  radios.forEach(radio => {
    radio.addEventListener("change", toggleImages);
  });

  // Set the initial state on page load
  toggleImages();
});
