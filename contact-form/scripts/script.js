console.log("JS file loaded: contact form");

      const form = document.getElementById("contactForm");
      const statusEl = document.getElementById("status");
      const submitBtn = document.getElementById("submitBtn");
      const resetBtn = document.getElementById("resetBtn");

      const fields = Array.from(form.querySelectorAll(".field"));

      function setStatus(message) {
        statusEl.textContent = message;
        statusEl.classList.add("show");
      }

      function clearStatus() {
        statusEl.textContent = "";
        statusEl.classList.remove("show");
      }

      function isValidEmail(value) {
        // Simple + effective enough for UI validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
      }

      function validate() {
        let ok = true;

        fields.forEach((field) => field.classList.remove("invalid"));

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const topic = form.elements.topic.value;
        const message = form.elements.message.value.trim();
        const company = form.elements.company.value.trim(); // honeypot

        if (company) {
          // If bot filled this, treat as invalid silently.
          ok = false;
          setStatus("Unable to send. Please try again.");
          return ok;
        }

        if (name.length < 2) {
          ok = false;
          form.querySelector('[data-field="name"]').classList.add("invalid");
        }

        if (!isValidEmail(email)) {
          ok = false;
          form.querySelector('[data-field="email"]').classList.add("invalid");
        }

        if (!topic) {
          ok = false;
          form.querySelector('[data-field="topic"]').classList.add("invalid");
        }

        if (message.length < 10) {
          ok = false;
          form.querySelector('[data-field="message"]').classList.add("invalid");
        }

        return ok;
      }

      form.addEventListener("input", () => {
        // Light “live” cleanup
        fields.forEach((field) => field.classList.remove("invalid"));
        clearStatus();
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearStatus();

        const ok = validate();
        if (!ok) {
          if (!statusEl.classList.contains("show")) {
            setStatus("Please fix the highlighted fields.");
          }
          return;
        }

        // Offline-friendly “fake submit”
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";

        const payload = {
          name: form.elements.name.value.trim(),
          email: form.elements.email.value.trim(),
          topic: form.elements.topic.value,
          budget: form.elements.budget.value.trim(),
          message: form.elements.message.value.trim(),
          createdAt: new Date().toISOString(),
        };

        // Save locally so you can see it on the plane
        try {
          const key = "contact_submissions";
          const existing = JSON.parse(localStorage.getItem(key) || "[]");
          existing.unshift(payload);
          localStorage.setItem(key, JSON.stringify(existing).slice(0, 50000));
        } catch (_) {}

        setTimeout(() => {
          setStatus("✅ Message saved locally. When you’re back online, wire this form to a real endpoint to actually send it.");
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = "Send message";
        }, 650);
      });

      resetBtn.addEventListener("click", () => {
        form.reset();
        fields.forEach((field) => field.classList.remove("invalid"));
        clearStatus();
      });