import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  destination: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    destination: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Contact Us
        </h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Ready to plan your trip? Get in touch with us today!
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href="tel:9663202989"
            className="bg-card border border-border rounded-2xl p-6 text-center shadow-card hover:shadow-lg transition-shadow group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Call Us</h3>
            <p className="text-primary font-bold text-xl">9663202989</p>
            <p className="text-muted-foreground text-sm mt-1">
              Quick dial for bookings
            </p>
          </a>

          <a
            href="mailto:lakkiholidays@gmail.com"
            className="bg-card border border-border rounded-2xl p-6 text-center shadow-card hover:shadow-lg transition-shadow group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
            <p className="text-primary font-semibold text-sm">
              lakkiholidays@gmail.com
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              We reply within 24 hours
            </p>
          </a>

          <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-card">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
            <p className="text-muted-foreground text-sm">Mon – Sun</p>
            <p className="text-primary font-semibold">6:00 AM – 10:00 PM</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inquiry Form */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Send an Inquiry
            </h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Inquiry Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll contact you shortly to plan
                  your trip.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      destination: "",
                      message: "",
                    });
                  }}
                  className="mt-4 text-primary font-semibold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com (optional)"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-destination"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Destination
                  </label>
                  <select
                    id="contact-destination"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a destination (optional)</option>
                    <option>Munnar</option>
                    <option>Kodaikanal</option>
                    <option>Chikmagalur</option>
                    <option>Wayanad</option>
                    <option>Pondicherry</option>
                    <option>Rishikesh</option>
                    <option>Ooty</option>
                    <option>Coorg</option>
                    <option>Goa</option>
                    <option>Mysore</option>
                    <option>Hampi</option>
                    <option>Alleppey</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your travel plans, group size, dates..."
                    rows={4}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Our Location
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Based in Karnataka, India. We operate across South India and
                provide pan-India travel services for all group sizes.
              </p>
            </div>

            <div className="bg-primary text-primary-foreground rounded-2xl p-6">
              <h3 className="font-semibold text-lg mb-3">Quick Booking</h3>
              <p className="opacity-90 text-sm mb-4">
                For immediate bookings, call us directly. Our team is available
                7 days a week.
              </p>
              <a
                href="tel:9663202989"
                className="flex items-center justify-center gap-2 bg-amber-400 text-primary px-6 py-3 rounded-lg font-bold hover:bg-amber-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call: 9663202989
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h3 className="font-semibold text-lg mb-3">What to Expect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  Prompt response within 2 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  Customized itinerary based on your needs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  Transparent pricing with no hidden charges
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  Flexible booking and cancellation policy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
