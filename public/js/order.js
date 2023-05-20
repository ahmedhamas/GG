if (localStorage.getItem("Token") === "noToken") {
  location.replace("/");
}
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
    let shiping = 0;
    return (shiping = getTotal() * 0.1);
  }

  if (cart.length) {
    const countContainer = document.getElementById("countContainer");
    countContainer.innerHTML = `<p>المجموع: ${getTotal()} ج</p> 
          <p>المنتجات: ( ${getItems()} )</p>
          <p>سعر الشحن: ${ShipingPrice()} ج</p>
          `;
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

const myForm = document.getElementById("order");

function ShipingPrice() {
  return getTotal() * 0.1;
}
function getTotal() {
  let temp = cart.map(function (item) {
    return parseFloat(item.price * item.quantity);
  });

  let sum = temp.reduce(function (prev, next) {
    return prev + next;
  }, 0);

  return sum * disCount;
}
myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let token = JSON.stringify(localStorage.getItem("Token"));

  const formData = new FormData(this);
  formData.append("user", JSON.parse(token));
  formData.append("total", getTotal() + ShipingPrice());
  formData.append("cart", JSON.stringify(cart));
  const searchParams = new URLSearchParams();

  for (const pair of formData) {
    searchParams.append(pair[0], pair[1]);
  }
  console.log(searchParams);
  fetch("http://localhost:3000/order", {
    method: "post",
    body: searchParams,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success == 0) {
        message.style.color = "#fff";
        message.style.background = "red";
        message.style.fontSize = "12px";
        message.style.padding = " 0 2.5px";
        message.style.borderRadius = "50px";
        message.innerHTML = res.message;
      } else {
        localStorage.setItem("cart", "[]");
        location.replace("/pay/info/success");
      }
    })
    .catch(function (error) {
      console.error(error);
    });
});
