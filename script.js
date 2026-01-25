function openPage(pageName, element) {
    // hide all tab content
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // remove class 'active'
    let tablink = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablink.length; i++) {
        tablink[i].classList.remove("active");
    }

    // display current page
    document.getElementById(pageName).style.display = "block";
    element.classList.add("active");

    if (pageName == "blog") {
        document.getElementById("blog-list").style.display = "block";
        document.getElementById("blog-detail").style.display = "none";
    }
}

function loadBlogContent(blogId) {
    const blogPathMap = {
        0: "posts/template.html",
        1: 'posts/The "One-and-Done" Memory Allocator: A Primer on Arena Allocation.html',
    };
    const blogPath = blogPathMap[blogId];
    if (!blogPath) return;

    // hide the list, display the detail container
    document.getElementById("blog-list").style.display = "none";
    const blogDetail = document.getElementById("blog-detail");
    blogDetail.style.display = "block";
    blogDetail.innerHTML = '<div style="color: var(--color-text-2);">Loading...</div>';

    // display blog content
    fetch(blogPath)
        .then(response => {
            if (!response.ok) throw new Error("Failed to laod blog");
            return response.text();
        })
        .then(html => {
            blogDetail.innerHTML = `<div>${html}</div>`;
        })
        .catch(err => {
            blogDetail.innerHTML = `<div style="color: #ff4444;">${err.message}</div>`;
        });
}
