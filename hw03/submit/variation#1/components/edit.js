import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    pickuptype: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      manufacturer: form.manufacturer,
      pickuptype: form.pickuptype,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Guitar Name: </label>
          <input
            type="text"
            className="form-control"
            id="Guitar Name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer: </label>
          <input
            type="text"
            className="form-control"
            id="Manufacturer"
            value={form.manufacturer}
            onChange={(e) => updateForm({ manufacturer: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="pickupOptions"
              id="pickupSingle"
              value="Single coil"
              checked={form.pickuptype === "Single coil"}
              onChange={(e) => updateForm({ pickuptype: e.target.value })}
            />
            <label htmlFor="pickupSingle" className="form-check-label">Single coil</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="pickupOptions"
              id="pickupHumbucker"
              value="Humbucker"
              checked={form.pickuptype === "Humbucker"}
              onChange={(e) => updateForm({ pickuptype: e.target.value })}
            />
            <label htmlFor="pickupHumbucker" className="form-check-label">Humbucker</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="pickupOptions"
              id="pickupP90"
              value="P90"
              checked={form.pickuptype === "P90"}
              onChange={(e) => updateForm({ pickuptype: e.target.value })}
            />
            <label htmlFor="pickupP90" className="form-check-label">P90</label>
        </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
