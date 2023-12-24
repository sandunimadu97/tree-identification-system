const firebaseConfig = {
  apiKey: "AIzaSyCUx2YbrcA0jHt83WvghncjZTWTJU9s0Zw",
  authDomain: "test-bed-15521.firebaseapp.com",
  databaseURL:
    "https://test-bed-15521-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-bed-15521",
  storageBucket: "test-bed-15521.appspot.com",
  messagingSenderId: "571008537563",
  appId: "1:571008537563:web:d1e43f2e389a9911978dfe",
};

var isEditing = false;

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const addDocument = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const sinhalaName = document.getElementById("sinhalaName").value;
  const description = document.getElementById("description").value;
  const advantages = document.getElementById("advantages").value;
  const nValue = document.getElementById("nValue").value;
  const family = document.getElementById("family").value;
  const hClass = document.getElementById("hClass").value;
  const img = document.getElementById("img").value;
  const kingdom = document.getElementById("kingdom").value;
  const order = document.getElementById("order").value;
  const rank = document.getElementById("rank").value;
  const scName = document.getElementById("scName").value;

  if (!isEditing) {
    db.collection("trees")
      .add({
        name,
        sinhalaName,
        description,
        advantages,
        nValue,
        family,
        hClass,
        img,
        kingdom,
        order,
        rank,
        scName,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("name").value = "";
        document.getElementById("sinhalaName").value = "";
        document.getElementById("description").value = "";
        document.getElementById("advantages").value = "";
        document.getElementById("nValue").value = "";
        document.getElementById("family").value = "";
        document.getElementById("hClass").value = "";
        document.getElementById("img").value = "";
        document.getElementById("kingdom").value = "";
        document.getElementById("order").value = "";
        document.getElementById("rank").value = "";
        document.getElementById("scName").value = "";
        displayDocuments();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    const docId = document
      .getElementById("addForm")
      .getAttribute("data-doc-id");

    db.collection("trees")
      .doc(docId)
      .update({
        name,
        sinhalaName,
        description,
        advantages,
        nValue,
        family,
        hClass,
        img,
        kingdom,
        order,
        rank,
        scName,
      })
      .then(() => {
        console.log("Document successfully updated!");
        document.getElementById("name").value = "";
        document.getElementById("sinhalaName").value = "";
        document.getElementById("description").value = "";
        document.getElementById("advantages").value = "";
        document.getElementById("nValue").value = "";
        document.getElementById("family").value = "";
        document.getElementById("hClass").value = "";
        document.getElementById("img").value = "";
        document.getElementById("kingdom").value = "";
        document.getElementById("order").value = "";
        document.getElementById("rank").value = "";
        document.getElementById("scName").value = "";

        isEditing = false;
        document.getElementById("submitBtn").innerText = "Add Document";
        document.getElementById("cancelBtn").style.display = "none";
        document.getElementById("addForm").removeAttribute("data-doc-id");
        displayDocuments();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }
};

const displayDocuments = () => {
  const documentList = document.getElementById("documentList");
  documentList.innerHTML = "";

  db.collection("trees")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        documentList.innerHTML = "<p>No documents found.</p>";
      } else {
        const table = document.createElement("table");
        table.className = "table table-bordered";
        const tableHeader = document.createElement("thead");
        tableHeader.innerHTML = `
          <tr>
            <th>Name</th>
            <th>Sinhala Name</th>
            <th>Description</th>
            <th>Advantages</th>
            <th>Nutritional Value</th>
            <th>Family</th>
            <th>Class</th>
            <th>Image URL</th>
            <th>Kingdom</th>
            <th>Order</th>
            <th>Rank</th>
            <th>Scientific Name</th>
            <th>Action</th>
          </tr>
        `;

        table.appendChild(tableHeader);

        const tableBody = document.createElement("tbody");

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.sinhalaName}</td>
            <td class="description">${data.description}</td>
            <td class="description">${data.advantages}</td>
            <td class="description">${data.nValue}</td>
            <td>${data.family}</td>
            <td>${data.hClass}</td>
            <td class="img-url">${data.img}</td>
            <td>${data.kingdom}</td>
            <td>${data.order}</td>
            <td>${data.rank}</td>
            <td>${data.scName}</td>
            <td>
              <button class="btn btn-danger" onclick="deleteDocument('${doc.id}')">Delete</button>
              <button class="btn btn-primary edit-btn" data-doc-id="${doc.id}">Edit</button>
            </td>
          `;
          tableBody.appendChild(row);
        });

        table.appendChild(tableBody);

        documentList.appendChild(table);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const deleteDocument = (docId) => {
  db.collection("trees")
    .doc(docId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      displayDocuments();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

const editDocument = (docId) => {
  db.collection("trees")
    .doc(docId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById("name").value = data.name;
        document.getElementById("sinhalaName").value = data.sinhalaName;
        document.getElementById("description").value = data.description;
        document.getElementById("advantages").value = data.advantages;
        document.getElementById("nValue").value = data.nValue;
        document.getElementById("family").value = data.family;
        document.getElementById("hClass").value = data.hClass;
        document.getElementById("img").value = data.img;
        document.getElementById("kingdom").value = data.kingdom;
        document.getElementById("order").value = data.order;
        document.getElementById("rank").value = data.rank;
        document.getElementById("scName").value = data.scName;

        document.getElementById("submitBtn").innerText = "Update Document";
        document.getElementById("cancelBtn").style.display = "block";

        document.getElementById("addForm").setAttribute("data-doc-id", docId);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
};

const cancelEdit = () => {
  document.getElementById("addForm").reset();
  document.getElementById("submitBtn").innerText = "Add Document";
  document.getElementById("cancelBtn").style.display = "none";
  document.getElementById("addForm").removeAttribute("data-doc-id");
};

document.getElementById("documentList").addEventListener("click", (e) => {
  console.log("Clicked: ", e);
  if (e.target && e.target.className.includes("edit-btn")) {
    const docId = e.target.getAttribute("data-doc-id");
    isEditing = true;
    editDocument(docId);
  }
});

document.getElementById("cancelBtn")?.addEventListener("click", cancelEdit);

document.getElementById("addForm").addEventListener("submit", addDocument);

displayDocuments();
