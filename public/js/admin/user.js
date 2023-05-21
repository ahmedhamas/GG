function search() {
  const myForm = document.getElementById("myForm");
  const users = [];
  myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for (const pair of formData) {
      searchParams.append(pair[0], pair[1]);
    }

    fetch("http://localhost:3000/search/users", {
      method: "post",
      body: searchParams,
    })
      .then((res) => res.json())
      .then((res) => {
        users.push(res.data);
        usersL();
      });
  });
  function usersL() {
    const Container = document.getElementById("result");

    const mappedItems = users[0]
      .map((user, index) => {
        function manger() {
          if (user.isManger === 1) {
            return `نعم`;
          } else {
            return `لا`;
          }
        }
        return `
                  <div class="userRec" key=${index}>
                    <form action='/delete/user' method='post'>
                      <input type='hidden' name='userid' value='${user.id}'/>
                      <button class='delete' type='submit'><i class='bx bx-trash'></i></button>
                    </form>
                    <p>معرف المستخدم: ${user.id.substr(24, 25)}</p>
                    <p>اسم المستخدم: ${user.name}</p>
                    <p>المستخدم مدير: ${manger()}</p>
                    <p>البريد الالكتروني للمستخدم: ${user.email}</p>
                  </div>`;
      })
      .join("");

    Container.innerHTML = mappedItems;
  }
}
