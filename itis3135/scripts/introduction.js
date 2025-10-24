document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById('introForm');
    const addCourseButton = document.getElementById('addCourse');
    const clearButton = document.getElementById('clear');
    const main = document.querySelector('main');

    // Validate form
    function validateForm() {
        const requiredFields = formElement.querySelectorAll('[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                alert(`Please fill out the ${field.name} field.`);
                return false;
            }
        }
        return true;
    }

    // Render output
    function renderOutput(imgSrc) {
        const formData = new FormData(formElement);
        const fullName = [
            formData.get('firstName'),
            formData.get('middleName'),
            formData.get('lastName')
        ].filter(Boolean).join(' ');
        const courses = [];
        const courseDepts = formData.getAll('courseDept');
        const courseNums = formData.getAll('courseNum');
        const courseNames = formData.getAll('courseName');
        const courseReasons = formData.getAll('courseReason');
        for (let i = 0; i < courseDepts.length; i++) {
            courses.push(`${courseDepts[i]} ${courseNums[i]} - ${courseNames[i]}: ${courseReasons[i]}`);
        }
        const links = [];
        const linkTexts = formData.getAll('linkText');
        const linkUrls = formData.getAll('linkUrl');
        for (let i = 0; i < linkTexts.length; i++) {
            links.push(`<a href="${linkUrls[i]}" target="_blank">${linkTexts[i]}</a>`);
        }

        document.body.innerHTML = `
            <header>
                <h1>Home | ${fullName}'s | ${formData.get('mascotAdjective')} ${formData.get('mascotAnimal')}</h1>
                <nav class="primary-nav">
                    <a href="index.html">ITIS3135</a> |
                    <a href="contract.html">Contract</a> |
                    <a href="introduction.html">Introduction</a> |
                    <a href="website_evaluations.html">Website Evaluations</a> |
                    <a href="fccfsjs_outline.html">FCCJS Outline</a>
                </nav>
                <nav class="secondary-nav">
                    <a href="stuff/Cr@zy F!1ename.htm">Crappy Page</a> | 
                    <a href="../itis3135/raginglemur/about.html">Raging Lemur</a> | 
                    <a href="hobby/index.html">Hobby</a>
                </nav>
            </header>
            <main>
                <h2>Introduction Form</h2>
                <figure>
                    <img src="${imgSrc}" alt="Professional headshot of ${fullName}" style="max-width: 200px;">
                    <figcaption>${formData.get('pictureCaption')}</figcaption>
                </figure>
                <ul>
                    <li>
                        <h3>Personal Background</h3>
                        <p>${formData.get('personalStatement')}</p>
                    </li>
                    <li>
                        <h3>Professional Background</h3>
                        <p>${formData.get('professionalBackground')}</p>
                    </li>
                    <li>
                        <h3>Academic Background</h3>
                        <p>${formData.get('academicBackground')}</p>
                    </li>
                    <li>
                        <h3>Primary Computer</h3>
                        <p>${formData.get('primaryComputer')}</p>
                    </li>
                    <li>
                        <h3>Current Courses</h3>
                        <ul>
                            ${courses.map((course) => `<li>${course}</li>`).join('')}
                        </ul>
                    </li>
                    ${formData.get('funnyThing') ? `
                    <li>
                        <h3>Funny/Interesting Thing</h3>
                        <p>${formData.get('funnyThing')}</p>
                    </li>` : ''}
                    ${formData.get('share') ? `
                    <li>
                        <h3>Something I Would Like to Share</h3>
                        <p>${formData.get('share')}</p>
                    </li>` : ''}
                </ul>
                <div class="quote-section">
                    <p class="quote">“${formData.get('quote')}”</p>
                    <p class="quote-author"><em>- ${formData.get('quoteAuthor')}</em></p>
                </div>
                <p><a href="intro_form.html">Reset Form</a></p>
            </main>
            <footer>
                <nav>
                    ${links.join('||')}
                </nav>
                <p>Designed by <a href="lupisoftware.com/" target="_blank">Lupi Software Design</a> &copy; 2025</p>
            </footer>
        `;
    }

    // Display form results
    function displayResult() {
        const formData = new FormData(formElement);
        const pictureUpload = document.getElementById('pictureUpload');
        let pictureSrc = formData.get('picture');
        if (pictureUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                pictureSrc = e.target.result;
                renderOutput(pictureSrc);
            };
            reader.readAsDataURL(pictureUpload.files[0]);
        } else {
            renderOutput(pictureSrc);
        }
    }

    // Prevent default form submission
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            displayResult();
        }
    });

    // Reset form to default values
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            formElement.querySelectorAll('input[name="courseDept"]').forEach((input, index) => {
                if (index === 0) input.value = 'ITIS';
                else if (index === 1) input.value = 'ITIS';
                else if (index === 2) input.value = 'ITCS';
                else input.value = '';
            });
            formElement.querySelectorAll('input[name="courseNum"]').forEach((input, index) => {
                if (index === 0) input.value = '4350';
                else if (index === 1) input.value = '5122';
                else if (index === 2) input.value = '5180';
                else input.value = '';
            });
            formElement.querySelectorAll('input[name="courseName"]').forEach((input, index) => {
                if (index === 0) input.value = 'Design Prototyping';
                else if (index === 1) input.value = 'Penetration Testing & Secure Programming';
                else if (index === 2) input.value = 'Mobile Application Development';
                else input.value = '';
            });
            formElement.querySelectorAll('input[name="courseReason"]').forEach((input, index) => {
                if (index === 0) input.value = "I'm taking this to learn more about building a good user experience.";
                else if (index === 1) input.value = "I'm hoping to learn how to build secure, stable, reliable appications.";
                else if (index === 2) input.value = "I'm taking this to gain more insight into how insustry professionals build mobile applications.";
                else input.value = '';
            });
        }, 0);
    });

    // Clear all form fields
    clearButton.addEventListener('click', () => {
        Array.from(formElement.querySelectorAll('input, textarea')).forEach((input) => {
            if (input.type === 'file') input.value = '';
            else input.value = '';
        });
    });

    // Add new course fields
    addCourseButton.addEventListener('click', () => {
        const coursesDiv = document.getElementById('courses');
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.innerHTML = `
            <input type="text" name="courseDept" placeholder="Department" required>
            <input type="text" name="courseNum" placeholder="Number" required>
            <input type="text" name="courseName" placeholder="Course Name" required>
            <input type="text" name="courseReason" placeholder="Reason" required>
            <button type="button" class="deleteCourse">Delete</button><br>
        `;
        coursesDiv.appendChild(courseDiv);
        courseDiv.querySelector('.deleteCourse').addEventListener('click', () => {
            courseDiv.remove();
        });
    });

    // Delete course
    document.querySelectorAll('.deleteCourse').forEach((button) => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
        });
    });
});