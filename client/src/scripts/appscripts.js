const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const inquiryForm = document.querySelector("#inquiryForm");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = inquiryForm.querySelector("#name").value.trim();
    const email = inquiryForm.querySelector("#email").value.trim();
    const message = inquiryForm.querySelector("#message").value.trim();

    const status = inquiryForm.querySelector("#formStatus");

    if (status) {
      status.textContent = "Sending your inquiry...";
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/inquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send inquiry."
        );
      }

      if (status) {
        status.textContent = data.message;
      }

      inquiryForm.reset();

    } catch (error) {
      console.error("Inquiry submission error:", error);

      if (status) {
        status.textContent =
          "Unable to send your inquiry. Please try again.";
      }
    }
  });
} 