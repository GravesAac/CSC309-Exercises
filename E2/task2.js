
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

document.addEventListener("DOMContentLoaded", function () {
    function validateForm() {
        let buttonclick = document.getElementById("submitButton");
        buttonclick.addEventListener("click", function () {
            let fields = ["name", "email", "password", "repeatPassword"];
            let fieldLength = fields.length;
            let fieldName = "";
            for (var i = 0; i < fieldLength; i++) {
                fieldName = fields[i];
                if (document.getElementById("registrationForm")[fieldName].value === "") {
                    alert(fieldName + " cannot be empty, please re-enter your information");
                    document.getElementById("registrationForm")[fieldName].style.borderColor = "red";
                    return false;
                }
            }
            let success = document.getElementById("successMessage");
            success.innerHTML = "wow, nice submission!!!!!!!!";
            return true;
        });
    }
    validateForm();
})

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
                document.getElementById("todoList").appendChild(li);
                inputField.value = "";
            }
        });
    }

    todoApp();
})


