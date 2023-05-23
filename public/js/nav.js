const MenuBtn = document.getElementById("menu");
const MenuBar = document.getElementById("menuBar");
const CartLength = document.getElementById("cartLength");

MenuBtn.addEventListener("click", function () {
  MenuBar.classList.toggle("active");
  if (MenuBar.classList.contains("active")) {
    MenuBar.style.transform = "translateX(-5px)";
  } else {
    MenuBar.style.transform = "translateX(105%)";
  }
});
let token = JSON.stringify(localStorage.getItem("Token"));
let parsedToken = JSON.parse(token);

let cart = JSON.parse(localStorage.getItem("cart"));
function cartLen() {
  if (cart.length > 0) {
    CartLength.style.display = "flex";
    CartLength.style.position = "absolute";
    CartLength.style.background = "red";
    CartLength.style.color = "#fff";
    CartLength.style.width = "20px";
    CartLength.style.height = "25px";
    CartLength.style.borderRadius = "5px";
    CartLength.style.fontWeight = "700";
    CartLength.style.top = "-7.5px";
    CartLength.style.alignItems = "center";
    CartLength.style.justifyContent = "center";
    CartLength.style.left = "20px";
    CartLength.innerHTML = cart.length;
  } else {
    CartLength.style.display = "none";
  }
}
function logedUser() {
  if (localStorage.getItem("Token") === "noToken") {
    MenuBar.innerHTML = `    <li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/" style="color: #fff; text-decoration: none">الصفحة الرئيسية</a>
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/contact_us" style="color: #fff; text-decoration: none"
    >اتصل بنا</a
  >
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/about" style="color: #fff; text-decoration: none"
    >معلومات عنا</a
  >
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/user/info/login" style="color: #fff; text-decoration: none"
    >تسجيل الدخول</a
  >
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/"><img src="/img/logo.png" style="width: 100%" /></a>
</li>`;
  } else {
    MenuBar.innerHTML = `    <li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/" style="color: #fff; text-decoration: none">الصفحة الرئيسية</a>
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/gomla/info/contact_us" style="color: #fff; text-decoration: none"
    >اتصل بنا</a
  >
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/gomla/info/about" style="color: #fff; text-decoration: none"
    >معلومات عنا</a
  >
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
<button onclick='logout()' style="color: #fff;   background: none;
cursor: pointer;  border: none; font-size:15px;"
  >تسجيل خروج</button
>
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
><a href="/user/info/o_h/${parsedToken}" style="color: #fff; text-decoration: none"
>سجل الطلبات</a
>
</li>
<li
  style="
    margin: 15px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  "
>
  <a href="/"><img src="/img/logo.png" style="width: 100%" /></a>
</li>
<li
id="adPage"
style="
  margin: 15px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
"
>
</li>`;
  }
  if (
    localStorage.getItem("State") ===
    "49f41477fa1bfc3b4792d5233b6a659f4bc1772692e9d5fe7db0624a300652eb"
  ) {
    const adPage = document.getElementById("adPage");
    adPage.innerHTML = `<a href='/user/info/admin/${parsedToken}' style="color: #fff; text-decoration: none">صفحة الإدارة</a>`;
  }
}

function logout() {
  localStorage.setItem("Token", "noToken");
  localStorage.setItem("State", "noState");
  location.replace("/");
}

setInterval(logedUser, 5000);
