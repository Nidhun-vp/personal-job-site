import React, { useState, useEffect } from "react";
import Footer from "../component/Footer";           
import axios  from "axios";

const JOB_CATEGORIES = ["All", "Design", "Development", "Marketing"];
const BACKEND_URL = import.meta.env.VITE_API_URL + "/api";
 





export default function App() {
  /* ---------------- state ---------------- */
  const [jobs, setJobs]                 = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm]     = useState("");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", company: "", category: "Design", location: "", description: "",
     date: "", applyLink: ""  
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [toast,   setToast]   = useState("");

  /* ---------------- fetch ---------------- */
  useEffect(() => { fetchJobs(); }, []);

  async function fetchJobs() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BACKEND_URL}/jobs`);
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- filtering ---------------- */
  useEffect(() => {
    let list = jobs;
    if (categoryFilter !== "All") {
      list = list.filter((j) => j.category === categoryFilter);
    }
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase();
      list = list.filter(
        (j) => j.title.toLowerCase().includes(t) || j.company.toLowerCase().includes(t)
      );
    }
    setFilteredJobs(list);
  }, [jobs, categoryFilter, searchTerm]);

  /* ---------------- post job ---------------- */



  //
  async function handleSubmit(e) {
    e.preventDefault();
    const { title, company, category, location, description, date, applyLink } = formData;
    if (!title || !company || !category || !location || !description || !date || !applyLink) {
      setToast("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/jobs`, formData);
      setToast("Job submitted successfully!");
      setFormData({
          title: "",
          company: "",
          category: "Design",
          location: "",
          description: "",
          date: "",
          applyLink: ""
        });

      setShowForm(false);
      fetchJobs();
    } catch (err) {
      setToast("Failed to submit job");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 4000);
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 overflow-x-hidden">

      {/* ---------- Header ---------- */}
      <header className="bg-blue-700 text-white w-full">
        <div className="p-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-extrabold tracking-wide mb-2 md:mb-0">JobBoard</div>
          
          
          {/* //nav */}
          <nav className="d-flex gap-4 mb-3 fs-5">
          <a href="#home" className="text-decoration-none d-flex align-items-center gap-2 text-dark hover-link">
            <i className="fas fa-house"></i> Home
          </a>
          <a href="#jobs" className="text-decoration-none d-flex align-items-center gap-2 text-dark hover-link">
            <i className="fas fa-briefcase"></i> Jobs
          </a>
          <a href="#contact" className="text-decoration-none d-flex align-items-center gap-2 text-dark hover-link">
            <i className="fas fa-info-circle"></i> About
          </a>
          <a href="#contact" className="text-decoration-none d-flex align-items-center gap-2 text-dark hover-link">
            <i className="fas fa-envelope"></i> Contact
          </a>
        </nav>



          <button
            onClick={() => setShowForm(true)}
            className="bg-success text-blue-700 px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition focus:ring-2 focus:ring-blue-400"
          >
            Post a Job
          </button>
        </div>
      </header>

      {/* ---------- search box---------- */}
<section id="home" className="bg-light py-5 px-3 text-center w-100">
  <h1 className="display-4 fw-bold mb-3 text-primary">
    Find Your Dream Job.
  </h1>
  <p className="lead mb-4 text-secondary">
    Search for job titles or companies.
  </p>

  <input
    type="text"
    placeholder="Search jobs..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="form-control form-control-lg mx-auto"
    style={{
      maxWidth: "500px",
      borderRadius: "12px",
      backgroundColor: "#ffffff",
      color: "#000",
      border: "1px solid #ced4da",
      transition: "border-color 0.2s ease-in-out",
    }}
    onMouseEnter={(e) =>
      (e.target.style.borderColor = "#0d6efd") 
    }
    onMouseLeave={(e) =>
      (e.target.style.borderColor = "#ced4da") 
    }
/>
</section>


      {/* ---------- Category filter ---------- */}
      <section id="jobs" className="flex-grow w-full py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-8 flex flex-wrap justify-center md:justify-start gap-3">
              {JOB_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-5 py-2 rounded-pill fw-semibold border-0 transition ${
                    categoryFilter === cat
                      ? "bg-danger text-white shadow-sm"
                      : "bg-light text-dark hover:bg-secondary-subtle"
                  }`}
                  style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }} 
                >
                  {cat}
                </button>
              ))}
            </div>

          {/* ---------- Cards  ---------- */}
          {loading && <p className="text-center text-gray-600 text-lg">Loading jobs...</p>}
          {error   && <p className="text-center text-red-600 text-lg font-semibold">{error}</p>}

          <div className="row">
            {!loading && filteredJobs.length === 0 && (
              <p className="col-12 text-center text-gray-500 text-lg">No jobs found.</p>
            )}

            {filteredJobs.map((job) => (
              <div key={job._id || job.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                    <p className="card-text">{job.description}</p>
                      <span className="badge bg-danger me-2">{job.category}</span>
                      <span className="badge bg-secondary">{job.date}</span>

                                      <div className="mt-2">
                                        <a
                                          href={job.applyLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="btn btn-sm btn-outline-primary"
                                        >
                                          Apply Now
                                        </a>
                                      </div>

                            
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Post-a-Job modal ---------- */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
             role="dialog" aria-modal="true" aria-labelledby="post-job-title">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-100 mx-auto" style={{ maxWidth: '500px' }}>
            <h2 className="text-center fw-bold mb-4">Post a Job</h2>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg rounded border border-secondary bg-light"
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg rounded border border-secondary bg-light"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <select
                className="form-select form-select-lg rounded border border-secondary bg-light"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="" disabled>Select Category</option>
                {JOB_CATEGORIES.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg rounded border border-secondary bg-light"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <textarea
                rows="4"
                className="form-control form-control-lg rounded border border-secondary bg-light"
                placeholder="Job Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control form-control-lg rounded border border-secondary bg-light"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="url"
                className="form-control form-control-lg rounded border border-secondary bg-light"
                placeholder="Apply Link (URL)"
                value={formData.applyLink}
                onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                required
              />
            </div>


            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => setShowForm(false)}
              >
                Cancel23
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary px-4"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

        </div>
      )}

      {/* ---------- Toast ---------- */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}

      {/* ---------- Footer ---------- */}
      <Footer />
    </div>
  );
}
