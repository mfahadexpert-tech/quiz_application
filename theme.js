
/* Theme button */
const themeBtn = document.getElementById("themeBtn");

/* Change theme when clicked */
themeBtn.onclick = function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerText = "Light Mode";
    } else {
        themeBtn.innerText = "Dark Mode";
    }
};
