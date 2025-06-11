
import React from "react";

function JobCard({ title, company, category, location, description }) {
  return (
    <article
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
      tabIndex={0}
      aria-label={`${title} at ${company}, ${location}`}
      style={{ borderRadius: "15px" }}
    >
      <h2 className="text-2xl font-semibold mb-1">{title}</h2>
      <p className="text-blue-700 font-medium mb-1">{company}</p>
      <p className="italic text-sm text-gray-500 mb-1">{category}</p>
      <p className="text-gray-700 font-semibold mb-3">{location}</p>
      <p className="text-gray-600 text-sm line-clamp-4">{description}</p>
      <p className="text-muted small">
        <strong>Date:</strong> {job.date?.slice(0, 10)}
      </p>
      <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
        Apply Now
      </a>

    </article>
  );
}

export default JobCard;

