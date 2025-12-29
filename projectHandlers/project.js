let projects = [];
export function project() {
    const sidebar = document.querySelector(".sidebar");

    

    //Projects area
    const projectBtn = document.createElement("button");
    projectBtn.textContent = "Add new Project";

    sidebar.appendChild(projectBtn);

    //After clicking Add new Project
    const projectModal = document.getElementById("projectModal");
    const projectSubmit = document.getElementById("projectSubmit");
    const projectName = document.getElementById("projectName");

    projectBtn.addEventListener("click", () => {
        projectModal.style.display = "flex";
    });

    projectSubmit.addEventListener("click", () => {
        projectModal.style.display = "none";
        projectName.innerHTML = "";

    })
}
