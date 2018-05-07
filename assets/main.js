/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */
"use strict";

var redipsInit,
	setTable,
	shiftMode,
	overflow,
	shiftAnimation,
	shiftAfter,
	toggleConfirm,
	counter = 0;


// redips initialization
redipsInit = function () {
	// reference to the REDIPS.drag library
	var rd = REDIPS.drag;
	// initialization
	rd.init();
	// set mode option to "shift"
	rd.dropMode = 'switch';
	// set animation loop pause
	rd.animation.pause = 20;
	// enable shift.animation
	rd.shift.animation = true;

	rd.event.switched = function() {
		console.log("set location item");
		setNangCaoLocalStorage();
	}
	
	rd.event.moved = function(event) {
		// $(`#${tam.id}`).preventDefault;
		console.log("moved")
	}

	rd.event.notMoved = function(event) {
		console.log("not moved");

	}

	rd.event.dblClicked = function() {
		showXemThem();
	}

	let tam;
	rd.event.clicked = function(row) {
		tam = row;
	}
};

$(document).ready(() => {
	// add onload event listener
	if (window.addEventListener) {
		checkInit();
		window.addEventListener('load', redipsInit, false);
	}
	else if (window.attachEvent) {
		checkInit();
		window.attachEvent('onload', redipsInit);
	}
});


let maytinh = `
	<table id="table1">
		<colgroup>
			<col width="100"/>
			<col width="100"/>
			<col width="100"/>
		</colgroup>
		<tbody>
			<tr>
				<td id="ptb2"><div class="redips-drag" onclick="showPhuongTrinhBac2()">Phương trình B2</div></td>
				<td id="ptb3"><div class="redips-drag">Phương trình B3</div></td>
				<td id="hbpt"><div class="redips-drag">Hệ bất PT</div></td>
			</tr>
			<tr>
				<td id="lgcb"><div class="redips-drag">Lượng giác CB</div></td>
				<td id="tp"><div class="redips-drag">Tích phân</div></td>
				<td id="lgnc"><div class="redips-drag">Lượng giác NC</div></td>
			</tr>
		</tbody>
	</table>

	<table id="mini">
		<colgroup>
			<col width="100"/>
			<col width="100"/>
			<col width="100"/>
		</colgroup>
		<tbody>
			<tr>
				<td><div class="redips-drag" id="ct1">Công thức 1</div></td>
				<td><div class="redips-drag" id="ct2">Công thức 2</div></td>
				<td><div class="redips-drag" id="ct3">Công thức 3</div></td>
			</tr>
			<tr>
				<td><div class="redips-drag" id="ct4">Công thức 4</div></td>
				<td><div class="redips-drag" id="ct5">Công thức 5</div></td>
				<td><div class="redips-drag" id="ct6">Công thức 6</div></td>
			</tr>
		</tbody>
	</table>
`;

function checkInit() {
	if(window.localStorage.getItem("nangcao") == null) {
		console.log("not")
		$("#redips-drag").html(maytinh);
		$("#btnShowXemThem").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
		redipsInit();
	} else {
		$("#redips-drag").html(window.localStorage.getItem("nangcao"));
		$("#btnShowXemThem").html(window.localStorage.getItem("btnShowXemThem"));
		redipsInit();
	}
}

function setNangCaoLocalStorage() {
	window.localStorage.setItem("nangcao", $("#redips-drag").html());
}

function setBtnShowXemThemLocalStorage() {
	window.localStorage.setItem("btnShowXemThem", $("#btnShowXemThem").html());
}