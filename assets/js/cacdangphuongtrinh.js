// &#8710; = delta
// &radic; = can bac 
// &#8771; = gan bang
// $#8739; = tri tuyet doi
// math.fraction = in ra dau gach
let ganbang = '&#8771;';
let trituyetdoi = '&#8739;';
math.config({
    number: 'BigNumber',
    precision: 20
})

function onTinhPTBac2() {
    let a = $("#a").val().trim();
    let b = $("#b").val().trim();
    let c = $("#c").val().trim();

    let _a, _b, _c;

    let errorMessagePT2 = $("#error-message-pt2");
    let debai = $("#debai");
    let btnXemBaiGiai = $("#btnXemBaiGiai");
    let baigiai = $("#baigiai");

    let kq = "";
    let loai;
    let x = -999999;
    let x1 = -999999;
    let x2 = -999999;
    let delta;
    let _baigiai;
    baigiai.html("");

    try {
        _a = math.eval(a).toString();
        _b = math.eval(b).toString();
        _c = math.eval(c).toString();
    } catch (error) {
        debai.css("display", "none");
        btnXemBaiGiai.css("display", "none");
        errorMessagePT2.css("display", "block");
        errorMessagePT2.html("Lỗi: a, b, c phải là số")
        return 0;
    }

    if (a != "" && b != "" && c != "") {
        if (_a == 0) {
            debai.css("display", "none");
            btnXemBaiGiai.css("display", "none");
            errorMessagePT2.css("display", "block");
            errorMessagePT2.html("a phải khác 0")
        } else {
            debai.css("display", "block");
            btnXemBaiGiai.css("display", "block");
            errorMessagePT2.css("display", "none");

            delta = (_b * _b) - (4 * _a * _c);
            if (delta < 0) {
                kq = "Phương trình vô nghiệm trên R, nhưng có 2 nghiệm phức là:";
                loai = 1;
                _baigiai = haiNghiemPhuc(a, b, c, delta);;
            } else if (delta == 0) {
                kq = "Phương trình có nghiệm kép";
                loai = 3;
                x1 = -_b / (2 * _a); //kết quả nghiệm 1
                x2 = -_b / (2 * _a); //kết qủa nghiệm 2 
                // bgct với giá trị tử và mẫu không rút gọn với nhau được 
                if (Number.isInteger(_b) == false || Number.isInteger(_a) == false) {
                    _baigiai = nghiemKepKhongRutGon(_a, _b, _c, delta, x1);
                    // bgct có giá trị tử và mẫu có thể rút gọn được 
                } else if (Number.isInteger(_b) == true && Number.isInteger(_a) == true) {
                    let _ucln = ucln(Math.abs(_a * 2), Math.abs(_b));
                    _baigiai = nghiemKepRutGon(_a, _b, _c, delta, _ucln, x1);
                }
            } else { // delta > 0
                kq = "Phương trình có hai nghiệm";
                loai = 4;
                x1 = (-_b + Math.sqrt(delta)) / (2 * _a);
                x2 = (-_b - Math.sqrt(delta)) / (2 * _a);

                let deltaCheck = Math.sqrt(delta);
                // TH1: nếu căn delta là integer 
                if (Number.isInteger(deltaCheck) == true) {
                    let _uclnX1 = ucln(-_b + Math.sqrt(delta), 2 * _a);
                    let _uclnX2 = ucln(-_b - Math.sqrt(delta), 2 * _a);
                    _baigiai = haiNghiemCoDeltaInteger(_a, _b, _c, delta, _uclnX1, _uclnX2, x1, x2);
                    // TH2: Nếu căn delta không là integer 
                } else if (Number.isInteger(deltaCheck) == false) {
                    _baigiai = haiNghiemCoDeltaDouble(a, b, c, delta, x1, x2);
                }
            }

            hienThiLoiGiaiKhongChiTiet(loai, a, b, c, kq, x, x1, x2, delta);

            baigiai.html(_baigiai);
        }
    } else {
        errorMessagePT2.css("display", "block");
        errorMessagePT2.html("Lỗi: a, b, c không được để trống")
        debai.css("display", "none");
        btnXemBaiGiai.css("display", "none");
    }
}

function onTinhPTBac3() {
    let a = $("#a_bac3").val().trim();
    let b = $("#b_bac3").val().trim();
    let c = $("#c_bac3").val().trim();
    let d = $("#d_bac3").val().trim();

    let _a, _b, _c, _d;
    let x1 = -999999;
    let x2 = -999999;
    let x3 = -999999;

    let errorMessagePT3 = $("#error-message-pt3");
    let debaiBac3 = $("#debai-bac3");
    let btnXemBaiGiai = $("#btnXemBaiGiai-bac3");
    let baigiaiBac3 = $("#baigiai-bac3");
    let delta;
    let _baigiai;
    baigiaiBac3.html("");

    try {
        _a = math.eval(a).toString();
        _b = math.eval(b).toString();
        _c = math.eval(c).toString();
        _d = math.eval(d).toString();
        console.log(a, b, c, d);
        console.log(_a, _b, _c, _d)
    } catch (error) {
        debaiBac3.css("display", "none");
        btnXemBaiGiai.css("display", "none");
        errorMessagePT3.css("display", "block");
        errorMessagePT3.html("Lỗi: a, b, c phải là số")
        return 0;
    }
}

function hienThiLoiGiaiKhongChiTiet(loai, a, b, c, kq, x, x1, x2, delta) {
    if (loai == 1) {
        let uclnX1 = ucln(-b, 2 * a);
        let uclnDelta = 1;
        let tachPS = {
            phanConLai: 1,
            phanRutGon: 1
        }
        let amduong = 1;
        if (Number.isInteger(delta)) {
            tachPS = rutGonCanThuc(Math.abs(delta));
            uclnDelta = ucln(tachPS.phanRutGon, 2 * a)
            console.log(uclnDelta)
            console.log(tachPS)
        } else {
            tachPS.phanConLai = Math.abs(delta);
        }

        if (-b < 0 && a < 0) {
            amduong = -1;
        }

        document.getElementById("debai").innerHTML =
            `<hr>
            <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
            <p><b>Kết quả:</b> ${kq}</p>
            <div class="thapphan">
                <p>
                    x<sub>1</sub> = 
                    <span class="co2nghiem mr-10">
                        <span class="tu">${((-b) / uclnX1) * amduong}</span>
                        <span class="mau">${((precisionRound(math.eval(`2*${a}`), 3)) / uclnX1) * amduong}</span>
                    </span> + 
                    <span class="co2nghiem ml-10">
                        <span class="tu"><i class="mr-2">i</i>${(tachPS.phanRutGon / uclnDelta) == 1 ? '' : tachPS.phanRutGon / uclnDelta}${precisionRound(tachPS.phanConLai, 4) == 1 ? '' : '&radic;<span class="canbac">' + precisionRound(tachPS.phanConLai, 4) + '</span>'}</span>
                        <span class="mau">${(precisionRound(math.eval(`2*${a}`), 3)) / uclnDelta}</span>
                    </span>
                </p>
            </div>

            <div class="thapphan" style="padding-bottom:5px">
                <p>
                    x<sub>1</sub> = 
                    <span class="co2nghiem mr-10">
                        <span class="tu">${((-b) / uclnX1) * amduong}</span>
                        <span class="mau">${((precisionRound(math.eval(`2*${a}`), 3)) / uclnX1) * amduong}</span>
                    </span> - 
                    <span class="co2nghiem ml-10">
                        <span class="tu"><i class="mr-2">i</i>${(tachPS.phanRutGon / uclnDelta) == 1 ? '' : tachPS.phanRutGon / uclnDelta}${precisionRound(tachPS.phanConLai, 4) == 1 ? '' : '&radic;<span class="canbac">' + precisionRound(tachPS.phanConLai, 4) + '</span>'}</span>
                        <span class="mau">${(precisionRound(math.eval(`2*${a}`), 3)) / uclnDelta}</span>
                    </span>
                </p>
            </div>
        `;
        // + <i>i</i>&radic;<span class="canbac">${Math.abs(delta)}</span>
    } else if (loai == 2) {
        document.getElementById("debai").innerHTML =
            `<hr>
        <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
        <p><b>Kết quả:</b> ${kq}</p>
        <p>x = ${x}</p>
        `;
    } else if (loai == 3) {
        document.getElementById("debai").innerHTML =
            `<hr>
        <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
        <p><b>Kết quả:</b> ${kq}</p>
        <p class="ketqua">x<sub>1</sub> = x<sub>2</sub> = ${x1}</p>
        `;
    } else {
        if (Number.isInteger(Math.sqrt(delta)) == true) {
            document.getElementById("debai").innerHTML =
                `<hr>
            <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
            <p><b>Kết quả:</b> ${kq}</p>
            <p>x1 = ${x1}</p>
            <p>x2 = ${x2}</p>
            `;
        } else {
            document.getElementById("debai").innerHTML =
                `<hr>
            <p><b>Đề bài:</b> (${a})x<sup>2</sup> + (${b})x + (${c}) = 0</p>
            <p><b>Kết quả:</b> ${kq}</p>
            <p>x1 ${ganbang} ${x1}</p>
            <p>x2 ${ganbang} ${x2}</p>
            `;
        }

    }
}

// Trả về kết quả nghiệm kép 1 - 
function nghiemKepKhongRutGon(a, b, c, delta, x) {
    return `
    <p>* Với a = ${a} &#35; 0;</p>
    <p>* &#8710; = b<sup>2</sup> - 4ac = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${delta}</p>
    <p>* &#8710; = 0 &rArr; phương trình có nghiệm kép</p>
    <div class="thapphan">
        <p>
            x<sub>1</sub> = x<sub>2</sub> = 
            <span class="hainghiemkep"><span class="tu">-b</span><span class="mau">2a</span></span> = 
            <span class="hainghiemkep"><span class="tu">${-b}</span><span class="mau">${2 * a}</span></span> = 
            ${x}
        </p>
    </div>`;
}
// Trả về kết quả của nghiệm kép đã rút gọn
function nghiemKepRutGon(a, b, c, delta, ucln, x) {
    return `
    <p>* Với a = ${a} &#35; 0;</p>
    <p>* &#8710; = b<sup>2</sup> - 4ac = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${delta}</p>
    <p>* &#8710; = 0 &rArr; phương trình có nghiệm kép</p>
    <div class="thapphan">
        <p>
            x<sub>1</sub> = x<sub>2</sub> = 
            <span class="hainghiemkep"><span class="tu">-b</span><span class="mau">2a</span></span> = 
            <span class="hainghiemkep"><span class="tu">${-b}</span><span class="mau">${2 * a}</span></span> = 
            <span class="hainghiemkep"><span class="tu">${(-b) / ucln}</span><span class="mau">${(2 * a) / ucln}</span></span> = 
            ${x}
        </p>
    </div>`
}

// Trả về hai nghiệm có delta là integer
function haiNghiemCoDeltaInteger(a, b, c, delta, uclnX1, uclnX2, x1, x2) {
    return `
    <p>* Với a = ${a} &#35; 0;</p>
    <p>* &#8710; = b<sup>2</sup> - 4ac = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${delta}</p>
    <p>* &#8710; > 0 &rArr; Phương trình có 2 nghiệm phân biệt</p>
    <div class="thapphan">
        <p>
            x<sub>1</sub> = 
            <span class="co2nghiem"><span class="tu">-b + &radic;<span class="canbac">&#8710;</span></span><span class="mau">2a</span></span>
            = <span class="co2nghiem"><span class="tu">${-b} +  &radic;<span class="canbac">${delta}</span></span><span class="mau">${2 * a}</span></span>
        </p>
    </div>
    <div class="thapphan">
        <p class="kq1 nghiem">
            = <span class="co2nghiem">
                <span class="tu">${-b + Math.sqrt(delta)}</span>
                <span class="mau">${2 * a}</span></span> 
            = <span class="co2nghiem">
                <span class="tu">${(-b + Math.sqrt(delta)) / uclnX1}</span>
                <span class="mau">${(2 * a) / uclnX1}</span></span>     
            = ${x1}
        </p>
    </div>
    
    <div class="thapphan">
        <p>
            x<sub>2</sub> = 
            <span class="co2nghiem"><span class="tu">-b - &radic;<span class="canbac">&#8710;</span></span><span class="mau">2a</span></span>
            = <span class="co2nghiem"><span class="tu">${-b} -  &radic;<span class="canbac">${delta}</span></span><span class="mau">${2 * a}</span></span>
        </p>
    </div>
    <div class="thapphan">
        <p class="kq1 nghiem">
            = <span class="co2nghiem">
                <span class="tu">${-b - Math.sqrt(delta)}</span>
                <span class="mau">${2 * a}</span></span> 
            = <span class="co2nghiem">
                <span class="tu">${(-b - Math.sqrt(delta)) / uclnX2}</span>
                <span class="mau">${(2 * a) / uclnX2}</span></span> 
                
            = ${x2}
        </p>
    </div>`;
}
// trả về hai nghiệm có delta là double 
function haiNghiemCoDeltaDouble(a, b, c, delta, x1, x2) {
    return `
    <p>* Với a = ${a} &#35; 0;</p>
    <p>* &#8710; = b<sup>2</sup> - 4ac = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${precisionRound(delta,4)}</p>
    <p>* &#8710; > 0 &rArr; Phương trình có 2 nghiệm phân biệt</p>
    <div class="thapphan">
        <p>
            x<sub>1</sub> = 
            <span class="co2nghiem"><span class="tu">-b + &radic;<span class="canbac">&#8710;</span></span><span class="mau">2a</span></span>
            = <span class="co2nghiem"><span class="tu">${-b} +  &radic;<span class="canbac">${precisionRound(delta,4)}</span></span><span class="mau">${precisionRound(math.eval(`2*${a}`),4)}</span></span>
        </p>
    </div>
    <div class="thapphan">
        <p class="kq1 nghiem">
            ${ganbang} ${x1}
        </p>
    </div>
    
    <div class="thapphan">
        <p>
            x<sub>2</sub> = 
            <span class="co2nghiem"><span class="tu">-b - &radic;<span class="canbac">&#8710;</span></span><span class="mau">2a</span></span>
            = <span class="co2nghiem"><span class="tu">${-b} -  &radic;<span class="canbac">${precisionRound(delta,4)}</span></span><span class="mau">${precisionRound(math.eval(`2*${a}`),4)}</span></span>
        </p>
    </div>
    <div class="thapphan">
        <p class="kq1 nghiem">  
            ${ganbang} ${x2}
        </p>
    </div>`;
}

// Trả về hai nghiệm là số thưc với delta < 0;
function haiNghiemPhuc(a, b, c, delta) {
    let uclnX1 = ucln(-b, 2 * a);
    let uclnDelta = 1;
    let tachPS = {
        phanConLai: 1,
        phanRutGon: 1
    }
    let amduong = 1;
    if (Number.isInteger(delta)) {
        tachPS = rutGonCanThuc(Math.abs(delta));
        uclnDelta = ucln(tachPS.phanRutGon, 2 * a)
        console.log(uclnDelta)
        console.log(tachPS)
    } else {
        tachPS.phanConLai = Math.abs(delta);
    }

    if (-b < 0 && a < 0) {
        amduong = -1;
    }
    return `
    <p>* Với a = ${a} &#35; 0;</p>
    <p>* &#8710; = b<sup>2</sup> - 4ac = (${b})<sup>2</sup> - 4*(${a})*(${c}) = ${precisionRound(delta, 4)}</p>
    <p>* &#8710; < 0 &rArr; Phương trình vô nghiệm trên R, nhưng có 2 nghiệm phức là:</p>
    <div class="thapphan">
        <p>
            x<sub>1</sub> = 
            <span class="co2nghiem"><span class="tu">-b + <i>i</i>&radic;<span class="canbac">${trituyetdoi}&#8710; ${trituyetdoi}</span></span><span class="mau">2a</span></span>
            = <span class="co2nghiem"><span class="tu">${-b} +  <i>i</i>&radic;<span class="canbac">${precisionRound(Math.abs(delta),4)}</span></span><span class="mau">${math.eval(`2*${a}`)}</span></span>
        </p>
    </div>
    <div class="thapphan">
        <p class="kq1 nghiem">=
            <span class="co2nghiem mr-10">
                <span class="tu">${((-b) / uclnX1) * amduong}</span>
                <span class="mau">${((precisionRound(math.eval(`2*${a}`), 3)) / uclnX1) * amduong}</span>
            </span> + 
            <span class="co2nghiem ml-10">
                <span class="tu"><i class="mr-2">i</i>${(tachPS.phanRutGon / uclnDelta) == 1 ? '' : tachPS.phanRutGon / uclnDelta}${precisionRound(tachPS.phanConLai, 4) == 1 ? '' : '&radic;<span class="canbac">' + precisionRound(tachPS.phanConLai, 4) + '</span>'}</span>
                <span class="mau">${(precisionRound(math.eval(`2*${a}`), 3)) / uclnDelta}</span>
            </span>
        </p>
    </div>
    
    <div class="thapphan">
        <p>
            x<sub>2</sub> = 
            <span class="co2nghiem"><span class="tu">-b + <i>i</i>&radic;<span class="canbac">${trituyetdoi}&#8710; ${trituyetdoi}</span></span><span class="mau">2a</span></span>
            = <span class="co2nghiem"><span class="tu">${-b} -  <i>i</i>&radic;<span class="canbac">${precisionRound(Math.abs(delta),4)}</span></span><span class="mau">${math.eval(`2*${a}`)}</span></span>
        </p>
    </div>
    <div class="thapphan">
        <p class="kq1 nghiem">=
            <span class="co2nghiem mr-10">
                <span class="tu">${((-b) / uclnX1) * amduong}</span>
                <span class="mau">${((precisionRound(math.eval(`2*${a}`), 3)) / uclnX1) * amduong}</span>
            </span> - 
            <span class="co2nghiem ml-10">
                <span class="tu"><i class="mr-2">i</i>${(tachPS.phanRutGon / uclnDelta) == 1 ? '' : tachPS.phanRutGon / uclnDelta}${precisionRound(tachPS.phanConLai, 4) == 1 ? '' : '&radic;<span class="canbac">' + precisionRound(tachPS.phanConLai, 4) + '</span>'}</span>
                <span class="mau">${(precisionRound(math.eval(`2*${a}`), 3)) / uclnDelta}</span>
            </span>
        </p>
    </div>`;
}

function rutGonCanThuc(n) {
    let factor = [];
    let power = [];
    let rs = {
        phanRutGon: 1,
        phanConLai: 1
    }
    for (let i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            factor.push(i);
            let p;
            for (p = 0; n % i == 0; p++) {
                n /= i;
            }
            power.push(p);
        }
    }
    if (n > 1) {
        factor.push(n);
        power.push(1);
    }

    for (let i = 0; i < factor.length; i++) {
        if (parseInt(power[i] / 2) > 0) {
            rs.phanRutGon *= factor[i] * parseInt(power[i] / 2);
        }
        if (power[i] % 2 != 0) {
            rs.phanConLai *= factor[i] * (power[i] % 2);
        }
    }
    return rs;
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}