const select = document.querySelector(".form-select");
const vade = document.querySelector("#vade");
const tutar = document.querySelector("#tutar");
const hesaplaBtn = document.querySelector(".btn");
const alertMessage = document.getElementById("alert-message");
let oran = 0;
let taksit = 0;

hesaplaBtn.addEventListener("click", (e) => {
  if (!select.value || !vade.value || !tutar.value) {
    showAlert("danger", "Lütfen bütün alanları doldurunuz.");

    setTimeout(() => {
      alertMessage.innerHTML = "";
    }, 1500);
  } else {
    if (select.value === "Konut Kredisi") {
      oran = 1.29;
    } else if (select.value === "Ihtiyac Kredisi") {
      oran = 1.99;
    } else if (select.value === "Arac Kredisi") {
      oran = 1.79;
    }

    const faiz = oran / 100;
    taksit =
      (tutar.value * (faiz * (1 + faiz) ** vade.value)) /
      ((1 + faiz) ** vade.value - 1);
    //   console.log(taksit);

    showAlert("success", "Faiz hesaplama basarılı.");

    setTimeout(() => {
      alertMessage.innerHTML = "";
    }, 1500);
    sonuclariGöster();
  }
  e.preventDefault(); // event'ın default davranışını(submit etmek ve formu silmek) engeller
});

showAlert = (type, message) => {
  alertMessage.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
    `;
};

const sonuclariGöster = () => {
  const sonuclar = document.querySelector(".sonuclar");
  sonuclar.innerHTML = `
  <table class="table table-bordered border-warning">
  
  <tbody>
    <tr>
      <th>Kredi Miktari</th>
      <td>${tutar.value}</td>
      <td>Kredi Tipi</td>
      <td>${select.value}</td>
    </tr>
    <tr>
      <th>Vade</th>
      <td>${vade.value}</td>
      <td>Faiz Oranı</td>
      <td>${oran}</td>
    </tr>
    
    <tr>
      <th>Toplam Tutar</th>
      <td>${(taksit * vade.value).toFixed(2)}</td>
      <td>Taksit Tutari</td>
      <td>${taksit.toFixed(2)}</td>
    </tr>
    
  </tbody>
</table>
  `;
};
