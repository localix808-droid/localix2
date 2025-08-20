// Dashboard JavaScript

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcjzl4sdDrJudKZAUMRWfTOY19d5HqzPQ",
  authDomain: "localix-f34d7.firebaseapp.com",
  projectId: "localix-f34d7",
  storageBucket: "localix-f34d7.firebasestorage.app",
  messagingSenderId: "482394523204",
  appId: "1:482394523204:web:02d40423889f37f72d1e11",
  measurementId: "G-Q3S5LB0BEN",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

function fetchAndDisplayProjects() {
  const signInId = localStorage.getItem("SignInId");
  console.log("signInId:", signInId);
  if (!signInId) {
    console.error("No signInId found in localStorage.");
    return;
  }

  const projectsContainer = document.getElementById("projects-list");
  console.log("projectsContainer:", projectsContainer);
  if (!projectsContainer) {
    console.error("No element with id 'projects-list' found in DOM.");
    return;
  }

  projectsContainer.innerHTML = "";

  const userProjectsRef = collection(db, "Users", signInId, "Projects");

  import(
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"
  ).then(({ getDocs }) => {
    getDocs(userProjectsRef)
      .then((querySnapshot) => {
        console.log("Projects fetched:", querySnapshot.size);
        if (querySnapshot.empty) {
          projectsContainer.innerHTML = "<p>No projects found.</p>";
          return;
        }
        querySnapshot.forEach((doc) => {
          const project = doc.data();
          const projectCard = document.createElement("div");
          projectCard.className = "project-card";
          projectCard.innerHTML = `
    <div class="project-header">
      <h3>${project.projectName || "Untitled Project"}</h3>
      <a class="business-link" href="business-dashboard.html">Open Business Dashboard</a>
    </div>
    <p>${project.description || ""}</p>
    <div class="project-stats">
      <div class="stat">
        <span class="stat-label">Type</span>
        <span class="stat-value">${project.businessType || "N/A"}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Owner</span>
        <span class="stat-value">${project.ownerName || "N/A"}</span>
      </div>
    </div>
    <div class="project-actions">
      <a href="business-dashboard.html" class="btn btn-primary btn-sm">Manage</a>
      <button class="btn btn-secondary btn-sm" onclick="editProject('${
        doc.id
      }')">Edit</button>
      <button class="btn btn-outline btn-sm" onclick="previewProject('${
        doc.id
      }')">Preview</button>
    </div>
  `;
          projectsContainer.appendChild(projectCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        projectsContainer.innerHTML = "<p>Error loading projects.</p>";
      });
  });
}

function idCheck(auth) {
  const signInId = localStorage.getItem("SignInId");
  if (signInId) {
    const docRef = doc(db, "Users", signInId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("username").textContent = userData.name;
          document.getElementById("plan").textContent = userData.plan + " User";
          document.getElementById("projectNumber").textContent =
            localStorage.getItem("projectNumber");
        } else {
          alert("No document found matching the ID");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
      });
  } else {
    alert("No user signed in. Redirecting to login page.");
    window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing dashboard...");
  // Initialize dashboard
  idCheck();
  initDashboard();
  fetchAndDisplayProjects();
});
// TODO: Add the addProject function

function initDashboard() {
  // Navigation functionality
  initNavigation();

  // Theme customization
  initThemeCustomization();

  // Form handling
  initForms();

  // Notifications
  initNotifications();
}

// Global function to switch to a specific section
function switchToSection(targetId) {
  console.log("Switching to section:", targetId);

  const sections = document.querySelectorAll(".dashboard-section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Remove active class from all sections
  sections.forEach((s) => {
    s.classList.remove("active");
    s.style.display = "none";
    console.log("Hiding section:", s.id);
  });

  // Remove active class from all nav links
  navLinks.forEach((l) => l.parentElement.classList.remove("active"));

  // Show target section
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.classList.add("active");
    targetSection.style.display = "block";
    console.log("Section activated:", targetId);

    // Force the display and opacity
    setTimeout(() => {
      targetSection.style.opacity = "1";
      targetSection.style.transform = "translateY(0)";
    }, 10);
  } else {
    console.error("Section not found:", targetId);
  }

  // Update sidebar navigation
  const navLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
  if (navLink) {
    navLink.parentElement.classList.add("active");
  }

  // Update navigation status
  const statusElement = document.getElementById("nav-status");
  const currentSectionSpan = document.getElementById("current-section");
  if (statusElement && currentSectionSpan) {
    currentSectionSpan.textContent =
      targetId.charAt(0).toUpperCase() + targetId.slice(1);
    statusElement.style.background = "#e8f5e8";
    statusElement.style.borderColor = "#4caf50";
    statusElement.style.color = "#2e7d32";
  }
}

// Navigation
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".dashboard-section");
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");

  console.log("Navigation initialized:", navLinks.length, "nav links found");
  console.log("Sections found:", sections.length);
  sections.forEach((s) =>
    console.log(
      "Section:",
      s.id,
      "display:",
      s.style.display,
      "classes:",
      s.className
    )
  );

  // Sidebar navigation click handlers
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      console.log("Sidebar nav clicked:", targetId);
      switchToSection(targetId);
    });
  });

  // Mobile sidebar toggle
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 1024) {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove("active");
      }
    }
  });
}

// Theme Customization
function initThemeCustomization() {
  const themeCards = document.querySelectorAll(".theme-card");
  const colorInputs = document.querySelectorAll('input[type="color"]');
  const fontSelects = document.querySelectorAll("select");

  // Theme selection
  themeCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Remove active class from all cards
      themeCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked card
      this.classList.add("active");

      // Update button text
      const button = this.querySelector("button");
      if (button) {
        button.textContent = "Active";
        button.className = "btn btn-primary";
      }

      // Apply theme
      applyTheme(this);
    });
  });

  // Color customization
  colorInputs.forEach((input) => {
    input.addEventListener("change", function () {
      updateColorScheme(this);
    });
  });

  // Font selection
  fontSelects.forEach((select) => {
    select.addEventListener("change", function () {
      if (
        this.previousElementSibling &&
        this.previousElementSibling.textContent.includes("Font Family")
      ) {
        updateFontFamily(this.value);
      } else if (
        this.previousElementSibling &&
        this.previousElementSibling.textContent.includes("Font Size")
      ) {
        updateFontSize(this.value);
      }
    });
  });
}

function applyTheme(themeCard) {
  const themeName = themeCard.querySelector("h4").textContent;

  // Apply theme-specific styles
  switch (themeName) {
    case "Dark Theme":
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme", "custom-theme");
      break;
    case "Light Theme":
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme", "custom-theme");
      break;
    case "Custom Theme":
      document.body.classList.add("custom-theme");
      document.body.classList.remove("dark-theme", "light-theme");
      break;
  }

  // Save theme preference
  localStorage.setItem("selectedTheme", themeName);
}

function updateColorScheme(colorInput) {
  const color = colorInput.value;
  const label = colorInput.previousElementSibling.textContent;

  // Update CSS custom properties
  switch (label) {
    case "Primary Color":
      document.documentElement.style.setProperty("--primary-color", color);
      break;
    case "Secondary Color":
      document.documentElement.style.setProperty("--secondary-color", color);
      break;
    case "Accent Color":
      document.documentElement.style.setProperty("--accent-color", color);
      break;
  }

  // Save color preferences
  saveColorPreferences();
}

function updateFontFamily(fontFamily) {
  document.body.style.fontFamily = fontFamily;
  localStorage.setItem("selectedFont", fontFamily);
}

function updateFontSize(fontSize) {
  document.body.style.fontSize = fontSize;
  localStorage.setItem("selectedFontSize", fontSize);
}

function saveColorPreferences() {
  const colors = {
    primary: getComputedStyle(document.documentElement).getPropertyValue(
      "--primary-color"
    ),
    secondary: getComputedStyle(document.documentElement).getPropertyValue(
      "--secondary-color"
    ),
    accent: getComputedStyle(document.documentElement).getPropertyValue(
      "--accent-color"
    ),
  };
  localStorage.setItem("colorPreferences", JSON.stringify(colors));
}

// Form handling
function initForms() {
  const profileForm = document.querySelector(".profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveProfile(this);
    });
  }
}

function saveProfile(form) {
  const formData = new FormData(form);
  const profileData = {};

  // Collect form data
  form.querySelectorAll("input, textarea").forEach((input) => {
    profileData[input.name || input.id] = input.value;
  });

  // Save to localStorage
  localStorage.setItem("userProfile", JSON.stringify(profileData));

  // Show success message
  showNotification("Profile updated successfully!", "success");
}

// Notifications
function initNotifications() {
  // Initialize notification functionality
  updateNotificationBadge();
}

function toggleNotifications() {
  const dropdown = document.getElementById("notificationsDropdown");
  if (dropdown) {
    dropdown.classList.toggle("active");
  }
}

function markAsRead(button) {
  const notificationItem = button.closest(".notification-item");
  if (notificationItem) {
    notificationItem.classList.remove("unread");
    updateNotificationBadge();
  }
}

function markAllAsRead() {
  const unreadNotifications = document.querySelectorAll(
    ".notification-item.unread"
  );
  unreadNotifications.forEach((notification) => {
    notification.classList.remove("unread");
  });
  updateNotificationBadge();
}

function clearAllNotifications() {
  const notifications = document.querySelectorAll(".notification-item");
  if (confirm("Are you sure you want to clear all notifications?")) {
    notifications.forEach((notification) => {
      notification.style.animation = "slideOut 0.3s ease forwards";
    });

    setTimeout(() => {
      notifications.forEach((notification) => notification.remove());
      updateNotificationBadge();
    }, 300);
  }
}

function updateNotificationBadge() {
  const unreadCount = document.querySelectorAll(
    ".notification-item.unread"
  ).length;
  const badge = document.querySelector(".notification-badge");

  if (badge) {
    if (unreadCount === 0) {
      badge.style.display = "none";
    } else {
      badge.style.display = "inline";
      badge.textContent = unreadCount;
    }
  }
}

function showAllNotifications() {
  // This function can be expanded to show all notifications in a modal or new page
  console.log("Show all notifications clicked");
}

// Utility function to show notifications
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification-toast ${type}`;
  notification.textContent = message;

  // Add to page
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Debug function - can be called from console
function debugNavigation() {
  console.log("=== Navigation Debug ===");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".dashboard-section");

  console.log("Nav links found:", navLinks.length);
  navLinks.forEach((link, index) => {
    console.log(
      `Link ${index}:`,
      link.getAttribute("href"),
      link.textContent.trim()
    );
  });

  console.log("Sections found:", sections.length);
  sections.forEach((section, index) => {
    console.log(
      `Section ${index}:`,
      section.id,
      section.className,
      section.style.display
    );
  });
}

// Test navigation function
function testNavigation() {
  console.log("=== Testing Navigation ===");

  // Test switching to different sections
  const testSections = ["overview", "appearance", "profile"];

  testSections.forEach((sectionId, index) => {
    setTimeout(() => {
      console.log(`Testing section: ${sectionId}`);
      switchToSection(sectionId);
    }, index * 1000);
  });
}

function editProject(projectId) {
  window.location.href = "business-dashboard.html";
  // You can redirect to an edit page or open a modal here
}

function previewProject(projectId) {
  window.location.href = "business-dashboard.html";
  // You can show a preview modal or redirect to a preview page here
}
