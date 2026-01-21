function openTab(event, tabName) {
    // hide all tab content
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // remove class 'active'
    let tabLink = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLink.length; i++) {
        tabLink[i].className = tabLink[i].className.replace(" active", "");
    }

    // display current tab and add class 'active'
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}
