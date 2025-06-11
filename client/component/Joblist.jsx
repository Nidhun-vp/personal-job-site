import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryFilter from './CategoryFilter';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
        const uniqueCategories = [...new Set(res.data.map(job => job.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.category === selectedCategory));
    }
  }, [selectedCategory, jobs]);

  return (
    <div className="container mt-4">
      <h2>Job Listings</h2>
      <CategoryFilter 
        categories={categories} 
        selected={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        filteredJobs.map((job, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
              <p className="card-text">{job.description}</p>
              <span className="badge bg-secondary">{job.category}</span>
              
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JobList;
