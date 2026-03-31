import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
} from 'react-icons/hi';
import { useContent } from '../../hooks/useContent';
import styles from './Contact.module.css';

const iconFor: Record<string, ReactNode> = {
  address: <HiOutlineLocationMarker />,
  phone: <HiOutlinePhone />,
  email: <HiOutlineMail />,
  hours: <HiOutlineClock />,
};

const Contact = () => {
  const { data: info } = useContent('storeInfo');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    { key: 'address', label: 'Address', value: info.address.replace(/\n/g, ', ') },
    { key: 'phone', label: 'Phone', value: info.phone },
    { key: 'email', label: 'Email', value: info.email },
    { key: 'hours', label: 'Hours', value: info.hours.replace(/\n/g, ' | ') },
  ];

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Have a question or need a specific part? Reach out — we&apos;re happy to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoSide}>
              <h2 className={styles.infoTitle}>Get in Touch</h2>
              <p className={styles.infoText}>
                Visit our store or drop us a message. We typically respond within a few hours
                during business days.
              </p>
              <div className={styles.infoList}>
                {contactItems.map(({ key, label, value }) => (
                  <div key={key} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{iconFor[key]}</div>
                    <div>
                      <p className={styles.infoLabel}>{label}</p>
                      <p className={styles.infoValue}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.formSide}>
              {submitted ? (
                <div className={styles.success}>
                  <h3>Thank you!</h3>
                  <p>Your message has been received. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={styles.input}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={styles.input}
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className={styles.textarea}
                      rows={5}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
