dragElement(document.getElementById("maytinh"));

let WIDTH_MY_DIV = 400;
let MARGIN = 10;
let GHIM_TOGGLE = true;
let SHOW_MAYTINH_TOGGLE = true;

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let header = element.id + "header";
    // let header = "maytinhheader";
    if (document.getElementById(header)) {
        document.getElementById(header).onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;

        if (GHIM_TOGGLE == true) {
            document.onmouseup = closeDragElementWithGhim;
        } else {
            document.onmouseup = closeDragElementWithoutGhim;
        }

        document.onmousemove = elementDrag;
        nangcaoPositionHandle();
    }

    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
        nangcaoPositionHandle();
    }

    function closeDragElementWithGhim() {
        let width = window.innerWidth;
        let left = element.offsetLeft + element.offsetWidth / 2;
        // console.log(`Toa do cua element: 
        //             top: ${element.offsetTop}
        //             left: ${element.offsetLeft + WIDTH_MY_DIV / 2}`)

        if (left <= width / 2) {
            element.style.left = "10px";
        } else {
            element.style.left = (width - element.offsetWidth - MARGIN) + "px";
        }
        checkWidthHeight();
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function closeDragElementWithoutGhim() {
        checkWidthHeight();
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function checkWidthHeight() {
        // element.offsetTop: toạ độ phía trên máy tính 
        // element.offsetLeft: toạ độ bên trái của máy tính 
        let top = element.offsetTop;
        let left = element.offsetLeft;

        if (top < MARGIN) {
            element.style.top = "10px";

        } else if (top + element.offsetHeight + MARGIN > window.innerHeight) {
            // toạ độ trên + tổng chiều cao của máy tính + 10 so với chiều cao của browser 
            // thì toạ độ trên của máy tính = (chiều cao của sổ - chiều cao máy tinh - margin)
            element.style.top = (window.innerHeight - element.offsetHeight - MARGIN) + "px";
        }

        if (left < MARGIN) {
            element.style.left = "10px";
        } else if (left + element.offsetWidth + MARGIN > window.innerWidth) {
            // toạ độ trái + tổng chiều dài của máy tính + 10 so với chiều dài của browser 
            // thì toạ độ trái = (chiều dài của sổ - chiều dài máy tính - margin)
            element.style.left = (window.innerWidth - element.offsetWidth - MARGIN) + "px";
        }
        nangcaoPositionHandle();
    }

}

// Chuyển qua lại giữa ghim và không ghim
function ghimToggle() {
    GHIM_TOGGLE = !GHIM_TOGGLE;
    console.log("GHIM: " + GHIM_TOGGLE)
    let ghim = document.getElementById("ghim");
    let tooltiptext_ghim = document.getElementById("tooltiptext-ghim");
    if (GHIM_TOGGLE == false) {
        ghim.classList.remove("ghimChecked");
        tooltiptext_ghim.innerHTML = "Ghim";
    } else {
        ghim.classList.add("ghimChecked");
        tooltiptext_ghim.innerHTML = "Bỏ ghim";
    }
}

// Chuyển qua lại giữa show bảng tính và không bảng tính 
function showMayTinhToggle(ghim, maytinh_content) {
    SHOW_MAYTINH_TOGGLE = !SHOW_MAYTINH_TOGGLE;
    if (SHOW_MAYTINH_TOGGLE == false) {
        // resetNangCao();
        if(SHOW_NANGCAO_TOGGLE == true) {
            hideNangCao_animate();
        }
        resetGhim();
        $("#ghim").css("display", "none", "important");
        $("#maytinh-content").css("display", "none", "important");
    } else {
        if(SHOW_NANGCAO_TOGGLE == true) {
            setTimeout(() => {
                showNangCao_animate();
            }, 500)
        }
        $("#ghim").css("display", "block", "important");
        // $("#maytinh-content").css("display", "block", "important");
        showMayTinhContent_animate();
    }

    $("#maytinh").toggleClass("transform");
    $("#maytinh").toggleClass("animate");

    setTimeout(function () {
        $("#maytinh").toggleClass("transform");
        let mt = document.getElementById("maytinh");
        checkWidthHeight_outsize(mt);
        console.log("MT: " + SHOW_MAYTINH_TOGGLE, "GHIM: " + GHIM_TOGGLE);
    }, 500);
}

function resetGhim() {
    GHIM_TOGGLE = true;

    let ghim = document.getElementById("ghim");
    ghim.classList.add("ghimChecked");

    let tooltiptext_ghim = document.getElementById("tooltiptext-ghim");
    tooltiptext_ghim.innerHTML = "Bỏ ghim";
}

function checkWidthHeight_outsize(element) {
    // element.offsetTop: toạ độ phía trên máy tính 
    // element.offsetLeft: toạ độ bên trái của máy tính 
    let top = element.offsetTop;
    let left = element.offsetLeft;

    let width = window.innerWidth;
    let left_check = element.offsetLeft + element.offsetWidth / 2;
    if (left_check <= width / 2) {
        element.style.left = "10px";
    } else {
        element.style.left = (width - element.offsetWidth - MARGIN) + "px";
    }

    console.log(element.offsetWidth, element.offsetHeight)
    if (top < MARGIN) {
        element.style.top = "10px";
    } else if (top + element.offsetHeight + MARGIN > window.innerHeight) {
        // toạ độ trên + tổng chiều cao của máy tính + 10 so với chiều cao của browser 
        // thì toạ độ trên của máy tính = (chiều cao của sổ - chiều cao máy tinh - margin)
        element.style.top = (window.innerHeight - element.offsetHeight - MARGIN) + "px";
    }

    if (left < MARGIN) {
        element.style.left = "10px";
    } else if (left + element.offsetWidth + MARGIN > window.innerWidth) {
        // toạ độ trái + tổng chiều dài của máy tính + 10 so với chiều dài của browser 
        // thì toạ độ trái = (chiều dài của sổ - chiều dài máy tính - margin)
        element.style.left = (window.innerWidth - element.offsetWidth - MARGIN) + "px";
    }
    nangcaoPositionHandle();
}

/**
 * tất cả nangcao sẽ đi theo maytinh:
 * 1. maytinh bên trái thì nangcao bên phải 
 * 2. maytinh bên phải thì nangcao bên trái 
 * 3. maytinh bên dưới thì nangcao bên trên (với chiều ngang hẹp)
 * 4. maytinh bên trên thì nangcao bên dưới (với chiều ngang hẹp)
 */
function nangcaoPositionHandle() {
    let maytinh = document.getElementById("maytinh");
    let nangcao = document.getElementById("nangcao");

    // Kiểm tra maytinh trái, phải, trên, dưới để đặt nangcao;
    let mt_left = maytinh.offsetLeft;
    let mt_top = maytinh.offsetTop;
    let mt_width = maytinh.offsetWidth;
    let mt_height = maytinh.offsetHeight;
    let mt_where_width = mt_left + mt_width / 2;
    let mt_where_height = mt_top + mt_height / 2;
    let nc_heifht = nangcao.offsetHeight;

    // console.log("mt top: " + mt_top, "mt top: " + mt_left)
    // console.log("mt width: " + mt_width, "mt height: " + mt_height);

    // trường hợp width của browser quá nhỏ
    if (window.innerWidth > 767.98) {
        // trường hợp > 767.98 - medium size 
        nangcao.style.top = mt_top + "px";
        if (mt_where_width <= window.innerWidth / 2) {
            nangcao.style.left = mt_left + mt_width + "px";
            // console.log("left");
        } else {
            nangcao.style.left = mt_left - mt_width + "px";
            // console.log("right")
        }
    } else {
        // trường hợp <= 767.98 - medium size 
        nangcao.style.left = mt_left + "px";
        if (mt_where_height <= window.innerHeight / 2) {
            nangcao.style.top = mt_top + mt_height + "px";
            // console.log("May tinh on top")
        } else {
            nangcao.style.top = mt_top - nc_heifht + "px";
            // console.log("May tinh on bottom")
        }
    }
}

function showMayTinhContent_animate() {
    setTimeout(function() {
        $("#maytinh-content").css("display", "block");
        $("#maytinh-content").toggleClass("fadeIn");
        setTimeout(function() {
            $("#maytinh-content").toggleClass("fadeIn");
        }, 500)
    }, 500)
    
}

function hideMayTinhContent_animate() {
    $("#maytinh-content").toggleClass("fadeOut");
    setTimeout(function() {
        $("#maytinh-content").toggleClass("fadeOut");
        $("#maytinh-content").css("display", "none");
    }, 500)
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if(rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            alert(allText);
        }
    }
    rawFile.send(null);
}

