import { ajax } from "./helper.js";
import URL from "./url.js";

let $tblDummyTemp = document.getElementById("dummyTemplate").content,
    $tblDummy = document.getElementById("tblDummy"),
    $fragment = document.createDocumentFragment(),
    $btnGuardar = document.getElementById("btnGuardar"),
    $btnActualizar = document.getElementById("btnActualizar"),
    $btnClear = document.getElementById("btnClear"),
    $txtName = document.getElementById("name"),
    $txtPhone = document.getElementById("phone"),
    $txtEmail = document.getElementById("email"),
    $txtAddress = document.getElementById("address"),
    $txtPostalZip = document.getElementById("postalZip"),
    $txtRegion = document.getElementById("region"),
    $txtCountry = document.getElementById("country"),
    $txtList = document.getElementById("list"),
    $txtText = document.getElementById("text"),
    $txtNumberrange = document.getElementById("numberrange"),
    $txtCurrency = document.getElementById("currency"),
    $txtAlphanumeric = document.getElementById("alphanumeric");

export async function Dummy_Request() {
    let data = await ajax(URL.API_DUMMY, {
        method: "GET"
    });
    Paint_tblDummy(data);
}

function Paint_tblDummy(data) {
    if (data) {
        data.forEach(dummy => {
            let { name, phone, email, address, postalZip, region, country, list, text, numberrange, currency, alphanumeric } = dummy;

            $tblDummyTemp.querySelector('.name').textContent = name;
            $tblDummyTemp.querySelector('.phone').textContent = phone;
            $tblDummyTemp.querySelector('.email').textContent = email;
            $tblDummyTemp.querySelector('.address').textContent = address;
            $tblDummyTemp.querySelector('.postalZip').textContent = postalZip;
            $tblDummyTemp.querySelector('.region').textContent = region;
            $tblDummyTemp.querySelector('.country').textContent = country;
            $tblDummyTemp.querySelector('.list').textContent = list;
            $tblDummyTemp.querySelector('.text').innerHTML = `<textarea class="bg-transparent contenedor border-0" name="" id="" cols="30" rows="5" disabled>${text}</textarea>`;
            $tblDummyTemp.querySelector('.numberrange').textContent = numberrange;
            $tblDummyTemp.querySelector('.currency').textContent = currency;
            $tblDummyTemp.querySelector('.alphanumeric').textContent = alphanumeric;
            $tblDummyTemp.querySelector('.editar').innerHTML = `<a class="btn btn-outline-warning m-0 btnEdit" data-name="${name}" data-phone="${phone}" data-email="${email}"
             data-address="${address}" data-postalZip="${postalZip}" data-region="${region}" data-country="${country}" data-list="${list}" data-text="${text}" data-numberrange="${numberrange}"
             data-currency="${currency}" data-alphanumeric="${alphanumeric}"><i class="bx bxs-pencil" data-name="${name}" data-phone="${phone}" data-email="${email}"
             data-address="${address}" data-postalZip="${postalZip}" data-region="${region}" data-country="${country}" data-list="${list}" data-text="${text}" data-numberrange="${numberrange}"
             data-currency="${currency}" data-alphanumeric="${alphanumeric}"></i></a>`;
            $tblDummyTemp.querySelector('.eliminar').innerHTML = `<a class="btn btn-outline-danger m-0 btnDelete" data-alphanumeric="${alphanumeric}"><i class="bx bxs-trash-alt"></i></a>`;

            let clone = document.importNode($tblDummyTemp, true);
            $fragment.appendChild(clone);
        });
        $tblDummy.querySelector('tbody').innerHTML = "";
        $tblDummy.querySelector('tbody').appendChild($fragment);
    }
}

export function Editar() {
    document.addEventListener('click', (e) => {
        if (e.target.matches(".btnEdit") || e.target.matches(".btnEdit *")) {
            let $name = e.target.getAttribute("data-name"),
                $phone = e.target.getAttribute("data-phone"),
                $email = e.target.getAttribute("data-email"),
                $address = e.target.getAttribute("data-address"),
                $postalZip = e.target.getAttribute("data-postalZip"),
                $region = e.target.getAttribute("data-region"),
                $country = e.target.getAttribute("data-country"),
                $list = e.target.getAttribute("data-list"),
                $text = e.target.getAttribute("data-text"),
                $numberrange = e.target.getAttribute("data-numberrange"),
                $currency = e.target.getAttribute("data-currency"),
                $alphanumeric = e.target.getAttribute("data-alphanumeric");
            console.log($name);

            $txtName.value = $name
            $txtPhone.value = $phone
            $txtEmail.value = $email
            $txtAddress.value = $address
            $txtPostalZip.value = $postalZip
            $txtRegion.value = $region
            $txtCountry.value = $country
            $txtList.value = $list
            $txtText.value = $text
            $txtNumberrange.value = $numberrange
            $txtCurrency.value = $currency
            $txtAlphanumeric.value = $alphanumeric
            $btnGuardar.hidden = true;
            $btnActualizar.hidden = false;
        }
    });
}

export async function Eliminar() {
    document.addEventListener('click', async (e) => {
        if (e.target.matches(".btnDelete") || e.target.matches(".btnDelete *")) {
            let alphanumeric = e.target.getAttribute("data-alphanumeric");
            let data = await ajax(URL.API_DUMMY + "/" + alphanumeric, {
                headers: {'Content-Type': 'application/json'},
                method: "DELETE"
            });
            if (data) {
                Swal.fire(
                    'Eliminado',
                    'You clicked the button!',
                    'success'
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hay un problema con la información',
                  })
            }
        }
    });
}

export function Limpiar() {
    document.addEventListener("click", (e) => {
        if (e.target.matches("#btnClear") || e.target.matches("#btnClear *")) {
            let input = document.getElementById("formulario").querySelectorAll("input");
            let textarea = document.getElementById("formulario").querySelector("textarea");
            textarea.value = "";
            input.forEach(element => {
                element.value = "";
            });
            $btnGuardar.hidden = false;
            $btnActualizar.hidden = true;
        }
    });
}

export async function Guardar() {
    document.addEventListener("click", async (e) => {
        if (e.target.matches("#btnGuardar") || e.target.matches("#btnGuardar *")) {
            let data = await ajax(URL.API_DUMMY, {
                headers: {'Content-Type': 'application/json'},
                method: "POST",
                body: JSON.stringify({
                    name: $txtName.value,
                    phone: $txtPhone.value,
                    email: $txtEmail.value,
                    address: $txtAddress.value,
                    postalZip: $txtPostalZip.value,
                    region: $txtRegion.value,
                    country: $txtCountry.value,
                    list: $txtList.value,
                    text: $txtText.value,
                    numberrange: $txtNumberrange.value,
                    currency: $txtCurrency.value,
                    alphanumeric: $txtAlphanumeric.value
                })
            })
            if (data) {
                Swal.fire(
                    'Guardado',
                    'You clicked the button!',
                    'success'
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Verifique que la informacion esté correcta',
                  })
            }
        }
    });
}

export async function Actualizar() {
    document.addEventListener("click", async (e) => {
        if (e.target.matches("#btnActualizar") || e.target.matches("#btnActualizar *")) {
            let data = await ajax(URL.API_DUMMY + "/" + $txtAlphanumeric.value, {
                headers: {'Content-Type': 'application/json'},
                method: "PUT",
                body: JSON.stringify({
                    name: $txtName.value,
                    phone: $txtPhone.value,
                    email: $txtEmail.value,
                    address: $txtAddress.value,
                    postalZip: $txtPostalZip.value,
                    region: $txtRegion.value,
                    country: $txtCountry.value,
                    list:  $txtList.value,
                    text: $txtText.value,
                    numberrange: $txtNumberrange.value,
                    currency: $txtCurrency.value,
                    alphanumeric: $txtAlphanumeric.value,
                })
            })
            if (data) {
                Swal.fire(
                    'Actualizado',
                    'You clicked the button!',
                    'success'
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Verifique que la informacion esté correcta',
                  })
            }
        }
    });
}