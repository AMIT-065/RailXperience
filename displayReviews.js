/**
 * Display Reviews - Reviews Management Script
 * Description: Handles displaying and filtering user reviews from localStorage
 * Features: Dynamic review rendering, train filtering, average rating calculation
 * Author: Amit Ingle
 * Version: 1.0
 * Date: 2025
 */

// Wait for DOM content to be fully loaded before executing script
document.addEventListener("DOMContentLoaded", () => {
    // Get the reviews container and filter dropdown elements
    const container = document.getElementById("reviewContainer");
    const filterSelect = document.getElementById("filterTrain");

    // Retrieve all reviews from localStorage or initialize empty array
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    /**
     * Display reviews in the container
     * @param {Array} filteredReviews - Array of review objects to display
     */
    function displayReviews(filteredReviews) {
        // Clear existing reviews from container
        container.querySelectorAll(".review-card").forEach((card) => card.remove());

        // Check if there are no reviews to display
        if (filteredReviews.length === 0) {
            container.innerHTML += '<p class="no-reviews">No reviews found for the selected filter.</p>';
            return;
        }

        // Create and append review cards for each review
        filteredReviews.forEach((review) => {
            // Calculate average rating from all rating categories
            const avgRating = ((review.cleanliness + review.punctuality + review.staff + review.food) / 4).toFixed(1);

            // Create review card element
            const card = document.createElement("div");
            card.className = "review-card";
            
            // Populate card with review data
            card.innerHTML = `
                <figure>
                    <img src="person.png" alt="Profile picture of ${review.name}" width="120" height="120">
                    <figcaption>${review.name}</figcaption>
                </figure>
                <p>
                    ${review.feedback}<br>
                    <strong>Train:</strong> ${review.train}<br>
                    <strong>Travel Class:</strong> ${review.travelClass}<br>
                    <strong>Travel Date:</strong> ${new Date(review.travelDate).toLocaleDateString()}<br>
                    <strong>Overall Rating:</strong> ${"★".repeat(Math.round(avgRating))} (${avgRating}/5)
                </p>
            `;
            
            // Add card to container
            container.appendChild(card);
        });
    }

    // Initial display of all reviews (newest first)
    displayReviews(allReviews.reverse());

    // Add event listener for filter changes
    filterSelect.addEventListener("change", () => {
        const selectedTrain = filterSelect.value;
        
        if (selectedTrain === "All") {
            // Show all reviews if "All Trains" is selected
            displayReviews(allReviews);
        } else {
            // Filter reviews by selected train
            const filtered = allReviews.filter((review) => review.train === selectedTrain);
            displayReviews(filtered);
        }
    });
});