SHOW_NANGCAO_TOGGLE = false;
SHOW_XEMTHEM_TOGGLE = "down";
faChevronDown = '<i class="fa fa-chevron-down" aria-hidden="true"></i>';
faChevronUp = '<i class="fa fa-chevron-up" aria-hidden="true"></i>';
var timer;

function init() {
    if(window.localStorage.getItem("btnShowXemThem") == faChevronDown) {
        SHOW_XEMTHEM_TOGGLE = "down";
    } else if(window.localStorage.getItem("btnShowXemThem") == faChevronUp){
        SHOW_XEMTHEM_TOGGLE = "up";
    }
};
init();

function showPhuongTrinhBac2() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { 
        SHOW_NANGCAO_TOGGLE = !SHOW_NANGCAO_TOGGLE;
        if (SHOW_NANGCAO_TOGGLE == true) {
            showNangCao_animate();
        } else {
            hideNangCao_animate();
        }
        // console.log("SHow nang cao");
        nangcaoPositionHandle();
     }, 200);
    
}

function showPhuongTrinhBac3() {
    console.log("Show PT Bac 3");
}

function showHeBatPhuongTrinh() {
    console.log("Show He Bat PT");
}

function showXemThem() {
    console.log("Show xem them");
    clearTimeout(timer);

    if(SHOW_XEMTHEM_TOGGLE == "down") {
        SHOW_XEMTHEM_TOGGLE = "up";
        $("#btnShowXemThem").html(faChevronUp);
        window.localStorage.setItem("btnShowXemThem", $("#btnShowXemThem").html());
    } else {
        SHOW_XEMTHEM_TOGGLE = "down";
        $("#btnShowXemThem").html(faChevronDown);
        window.localStorage.setItem("btnShowXemThem", $("#btnShowXemThem").html());
    }

    $("#mini").toggleClass("displayBlock");
    window.localStorage.setItem("nangcao", $("#redips-drag").html());
}

// Hàm thêm setTimeout() để xử lý giữa mở NÂNG CAO hay XEM THÊM
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

function checkValidation(item) {
    if (isNaN(item) == true) {
        console.log(item)
        return true;
    }
    return false;
}

function xemBaiGiaiPTB2() {
    let baigiai = $("#baigiai");
    baigiai.toggleClass("displayBlock");
    $("#tam").html("23s");
    // baigiai.html("Bài giải ở đây");
}


function ucln(a, b) {
    if(a < 0 || b < 0) {
        a = Math.abs(a);
        b = Math.abs(b);
    }
    if(Number.isInteger(a) == false || Number.isInteger(b) == false) {
        return 1;
    }
    // if(a == 1 || b == 1) return 1;
    return (b ? ucln(b, a%b) : a);
}