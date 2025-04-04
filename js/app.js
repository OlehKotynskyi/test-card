(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        const cards = document.querySelectorAll(".card");
        const modal = document.getElementById("pdfModal");
        const pdfViewer = document.getElementById("pdfViewer");
        const closeBtn = document.querySelector(".close");
        cards.forEach((card => {
            card.addEventListener("click", (function(e) {
                e.preventDefault();
                const pdfUrl = this.getAttribute("data-pdf");
                const type = this.getAttribute("data-type");
                if (type === "modal" && pdfUrl) {
                    pdfViewer.src = pdfUrl + "#toolbar=0&navpanes=0";
                    modal.style.display = "block";
                } else if (type === "new-tab" && pdfUrl) window.open(pdfUrl, "_blank");
            }));
        }));
        closeBtn.addEventListener("click", (function() {
            modal.style.display = "none";
            pdfViewer.src = "";
        }));
        window.addEventListener("click", (function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                pdfViewer.src = "";
            }
        }));
    }));
    window["FLS"] = true;
})();