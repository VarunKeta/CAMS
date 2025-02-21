import React from 'react';
import './Features.css';
import { FaUserGraduate, FaCalendarCheck, FaFileSignature, 
         FaUserCircle, FaChartLine, FaMedal } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: <FaUserGraduate className="feature-icon" />,
      title: "Attendance Tracking",
      description: "Efficiently monitor and manage student attendance with our automated tracking system.",
      color: "#4CAF50"
    },
    {
      icon: <FaCalendarCheck className="feature-icon" />,
      title: "Schedule Meetings",
      description: "Easy-to-use interface for scheduling and managing academic meetings and consultations.",
      color: "#2196F3"
    },
    {
      icon: <FaFileSignature className="feature-icon" />,
      title: "Request Letter Approval",
      description: "Streamlined process for submitting and approving student requests and letters.",
      color: "#9C27B0"
    },
    {
      icon: <FaUserCircle className="feature-icon" />,
      title: "Student Biodata",
      description: "Comprehensive student profile management with secure data storage.",
      color: "#FF9800"
    },
    {
      icon: <FaChartLine className="feature-icon" />,
      title: "Student Academic Performance",
      description: "Track and analyze academic progress with detailed performance metrics.",
      color: "#E91E63"
    },
    {
      icon: <FaMedal className="feature-icon" />,
      title: "Student Non-Academic Performance",
      description: "Monitor extracurricular achievements and personal development.",
      color: "#673AB7"
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose Us?</h2>
          <p>Comprehensive solutions for academic management</p>
        </motion.div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              className="feature-card" 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                '--accent-color': feature.color
              }}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
                <div className="icon-background"></div>
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="features-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </section>
  );
};

export default Features;
