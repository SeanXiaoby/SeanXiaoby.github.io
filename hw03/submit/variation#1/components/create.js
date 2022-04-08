import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    pickuptype: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", manufacturer: "", pickuptype: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Guitar Name</label>
          <input
            type="text"
            className="form-control"
            id="Guitar Name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
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
              value="Single Coil"
              checked={form.pickuptype === "Single Coil"}
              onChange={(e) => updateForm({ pickuptype: e.target.value })}
            />
            <label htmlFor="pickupSingle" className="form-check-label">Single Coil</label>
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
        <div className="form-group">
          <input
            type="submit"
            value="Create record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
