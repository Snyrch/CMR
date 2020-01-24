var requestURL = "https://sj3fg.csb.app/conf.json";
var request = new XMLHttpRequest();
var vybrane = [];
var zabrane = [];

request.open("GET", requestURL);
request.responseType = "json";
request.send();
request.onload = function() {
  const nastaveni = request.response; // get the string from the response
  //const superHeroes = JSON.parse(superHeroesText); // convert it to an object

  vybrane = nastaveni["vybrane"];
  zabrane = nastaveni["zabrane"];

  //console.log(vybrane);
  //console.log(zabrane);
  cmrOnLoad();
};
function zkotrolujDatumjeVybrane(datum) {
  var delka = vybrane.length;
  //console.log(delka);
  for (var i = 0; i < delka; i++) {
    var dateFrom = vybrane[i][0];
    var dateTo = vybrane[i][1];
    var dateCheck = datum;

    var d1 = dateFrom.split("-");
    var d2 = dateTo.split("-");
    var c = dateCheck.split("-");

    var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]); // -1 because months are from 0 to 11
    var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
    var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

    if (check >= from && check <= to) {
      return true;
    }
  }

  return false;
}

function zkotrolujDatumjeZabrane(datum) {
  var delka = zabrane.length;
  //console.log(delka);
  for (var i = 0; i < delka; i++) {
    var dateFrom = zabrane[i][0];
    var dateTo = zabrane[i][1];
    var dateCheck = datum;

    var d1 = dateFrom.split("-");
    var d2 = dateTo.split("-");
    var c = dateCheck.split("-");

    var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]); // -1 because months are from 0 to 11
    var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
    var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

    if (check >= from && check <= to) {
      return true;
    }
  }

  return false;
}
// JSON
var startKol = { zacatek: null, konec: null };
var start = false;

function startEvent() {
  console.log("KLIK - STRAT");
  this.style.background = "#A3ED90";
  if (start) {
    startKol.konec = this;
    zelenyInterval(startKol);
  }
  startKol.zacatek = this;
  start = true;
}

function mesicDopredu() {
  var apk = document.getElementById("cmr_apk");
  var rok = document.getElementById("cmr_rok_id");
  var mesic = document.getElementById("cmr_mesic_id");

  if (mesic.value === "12") {
    mesic.value = 1;
    rokDopredu();
  } else {
    mesic.value++;
  }
  vygenerujCMR(apk, rok.value, mesic.value);
}

function mesicZpet() {
  var apk = document.getElementById("cmr_apk");
  var rok = document.getElementById("cmr_rok_id");
  var mesic = document.getElementById("cmr_mesic_id");

  if (mesic.value === "1") {
    mesic.value = 12;
    rokZpet();
  } else {
    mesic.value--;
  }
  vygenerujCMR(apk, rok.value, mesic.value);
}

function rokDopredu() {
  var apk = document.getElementById("cmr_apk");
  var rok = document.getElementById("cmr_rok_id");
  var mesic = document.getElementById("cmr_mesic_id").value;
  var test_rok = parseInt(rok.value, 10) + 1;
  var porovnat =
    parseInt(Math.floor(rok.options.length / 2), 10) +
    parseInt(rok.options[0].value, 10) +
    1;
  //console.log(test_rok);
  if (test_rok > porovnat) {
    alert("Dál to nejde!");
  } else {
    rok.value++;
  }

  vygenerujCMR(apk, rok.value, mesic);
}

function rokZpet() {
  var apk = document.getElementById("cmr_apk");
  var rok = document.getElementById("cmr_rok_id");
  var mesic = document.getElementById("cmr_mesic_id").value;
  var test_rok = parseInt(rok.value, 10) - 1;
  var porovnat =
    parseInt(rok.options[0].value, 10) -
    parseInt(Math.floor(rok.options.length / 2), 10) +
    1;
  //console.log(porovnat);
  if (test_rok < porovnat) {
    alert("Dál to nejde!");
  } else {
    rok.value--;
  }

  vygenerujCMR(apk, rok.value, mesic);
}

function cmrOnLoad() {
  var apk = document.getElementById("cmr_apk");
  var dnes = new Date();
  var mesic = document.getElementById("cmr_mesic_id");
  mesic.value = dnes.getMonth() + 1;
  //console.log(mesic.value);
  var rok = document.getElementById("cmr_rok_id");
  rok.value = dnes.getFullYear();

  vygenerujCMR(apk, rok.value, mesic.value);

  console.log("CMR je OK");

  mesic.addEventListener("change", cmr_mesicZmena, false);
  rok.addEventListener("change", cmr_rokZmena, false);
  document
    .getElementById("cmr_sipka_zpet")
    .addEventListener("click", rokZpet, false);
  document
    .getElementById("cmr_sipka_dopredu")
    .addEventListener("click", rokDopredu, false);
  document
    .getElementById("cmr_sipka_zpet_M")
    .addEventListener("click", mesicZpet, false);
  document
    .getElementById("cmr_sipka_dopredu_M")
    .addEventListener("click", mesicDopredu, false);
}

async function vygenerujCMR(id, rok, mesic) {
  var all_cmr = document.getElementById("cmr_radek_all_id");
  if (all_cmr) {
    all_cmr.remove();
    var cmr = document.createElement("div");
    cmr.setAttribute("id", "cmr_radek_all_id");
    cmr.setAttribute("class", "cmr_radek_all");
    document.getElementById("cmr_obal").appendChild(cmr);
  }
  var cmr_radek = document.createElement("div");
  var cmr_kolecko = document.createElement("div");
  var cmr_den = document.createElement("div");

  var zacatek = new Date(rok, mesic - 1, 1);
  zacatek = zacatek.getDay();
  //console.log(zacatek);
  if (zacatek === 0) {
    zacatek = 7;
  }
  var dnu = daysInMonth(mesic, rok);

  cmr_radek = document.createElement("div");
  cmr_radek.setAttribute("class", "cmr_radek");

  for (var a = 1; a < zacatek; a++) {
    cmr_kolecko = document.createElement("div");
    cmr_kolecko.setAttribute("class", "cmr_kolecko noop");

    cmr_den = document.createElement("div");
    cmr_den.setAttribute("class", "cmr_den noselect invisible");
    cmr_den.innerHTML = "X";
    cmr_kolecko.appendChild(cmr_den);
    cmr_radek.appendChild(cmr_kolecko);
    document.getElementById("cmr_radek_all_id").appendChild(cmr_radek);
  }
  var celkem = 1;
  var cel_kol = 1;
  for (var i = 1; i <= dnu; i++) {
    cmr_kolecko = document.createElement("div");
    var posli_data = rok + "-" + mesic + "-" + i;
    if (zkotrolujDatumjeZabrane(posli_data)) {
      cmr_kolecko.setAttribute("class", "cmr_kolecko zabrane");
    } else {
      cmr_kolecko.setAttribute("class", "cmr_kolecko");
    }
    if (zkotrolujDatumjeVybrane(posli_data)) {
      cmr_kolecko.setAttribute("class", "cmr_kolecko vybrane");
    }
    // "2015-03-25"
    cmr_kolecko.setAttribute("data-d", rok + "-" + mesic + "-" + i);
    cmr_kolecko.addEventListener("dblclick", startEvent, false);

    cmr_den = document.createElement("div");
    cmr_den.setAttribute("class", "cmr_den noselect");
    cmr_den.innerHTML = i;

    cmr_kolecko.appendChild(cmr_den);
    cmr_radek.appendChild(cmr_kolecko);
    document.getElementById("cmr_radek_all_id").appendChild(cmr_radek);

    //console.log(zacatek);
    if ((i + zacatek) % 7 === 1) {
      cmr_radek = document.createElement("div");
      cmr_radek.setAttribute("class", "cmr_radek");

      celkem++;
    }
    cel_kol++;
  }
  cel_kol = cel_kol + zacatek;
  celkem = celkem * 7 + 1;

  if (cel_kol <= celkem) {
    for (var x = cel_kol; x <= celkem; x++) {
      cmr_kolecko = document.createElement("div");
      cmr_kolecko.setAttribute("class", "cmr_kolecko noop");

      cmr_den = document.createElement("div");
      cmr_den.setAttribute("class", "cmr_den noselect invisible");
      cmr_den.innerHTML = "X";

      cmr_kolecko.appendChild(cmr_den);
      cmr_radek.appendChild(cmr_kolecko);
      document.getElementById("cmr_radek_all_id").appendChild(cmr_radek);
    }
  }
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function cmr_rokZmena() {
  var apk = document.getElementById("cmr_apk");
  var rok = document.getElementById("cmr_rok_id").value;
  var mesic = document.getElementById("cmr_mesic_id").value;

  console.log("rok-zmena " + rok);
  vygenerujCMR(apk, rok, mesic);
}
function cmr_mesicZmena() {
  var apk = document.getElementById("cmr_apk");
  var rok = document.getElementById("cmr_rok_id").value;
  var mesic = document.getElementById("cmr_mesic_id").value;

  console.log("mesic-zmena " + mesic);
  vygenerujCMR(apk, rok, mesic);
}

function zelenyInterval(int) {
  var apk = document.getElementById("cmr_apk");
  var rok = document.getElementById("cmr_rok_id").value;
  var mesic = document.getElementById("cmr_mesic_id").value;
  let zacatek = int.zacatek.getAttribute("data-d");
  let konec = int.konec.getAttribute("data-d");

  vybrane = [];
  vybrane = [[zacatek, konec]];
  console.log(zacatek + "   " + konec);
  var pole_dnu = getDaysArray(new Date(zacatek), new Date(konec));
  for (var i = 0; i < pole_dnu.length; i++) {
    if (zkotrolujDatumjeZabrane(pole_dnu[i])) {
      alert("Termín se kříží s již obsazeným!");
      return 0;
    }
  }

  console.log(vybrane);
  vygenerujCMR(apk, rok, mesic);
}

function getDaysArray(start, end) {
  for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    var d = new Date(dt);
    arr.push(
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + start.getDate()
    );
  }
  console.log(arr);
  return arr;
}
