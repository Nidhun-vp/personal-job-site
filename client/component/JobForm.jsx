
import React, { useState } from 'react';
import axios from 'axios';
  

function JobForm() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/jobs", formData)
      .then(res => {
        alert("Job posted successfully!");
        setFormData({
          title: '',
          company: '',
          category: '',
          location: '',
          description: ''
        });
      })
      .catch(err => {
        console.error(err);
        alert("Failed to post job.");
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg w-100" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-primary">Post a Job</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                className={`form-control ${styles.customInput}`}  
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                type="text"
                className={`form-control ${styles.customInput}`}
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className={`form-control ${styles.customInput}`}
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className={`form-control ${styles.customInput}`}
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Description</label>
              <textarea
                className={`form-control ${styles.customInput}`}
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Post Job</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobForm;
