SHOW_NANGCAO_TOGGLE = false;

function showPhuongTrinhBac2() {
    SHOW_NANGCAO_TOGGLE = !SHOW_NANGCAO_TOGGLE;
    if (SHOW_NANGCAO_TOGGLE == true) {
        showNangCao_animate();
    } else {
        hideNangCao_animate();
    }
    // console.log("SHow nang cao");
    nangcaoPositionHandle();
}

function showPhuongTrinhBac3() {
    console.log("Show PT Bac 3");
}

function showHeBatPhuongTrinh() {
    console.log("Show He Bat PT");
}

function showXemThem() {
    console.log("Show xem them");
}

function showNangCao() {
    SHOW_NANGCAO_TOGGLE = !SHOW_NANGCAO_TOGGLE;
    if (SHOW_NANGCAO_TOGGLE == true) {
        showNangCao_animate();
    } else {
        hideNangCao_animate();
    }
    // console.log("SHow nang cao");
    nangcaoPositionHandle();
}

function showNangCao_animate() {
    $("#nangcao").css("display", "block");
    $("#nangcao").toggleClass("fadeIn");
    setTimeout(function () {
        $("#nangcao").toggleClass("fadeIn");
    }, 200)
}

function hideNangCao_animate() {
    $("#nangcao").toggleClass("bounceOut");
    setTimeout(function () {
        $("#nangcao").toggleClass("bounceOut");
        $("#nangcao").css("display", "none");
    }, 300)
}

function resetNangCao() {
    SHOW_NANGCAO_TOGGLE = false;
    $("#nangcao").css("display", "none");
}

function onChangeDeBai() {
    let a = $("#a").val().trim();
    let b = $("#b").val().trim();
    let c = $("#c").val().trim();
    let errorMessage = $("#error-message");
    let debai = $("#debai");
    let btnXemBaiGiai = $("#btnXemBaiGiai");
    let baigiai = $("#baigiai");

    let _a = parseInt(a);
    let _b = parseInt(b);
    let _c = parseInt(c);
    let kq = "";
    let loai;
    let x = -999999;
    let x1 = -999999;
    let x2 = -999999;
    let delta;
    let _baigiai;

    baigiai.html("");

    if (a != "" && b != "" && c != "") {
        if (checkValidation(a) == true || checkValidation(b) == true || checkValidation(c) == true) {
            debai.css("display", "none");
            btnXemBaiGiai.css("display", "none");
            errorMessage.css("display", "block");
            errorMessage.html("Lỗi: a, b, c phải là số")
        } else {
            debai.css("display", "block");
            btnXemBaiGiai.css("display", "block");
            errorMessage.css("display", "none");

            if (_a == 0) {
                if (_b == 0) {
                    if (_c == 0) {
                        kq = "Phương trình có vô số nghiệm";
                        loai = 1;
                        _baigiai = `<p><b>Bài giải:</b> Với a,b,c = 0 thì &forall;x phương trình f(x) luôn bằng 0.</p>`;
                        
                    } else {
                        kq = "Phương trình vô nghiệm";
                        loai = 1;
                        _baigiai = `<p><b>Bài giải:</b> Với a,b = 0 và c &#35; 0 thì &forall;x phương trình f(x) luôn &#35; 0.</p>`;
                    }
                } else {
                    kq = "Phương trình có một nghiệm";
                    loai = 2;
                    x = -_c / _b;
                    _baigiai = `
                                <p>* Với a = 0 và b,c &#35; 0 thì phương trình trở thành f(x): (${b})x + (${c}) = 0.</p>
                                <p>&rArr; x = -(${c})/(${b}) = ${x}</p>`;
                }
            } else {
                delta = (_b * _b) - (4 * _a * _c);
                if (delta < 0) {
                    kq = "Phương trình vô nghiệm";
                    loai = 1;
                    _baigiai = `
                                <p>* Với a = ${a} &#35; 0;</p>
                                <p>* &#8710; = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${delta}</p>
                                <p>* &#8710; < 0 &rArr; phương trình vô nghiệm</p>`;
                } else if (delta == 0) {
                    kq = "Phương trình có nghiệm kép";
                    loai = 3;
                    x1 = -_b / (2*_a);
                    x2 = -_b / (2*_a);
                    _baigiai = `
                                <p>* Với a = ${a} &#35; 0;</p>
                                <p>* &#8710; = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${delta}</p>
                                <p>* &#8710; = 0 &rArr; phương trình có nghiệm kép</p>
                                <p>x1 = x2 = ${x1}</p>`;
                } else {
                    kq = "Phương trình có hai nghiệm";
                    loai = 4;
                    x1 = (-_b - Math.sqrt(delta))/ (2*_a);
                    x2 = (-_b + Math.sqrt(delta))/ (2*_a);
                    _baigiai = `
                                <p>* Với a = ${a} &#35; 0;</p>
                                <p>* &#8710; = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${delta}</p>
                                <p>* &#8710; > 0 &rArr; Phương trình có 2 nghiệm phân biệt</p>
                                <p>x1 = ${x1}</p>
                                <p>x2 = ${x2}</p>`;
                }
            }

            if(loai == 1) {
                document.getElementById("debai").innerHTML =
                    `<hr>
                <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
                <p><b>Kết quả:</b> ${kq}</p>
                `;
            } else if(loai == 2) {
                document.getElementById("debai").innerHTML =
                    `<hr>
                <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
                <p><b>Kết quả:</b> ${kq}</p>
                <p>x = ${x}</p>
                `;
            } else if(loai == 3) {
                document.getElementById("debai").innerHTML =
                `<hr>
                <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
                <p><b>Kết quả:</b> ${kq}</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x1 = x2 = ${x1}</p>
                `;
            } else {
                document.getElementById("debai").innerHTML =
                    `<hr>
                <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
                <p><b>Kết quả:</b> ${kq}</p>
                <p>x1 = ${x1}</p>
                <p>x2 = ${x2}</p>
                `;
            }
            baigiai.html(_baigiai);
        }
    } else {
        errorMessage.css("display", "block");
        errorMessage.html("Lỗi: a, b, c không được để trống")
        debai.css("display", "none");
        btnXemBaiGiai.css("display", "none");
    }
}

function checkValidation(item) {
    if (isNaN(item) == true) {
        console.log(item)
        return true;
    }
    return false;
}

function xemBaiGiai() {

    let baigiai = $("#baigiai");
    baigiai.toggleClass("displayBlock");
    $("#tam").html("23s");
    // baigiai.html("Bài giải ở đây");
}