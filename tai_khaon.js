console.log("tai_khoan.js đã được tải!");
document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector("#nutChinhSua");
    const changePasswordButton = document.querySelector("#nutDoiMatKhau");
    const logoutButton = document.querySelector(".dang-xuat");

    // Đọc dữ liệu đã lưu an toàn
    function getProfile() {
        try {
            return JSON.parse(localStorage.getItem("homefitProfile")) || {};
        } catch (error) {
            return {};
        }
    }

    // Cập nhật thông tin lên giao diện
    function renderProfile(profile) {
        const name = profile.fullName || "Minh An";

        document.querySelectorAll(
            ".ten-nguoi-dung, .thong-tin-nguoi-dung h2"
        ).forEach(el => el.textContent = name);

        const initials = name.trim().split(/\s+/)
            .filter(Boolean).slice(-2)
            .map(word => word[0]).join("").toUpperCase();

        document.querySelectorAll(
            ".anh-dai-dien-nho, .anh-dai-dien-lon"
        ).forEach(el => el.textContent = initials);

        const values = [
            name, profile.birthday, profile.gender,
            profile.location, profile.email, profile.phone
        ];

        document.querySelectorAll(
            ".cot-trai .gia-tri-thong-tin"
        ).forEach((el, index) => {
            if (index < values.length) {
                el.textContent = values[index] || "Chưa cập nhật";
            }
        });
    }

    // Chỉnh sửa thông tin cá nhân
    if (editButton) {
        editButton.addEventListener("click", function () {
            let form = document.querySelector("#profile-form");

            // Nếu form đã tồn tại thì ẩn/hiện form
            if (form) {
                form.style.display =
                    form.style.display === "none" ? "grid" : "none";
                return;
            }

            form = document.createElement("form");
            form.id = "profile-form";
            form.style.cssText =
                "padding:20px;margin:20px 0;border:1px solid #ddd;" +
                "border-radius:8px;display:grid;gap:12px;max-width:600px";

            const saved = getProfile();

            const fields = [
                ["fullName", "Họ và tên", "text"],
                ["birthday", "Ngày sinh", "date"],
                ["gender", "Giới tính", "text"],
                ["location", "Khu vực sinh sống", "text"],
                ["email", "Email", "email"],
                ["phone", "Số điện thoại", "tel"]
            ];

            fields.forEach(([name, title, type]) => {
                const label = document.createElement("label");
                label.textContent = title;

                const input = document.createElement("input");
                input.name = name;
                input.type = type;
                input.value = saved[name] || "";
                input.style.cssText =
                    "display:block;width:100%;box-sizing:border-box;" +
                    "padding:9px;margin-top:5px";

                if (name === "fullName") input.required = true;

                label.appendChild(input);
                form.appendChild(label);
            });

            const saveButton = document.createElement("button");
            saveButton.type = "submit";
            saveButton.textContent = "Lưu thông tin";
            saveButton.style.cssText = "padding:10px;cursor:pointer";
            form.appendChild(saveButton);

            const anchor = document.querySelector(".khu-vuc-thong-tin");
            const main = document.querySelector("main");

            if (anchor) {
                anchor.parentNode.insertBefore(form, anchor);
            } else if (main) {
                main.appendChild(form);
            } else {
                return;
            }

            // Kiểm tra và lưu thông tin
            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const data = Object.fromEntries(new FormData(form));

                data.fullName = (data.fullName || "").trim();
                data.email = (data.email || "").trim();
                data.phone = (data.phone || "").trim();

                if (!data.fullName) {
                    alert("Vui lòng nhập họ và tên.");
                    return;
                }

                if (data.email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                    alert("Email không hợp lệ.");
                    return;
                }

                if (data.phone &&
                    !/^[0-9+\s()-]{9,15}$/.test(data.phone)) {
                    alert("Số điện thoại không hợp lệ.");
                    return;
                }

                try {
                    localStorage.setItem(
                        "homefitProfile", JSON.stringify(data)
                    );

                    renderProfile(data);
                    form.style.display = "none";
                    alert("Lưu thông tin thành công!");
                } catch (error) {
                    alert("Không thể lưu dữ liệu trên trình duyệt.");
                }
            });
        });
    }

    // Đổi mật khẩu: hiện chưa kết nối hệ thống xác thực
    if (changePasswordButton) {
        changePasswordButton.addEventListener("click", function () {
            alert("Chức năng đổi mật khẩu cần kết nối hệ thống xác thực.");
        });
    }

    // Đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
                window.location.href = "login.html";
            }
        });
    }

    // Khôi phục thông tin khi mở trang
    renderProfile(getProfile());
});
