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
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
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
                    pdfViewer.innerHTML = "";
                    pdfjsLib.getDocument(pdfUrl).promise.then((pdf => {
                        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) pdf.getPage(pageNum).then((page => {
                            const canvas = document.createElement("canvas");
                            canvas.setAttribute("willReadFrequently", "true");
                            pdfViewer.appendChild(canvas);
                            const viewport = page.getViewport({
                                scale: 1.5
                            });
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                            page.render({
                                canvasContext: canvas.getContext("2d"),
                                viewport
                            });
                        }));
                        modal.style.display = "block";
                    })).catch((error => {
                        console.error("Помилка завантаження PDF:", error);
                        alert("Не вдалося завантажити PDF. Перевірте шлях до файлу.");
                    }));
                } else if (type === "new-tab" && pdfUrl) window.open(pdfUrl, "_blank");
            }));
        }));
        closeBtn.addEventListener("click", (function() {
            modal.style.display = "none";
            pdfViewer.innerHTML = "";
        }));
        window.addEventListener("click", (function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                pdfViewer.innerHTML = "";
            }
        }));
    }));
    window["FLS"] = true;
})();