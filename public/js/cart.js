let disCount = JSON.parse(localStorage.getItem("disCount"));
function calContainer() {
  function getTotal() {
    let temp = cart.map(function (item) {
      return parseFloat(item.price * item.quantity);
    });

    let sum = temp.reduce(function (prev, next) {
      return prev + next;
    }, 0);

    return sum * disCount;
  }

  function getItems() {
    let temp = cart
      .map(function (item) {
        return item.name + "  ";
      })
      .join("");

    return temp;
  }
  function ShipingPrice() {
    let shiping = 200;
    return shiping;
  }

  if (cart.length) {
    const countContainer = document.getElementById("countContainer");
    countContainer.innerHTML = `<p>المجموع: ${getTotal()} ج</p> 
        <p>المنتجات: ( ${getItems()} )</p>
        <p>سعر الشحن: ${ShipingPrice()} ج</p>
        <div id='auth'></div>
        `;
    const auth = document.getElementById("auth");
    if (localStorage.getItem("Token") === "noToken") {
      auth.innerHTML = `<p> من فضلك سجل الدخول لمواصلة <a href='/user/info/login'>الشراء</a> </p>`;
    } else {
      auth.innerHTML = ` <p class='checkoutBtn'><a href='/pay/info/cash_on_delivery'>الدفع عند الاستلام</a></p>
        <p class='checkoutBtn'><a href='/pay/info/credit_card'>ببطاقة ائتمان</a></p>
        <button class='checkoutBtn' onclick="Paymob()">paymob</button>
        `;
    }
  } else {
    const countContainer = document.getElementById("countContainer");
    countContainer.innerHTML = `<p style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: #fff;
      padding: 5px;
      width: 95%;
      display:flex;
      align-items: center;
      justify-content: center;
      text-transform: capitalize;
      border-radius: 5px;
      ">عربة التسوق فارغة <a href='/' style='margin-left: 5px;
  text-decoration: none;
  color: #2660ff;'> اذهب للتسوق</a> </p>`;
  }
}
function cartItems() {
  let Container = document.getElementById("container");

  const mappedItems = cart
    .map((item, index) => {
      return `
          <div class="cart" key=${index}>
                <img src='${item.image}'>
                <div class='info'>
                 <a href="/product/${item.id}" ><p>${item.name.substr(
        0,
        25
      )}</p></a>
                  <p>${item.price} ج</p>
                  <p>${item.price * item.quantity} ج</p>
                </div>
                <div class="quantity">
                  <button onclick="incQuantity(${item.id}, ${
        item.quantity + 1
      })" ><i class='bx bx-plus'></i></button>
                  <p>${item.quantity}</p>
                  <button onclick='dicQuantity(${
                    item.id
                  })'><i class='bx bx-minus' ></i></button>
                </div>
                <button onclick='removeItemFormCart(${
                  item.id
                })' class='removeBtn'><i class='bx bxs-x-circle'></i></button>
          </div>`;
    })
    .join("");

  Container.innerHTML = mappedItems;
}
function removeItemFormCart(productId) {
  let temp = cart.filter((item) => item.id != productId);
  localStorage.setItem("cart", JSON.stringify(temp));
  location.reload();
}
function incQuantity(productId, quantity) {
  for (let product of cart) {
    if (product.id == productId) {
      if (product.instock == product.quantity) {
        product.quantity != quantity;
      } else {
        product.quantity = quantity;
        cartItems();
        calContainer();
      }
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
function dicQuantity(productId) {
  for (let product of cart) {
    if (product.id == productId) {
      if (product.quantity !== 1) {
        product.quantity -= 1;
        cartItems();
        calContainer();
      }
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

const apiKey =
  "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TnprNE5EVTFMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuZzd1YzV2RlBqVXFJMUFmaHVjUnZ1YXdqU0EzSm9oVkZ3OTFZTlN1ZWhIZWNrb1ZHbktzMDZRQVIzdUNWaU5oTGxDRGpEblVhMDJoRGczMVVpSnEwLUE=";

async function Paymob() {
  let data = {
    api_key: apiKey,
  };
  let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let res = await request.json();
  let token = res.token;

  secStep(token);
}
async function secStep(token) {
  let data = {
    auth_token: token,
    delivery_needed: "false",
    amount_cents: "100",
    currency: "EGP",
    items: [],
  };
  let req = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let res = await req.json();

  thirdStep(token, res.id);
}

async function thirdStep(token, id) {
  let data = {
    auth_token: token,
    amount_cents: "100",
    expiration: 3600,
    order_id: id,
    billing_data: {
      apartment: "803",
      email: "claudette09@exa.com",
      floor: "42",
      first_name: "Clifford",
      street: "Ethan Land",
      building: "8028",
      phone_number: "+86(8)9135210487",
      shipping_method: "PKG",
      postal_code: "01898",
      city: "Jaskolskiburgh",
      country: "CR",
      last_name: "Nicolas",
      state: "Utah",
    },
    currency: "EGP",
    integration_id: 3837851,
  };

  let req = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  let res = await req.json();

  let TheToken = res.token;

  cardPayment(TheToken);
}
async function cardPayment(TheToken) {
  iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/761516?payment_token=${TheToken}`;
  location.replace(iframeUrl);
}
