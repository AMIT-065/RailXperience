/**
 * Share Experience - Form Handling Script
 * Description: Handles form submission, validation, and localStorage storage
 * Features: Form validation, review object creation, localStorage management
 * Author: Amit Ingle
 * Version: 1.0
 * Date: 2025
 */

// Wait for DOM content to be fully loaded before executing script
document.addEventListener("DOMContentLoaded", () => {
    // Get the submit button element
    const submitBtn = document.getElementById("submitBtn");

    // Add click event listener to submit button
    submitBtn.addEventListener("click", () => {
        // Collect all form input values
        const name = document.getElementById("Name").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const email = document.getElementById("email").value;
        const train = document.querySelector('input[name="train"]:checked')?.value;
        const travelClass = document.getElementById("class").value;
        const travelDate = document.getElementById("date").value;
        const cleanliness = document.querySelector('input[name="cleanNum"]').value;
        const punctuality = document.querySelector('input[name="PunctualityNum"]').value;
        const staff = document.querySelector('input[name="staffNum"]').value;
        const food = document.querySelector('input[name="foodNum"]').value;
        const feedback = document.getElementById("feedback").value;

        // Validate essential required fields
        if (!name || !gender || !email || !train || !feedback) {
            alert("Please fill in all required fields.");
            return; // Stop execution if validation fails
        }

        // Create review object with all collected data
        const review = {
            name,           // User's name
            gender,         // User's gender
            email,          // User's email
            train,          // Selected train
            travelClass,    // Travel class
            travelDate,     // Date of travel
            cleanliness: Number(cleanliness),    // Convert to number
            punctuality: Number(punctuality),    // Convert to number
            staff: Number(staff),                // Convert to number
            food: Number(food),                  // Convert to number
            feedback,       // User's detailed feedback
            dateSubmitted: new Date().toISOString() // Timestamp of submission
        };

        // Retrieve existing reviews from localStorage or initialize empty array
        const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        
        // Add new review to the array
        allReviews.push(review);
        
        // Save updated reviews array back to localStorage
        localStorage.setItem("reviews", JSON.stringify(allReviews));

        // Show success message to user
        alert("Thank you for your feedback!");
        
        // Optionally clear the form for new submission
        document.querySelector("form").reset();
    });
});