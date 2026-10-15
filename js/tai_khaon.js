
document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử trên giao diện
    const editButton = document.querySelector(".edit-profile-btn");
    const changePasswordButton = document.querySelector(".change-password-btn");
    const logoutButton = document.querySelector(".logout-btn");
    const profileForm = document.querySelector("#profile-form");

    // 1. Chức năng chỉnh sửa thông tin cá nhân
    if (editButton) {
        editButton.addEventListener("click", function () {
            const profileSection = document.querySelector("#profile-form");

            if (profileSection) {
                profileSection.classList.toggle("hidden");

                editButton.textContent =
                    profileSection.classList.contains("hidden")
                        ? "Chỉnh sửa thông tin"
                        : "Đóng chỉnh sửa";

                if (!profileSection.classList.contains("hidden")) {
                    profileSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            } else {
                alert("Bạn cần thêm form chỉnh sửa vào HTML.");
            }
        });
    }

    // 2. Lưu thông tin cá nhân
    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fullName = document.querySelector("#fullName")?.value.trim();
            const birthday = document.querySelector("#birthday")?.value;
            const gender = document.querySelector("#gender")?.value;
            const location = document.querySelector("#location")?.value.trim();
            const email = document.querySelector("#email")?.value.trim();
            const phone = document.querySelector("#phone")?.value.trim();

            if (!fullName) {
                alert("Vui lòng nhập họ và tên.");
                return;
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Email không hợp lệ.");
                return;
            }

            if (phone && !/^[0-9+\s()-]{9,15}$/.test(phone)) {
                alert("Số điện thoại không hợp lệ.");
                return;
            }

            // Cập nhật tên hiển thị trên giao diện
            document.querySelectorAll(".profile-name").forEach(function (element) {
                element.textContent = fullName;
            });

            // Cập nhật chữ viết tắt trên ảnh đại diện
            const initials = fullName
                .split(/\s+/)
                .map(word => word[0])
                .slice(-2)
                .join("")
                .toUpperCase();

            document.querySelectorAll(".profile-avatar").forEach(function (element) {
                element.textContent = initials;
            });

            // Lưu dữ liệu trên trình duyệt
            const profileData = {
                fullName,
                birthday,
                gender,
                location,
                email,
                phone
            };

            localStorage.setItem("homefitProfile", JSON.stringify(profileData));

            alert("Thông tin cá nhân đã được lưu trên trình duyệt.");
        });
    }

    // 3. Đổi mật khẩu
    if (changePasswordButton) {
        changePasswordButton.addEventListener("click", function () {
            alert("Chức năng đổi mật khẩu cần được kết nối với hệ thống xác thực.");
        });
    }

    // 4. Đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            const confirmed = confirm("Bạn có chắc chắn muốn đăng xuất không?");

            if (confirmed) {
                // Chuyển đến trang đăng nhập nếu dự án có trang này
                window.location.href = "login.html";
            }
        });
    }

    // 5. Khôi phục thông tin đã lưu khi mở lại trang
    const savedProfile = localStorage.getItem("homefitProfile");

    if (savedProfile) {
        try {
            const profile = JSON.parse(savedProfile);

            document.querySelectorAll(".profile-name").forEach(function (element) {
                element.textContent = profile.fullName || "Minh An";
            });

            const initials = (profile.fullName || "Minh An")
                .split(/\s+/)
                .map(word => word[0])
                .slice(-2)
                .join("")
                .toUpperCase();

            document.querySelectorAll(".profile-avatar").forEach(function (element) {
                element.textContent = initials;
            });

            // Điền lại dữ liệu vào form nếu các trường tồn tại
            if (profileForm) {
                Object.entries(profile).forEach(function ([key, value]) {
                    const input = profileForm.elements.namedItem(key);

                    if (input && value != null) {
                        input.value = value;
                    }
                });
            }
        } catch (error) {
            console.error("Không thể đọc thông tin tài khoản:", error);
        }
    }
});
