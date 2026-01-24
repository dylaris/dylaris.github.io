function openPage(pageName, element) {
    // hide all tab content
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let tablink = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablink.length; i++) {
        tablink[i].style.backgroundColor = "";
    }

    // display current page
    document.getElementById(pageName).style.display = "block";
    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue(`--bg-body-${pageName}`).trim();
    element.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
}
