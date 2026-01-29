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

let blogPathMap = {};

function initBlogIds() {
    blogPathMap = {};
    const blogUl = document.getElementById("blog-ul");
    const blogItems = blogUl.getElementsByTagName("li");
    for (let i = 0; i < blogItems.length; i++) {
        const blogLink = blogItems[i].getElementsByTagName("a")[0];
        blogLink.setAttribute("data-blog-id", i);
        const blogTitle = blogLink.innerText.trim();
        const blogFileName = blogTitle;
        blogPathMap[i] = `posts/${blogFileName}.html`;
    }
    console.log(blogPathMap);
}

function loadBlogContent(blogId) {
    const blogPath = blogPathMap[blogId];
    if (!blogPath) return;

    // hide the list, display the detail container
    document.getElementById("blog-list").style.display = "none";
    const blogDetail = document.getElementById("blog-detail");
    blogDetail.style.display = "block";
    blogDetail.innerHTML = '<div style="color: var(--fg);">Loading...</div>';

    // display blog content
    fetch(blogPath)
        .then(response => {
            if (!response.ok) throw new Error("Failed to laod blog");
            return response.text();
        })
        .then(html => {
            blogDetail.innerHTML = `<div>${html}</div>`;
            generateBlogToc();
        })
        .catch(err => {
            blogDetail.innerHTML = `<div style="color: #ff4444;">${err.message}</div>`;
        });
}

function generateBlogToc() {
    const blogDetail = document.getElementById("blog-detail");
    const titles = blogDetail.querySelectorAll("h2, h3, h4");

    // create toc and insert it to beginning
    const tocContainer = document.createElement("div");
    tocContainer.className = "toc";
    tocContainer.id = "blog-toc"
    const tocUl = document.createElement("ul");
    tocContainer.appendChild(tocUl);

    const header = blogDetail.querySelector("h1");
    const headerParent = header.parentNode;
    headerParent.insertBefore(tocContainer, header.nextSibling);

    // add id for each title and toc navigation
    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const tagName = title.tagName.toLowerCase();
        const id = `${i}-${tagName}`;
        title.id = id;

        // click title and goto toc
        title.style.cursor = "pointer";
        title.addEventListener("click", () => {
            const toc = document.getElementById("blog-toc");
            if (toc) {
                toc.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

        const tocLi = document.createElement("li");
        const tocLink = document.createElement("a");

        tocLink.textContent = title.textContent.trim();
        // tocLink.href = `#${id}`;
        tocLink.style.cursor = "pointer";
        tocLink.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTitle = document.getElementById(id);
            if (targetTitle) {
                targetTitle.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

        tocLi.appendChild(tocLink);
        tocUl.appendChild(tocLi);
    }
}
