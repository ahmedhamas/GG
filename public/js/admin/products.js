function search() {
  const myForm = document.getElementById("myForm");
  const products = [];
  myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for (const pair of formData) {
      searchParams.append(pair[0], pair[1]);
    }

    fetch("https://prickly-wasp-buckle.cyclic.app/search/product", {
      method: "post",
      body: searchParams,
    })
      .then((res) => res.json())
      .then((res) => {
        products.push(res.data);
        productsL();
        console.log(res.data);
      });
  });
  function productsL() {
    const Container = document.getElementById("result");

    const mappedItems = products[0]
      .map((product, index) => {
        return `
                    <div class="productRec" key=${index}>
                      <form action='/delete/product' method='post'>
                        <input type='hidden' name='productid' value='${product.id}'/>
                        <button class='delete' type='submit'><i class='bx bx-trash'></i></button>
                      </form>
                      <p>معرف المستخدم: ${product.id}</p>
                      <p>اسم المستخدم: ${product.name}</p>
                      
                    </div>
                    </div>`;
      })
      .join("");

    Container.innerHTML = mappedItems;
  }
}
window.addEventListener("pageshow", function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != "undefined" &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});
