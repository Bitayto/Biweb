/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
const boDem = document.querySelector("#bo-dem");
const list = document.querySelector("#list");
const oTimKiem = document.querySelector("#o-tim-kiem");
const khongThay = document.querySelector("#khong-thay");

function capNhatBoDem() {
	const tatCa = list.querySelectorAll("li");
	const tongSo = tatCa.length;
	let soHien = 0;
	tatCa.forEach(tin => {
		if (!tin.classList.contains("an")) {
			soHien++;
		}
	});
	boDem.textContent = `Đang hiển thị ${soHien}/${tongSo} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaLower = tuKhoa.toLowerCase();
	const dsTin = list.querySelectorAll("li");
	let demKhop = 0;

	dsTin.forEach(tin => {
		const h3 = tin.querySelector("h3");
		const p = tin.querySelector("p");
		const tieuDe = h3 ? h3.textContent.toLowerCase() : "";
		const noiDung = p ? p.textContent.toLowerCase() : "";

		if (tuKhoaLower === "" || tieuDe.includes(tuKhoaLower) || noiDung.includes(tuKhoaLower)) {
			tin.classList.remove("an");
			demKhop++;
		} else {
			tin.classList.add("an");
		}
	});

	if (demKhop === 0 && dsTin.length > 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
	} else {
		khongThay.classList.add("an");
	}

	capNhatBoDem();
}

oTimKiem.addEventListener("keyup", locTin);
locTin();

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
list.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON" && e.target.classList.contains("more")) {
		const nut = e.target;
		const tin = nut.parentNode;
		const doanVan = tin.querySelector("p");

		if (doanVan.classList.contains("day-du")) {
			doanVan.classList.remove("day-du");
			nut.textContent = "Read more >>";
		} else {
			doanVan.classList.add("day-du");
			nut.textContent = "Thu gọn <<";
		}
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
const nutDang = document.querySelector("#nut-dang");
const tinTieuDeInput = document.querySelector("#tin-tieu-de");
const tinNoiDungInput = document.querySelector("#tin-noi-dung");
const baoLoi = document.querySelector("#bao-loi");

nutDang.addEventListener("click", (e) => {
	if (e) e.preventDefault();

	const tieuDe = tinTieuDeInput.value;
	const noiDung = tinNoiDungInput.value;

	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const liMoi = document.createElement("li");

	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = typeof homNay === "function" ? homNay() : "";

	const h3 = document.createElement("h3");
	h3.textContent = tieuDe;

	const p = document.createElement("p");
	p.textContent = noiDung;

	const btnMore = document.createElement("button");
	btnMore.type = "button";
	btnMore.className = "more";
	btnMore.textContent = "Read more >>";

	liMoi.append(spanTime, h3, p, btnMore);
	list.prepend(liMoi);

	tinTieuDeInput.value = "";
	tinNoiDungInput.value = "";
	baoLoi.textContent = "";

	locTin();
});