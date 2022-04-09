var users = [
    {
        id: 1,
        name: "Bob",
        lastname: "Manila",
        identification: 10000001,
        email: "correo1@gmail.com"
    },
    {
        id: 2,
        name: "Harry",
        lastname: "Baguio",
        identification: 10000002,
        email: "correo1@gmail.com"
    }
];

$.each(users, function (i, user) {
    appendToUsrTable(user);
});

$("form").submit(function (e) {
    e.preventDefault();
});

$("form#addUser").submit(function () {
    var user = {};
    var nameInput = $('input[name="name"]').val().trim();
    var lastnameInput = $('input[name="lastname"]').val().trim();
    var identificationInput = $('input[name="identification"]').val().trim();
    var emailInput = $('input[name="email"]').val().trim();
    /*var generoInput = $('input[name="genero"]').val().trim();*/
    if (nameInput && lastnameInput && identificationInput & emailInput) {
        $(this).serializeArray().map(function (data) {
            user[data.name] = data.value;
        });
        var lastUser = users[Object.keys(users).sort().pop()];
        user.id = lastUser.id + 1;

        addUser(user);
    } else {
        alert("All fields must have a valid value.");
    }
});

function addUser(user) {
    users.push(user);
    appendToUsrTable(user);
}

function editUser(id) {
    users.forEach(function (user, i) {
        if (user.id == id) {
            $(".modal-body").empty().append(`
                  <form id="updateUser" action="">
                      <label for="name">Name</label>
                      <input class="form-control" type="text" name="name" value="${user.name}"/>
                      <label for="lastname">Lastname</label>
                      <input class="form-control" type="text" name="lastname" value="${user.lastname}"/>
                      <label for="identification">Identification</label>
                      <input class="form-control" type="number" name="identification" value="${user.identification}"/>
                      <label for="email">Email</label>
                      <input class="form-control" type="email" name="email" value="${user.email}" />
              `);
            $(".modal-footer").empty().append(`
                      <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </form>
              `);
        }
    });
}

function deleteUser(id) {
    var action = confirm("Are you sure you want to delete this user?");
    var msg = "User deleted successfully!";
    users.forEach(function (user, i) {
        if (user.id == id && action != false) {
            users.splice(i, 1);
            $("#userTable #user-" + user.id).remove();
            flashMessage(msg);
        }
    });
}

function updateUser(id) {
    var msg = "User updated successfully!";
    var user = {};
    user.id = id;
    users.forEach(function (user, i) {
        if (user.id == id) {
            $("#updateUser").children("input").each(function () {
                var value = $(this).val();
                var attr = $(this).attr("name");
                if (attr == "name") {
                    user.name = value;
                } else if (attr == "lastname") {
                    user.lastname = value;
                } else if (attr == "identification") {
                    user.identification = value;
                } else if (attr == "email") {
                    user.email = value;
                }
            });
            users.splice(i, 1);
            users.splice(user.id - 1, 0, user);
            $("#userTable #user-" + user.id).children(".userData").each(function () {
                var attr = $(this).attr("name");
                if (attr == "name") {
                    $(this).text(user.name);
                } else if (attr == "address") {
                    $(this).text(user.address);
                } else {
                    $(this).text(user.age);
                }
            });
            $(".modal").modal("toggle");
            flashMessage(msg);
        }
    });
}

function flashMessage(msg) {
    $(".flashMsg").remove();
    $(".row").prepend(`
          <div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
      `);
}

function appendToUsrTable(user) {
    $("#userTable > tbody:last-child").append(`
          <tr id="user-${user.id}">
              <td class="userData" name="name">${user.name}</td>
              '<td class="userData" name="lastname">${user.lastname}</td>
              '<td class="userData" name="identification">${user.identification}</td>
              '<td class="userData" name="email">${user.email}</td>
              '<td align="center">
                  <button class="btn btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
              </td>
          </tr>
      `);
}
