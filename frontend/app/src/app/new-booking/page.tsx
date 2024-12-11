"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const NewBooking = () => {
  const [formData, setFormData] = useState({
    doctor_name: "",
    service: "",
    date: "",
    start_time: "",
    end_time: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://host.docker.internal:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/"); // Kthehu në faqen kryesore nëse ka sukses
      } else {
        const errorData = await res.json();
        setErrors(errorData.errors || ["Failed to create booking"]);
      }
    } catch (error) {
      setErrors(["An unexpected error occurred"]);
    }
  };

  return (
    <div>
      <h1>Create a New Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Doctor Name:
            <input
              type="text"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Service:
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Start Time:
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            End Time:
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Create Booking</button>
      </form>

      {errors.length > 0 && (
        <div>
          <h2>Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NewBooking;
