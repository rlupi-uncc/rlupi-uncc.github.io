document.addEventListener("DOMContentLoaded", () => {
    const jsonBtn = document.getElementById("generateJSON");
    const form = document.getElementById("introForm");

    jsonBtn.addEventListener("click", () => {
        const formData = new FormData(form);
        const jsonData = {};

        // Loop through all fields
        for (const [key, value] of formData.entries()) {
            if (key === "pictureUpload") {
                const fileInput = document.getElementById("pictureUpload");
                if (fileInput.files.length > 0) {
                    // Show as "images/<filename>"
                    jsonData["picture"] = `images/${fileInput.files[0].name}`;
                }
            } else {
                if (jsonData[key]) {
                    if (!Array.isArray(jsonData[key])) jsonData[key] = [jsonData[key]];
                    jsonData[key].push(value);
                } else {
                    jsonData[key] = value;
                }
            }
        }

        const formatted = JSON.stringify(jsonData, null, 4);

        document.querySelector("main").innerHTML = `
            <h2>Introduction JSON</h2>
            <section>
                <pre><code class="language-json">${formatted}</code></pre>
            </section>
            <p><a href="intro_form.html">Return to Form</a></p>
        `;

        if (window.hljs) hljs.highlightAll();
    });
});
