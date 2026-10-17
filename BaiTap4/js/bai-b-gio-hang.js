/* BÀI B — VIẾT CODE: Giỏ hàng của xưởng in
   Hoàn thiện class GioHang và hàm napGioHang.
   Không đổi tên class, tên phương thức, tên hàm; không sửa phần "DỮ LIỆU ĐÃ CHO". */

// ---------- DỮ LIỆU ĐÃ CHO (không sửa) ----------
const DANH_MUC = [
	{ id: "TC01", ten: "Thiệp cưới cotton", loai: "thiep cuoi", gia: 1500 },
	{ id: "TC02", ten: "Thiệp cưới kraft", loai: "thiep cuoi", gia: 900 },
	{ id: "DT01", ten: "Danh thiếp ép kim", loai: "danh thiep", gia: 1200 },
	{ id: "PB01", ten: "Phong bì lót lụa", loai: "phu kien", gia: 500 }
];

// ---------- PHẦN BẠN VIẾT ----------
class GioHang {
	constructor() {
		// Mỗi dòng của giỏ là một object { id, ten, loai, gia, soLuong }.
		this.dsDong = [];
	}

	// 1. Thêm sản phẩm; trả về true nếu thêm được, false nếu soLuong không hợp lệ.
	them(sanPham, soLuong) {
		// TODO
		if(typeof(soLuong) != "number" || soLuong <= 0 || !Number.isInteger(soLuong)) return false;
		const daTonTai = this.dsDong.find(item => item.id === sanPham.id);
		if(daTonTai){
			daTonTai.soLuong += soLuong;
		}
		else{
			this.dsDong.push({
				...sanPham,
				soLuong: soLuong
			})
		}
		return true;
	}

	// 2. Xoá dòng có id tương ứng; trả về true nếu có xoá, false nếu không tìm thấy.
	xoa(id) {
		// TODO
		const dongBiXoa = this.dsDong.find(item => item.id === id);
		if(!dongBiXoa) return false;
		else{
			this.dsDong = this.dsDong.filter(item => item.id != id);
			return true;
		}
	}

	// 3. Tổng tiền cả giỏ.
	tongTien() {
		// TODO
		const result = this.dsDong.reduce((total, item) => total + item.gia * item.soLuong, 0);
		return result;
	}

	// 4. Object thống kê: { "<loai>": tổng tiền của loại đó, ... }.
	thongKeTheoLoai() {
		// TODO
		const result = {};
		this.dsDong.forEach(item => {
			const total = item.gia * item.soLuong;
			result[item.loai] = (result[item.loai] || 0) + total;
		})
		return result;
	}

	// 5. Dòng có thành tiền lớn nhất (bản sao, có thêm thanhTien); null nếu giỏ rỗng.
	dongDatNhat() {
		// TODO
		if(this.dsDong.length === 0) return null;
		const maxDong = this.dsDong.reduce((max, item) => (max.soLuong * max.gia >= item.soLuong * item.gia) ? max : item)
		return {
			...maxDong,
			thanhTien: maxDong.gia * maxDong.soLuong
		};
	}

	// 6. Mảng BẢN SAO các dòng, mỗi dòng có thêm thuộc tính thanhTien.
	layDanhSach() {
		// TODO
		let dsMoi = [];
		this.dsDong.forEach(item => {
			dsMoi.push({
				...item,
				thanhTien: item.gia * item.soLuong
			})
		})
		return dsMoi;
	}

	// 7. Chuỗi JSON của mảng các dòng.
	xuatJSON() {
		// TODO
		return JSON.stringify(this.dsDong);
	}
}

// 8. Tạo lại một GioHang từ chuỗi JSON do xuatJSON() sinh ra.
function napGioHang(chuoiJSON) {
	// TODO
	const ds = JSON.parse(chuoiJSON);
	let gioHang = new GioHang();
	gioHang.dsDong = ds;
	return gioHang;
}

// ---------- CHẠY THỬ (không sửa) ----------
const gio = new GioHang();
gio.them(DANH_MUC[0], 100);
gio.them(DANH_MUC[3], 200);
gio.them(DANH_MUC[0], 50);
veGioHang(gio.layDanhSach(), gio.tongTien());
console.table(gio.layDanhSach());
hienThi(`JSON gửi lên máy chủ: ${gio.xuatJSON()}`);
