/**
 * Toastr
 * The Toastr Instance handles the toastr's element functionality.
 */
export class Toastr {
    // Element
    #el;

    // Icon Element
    #icon_el;

    // Text Element
    #text_el;


    constructor() {
        // Initialize the Toastr Element
        this.#el = document.getElementById("toastr");
        
        // Initialize the Icon Element
        this.#icon_el = document.getElementById("toastr_icon");
        
        // Initialize the Text Element
        this.#text_el = document.getElementById("toastr_text");
    }





    /****************
     * Toastr Types *
     ****************/

    

    success(message, duration) {
        this.#el.classList.add("success");
        this.#icon_el.innerText = "check_circle";
        this.#display(message, duration);
    }

    info(message, duration) {
        this.#el.classList.add("info");
        this.#icon_el.innerText = "info";
        this.#display(message, duration);
    }

    warning(message, duration) {
        this.#el.classList.add("warning");
        this.#icon_el.innerText = "warning";
        this.#display(message, duration);
    }

    error(message, duration) {
        this.#el.classList.add("error");
        this.#icon_el.innerText = "error";
        this.#display(this.#get_error_message(message), duration);
    }




    /**
     * Handles the display of a toastr for a given duration. Once it completes, it hides the toastr
     * and resets the toastr's class.
     * @param message 
     * @param duration_seconds 
     */
    #display(message, duration_seconds = 5) {
        this.#text_el.innerText = message;
        this.#el.style.visibility = "visible";
        setTimeout(() => { 
            this.#el.style.visibility = "hidden";
            this.#el.className = "toastr";
        }, duration_seconds * 1000);
    }






    /****************
     * Misc Helpers *
     ****************/




    /**
     * Extracts the error message based on the received type. If no error is extracted, returns a
     * generic message.
     * @param error 
     * @returns string
     */
    #get_error_message(error) {
        if (typeof error == "string") { return error }
        else if (error && typeof error == "object") {
            return typeof error.message == "string" ? error.message: JSON.stringify(error);
        } else { return "Unknown Error" }
    }
}