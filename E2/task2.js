
const isEmpty = str => !str.trim().length;

document.addEventListener("DOMContentLoaded", function () {
    // This function will run once the DOM is fully loaded
    function addListElement() {
        let buttonclick = document.getElementById("addItemButton");
        buttonclick.addEventListener("click", function () {
            let inputField = document.getElementById("itemInput");
            if (!isEmpty(inputField.value)) {
                let li = document.createElement('li');
                li.textContent = inputField.value;
                document.getElementById("itemList").appendChild(li);
                inputField.value = ''; // clear the input field after each click;
            }
        });
    }

    addListElement(); // Call the function to set up the event listener
});

// document.addEventListener("DOMContentLoaded", function () {
//     function validateForm() {
//         let buttonclick = document.getElementById("submitButton");
//         buttonclick.addEventListener("click", function () {
//             let fields = ["name", "email", "password", "repeatPassword"];
//             let fieldLength = fields.length;
//             let fieldName = "";
//             for (var i = 0; i < fieldLength; i++) {
//                 fieldName = fields[i];
//                 if (document.getElementById("registrationForm")[fieldName].value === "") {
//                     alert(fieldName + " cannot be empty, please re-enter your information");
//                     document.getElementById("registrationForm")[fieldName].style.borderColor = "red";
//                     return false;
//                 }
//             }
//             let success = document.getElementById("successMessage");
//             success.innerHTML = "wow, nice submission!!!!!!!!";
//             return true;
//         });
//     }
//     validateForm();
// })

document.addEventListener("DOMContentLoaded", function () {
    function validateForm() {
        let isValid = true; // Track if form is valid

        // Clear previous error messages
        clearErrors();

        // Name validation
        let nameField = document.getElementById("name");
        if (nameField.value.trim() === "") {
            displayError(nameField, "Name cannot be empty");
            isValid = false;
        }

        // Email validation
        let emailField = document.getElementById("email");
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value.trim() === "") {
            displayError(emailField, "Email cannot be empty");
            isValid = false;
        } else if (!emailPattern.test(emailField.value)) {
            displayError(emailField, "Please enter a valid email address");
            isValid = false;
        }

        // Password validation
        let passwordField = document.getElementById("password");
        let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (passwordField.value.trim() === "") {
            displayError(passwordField, "Password cannot be empty");
            isValid = false;
        } else if (!passwordPattern.test(passwordField.value)) {
            displayError(passwordField, "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a digit.");
            isValid = false;
        }

        // Repeat Password validation
        let repeatPasswordField = document.getElementById("repeatPassword");
        if (repeatPasswordField.value.trim() === "") {
            displayError(repeatPasswordField, "Repeat Password cannot be empty");
            isValid = false;
        } else if (repeatPasswordField.value !== passwordField.value) {
            displayError(repeatPasswordField, "Passwords do not match");
            isValid = false;
        }

        // If form is valid, display success message
        if (isValid) {
            let successMessage = document.getElementById("successMessage");
            successMessage.innerHTML = "Wow, nice submission!";
            successMessage.style.color = "green";
        }

        return isValid; // Return form validation status
    }

    // Function to display error messages
    function displayError(inputElement, message) {
        let errorElement = inputElement.nextElementSibling; // Assumes an empty <div> or <span> after input for error messages
        errorElement.innerHTML = message;
        errorElement.style.color = "red";
        inputElement.style.borderColor = "red";
    }

    // Function to clear previous errors
    function clearErrors() {
        let errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function (message) {
            message.innerHTML = "";
        });

        let inputFields = document.querySelectorAll("input");
        inputFields.forEach(function (field) {
            field.style.borderColor = ""; // Reset border color
        });

        let successMessage = document.getElementById("successMessage");
        successMessage.innerHTML = ""; // Clear success message
    }

    // Event listener for the submit button
    let submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        validateForm();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    function todoApp() {
        let buttonClick = document.getElementById("addTodoButton");
        buttonClick.addEventListener("click", function () {
            let inputField = document.getElementById("newTodo");
            if (inputField.value !== "") {
                let li = document.createElement('li'); // li should be created for each to do in this case

                // create the checkbox
                let checkbox = document.createElement("INPUT");
                checkbox.setAttribute("type", "checkbox");
                checkbox.addEventListener("change", function () {
                    if (checkbox.checked) {
                        li.style.textDecoration = "line-through";  // Strike-through when checked
                    } else {
                        li.style.textDecoration = "none";  // Remove strike-through when unchecked
                    }
                });

                li.appendChild(checkbox);
                let textNode = document.createTextNode(inputField.value);
                li.appendChild(textNode);

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "X";  // Set button text
                deleteButton.style.marginLeft = "10px"; // Add some spacing for aesthetics
                // Add click event listener to delete the task
                deleteButton.addEventListener("click", function() {
                    li.remove();  // Remove the parent <li> (the task)
                });

                li.appendChild(deleteButton);  // Append the delete button to the list item

                document.getElementById("todoList").appendChild(li);
                inputField.value = "";
            }
        });
    }

    todoApp();
})


