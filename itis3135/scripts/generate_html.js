document.addEventListener("DOMContentLoaded", () => {
    const htmlBtn = document.getElementById("generateHTML");
    const form = document.getElementById("introForm");
  
    htmlBtn.addEventListener("click", () => {
      const fd = new FormData(form);
  
      // Build values from the form (use the actual field values, not labels)
      const first = (fd.get("firstName") || "").trim();
      const middle = (fd.get("middleName") || "").trim();
      const nick = (fd.get("nickname") || "").trim();
      const last = (fd.get("lastName") || "").trim();
  
      // Full name (prefer nickname in quotes if present)
      const baseName = [first, middle, last].filter(Boolean).join(" ");
      const fullName = nick ? `${first} ${middle ? middle + " " : ""}"${nick}" ${last}`.replace(/\s+/g, " ").trim() : baseName;
  
      const mascotAdj = (fd.get("mascotAdjective") || "").trim();
      const mascotAnimal = (fd.get("mascotAnimal") || "").trim();
      const divider = (fd.get("divider") || "|").trim();
  
      // Picture src logic: if a file was uploaded, show as images/<filename>, else use text input
      const upload = document.getElementById("pictureUpload");
      const pictureSrc = (upload && upload.files && upload.files.length > 0)
        ? `images/${upload.files[0].name}`
        : (fd.get("picture") || "").trim();
  
      // Alt text: prefer caption, else a sensible default
      const picCaption = (fd.get("pictureCaption") || "").trim();
      const alt = picCaption || `Headshot of ${fullName}`;
  
      const personal = (fd.get("personalStatement") || "").trim();
      const professional = (fd.get("professionalBackground") || "").trim();
      const academic = (fd.get("academicBackground") || "").trim();
      const primaryComputer = (fd.get("primaryComputer") || "").trim();
  
      // Courses
      const depts = fd.getAll("courseDept");
      const nums = fd.getAll("courseNum");
      const names = fd.getAll("courseName");
      const reasons = fd.getAll("courseReason");
      const courses = [];
      for (let i = 0; i < depts.length; i++) {
        const d = (depts[i] || "").trim();
        const n = (nums[i] || "").trim();
        const nm = (names[i] || "").trim();
        const r = (reasons[i] || "").trim();
        if (d || n || nm || r) {
          courses.push(`${d} ${n} - ${nm}: ${r}`.replace(/\s+/g, " ").trim());
        }
      }
  
      const quote = (fd.get("quote") || "").trim();
      const quoteAuthor = (fd.get("quoteAuthor") || "").trim();
      const funny = (fd.get("funnyThing") || "").trim();
      const share = (fd.get("share") || "").trim();
  
      // Build the minimal, nicely-indented HTML (no extraneous attributes/classes/ids/placeholders)
      const indent = (n) => "    ".repeat(n); // 4 spaces per level
      let html = "";
  
      html += `<h2>Introduction HTML</h2>\n`;
      html += `<h3>${fullName} ${divider} ${mascotAdj} ${mascotAnimal}</h3>\n`;
      html += `<figure>\n`;
      html += `${indent(1)}<img src="${pictureSrc}" alt="${alt}" />\n`;
      html += `${indent(1)}<figcaption>${picCaption}</figcaption>\n`;
      html += `</figure>\n`;
      html += `<ul>\n`;
      html += `${indent(1)}<li>\n`;
      html += `${indent(2)}<strong>Personal Background:</strong> ${personal}\n`;
      html += `${indent(1)}</li>\n`;
      html += `${indent(1)}<li>\n`;
      html += `${indent(2)}<strong>Professional Background:</strong> ${professional}\n`;
      html += `${indent(1)}</li>\n`;
      html += `${indent(1)}<li>\n`;
      html += `${indent(2)}<strong>Academic Background:</strong> ${academic}\n`;
      html += `${indent(1)}</li>\n`;
      html += `${indent(1)}<li>\n`;
      html += `${indent(2)}<strong>Primary Computer:</strong> ${primaryComputer}\n`;
      html += `${indent(1)}</li>\n`;
      if (courses.length) {
        html += `${indent(1)}<li>\n`;
        html += `${indent(2)}<strong>Current Courses:</strong>\n`;
        html += `${indent(2)}<ul>\n`;
        courses.forEach(c => {
          html += `${indent(3)}<li>${c}</li>\n`;
        });
        html += `${indent(2)}</ul>\n`;
        html += `${indent(1)}</li>\n`;
      }
      if (funny) {
        html += `${indent(1)}<li>\n`;
        html += `${indent(2)}<strong>Funny/Interesting Thing:</strong> ${funny}\n`;
        html += `${indent(1)}</li>\n`;
      }
      if (share) {
        html += `${indent(1)}<li>\n`;
        html += `${indent(2)}<strong>Something I Would Like to Share:</strong> ${share}\n`;
        html += `${indent(1)}</li>\n`;
      }
      html += `</ul>\n`;
      if (quote) {
        html += `<div>\n`;
        html += `${indent(1)}<p>“${quote}”</p>\n`;
        if (quoteAuthor) {
          html += `${indent(1)}<p><em>- ${quoteAuthor}</em></p>\n`;
        }
        html += `</div>\n`;
      }
  
      // Escape for display in a code block
      const escapeForCode = (s) =>
        s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
      const escaped = escapeForCode(html);
  
      document.querySelector("main").innerHTML = `
        <h2>Introduction HTML</h2>
        <section>
          <pre><code class="language-html">${escaped}</code></pre>
        </section>
        <p><a href="intro_form.html">Return to Form</a></p>
      `;
  
      if (window.hljs) hljs.highlightAll();
    });
  });
  