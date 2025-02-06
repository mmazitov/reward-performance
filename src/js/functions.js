document.addEventListener("DOMContentLoaded", () => {
	initializeSidebarBackgrounds();
	initializeGalleryPreview();
	initializeCustomSelect();
	initializeNavigation();
	initializeSidebar();
});

// Sets background images for sidebar items
const initializeSidebarBackgrounds = () => {
	document.querySelectorAll(".sidebar__item").forEach((item) => {
		const img = item.querySelector(".sidebar__item--bg");
		if (img) {
			item.style.backgroundImage = `url(${img.getAttribute("src")})`;
			item.style.backgroundSize = "cover";
			item.style.backgroundPosition = "center";
			img.remove(); // Remove the original img tag
		}
	});
};

// Handles gallery preview image swapping
const initializeGalleryPreview = () => {
	const previewImage = document.querySelector(".ecard__image img");
	if (!previewImage) return;

	document.querySelectorAll(".ecard__gallery--item").forEach((item) => {
		item.addEventListener("click", () => {
			const img = item.querySelector("img");
			if (!img) return;

			const imgMatch = img.getAttribute("src").match(/card-sm-(\d+)\.jpg/);
			if (imgMatch) {
				previewImage.setAttribute("src", `images/card-lg-${imgMatch[1]}.jpg`);
			}

			// Update active class
			document
				.querySelectorAll(".ecard__gallery--item")
				.forEach((el) => el.classList.remove("active"));
			item.classList.add("active");
		});
	});
};

// Initializes custom select dropdowns
const initializeCustomSelect = () => {
	document.querySelectorAll(".select__custom").forEach((select) => {
		const selectBtn = select.querySelector(".select__custom--btn");
		const options = select.querySelector(".select__custom--options");
		const optionSelected = select.querySelector(".select__custom--selected");

		if (!selectBtn || !options || !optionSelected) return;

		// Toggle dropdown visibility
		selectBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			options.classList.toggle("open");

			// Close other open dropdowns
			document.querySelectorAll(".select__custom--options.open").forEach((otherOptions) => {
				if (otherOptions !== options) otherOptions.classList.remove("open");
			});
		});

		// Handle option selection
		select.querySelectorAll(".select__custom--option").forEach((option) => {
			option.addEventListener("click", () => {
				optionSelected.textContent = option.textContent;
				options.classList.remove("open");
			});
		});
	});

	// Close dropdown when clicking outside
	document.addEventListener("click", () => {
		document
			.querySelectorAll(".select__custom--options.open")
			.forEach((options) => options.classList.remove("open"));
	});
};

// Initializes the navigation (hamburger menu) functionality
const initializeNavigation = () => {
	const hamburgerBtn = document.querySelector(".btn__hamburger");
	const closeBtn = document.querySelector(".btn__close");
	const navigation = document.querySelector(".header__nav");
	const body = document.body;

	if (!hamburgerBtn || !navigation) return;

	const toggleNavigation = (isOpen) => {
		navigation.classList.toggle("open", isOpen);
		body.classList.toggle("no-scroll", isOpen);
	};

	hamburgerBtn.addEventListener("click", () => toggleNavigation(true));
	closeBtn?.addEventListener("click", () => toggleNavigation(false));

	// Remove 'no-scroll' class if screen width exceeds 1024px
	window.addEventListener("resize", () => {
		if (window.innerWidth > 768) {
			body.classList.remove("no-scroll");
			navigation.classList.remove("open");
		}
	});
};

// Initializes the sidebar toggle functionality
const initializeSidebar = () => {
	const userBtn = document.querySelector(".btn__user");
	const closeBtn = document.querySelector(".sidebar .btn__close");
	const sidebar = document.querySelector(".sidebar");
	const body = document.body;

	if (!userBtn || !sidebar) return;

	const toggleSidebar = (isOpen) => {
		sidebar.classList.toggle("open", isOpen);
		body.classList.toggle("no-scroll", isOpen);
	};

	userBtn.addEventListener("click", () => toggleSidebar(true));
	closeBtn?.addEventListener("click", () => toggleSidebar(false));

	// Remove 'no-scroll' class if screen width exceeds 1024px
	window.addEventListener("resize", () => {
		if (window.innerWidth > 768) {
			body.classList.remove("no-scroll");
			sidebar.classList.remove("open");
		}
	});
};
