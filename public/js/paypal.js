paypal
  .Buttons({
    createOrder: (actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 50,
            },
          },
        ],
      });
    },
    onApprove: function (actions) {
      return actions.order.capture().then(
        fetch("https://prickly-wasp-buckle.cyclic.app/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(OrderData),
        }).then(
          localStorage.setItem("cart", "[]"),
          location.replace("/pay/info/success")
        )
      );
    },
  })
  .render("#paypal");
